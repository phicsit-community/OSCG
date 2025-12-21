import Footer from "@/components/landing/footer-section";
import Navigation from "@/components/landing/navigation";
import React from "react";

const Terms = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />

      {children}
      <Footer/>
    </div>
  );
};

export default Terms;
