import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      fetch("/oauth/user", {
        method: "GET",
        credentials: "include", // necessary for cookies to be sent along with the request if using sessions
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Not logged in, homepage rendered");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUser();
  }, []);
  if (user) {
    return (
      <UserContext.Provider value={{ user, isLoading }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/">
            <Route index path="/" element={<Welcome />} />
          </Route>
        </Routes>
      </Router>
    );
  }
};

export default UserProvider;
