import React from "react";
import { Link } from "react-router-dom";

// Bible Passage Interface Component
function BiblePassageInterface() {
  return (
    <div className="bible-passage-interface">
      {/* Dropdown for selecting Bible book */}
      <div className="bible-dropdown">
        <label htmlFor="book-dropdown">Select Book:</label>
        <select id="book-dropdown">
          {/* Options for selecting Bible book */}
          {/* Example:
            <option value="Genesis">Genesis</option> */}
        </select>
      </div>
      {/* Input boxes for entering chapter and verse */}
      <div className="chapter-verse-inputs">
        <label htmlFor="chapter-input">Chapter:</label>
        <input type="number" id="chapter-input" />
        <label htmlFor="verse-input">Verse:</label>
        <input type="number" id="verse-input" />
      </div>
      {/* Button for opening Bible browser */}
      <button className="browse-button">
        <img src="arrow-icon.png" alt="Browse Icon" />
      </button>
    </div>
  );
}

export default BiblePassageInterface;
