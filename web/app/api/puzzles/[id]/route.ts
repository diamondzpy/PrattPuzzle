import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;

  const id = Number.parseInt(idStr, 10);
  if (Number.isNaN(id)) return new Response("Bad id", { status: 400 });

  const puzzle = await prisma.puzzle.findUnique({ where: { id } });
  if (!puzzle) return new Response("Not found", { status: 404 });

  return Response.json(puzzle);
}
