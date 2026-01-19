import { prisma } from "@/lib/prisma";
import { spawnSync } from "child_process";
import path from "path";

function isValidOrder(order: unknown): order is string[] {
  if (!Array.isArray(order) || order.length !== 4) return false;
  const s = new Set(order);
  if (s.size !== 4) return false;
  return order.every((x) => typeof x === "string" && x.length === 1 && "+-*/".includes(x));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return new Response("Bad JSON", { status: 400 });

  const puzzleId = Number(body.puzzleId);
  const order = body.order;

  if (!Number.isFinite(puzzleId)) return new Response("Bad puzzleId", { status: 400 });
  if (!isValidOrder(order)) return new Response("Bad order", { status: 400 });

  const puzzle = await prisma.puzzle.findUnique({ where: { id: puzzleId } });
  if (!puzzle) return new Response("Not found", { status: 404 });

  const precArg = order.join(",");

  // process.cwd() is /web when Next runs
  const exePath = path.join(process.cwd(), "..", "engine", "build", "pratt_eval");

  const run = spawnSync(exePath, [puzzle.expr, precArg], { encoding: "utf-8" });

  if (run.error) return new Response(`Engine error: ${run.error.message}`, { status: 500 });
  if (run.status !== 0) return new Response(`Engine failed: ${run.stderr || run.stdout}`, { status: 500 });

  return Response.json({ result: (run.stdout || "").trim() });
}
