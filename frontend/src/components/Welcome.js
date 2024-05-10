import React from "react";
import GoogleButton from "react-google-button";
import Carousel from "./Carousel";
//import Testimonial from "./Testimonial";
import MenuBar from "./MenuBar";
import Logo from "./Logo";
import styles from "../styles/welcome.module.css"; // Import your CSS file for styling

function Welcome() {
  async function auth() {
    const response = await fetch("/request", {
      method: "post",
    });

    const data = await response.json();
    window.location.href = data.url;
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
      <Carousel
        carouselId="allPlans"
        disableAddNew="true"
        displayTitle="true"
      />
      <Carousel
        carouselId="blogs"
        disableAddNew="true"
        customClass="blogCarousel"
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
