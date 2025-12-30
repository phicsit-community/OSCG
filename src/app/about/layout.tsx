import Footer from "@/components/landing/footer-section";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer/>
    </div>
  );
};

export default AboutLayout;
