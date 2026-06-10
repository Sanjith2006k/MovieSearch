import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <h2>Movie Search</h2>

        <button
          type="button"
          className="nav-help-btn"
          onClick={() => setIsHelpOpen((prev) => !prev)}
          aria-expanded={isHelpOpen}
          aria-controls="nav-help-panel"
        >
          {isHelpOpen ? "Hide Help" : "How It Works"}
        </button>
      </nav>

      {isHelpOpen && (
        <div id="nav-help-panel" className="nav-help-panel">
          Type a movie name in the search box, then click a card to open full details.
        </div>
      )}
    </header>
  );
}

export default Navbar;