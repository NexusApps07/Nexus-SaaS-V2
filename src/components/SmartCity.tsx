"use client";

import { useState, useEffect } from "react";

export default function SmartCity() {
  const [city, setCity] = useState("Premium Experience");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Get the Repo Name (slug)
    const path = window.location.pathname;
    const slug = path.split("/").filter(Boolean)[0];

    if (slug) {
      // 2. Fetch the Repo Description from GitHub API
      // We use the public API to read the description set by n8n
      fetch(`https://api.github.com/repos/NexusApps07/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          // 3. Parse the description
          // Format expected from n8n: "Business Name | City | Phone"
          if (data.description) {
            const parts = data.description.split("|");
            // If there is a second part (City), use it
            if (parts.length >= 2) {
              setCity(parts[1].trim().toUpperCase());
            }
          }
        })
        .catch((err) => console.log("Could not fetch city:", err));
    }
  }, []);

  return <span>{city}</span>;
}
