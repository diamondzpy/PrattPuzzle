"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Row = { id: number; title: string };

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function isRowArray(data: unknown): data is Array<{ id: unknown; title: unknown }> {
  return (
    Array.isArray(data) &&
    data.every(
      (x) =>
        typeof x === "object" &&
        x !== null &&
        "id" in x &&
        "title" in x
    )
  );
}

export default function PuzzleListPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/puzzles");
        if (!res.ok) throw new Error(await res.text());

        const data: unknown = await res.json();
        if (!isRowArray(data)) throw new Error("API returned unexpected shape");

        const parsed: Row[] = data.map((x) => ({
          id: Number(x.id),
          title: String(x.title ?? ""),
        }));

        setRows(parsed);
      } catch (e: unknown) {
        setErr(errMsg(e));
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Puzzles</h1>
          <Link href="/" className="text-sm underline">
            Home
          </Link>
        </div>

        {err && <p className="mt-4 text-red-600">{err}</p>}

        <div className="mt-4 grid gap-3">
          {rows.map((p) => (
            <Link
              key={p.id}
              href={`/puzzles/${p.id}`}
              className="rounded-2xl border bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <div className="font-semibold">
                #{p.id} — {p.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}