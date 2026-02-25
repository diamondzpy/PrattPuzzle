export type PuzzleRecord = {
  id: number;
  title: string;
  expression: string;
  solutionOrder: string;
  defaultOrder: string;
};

type ManualPuzzle = Omit<PuzzleRecord, "id">;

const MANUAL_PUZZLES: ManualPuzzle[] = [
  { title: "Warmup #1", expression: "30/27*37-19+10", solutionOrder: "-,/,*,+", defaultOrder: "*,/,+,-" },
  { title: "Warmup #2", expression: "3-3*19/32+18", solutionOrder: "+,/,-,*", defaultOrder: "*,/,+,-" },
  { title: "Warmup #3", expression: "18*36-28/10+5", solutionOrder: "*,-,/,+", defaultOrder: "*,/,+,-" },
  { title: "Warmup #4", expression: "21/21*35+15-20", solutionOrder: "+,-,/,*", defaultOrder: "*,/,+,-" },
  { title: "Warmup #5", expression: "24*5-10+2/6", solutionOrder: "+,-,*,/", defaultOrder: "*,/,+,-" },
  { title: "Warmup #6", expression: "34-2/7+18*7", solutionOrder: "-,/,+,*", defaultOrder: "*,/,+,-" },
  { title: "Warmup #7", expression: "34+38/3*39-16", solutionOrder: "+,/,*,-", defaultOrder: "*,/,+,-" },
  { title: "Warmup #8", expression: "31*33+26/6-32", solutionOrder: "-,*,/,+", defaultOrder: "*,/,+,-" },
  { title: "Warmup #9", expression: "34+30-19*26*15/15", solutionOrder: "-,+,*,/", defaultOrder: "*,/,+,-" },
  { title: "Warmup #10", expression: "27+26/39*6+25-29", solutionOrder: "/,-,*,+", defaultOrder: "*,/,+,-" },

  { title: "Practice #11", expression: "18+18/27*17-21+32", solutionOrder: "/,+,-,*", defaultOrder: "*,/,+,-" },
  { title: "Practice #12", expression: "17/17*11-20+39-14", solutionOrder: "-,+,/,*", defaultOrder: "*,/,+,-" },
  { title: "Practice #13", expression: "25+14/27+27-15*2", solutionOrder: "+,-,/,*", defaultOrder: "*,/,+,-" },
  { title: "Practice #14", expression: "40*17+26-36*32/32", solutionOrder: "+,*,/,-", defaultOrder: "*,/,+,-" },
  { title: "Practice #15", expression: "25*15+21/18-29-36", solutionOrder: "*,+,/,-", defaultOrder: "*,/,+,-" },

  { title: "Practice #16", expression: "14+18*8/12*8-14", solutionOrder: "/,-,+,*", defaultOrder: "*,/,+,-" },
  { title: "Practice #17", expression: "35*37+15*20*29*23/29", solutionOrder: "+,*,-,/", defaultOrder: "*,/,+,-" },
  { title: "Practice #18", expression: "6/2+26+40/39-11-32", solutionOrder: "-,*,/,+", defaultOrder: "*,/,+,-" },
  { title: "Practice #19", expression: "24/23-20*33-7-2*28", solutionOrder: "-,+,/,*", defaultOrder: "*,/,+,-" },
  { title: "Practice #20", expression: "17*7+16+13+12-8*21", solutionOrder: "-,*,+,/", defaultOrder: "*,/,+,-" },

  { title: "Challenge #21", expression: "5*2-39+22*11+17+24", solutionOrder: "*,/,-,+", defaultOrder: "*,/,+,-" },
  { title: "Challenge #22", expression: "39-16+28-21-27*33/3", solutionOrder: "/,*,-,+", defaultOrder: "*,/,+,-" },
  { title: "Challenge #23", expression: "26+7*13*16-22+14*8", solutionOrder: "/,+,*,-", defaultOrder: "*,/,+,-" },
  { title: "Challenge #24", expression: "33-32*17*17-2-34-30", solutionOrder: "/,-,+,*", defaultOrder: "*,/,+,-" },
  { title: "Challenge #25", expression: "24*33+4+40-24*8*24-37", solutionOrder: "-,+,*,/", defaultOrder: "*,/,+,-" },

  { title: "Challenge #26", expression: "21*12+39-6+11-21*21*18", solutionOrder: "*,-,+,/", defaultOrder: "*,/,+,-" },
  { title: "Challenge #27", expression: "40-5*7+6*38+23-10*2", solutionOrder: "*,-,/,+", defaultOrder: "*,/,+,-" },
  { title: "Challenge #28", expression: "9+35*24-33+6*24*15+16", solutionOrder: "+,*,-,/", defaultOrder: "*,/,+,-" },
  { title: "Challenge #29", expression: "18-18-32+24*35-39-32*38", solutionOrder: "-,*,+,/", defaultOrder: "*,/,+,-" },
  { title: "Challenge #30", expression: "28-29-40*18+24-17*26+39", solutionOrder: "/,+,*,-", defaultOrder: "*,/,+,-" }
];

export const PUZZLES: PuzzleRecord[] = MANUAL_PUZZLES.map((puzzle, index) => ({
  id: index + 1,
  ...puzzle
}));
