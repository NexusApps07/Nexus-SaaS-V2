"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DynamicBranding() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Get the Repo Name from the URL (e.g., /island-dog-pet-wash)
    // On GitHub Pages, the path starts with the repo name.
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    
    // We assume the first segment is the Repo Name if we are on GitHub Pages
    const repoSlug = pathSegments.length > 0 ? pathSegments[0] : "Nexus Portal";

    // 2. Format it: "island-dog-pet-wash" -> "Island Dog Pet Wash"
    const businessName = repoSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // 3. Update the Browser Tab Title
    document.title = `${businessName} | Official Portal`;
    
  }, [pathname]);

  return null; // This component renders nothing visually
}
