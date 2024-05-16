import React from "react";
import GoogleButton from "react-google-button";
import DisplayCarousel from "../components/DisplayCarousel";
//import Testimonial from "./Testimonial";
import MenuBar from "../components/MenuBar";
import Logo from "../components/Logo";
import styles from "../styles/welcome.module.css"; // Import your CSS file for styling

function Welcome() {
  async function auth() {
    window.open("http://localhost:5000/oauth/google", "_self");
  }

  return (
    <div className={styles.container}>
      <Logo size="50px" position="topRight"></Logo>
      <h1 className={styles.title}>Nurture Your Faith</h1>
      <h2 className={styles.subtitle}>Read the Bible with Friends</h2>
      <div className={styles.googleButton}>
        <GoogleButton
          label="Continue with Google"
          type="light"
          onClick={() => auth()}
        />
      </div>
      <h2 className={styles.plansTitle}>Over 100 reading plans</h2>
      <DisplayCarousel
        carouselId="allPlans"
        disableAddNew="true"
        displayTitle="true"
        key="allPlans"
      />
      <DisplayCarousel
        carouselId="blogs"
        disableAddNew="true"
        customClass="blogCarousel"
        key="blogs"
      />
      <div className={styles.siteInfo}>
        <p>Over 100 reading plans.</p>
        <p>Group study tools.</p>
        <p>A real way to deepen your faith and encounter the Divine.</p>
      </div>
      <div className={styles.googleButton} style={{ paddingBottom: "50vh" }}>
        <GoogleButton
          label="Continue with Google"
          type="light"
          onClick={() => auth()}
        />
      </div>

      <MenuBar linksToShow={{ signIn: true, blog: true }} />
    </div>
  );
}

export default Welcome;
