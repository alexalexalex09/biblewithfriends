import React, { useState } from "react";

async function Authenticator({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const user = await fetch("/oauth/user", {
    method: "GET",
    credentials: "include", // necessary for cookies to be sent along with the request if using sessions
  });

  if (user) {
    return (
      <UserContext.Provider value={{ user, isLoading }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default Authenticator;
