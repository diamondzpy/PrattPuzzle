import { BackButton } from "../components/BackButton";

export function HowToPlayScreen() {
  return (
    <main className="screen panel-screen">
      <BackButton fallbackTo="/" />
      <section className="panel">
        <h1>How to play</h1>
        <div className="instructions-placeholder">
          <p>Mathematical expressions are usually evaluated using the rules of "BEDMAS" or "PEMDAS".</p>
          <p>In PrattPuzzle, reorder the precedence of operators by dragging and dropping them.</p>
          <p>Solve a puzzle by matching the target value through operator reordering.</p>
          <p>For example, 5 + 20 &divide; 5 &times; 3 - 2 = 15 using default evaluation order: &divide;, &times;, +, -.</p>
          <p>If the target value is 5, we can reorder the operators as +, -, &divide;, &times;, in that order.</p>
          <p>Keep in mind that the expression is still evaluated from left to right after operator precedence.</p>
          <p>Good luck and have fun!</p>
        </div>
      </section>
    </main>
  );
}
