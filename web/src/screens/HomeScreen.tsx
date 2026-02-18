import { useNavigate } from "react-router-dom";

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <main className="screen home-screen">
      <div className="home-content">
        <h1 className="brand-title">Pratt Puzzle</h1>
        <p className="lead">
          Solve expression puzzles by dragging operators into a new precedence
          order.
        </p>

        <div className="menu-buttons">
          <button type="button" onClick={() => navigate("/puzzles")}>
            Start
          </button>
          <button type="button" onClick={() => navigate("/how-to-play")}>
            How to play
          </button>
        </div>
      </div>
    </main>
  );
}
