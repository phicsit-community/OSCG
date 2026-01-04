import Footer from "@/components/landing/footer-section";

const SpeakersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer/>
    </div>
  );
};

export default SpeakersLayout;
