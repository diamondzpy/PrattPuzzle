export type PuzzleRecord = {
  id: number;
  title: string;
  expression: string;
  solutionOrder: string;
  defaultOrder: string;
};

type ManualPuzzle = Omit<PuzzleRecord, "id">;

const MANUAL_PUZZLES: ManualPuzzle[] = [
  { title: "Sunrise Switch", expression: "30/27*37-19+10", solutionOrder: "-,/,*,+", defaultOrder: "*,/,+,-" },
  { title: "River Riddle", expression: "3-3*19/32+18", solutionOrder: "+,/,-,*", defaultOrder: "*,/,+,-" },
  { title: "Clocktower Twist", expression: "18*36-28/10+5", solutionOrder: "*,-,/,+", defaultOrder: "*,/,+,-" },
  { title: "Lantern Logic", expression: "21/21*35+15-20", solutionOrder: "+,-,/,*", defaultOrder: "*,/,+,-" },
  { title: "Copper Cascade", expression: "24*5-10+2/6", solutionOrder: "+,-,*,/", defaultOrder: "*,/,+,-" },
  { title: "Mosaic March", expression: "34-2/7+18*7", solutionOrder: "-,/,+,*", defaultOrder: "*,/,+,-" },
  { title: "Comet Crossing", expression: "34+38/3*39-16", solutionOrder: "+,/,*,-", defaultOrder: "*,/,+,-" },
  { title: "Bamboo Balance", expression: "31*33+26/6-32", solutionOrder: "-,*,/,+", defaultOrder: "*,/,+,-" },
  { title: "Cinder Circuit", expression: "34+30-19*26*15/15", solutionOrder: "-,+,*,/", defaultOrder: "*,/,+,-" },
  { title: "Harbor Hinge", expression: "27+26/39*6+25-29", solutionOrder: "/,-,*,+", defaultOrder: "*,/,+,-" },

  { title: "Mirror Maze", expression: "18+18/27*17-21+32", solutionOrder: "/,+,-,*", defaultOrder: "*,/,+,-" },
  { title: "Echo Engine", expression: "17/17*11-20+39-14", solutionOrder: "-,+,/,*", defaultOrder: "*,/,+,-" },
  { title: "Pine Path", expression: "25+14/27+27-15*2", solutionOrder: "+,-,/,*", defaultOrder: "*,/,+,-" },
  { title: "Dune Dial", expression: "40*17+26-36*32/32", solutionOrder: "+,*,/,-", defaultOrder: "*,/,+,-" },
  { title: "Glass Galleon", expression: "25*15+21/18-29-36", solutionOrder: "*,+,/,-", defaultOrder: "*,/,+,-" },

  { title: "Forge Frenzy", expression: "14+18*8/12*8-14", solutionOrder: "/,-,+,*", defaultOrder: "*,/,+,-" },
  { title: "Quartz Quest", expression: "35*37+15*20*29*23/29", solutionOrder: "+,*,-,/", defaultOrder: "*,/,+,-" },
  { title: "Nimbus Node", expression: "6/2+26+40/39-11-32", solutionOrder: "-,*,/,+", defaultOrder: "*,/,+,-" },
  { title: "Coral Cipher", expression: "24/23-20*33-7-2*28", solutionOrder: "-,+,/,*", defaultOrder: "*,/,+,-" },
  { title: "Avalanche Arc", expression: "17*7+16+13+12-8*21", solutionOrder: "-,*,+,/", defaultOrder: "*,/,+,-" },

  { title: "Midnight Matrix", expression: "5*2-39+22*11+17+24", solutionOrder: "*,/,-,+", defaultOrder: "*,/,+,-" },
  { title: "Paradox Pier", expression: "39-16+28-21-27*33/3", solutionOrder: "/,*,-,+", defaultOrder: "*,/,+,-" },
  { title: "Signal Summit", expression: "26+7*13*16-22+14*8", solutionOrder: "/,+,*,-", defaultOrder: "*,/,+,-" },
  { title: "Prism Pulse", expression: "33-32*17*17-2-34-30", solutionOrder: "/,-,+,*", defaultOrder: "*,/,+,-" },
  { title: "Orbit Oracle", expression: "24*33+4+40-24*8*24-37", solutionOrder: "-,+,*,/", defaultOrder: "*,/,+,-" },

  { title: "Dragon Drift", expression: "21*12+39-6+11-21*21*18", solutionOrder: "*,-,+,/", defaultOrder: "*,/,+,-" },
  { title: "Titan Tangle", expression: "40-5*7+6*38+23-10*2", solutionOrder: "*,-,/,+", defaultOrder: "*,/,+,-" },
  { title: "Phoenix Pivot", expression: "9+35*24-33+6*24*15+16", solutionOrder: "+,*,-,/", defaultOrder: "*,/,+,-" },
  { title: "Nebula Knot", expression: "18-18-32+24*35-39-32*38", solutionOrder: "-,*,+,/", defaultOrder: "*,/,+,-" },
  { title: "Final Frontier", expression: "28-29-40*18+24-17*26+39", solutionOrder: "/,+,*,-", defaultOrder: "*,/,+,-" }
];

export const PUZZLES: PuzzleRecord[] = MANUAL_PUZZLES.map((puzzle, index) => ({
  id: index + 1,
  ...puzzle
}));
