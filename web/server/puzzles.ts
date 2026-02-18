export type PuzzleRecord = {
  id: number;
  title: string;
  expression: string;
  solutionOrder: string;
};

type ManualPuzzle = Omit<PuzzleRecord, "id">;

const MANUAL_PUZZLES: ManualPuzzle[] = [
  { title: "Warmup 1", expression: "5+20/5*3", solutionOrder: "*,/,+,-" },
  { title: "Warmup 2", expression: "2*20-5-3", solutionOrder: "+,-,*,/" },
  { title: "Warmup 3", expression: "8/3*9+6-2", solutionOrder: "-,+,/,*" },
  { title: "Bridge 1", expression: "7+8*6/3-4", solutionOrder: "+,*,/,-" },
  { title: "Bridge 2", expression: "9+4*8/2-5", solutionOrder: "*,+,-,/" },
  { title: "Bridge 3", expression: "6+12/3*5-7", solutionOrder: "-,*,+,/" },
  { title: "Twist 1", expression: "4+18/6*7-3", solutionOrder: "+,/,*,-" },
  { title: "Twist 2", expression: "3+14*5/7-2", solutionOrder: "*,+,/,-" },
  { title: "Twist 3", expression: "8+10*9/6-1", solutionOrder: "-,+,*,/" },
  { title: "Twist 4", expression: "2+16/4*11-9", solutionOrder: "+,*,-,/" },
  { title: "Tower 1", expression: "5+24/8*9-6", solutionOrder: "*,/,-,+" },
  { title: "Tower 2", expression: "7+15*6/5-4", solutionOrder: "/,*,+,-" },
  { title: "Tower 3", expression: "9+18/3*4-8", solutionOrder: "+,/,-,*" },
  { title: "Tower 4", expression: "6+20*3/4-5", solutionOrder: "-,*,/,+" },
  { title: "Tower 5", expression: "8+22/11*7-6", solutionOrder: "+,*,-,/" },
  { title: "Drift 1", expression: "5+9*12/4-3", solutionOrder: "*,+,/,-" },
  { title: "Drift 2", expression: "7+21/7*8-2", solutionOrder: "+,/,*,-" },
  { title: "Drift 3", expression: "4+16*5/8-1", solutionOrder: "-,+,/,*" },
  { title: "Drift 4", expression: "3+27/9*6-4", solutionOrder: "+,*,-,/" },
  { title: "Drift 5", expression: "2+14*10/5-7", solutionOrder: "*,/,+,-" },
  { title: "Orbit 1", expression: "9+12/6*11-8", solutionOrder: "-,+,*,/" },
  { title: "Orbit 2", expression: "8+28/7*5-6", solutionOrder: "+,/,-,*" },
  { title: "Orbit 3", expression: "6+25*4/10-2", solutionOrder: "*,+,-,/" },
  { title: "Orbit 4", expression: "7+18/3*9-5", solutionOrder: "-,*,+,/" },
  { title: "Orbit 5", expression: "5+30/6*7-9", solutionOrder: "+,*,-,/" },
  { title: "Finale 1", expression: "4+32/8*9-6", solutionOrder: "*,/,+,-" },
  { title: "Finale 2", expression: "3+24*5/6-7", solutionOrder: "+,/,*,-" },
  { title: "Finale 3", expression: "2+36/9*8-4", solutionOrder: "-,+,/,*" },
  { title: "Finale 4", expression: "9+14*12/7-3", solutionOrder: "*,+,-,/" },
  { title: "Finale 5", expression: "8+40/10*6-5", solutionOrder: "+,*,-,/" }
];

export const PUZZLES: PuzzleRecord[] = MANUAL_PUZZLES.map((puzzle, index) => ({
  id: index + 1,
  ...puzzle
}));
