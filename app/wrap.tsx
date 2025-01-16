"use client";

import React, { useEffect } from "react";

export default function Wrap({ children }: { children: JSX.Element }) {
  useEffect(() => {
    let scrollTimeout: any;

    const handleScroll = () => {
      // Hide cursor by modifying body style
      document.body.style.cursor = "none";

      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Reinstate cursor after scrolling stops
      scrollTimeout = setTimeout(() => {
        document.body.style.cursor = "auto";
      }, 200); // Adjust delay as needed
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener and timeout
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
  return <div>{children}</div>;
}
