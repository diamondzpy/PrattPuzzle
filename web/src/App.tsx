import { Navigate, Route, Routes } from "react-router-dom";

import { HomeScreen } from "./screens/HomeScreen";
import { HowToPlayScreen } from "./screens/HowToPlayScreen";
import { PuzzleSelectScreen } from "./screens/PuzzleSelectScreen";
import { PuzzleScreen } from "./screens/PuzzleScreen";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/how-to-play" element={<HowToPlayScreen />} />
      <Route path="/puzzles" element={<PuzzleSelectScreen />} />
      <Route path="/puzzles/:id" element={<PuzzleScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
