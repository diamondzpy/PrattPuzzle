export type PuzzleRecord = {
  id: number;
  title: string;
  expression: string;
  solutionOrder: string;
};

const ORDERS = ["/,*,+,-", "*,/,+,-", "+,-,*,/", "-,+,/,*"];

function generateExpression(index: number): string {
  const a = 2 + (index % 7);
  const b = 3 + ((index * 2) % 6);
  const c = 4 + ((index * 3) % 5);
  const d = 2 + ((index * 5) % 7);
  const e = 1 + ((index * 7) % 8);
  return `${a}+${b}*${c}/${d}-${e}`;
}

export const PUZZLES: PuzzleRecord[] = Array.from({ length: 120 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `Challenge ${id}`,
    expression: generateExpression(id),
    solutionOrder: ORDERS[i % ORDERS.length]
  };
});
