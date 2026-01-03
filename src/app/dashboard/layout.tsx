const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D6B2]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4FD1D0]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
