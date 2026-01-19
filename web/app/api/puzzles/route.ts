import { prisma } from "@/lib/prisma";

export async function GET() {
  const puzzles = await prisma.puzzle.findMany({
    orderBy: { id: "asc" },
    select: { id: true, title: true },
  });

  return Response.json(puzzles);
}
