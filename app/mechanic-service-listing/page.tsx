import React from "react";
import MechanicServiceListingsScreen from "../../modules/services/components/blocks/servicesContainer";
import { ServicesSearchProvider } from "@/modules/services/contexts/servicesSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xidmətlər | AvtoFix",
  description: "Ustaların paylaşdığı xidmətlər",
};

export default function MechanicServiceListingsPage() {
  return (
    <ServicesSearchProvider>
      <MechanicServiceListingsScreen />
    </ServicesSearchProvider>
  );
}
