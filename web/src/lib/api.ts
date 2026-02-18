import type { PuzzleDetail, PuzzleSummary } from "./types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return (await response.json()) as T;
}

export async function fetchPuzzleSummaries(): Promise<PuzzleSummary[]> {
  return parseJson<PuzzleSummary[]>(await fetch("/api/puzzles"));
}

export async function fetchPuzzleDetail(id: number): Promise<PuzzleDetail> {
  return parseJson<PuzzleDetail>(await fetch(`/api/puzzles/${id}`));
}

export async function evaluatePuzzle(
  puzzleId: number,
  order: string[]
): Promise<{ result: string }> {
  return parseJson<{ result: string }>(
    await fetch("/api/eval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ puzzleId, order })
    })
  );
}
