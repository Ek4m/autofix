import React from "react";
import MechanicServiceListingsScreen from "../../modules/services/components/blocks/servicesContainer";
import { ServicesSearchProvider } from "@/modules/services/contexts/servicesSearch";

export default function MechanicServiceListingsPage() {
  return (
    <ServicesSearchProvider>
      <MechanicServiceListingsScreen />
    </ServicesSearchProvider>
  );
}
