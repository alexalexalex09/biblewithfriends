import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "../pages/Welcome";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      fetch(process.env.REACT_APP_PROXY_URL + "/oauth/user", {
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
          setIsLoading(false);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
