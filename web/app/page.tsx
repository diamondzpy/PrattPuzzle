import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-8 shadow-sm">
        <h1 className="text-3xl font-bold">PrattPuzzle</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          Drag operators to change precedence and hit the target.
        </p>
        <Link
          href="/puzzles"
          className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white font-semibold hover:opacity-90"
        >
          Play
        </Link>
      </div>
    </main>
  );
}
