import express from "express";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PUZZLES } from "./puzzles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "..");
const engineExe = path.resolve(webDir, "..", "engine", "build", "pratt_eval");
const DEFAULT_ORDER = "/,*,+,-";
const FALLBACK_ORDERS = ["*,/,+,-", "+,-,*,/", "-,+,/,*", "-,*,+,/"];
const playableCache = new Map<number, { expression: string; target: string }>();
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

function generateVariantExpression(id: number, salt: number): string {
  const a = 2 + ((id + salt) % 8);
  const b = 3 + ((id * 2 + salt) % 8);
  const c = 4 + ((id * 3 + salt) % 8);
  const d = 2 + ((id * 5 + salt) % 8);
  const e = 1 + ((id * 7 + salt) % 8);
  return `${a}+${b}*${c}/${d}-${e}`;
}

function resolvePlayablePuzzle(puzzleId: number): { expression: string; target: string } {
  const cached = playableCache.get(puzzleId);
  if (cached) {
    return cached;
  }

  const puzzle = PUZZLES.find((row) => row.id === puzzleId);
  if (!puzzle) {
    throw new Error("Puzzle not found");
  }

  const candidateOrders = [puzzle.solutionOrder, ...FALLBACK_ORDERS]
    .filter((order, index, arr) => arr.indexOf(order) === index)
    .filter((order) => order !== DEFAULT_ORDER);

  for (let attempt = 0; attempt < 32; attempt += 1) {
    const expression =
      attempt === 0
        ? puzzle.expression
        : generateVariantExpression(puzzle.id, attempt);

    const defaultResult = runEngineSafe(expression, DEFAULT_ORDER);
    if (!defaultResult.ok) {
      continue;
    }

    for (const order of candidateOrders) {
      const candidateTarget = runEngineSafe(expression, order);
      if (!candidateTarget.ok) {
        continue;
      }
      if (candidateTarget.value !== defaultResult.value) {
        const resolved = { expression, target: candidateTarget.value };
        playableCache.set(puzzleId, resolved);
        return resolved;
      }
    }
  }

  throw new Error("Unable to generate puzzle with non-default solution.");
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

  const puzzle = PUZZLES.find((row) => row.id === id);
  if (!puzzle) {
    res.status(404).send("Puzzle not found");
    return;
  }

  try {
    const playable = resolvePlayablePuzzle(puzzle.id);
    res.json({
      id: puzzle.id,
      title: puzzle.title,
      expression: playable.expression,
      target: playable.target
    });
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : String(error));
  }
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

  const puzzle = PUZZLES.find((row) => row.id === puzzleId);
  if (!puzzle) {
    res.status(404).send("Puzzle not found");
    return;
  }

  try {
    const playable = resolvePlayablePuzzle(puzzle.id);
    const result = runEngineSafe(playable.expression, order.join(","));
    if (!result.ok) {
      res.json({ result: "Error" });
      return;
    }
    res.json({ result: result.value });
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : String(error));
  }
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
