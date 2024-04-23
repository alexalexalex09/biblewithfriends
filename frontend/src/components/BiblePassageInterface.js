import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/biblePassageInterface.css";
import { Bible } from "../components/BibleInfo.js";

// Bible Passage Interface Component
function BiblePassageInterface() {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(0);
  const navigate = useNavigate();

  const handleBookSelect = (event) => {
    const selectedBookName = event.target.value;
    setBook(selectedBookName);
    // Set the number of verses in chapter 1 of the selected book
    if (selectedBookName && Bible[selectedBookName].versesPerChapter) {
      setVerse(Bible[selectedBookName].versesPerChapter[0]);
    }
  };

  const handleChapterSelect = (event) => {
    const selectedChapterNum = parseInt(event.target.value);
    setChapter(selectedChapterNum);
    // Set the number of verses in the selected chapter
    if (book && Bible[book].versesPerChapter) {
      setVerse(Bible[book].versesPerChapter[selectedChapterNum - 1]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!book.trim() || chapter <= 0 || verse <= 0) {
      return;
    }
    navigate(
      `/bible/${book.toLowerCase().replace(/\s/g, "")}/${chapter}/${verse}`
    );
  };

  return (
    <form className="bible-passage-interface" onSubmit={handleSubmit}>
      {/* Dropdown for selecting Bible book */}
      <div className="bible-dropdown">
        <label htmlFor="book-dropdown">Book</label>
        <select id="book-dropdown" onChange={handleBookSelect} value={book}>
          <option value="">Select a Book</option>
          {Object.keys(Bible).map((bookName) => (
            <option key={bookName} value={bookName}>
              {bookName}
            </option>
          ))}
        </select>
      </div>
      {/* Input boxes for entering chapter and verse */}
      <div className="chapter-input">
        <label htmlFor="chapter-input">Chap.</label>
        <select
          id="chapter-input-number"
          onChange={handleChapterSelect}
          value={chapter}
        >
          {book &&
            Bible[book].versesPerChapter &&
            [...Array(Bible[book].chapters).keys()].map((chapterNum) => (
              <option key={chapterNum + 1} value={chapterNum + 1}>
                {chapterNum + 1}
              </option>
            ))}
        </select>
      </div>
      <div className="verse-input">
        <label htmlFor="verse-input">Verse</label>
        <select id="verse-input-num">
          {[...Array(verse).keys()].map((verseNum) => (
            <option key={verseNum + 1} value={verseNum + 1}>
              {verseNum + 1}
            </option>
          ))}
        </select>
      </div>
      {/* Button for opening Bible browser */}
      <button className="browse-button">
        <i className="fa-solid fa-circle-arrow-right"></i>
      </button>
    </form>
  );
}

export default BiblePassageInterface;
