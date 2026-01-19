import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.puzzle.deleteMany();
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='Puzzle';`);

  await prisma.puzzle.createMany({
    data: [
      { title: "Warm-up 1", expr: "5+20/5*3", targetNum: 15, targetDen: 1 },
      { title: "Warm-up 2", expr: "20-5-3", targetNum: 18, targetDen: 1 },
      { title: "Warm-up 3", expr: "8/3*9+6-2", targetNum: 38, targetDen: 1 },
    ],
  });

  console.log("Seeded puzzles.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
