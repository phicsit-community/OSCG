import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner";
import SmoothScroll from "@/components/smooth-scroll";
import GlobalBackground from "@/components/global-background";
import SmoothCursor from "@/components/smooth-cursor";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Source Connect Global",
  description: "Website for Open Source Connect Global",
  icons: {
    icon: "/logo1.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className={`${roboto.className} cursor-none`}>
        <GlobalBackground />
        <SmoothCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
