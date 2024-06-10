import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/bibleDisplay.module.css"; // Import your CSS file for styling
import MenuBar from "./MenuBar";

function BibleDisplay() {
  const [data, setData] = useState(null); // State to hold the data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any error
  const { book, chapter } = useParams();

  const bibleFormat = (data) => {
    // Split the text into individual verses
    const verses = data.bibleText.split(/\n+(?=\d{1,3})/).filter(Boolean);
    // Map each verse to an object with verseRef and text
    console.log({ verses });
    let parsedVerses = verses.map((verse) => {
      // Extract the verse reference and verse text
      const [verseRef, verseText] = verse.trim().split(/([a-zA-Z].+)/);
      return { verseRef: parseInt(verseRef), text: verseText };
    });
    parsedVerses[0].verseRef = 1;
    console.log(parsedVerses[0]);
    return { title: data.title, parsedVerses: parsedVerses };
  };

  useEffect(() => {
    // Fetch data from the URL
    if (!book.trim() || chapter <= 0) {
      return;
    }
    try {
      const fetchData = async () => {
        const response = await axios.get(
          process.env.REACT_APP_PROXY_URL +
            `/bible?book=${book.replace(/\s/g, "%20")}&chapter=${chapter}`
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
    <div className={styles.bibleDisplayContainer}>
      {data && (
        <div className={styles.bibleTextContainer}>
          <h2>{data.title}</h2>
          <div className={styles.bibleText}>
            {data.parsedVerses.map(({ verseRef, text }) => (
              <>
                <sup key={verseRef}>{verseRef}</sup>
                <span key={"text" + verseRef}>{text}</span>
              </>
            ))}
          </div>
        </div>
      )}
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default BibleDisplay;
