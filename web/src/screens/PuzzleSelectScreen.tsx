import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { BackButton } from "../components/BackButton";
import { fetchPuzzleSummaries } from "../lib/api";
import { isPuzzleSolved } from "../lib/storage";
import type { PuzzleSummary } from "../lib/types";

const PUZZLES_PER_PAGE = 30;

export function PuzzleSelectScreen() {
  const [puzzles, setPuzzles] = useState<PuzzleSummary[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const [pageIndex, setPageIndex] = useState(
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0
  );
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchPuzzleSummaries();
        if (!cancelled) {
          setPuzzles(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const pageCount = Math.max(1, Math.ceil(puzzles.length / PUZZLES_PER_PAGE));
  const safePageIndex =
    puzzles.length === 0
      ? Math.max(pageIndex, 0)
      : Math.min(Math.max(pageIndex, 0), pageCount - 1);

  const visiblePuzzles = useMemo(() => {
    const start = safePageIndex * PUZZLES_PER_PAGE;
    return puzzles.slice(start, start + PUZZLES_PER_PAGE);
  }, [safePageIndex, puzzles]);

  useEffect(() => {
    if (safePageIndex !== pageIndex) {
      setPageIndex(safePageIndex);
    }
  }, [pageIndex, safePageIndex]);

  useEffect(() => {
    const next = String(safePageIndex + 1);
    if (searchParams.get("page") !== next) {
      setSearchParams({ page: next }, { replace: true });
    }
  }, [safePageIndex, searchParams, setSearchParams]);

  return (
    <main className="screen panel-screen">
      <BackButton fallbackTo="/" useHistory={false} />

      <section className="panel puzzle-select-panel">
        <h1>Select Puzzle</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="page-toolbar">
          <button
            type="button"
            className="arrow-btn"
            onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={safePageIndex === 0}
            aria-label="Previous puzzle page"
          >
            ←
          </button>
          <p>
            {safePageIndex + 1} / {pageCount}
          </p>
          <button
            type="button"
            className="arrow-btn"
            onClick={() =>
              setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))
            }
            disabled={safePageIndex === pageCount - 1}
            aria-label="Next puzzle page"
          >
            →
          </button>
        </div>

        <div className="puzzle-grid">
          {visiblePuzzles.map((puzzle) => {
            const solved = isPuzzleSolved(puzzle.id);
            return (
              <Link
                key={puzzle.id}
                className={`puzzle-tile ${solved ? "solved" : "unsolved"}`}
                to={`/puzzles/${puzzle.id}?fromPage=${safePageIndex + 1}`}
                state={{ fromPage: safePageIndex + 1 }}
              >
                {puzzle.id}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
