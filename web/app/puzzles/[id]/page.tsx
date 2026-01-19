"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Puzzle = {
  id: number;
  title: string;
  expr: string;
  targetNum: number;
  targetDen: number;
};

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function formatTarget(p: Puzzle) {
  return p.targetDen === 1 ? String(p.targetNum) : `${p.targetNum}/${p.targetDen}`;
}

function Chip({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="select-none cursor-grab active:cursor-grabbing rounded-xl border bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-4 py-2 font-semibold shadow-sm"
    >
      {id}
    </div>
  );
}

export default function PuzzlePage() {
  const params = useParams<{ id: string }>();
  const idStr = params?.id;
  const puzzleId = typeof idStr === "string" ? Number.parseInt(idStr, 10) : NaN;

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [result, setResult] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [order, setOrder] = useState<string[]>(["/", "*", "+", "-"]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!Number.isFinite(puzzleId)) {
      setErr("Bad id");
      return;
    }

    (async () => {
      try {
        setErr("");
        const res = await fetch(`/api/puzzles/${puzzleId}`);
        if (!res.ok) throw new Error(await res.text());
        setPuzzle(await res.json());
      } catch (e: unknown) {
        setErr(errMsg(e));
      }
    })();
  }, [puzzleId]);

  async function recompute(nextOrder: string[]) {
    if (!puzzle) return;
    try {
      setErr("");
      const res = await fetch("/api/eval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ puzzleId: puzzle.id, order: nextOrder }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(String(data.result));
    } catch (e: unknown) {
      setErr(errMsg(e));
    }
  }

  useEffect(() => {
    if (puzzle) recompute(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  const target = puzzle ? formatTarget(puzzle) : "";
  const solved = puzzle && result === target;

  return (
    <main className="min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            #{puzzle?.id ?? "?"} — {puzzle?.title ?? "Loading…"}
          </h1>
          <Link href="/puzzles" className="text-sm underline">
            Back
          </Link>
        </div>

        {err && <p className="mt-4 text-red-600">{err}</p>}

        {puzzle && (
          <div className="mt-6 rounded-2xl border bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-6">
            <div className="text-4xl font-bold tracking-tight">{puzzle.expr}</div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border p-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">Target</div>
                <div className="text-2xl font-bold">{target}</div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">Current</div>
                <div className="text-2xl font-bold">{result || "—"}</div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">Status</div>
                <div className="text-2xl font-bold">{solved ? "✅ Solved" : "…"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                Precedence (left = highest). Drag to reorder:
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => {
                  const { active, over } = e;
                  if (!over || active.id === over.id) return;

                  const oldIndex = order.indexOf(String(active.id));
                  const newIndex = order.indexOf(String(over.id));
                  const next = arrayMove(order, oldIndex, newIndex);

                  setOrder(next);
                  recompute(next);
                }}
              >
                <SortableContext
                  items={order}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-3">
                    {order.map((x) => (
                      <Chip key={x} id={x} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Current order: <span className="font-mono">{order.join(" > ")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}