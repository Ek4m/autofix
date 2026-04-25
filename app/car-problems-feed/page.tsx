import React from "react";
import Topbar from "@/components/Topbar";
import HomeMain from "@/modules/problems/components/blocks/home";

export default function CarProblemsFeedPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Topbar />
      <HomeMain />
    </div>
  );
}
