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
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUser();
  }, []);
  console.log(typeof children);
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
            <Route index path="/" element={<Welcome />} exact />
            <Route path="/settings" element={<Navigate to="/" replace />} />
            <Route path="/bible" element={<Navigate to="/" replace />} />
            <Route path="/create" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    );
  }
};

/*
<UserContext.Provider value={{ user, isLoading }}>
      {user ? (
        { children }
      ) : (
        <Router>
          <Routes>
            <Route path="/">
              <Route index path="/" element={<Welcome />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      )}
    </UserContext.Provider>
*/

export default UserProvider;
