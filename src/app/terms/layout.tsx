import Navigation from "@/components/landing/navigation";
import React from "react";

const Terms = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />

      {children}
    </div>
  );
};

export default Terms;
