import React, { useState } from "react";
import axios from "axios";
import "../styles/biblePassageInterface.css";
import { Bible } from "../components/BibleInfo.js";

// Bible Passage Interface Component
function BiblePassageInterface() {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [data, setData] = useState("");

  const handleBookSelect = (event) => {
    const selectedBookName = event.target.value;
    setBook(selectedBookName);
    // Set the number of verses in chapter 1 of the selected book
    if (selectedBookName && Bible[selectedBookName].versesPerChapter) {
      setChapter(1);
      setVerse(1);
    }
  };

  const handleChapterSelect = (event) => {
    const selectedChapterNum = parseInt(event.target.value);
    setChapter(selectedChapterNum);
    // Set the number of verses in the selected chapter
    if (book && Bible[book].versesPerChapter) {
      setVerse(1);
    }
  };

  const handleVerseSelect = (event) => {
    const selectedVerseNum = parseInt(event.target.value);
    setVerse(selectedVerseNum);
    // Set the number of verses in the selected chapter
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!book.trim() || chapter <= 0 || verse <= 0) {
      return;
    }
    try {
      const response = await axios.get(
        `/bible?book=${book.replace(
          /\s/g,
          "%20"
        )}&chapter=${chapter}&verse=${verse}`
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
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
        <select id="verse-input-num" onChange={handleVerseSelect} value={verse}>
          {chapter &&
            [...Array(Bible[book].versesPerChapter[chapter]).keys()].map(
              (verseNum) => (
                <option key={verseNum + 1} value={verseNum + 1}>
                  {verseNum + 1}
                </option>
              )
            )}
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
