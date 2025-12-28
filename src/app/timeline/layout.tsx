import Footer from "@/components/landing/footer-section";
import { ReactNode } from "react";

interface TimeLayoutProps {
  children: ReactNode;
}

const TimeLayout = ({ children }: TimeLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default TimeLayout;
