import express from "express";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PUZZLES } from "./puzzles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "..");
const engineExe = path.resolve(webDir, "..", "engine", "build", "pratt_eval");
type EngineResult = { ok: true; value: string } | { ok: false; error: string };

const app = express();
app.use(express.json());

function validOrder(order: unknown): order is string[] {
  if (!Array.isArray(order) || order.length !== 4) {
    return false;
  }
  const unique = new Set(order);
  return (
    unique.size === 4 &&
    order.every(
      (token) => typeof token === "string" && token.length === 1 && "+-*/".includes(token)
    )
  );
}

function parseOrderCsv(orderCsv: string): string[] | null {
  const parts = orderCsv.split(",").map((part) => part.trim());
  return validOrder(parts) ? parts : null;
}

function runEngineSafe(expression: string, orderCsv: string): EngineResult {
  const run = spawnSync(engineExe, [expression, orderCsv], { encoding: "utf-8" });
  if (run.error) {
    return { ok: false, error: `Engine error: ${run.error.message}` };
  }
  if (run.status !== 0) {
    return {
      ok: false,
      error: (run.stderr || run.stdout || "Engine failed").trim()
    };
  }
  return { ok: true, value: (run.stdout || "").trim() };
}

function getPuzzleOrNull(id: number) {
  return PUZZLES.find((row) => row.id === id) ?? null;
}

app.get("/api/puzzles", (_req, res) => {
  res.json(
    PUZZLES.map((puzzle) => ({
      id: puzzle.id,
      title: puzzle.title
    }))
  );
});

app.get("/api/puzzles/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).send("Bad puzzle id");
    return;
  }

  const puzzle = getPuzzleOrNull(id);
  if (!puzzle) {
    res.status(404).send("Puzzle not found");
    return;
  }

  const target = runEngineSafe(puzzle.expression, puzzle.solutionOrder);
  if (!target.ok) {
    res.status(500).send(`Puzzle config error: ${target.error}`);
    return;
  }
  const defaultOrder = parseOrderCsv(puzzle.defaultOrder);
  if (!defaultOrder) {
    res.status(500).send("Puzzle config error: invalid defaultOrder");
    return;
  }

  res.json({
    id: puzzle.id,
    title: puzzle.title,
    expression: puzzle.expression,
    target: target.value,
    defaultOrder
  });
});

app.post("/api/eval", (req, res) => {
  const puzzleId = Number(req.body?.puzzleId);
  const order = req.body?.order;

  if (!Number.isFinite(puzzleId)) {
    res.status(400).send("Bad puzzle id");
    return;
  }
  if (!validOrder(order)) {
    res.status(400).send("Bad order");
    return;
  }

  const puzzle = getPuzzleOrNull(puzzleId);
  if (!puzzle) {
    res.status(404).send("Puzzle not found");
    return;
  }

  const result = runEngineSafe(puzzle.expression, order.join(","));
  if (!result.ok) {
    res.json({ result: "Error" });
    return;
  }
  res.json({ result: result.value });
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(webDir, "dist");
  app.use(express.static(distPath));
  app.get("*splat", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`PrattPuzzle API listening on http://localhost:${port}`);
});
