import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/settings.css"; // Import your CSS file for styling
import MenuBar from "./MenuBar";

function BibleDisplay() {
  const [data, setData] = useState(null); // State to hold the data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any error
  const { book, chapter, verse } = useParams();

  useEffect(() => {
    // Fetch data from the URL
    fetch(
      "/bible?book=" + book + "&chapter=" + chapter + (verse === "1")
        ? ""
        : "&verse=" + verse
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
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
            <p>{data.verse}</p>
          </div>
        )}
      </div>
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default BibleDisplay;
