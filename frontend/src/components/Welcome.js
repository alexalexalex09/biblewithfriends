import React from "react";
import GoogleButton from "react-google-button";

function Welcome() {
  async function auth() {
    const response = await fetch("/request", {
      method: "post",
    });

    const data = await response.json();
    console.log(data);
    window.location.href = data.url;
  }

  return <GoogleButton onClick={() => auth()} />;
}

export default Welcome;
