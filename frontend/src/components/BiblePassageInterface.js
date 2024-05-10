import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/biblePassageInterface.module.css";
import { Bible } from "../components/BibleInfo.js";

// Bible Passage Interface Component
function BiblePassageInterface() {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const navigate = useNavigate();

  const handleBookSelect = (event) => {
    const selectedBookName = event.target.value;
    setBook(selectedBookName);
    // Set the number of verses in chapter 1 of the selected book
    if (selectedBookName && Bible[selectedBookName].versesPerChapter) {
      setChapter(1);
    }
  };

  const handleChapterSelect = (event) => {
    const selectedChapterNum = parseInt(event.target.value);
    setChapter(selectedChapterNum);
    // Set the number of verses in the selected chapter
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/bible/${book}/${chapter}`);
  };

  return (
    <form className={styles.biblePassageInterface} onSubmit={handleSubmit}>
      {/* Dropdown for selecting Bible book */}
      <div className={styles.bibleDropdown}>
        <label htmlFor={styles.bookDropdown}>Book</label>
        <select
          id={styles.bookDropdown}
          onChange={handleBookSelect}
          value={book}
        >
          <option value="">Select a Book</option>
          {Object.keys(Bible).map((bookName) => (
            <option key={bookName} value={bookName}>
              {bookName}
            </option>
          ))}
        </select>
      </div>
      {/* Input boxes for entering chapter and verse */}
      <div className={styles.chapterInput}>
        <label htmlFor={styles.chapterInput}>Chap.</label>
        <select
          id={styles.chapterInputNumber}
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
      {/* Button for opening Bible browser */}
      <button className={styles.browseButton}>
        <i className="fa-solid fa-circle-arrow-right"></i>
      </button>
    </form>
  );
}

export default BiblePassageInterface;
