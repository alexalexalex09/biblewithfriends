import React from "react";
import "../styles/home.css"; // Import your CSS file for styling
import InspirationalImage from "./InspirationalImage";
import MyPlansCarousel from "./MyPlansCarousel";
import BiblePassageInterface from "./BiblePassageInterface";
import MenuBar from "./MenuBar";

// Main App Component
const HomePage = () => {
  return (
    <div className="home">
      HomePage
      <InspirationalImage />
      <MyPlansCarousel />
      <BiblePassageInterface />
      <MenuBar linksToShow={{ home: false, newPlan: true, account: true }} />
    </div>
  );
};

export default HomePage;
