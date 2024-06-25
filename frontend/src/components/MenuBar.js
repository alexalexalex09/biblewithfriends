import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/menuBar.module.css";
import { UserContext } from "../components/UserContext";

function MenuBar({ linksToShow }) {
  const { user } = useContext(UserContext);
  async function auth() {
    window.open(process.env.REACT_APP_PROXY_URL + "/oauth/google", "_self");
  }
  return (
    <div className={styles.menuBar}>
      {linksToShow.blog && (
        <div
          className={styles.menuItem}
          id={styles.menuHome}
          style={{ gridArea: "left" }}
        >
          {/* Insert your home icon here */}
          <Link to="/blog">
            <i className="fa-solid fa-newspaper"></i>
            <span>Blog</span>
          </Link>
        </div>
      )}
      {linksToShow.home && (
        <div
          className={styles.menuItem}
          id={styles.menuHome}
          style={{ gridArea: "left" }}
        >
          {/* Insert your home icon here */}
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
        </div>
      )}
      {linksToShow.newPlan && (
        <div
          className={styles.menuItem}
          id={styles.menuNewPlan}
          style={{ gridArea: "center" }}
        >
          <i className="fa-solid fa-book-medical"></i>
        </div>
      )}
      {linksToShow.account && (
        <div
          className={styles.menuItem}
          id={styles.menuAccount}
          style={{ gridArea: "right" }}
        >
          <Link to="/settings">
            <span>Account</span>
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      )}
      {linksToShow.signIn &&
        (user ? (
          <div
            className={styles.menuItem}
            id={styles.menuAccount}
            style={{ gridArea: "right" }}
          >
            <Link to="/home">
              <span>Dashboard</span>
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        ) : (
          <div
            className={styles.menuItem}
            id={styles.menuAccount}
            style={{ gridArea: "right" }}
            onClick={auth}
          >
            <span>Sign in</span>
            <i className="fa-solid fa-user"></i>
          </div>
        ))}
    </div>
  );
}

export default MenuBar;
