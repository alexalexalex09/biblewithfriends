import React from "react";
import "../styles/home.css"; // Import your CSS file for styling
import InspirationalImage from "./InspirationalImage";
import MyPlansCarousel from "./MyPlansCarousel";
import BiblePassageInterface from "./BiblePassageInterface";
import MenuBar from "./MenuBar";

// Main App Component
function HomePage() {
  return (
    <div className="home">
      <InspirationalImage />
      <div className="my-plans">
        <h2 className="carousel-title">My Plans</h2>
        <MyPlansCarousel />
      </div>

      <div className="home-bible-passage-interface">
        <h2 className="bible-passage-interface-title">Bible</h2>
        <BiblePassageInterface />
      </div>
      <MenuBar linksToShow={{ home: false, newPlan: true, account: true }} />
    </div>
  );
}

export default HomePage;
