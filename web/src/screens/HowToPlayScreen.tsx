import { BackButton } from "../components/BackButton";

export function HowToPlayScreen() {
  return (
    <main className="screen panel-screen">
      <BackButton fallbackTo="/" />
      <section className="panel">
        <h1>How to play</h1>
        <div className="instructions-placeholder">
          <p>Replace this with your game instructions.</p>
          <p>Suggested structure:</p>
          <ul>
            <li>Goal of each puzzle</li>
            <li>How drag-and-drop precedence works</li>
            <li>How solving is detected</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
