// Bump this when puzzle content is replaced so old solved state does not leak.
const SOLVED_KEY = "pratt-puzzle-solved-v3-batch2";

type SolvedMap = Record<string, true>;

function readMap(): SolvedMap {
  try {
    const raw = localStorage.getItem(SOLVED_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed as SolvedMap;
  } catch {
    return {};
  }
}

export function isPuzzleSolved(id: number): boolean {
  const solvedMap = readMap();
  return Boolean(solvedMap[String(id)]);
}

export function markPuzzleSolved(id: number): void {
  const solvedMap = readMap();
  solvedMap[String(id)] = true;
  localStorage.setItem(SOLVED_KEY, JSON.stringify(solvedMap));
}
