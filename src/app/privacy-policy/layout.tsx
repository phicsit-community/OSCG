import Navigation from "@/components/landing/navigation";
import React from "react";

const Privacy = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />

      {children}
    </div>
  );
};

export default Privacy;
