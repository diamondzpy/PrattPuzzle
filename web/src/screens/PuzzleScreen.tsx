import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { BackButton } from "../components/BackButton";
import { evaluatePuzzle, fetchPuzzleDetail } from "../lib/api";
import { markPuzzleSolved } from "../lib/storage";
import type { PuzzleDetail } from "../lib/types";

function prettifyOperator(op: string): string {
  if (op === "*") {
    return "x";
  }
  if (op === "/") {
    return "÷";
  }
  return op;
}

function prettifyExpression(expression: string): string {
  return expression
    .replaceAll("*", " x ")
    .replaceAll("/", " ÷ ")
    .replaceAll("+", " + ")
    .replaceAll("-", " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function OperatorChip({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      className="operator-chip"
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      {...attributes}
      {...listeners}
    >
      {prettifyOperator(id)}
    </button>
  );
}

export function PuzzleScreen() {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const puzzleId = Number.parseInt(params.id ?? "", 10);
  const inferredPage = Number.isFinite(puzzleId)
    ? Math.floor((puzzleId - 1) / 30) + 1
    : 1;
  const fromPageParam = Number.parseInt(searchParams.get("fromPage") ?? "", 10);
  const fromPage =
    typeof location.state === "object" &&
    location.state !== null &&
    "fromPage" in location.state &&
    typeof (location.state as { fromPage?: unknown }).fromPage === "number"
      ? (location.state as { fromPage: number }).fromPage
      : Number.isFinite(fromPageParam) && fromPageParam > 0
        ? fromPageParam
        : inferredPage;

  const [puzzle, setPuzzle] = useState<PuzzleDetail | null>(null);
  const [order, setOrder] = useState<string[]>(["/", "*", "+", "-"]);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showSolvedModal, setShowSolvedModal] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!Number.isFinite(puzzleId)) {
      setError("Bad puzzle id.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setError("");
        const data = await fetchPuzzleDetail(puzzleId);
        if (!cancelled) {
          setPuzzle(data);
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
  }, [puzzleId]);

  async function recompute(nextOrder: string[]) {
    if (!puzzle) {
      return;
    }

    try {
      setError("");
      const data = await evaluatePuzzle(puzzle.id, nextOrder);
      setResult(data.result);
    } catch (err) {
      setResult("");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    if (puzzle) {
      void recompute(order);
    }
  }, [puzzle]);

  const solved = useMemo(() => {
    return Boolean(puzzle) && result === puzzle.target;
  }, [puzzle, result]);

  useEffect(() => {
    if (puzzle && solved) {
      markPuzzleSolved(puzzle.id);
      setShowSolvedModal(true);
    }
  }, [puzzle, solved]);

  return (
    <main className="screen panel-screen">
      <BackButton fallbackTo={`/puzzles?page=${fromPage}`} useHistory={false} />

      <section className="panel">
        <h1>
          Puzzle #{puzzle?.id ?? "..."}
          {puzzle ? `: ${puzzle.title}` : ""}
        </h1>

        {error && <p className="error-message">{error}</p>}

        {puzzle && (
          <>
            <p className="expression-display">
              {prettifyExpression(puzzle.expression)}
            </p>

            <div className="result-strip">
              <div>
                <span>Target</span>
                <strong>{puzzle.target}</strong>
              </div>
              <div>
                <span>Current</span>
                <strong>{result || "-"}</strong>
              </div>
            </div>

            <div className="drag-panel">
              <p>Drag operators to set precedence. Leftmost is highest priority.</p>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  if (!over || active.id === over.id) {
                    return;
                  }

                  const oldIndex = order.indexOf(String(active.id));
                  const newIndex = order.indexOf(String(over.id));
                  const next = arrayMove(order, oldIndex, newIndex);
                  setOrder(next);
                  void recompute(next);
                }}
              >
                <SortableContext
                  items={order}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="operator-row">
                    {order.map((op) => (
                      <OperatorChip key={op} id={op} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </>
        )}
      </section>

      {showSolvedModal && puzzle && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Puzzle Solved</h2>
            <p>
              You solved Puzzle #{puzzle.id}. Nice work.
            </p>
            <button type="button" onClick={() => setShowSolvedModal(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
