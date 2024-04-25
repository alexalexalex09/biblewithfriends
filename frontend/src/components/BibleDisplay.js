import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/settings.css"; // Import your CSS file for styling
import MenuBar from "./MenuBar";

function BibleDisplay() {
  const [data, setData] = useState(null); // State to hold the data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any error
  const { book, chapter, verse } = useParams();

  const bibleFormat = (data) => {
    // Split the text into individual verses
    const verses = data.bibleText.split(/\n+(?=\d{1,3})/).filter(Boolean);
    console.log(verses);
    // Map each verse to an object with verseRef and text
    const parsedVerses = verses.map((verse) => {
      // Extract the verse reference and verse text
      const [verseRef, verseText] = verse.trim().split(/\s(.+)/);
      return { verseRef: parseInt(verseRef), text: verseText };
    });
    return { title: data.title, parsedVerses: parsedVerses };
  };

  useEffect(() => {
    // Fetch data from the URL
    if (!book.trim() || chapter <= 0 || verse <= 0) {
      return;
    }
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `/bible?book=${book.replace(
            /\s/g,
            "%20"
          )}&chapter=${chapter}&verse=${verse}`
        );
        const formattedData = bibleFormat(response.data);
        setData(formattedData);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setError(error);
    }
    //eslint-disable-next-line
  }, []); // Empty dependency array to ensure useEffect only runs once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="biblePassage">
        {data && (
          <div>
            <h2>{data.title}</h2>
            <div>
              {data.parsedVerses.map(({ verseRef, text }) => (
                <>
                  <sup key={verseRef}>{verseRef}</sup>
                  <span>{text}</span>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default BibleDisplay;
