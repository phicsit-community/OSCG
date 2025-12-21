import Navigation from "@/components/landing/navigation";
import React from "react";

const mediaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />

      {children}
    </div>
  );
};

export default mediaLayout;
