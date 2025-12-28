import React, { useEffect } from "react";
import "./App.css";
import { Router } from "./Router";
import { adminStore } from "./Store/Store";

function App() {
  const { darkmode } = adminStore();

  useEffect(() => {
    if (darkmode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  
  return (
    <div className={`${darkmode === "dark" ? "dark" : "light"}`}>
      <Router />
    </div>
  );
}

export default App;
