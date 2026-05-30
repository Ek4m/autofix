import React from "react";

import HomeMain from "@/modules/problems/components/blocks/home";
import { HomeSearchProvider } from "@/modules/problems/contexts/homeSearch";

export default function CarProblemsFeedPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <HomeSearchProvider>
        <HomeMain />
      </HomeSearchProvider>
    </div>
  );
}
