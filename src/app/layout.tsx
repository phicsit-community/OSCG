import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/smooth-scroll";
import GlobalBackground from "@/components/global-background";
import Navigation from "@/components/landing/navigation";
import ScrollToTop from "@/components/scroll-to-top";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osconnect.org"),

  title: {
    default: "Open Source Connect Global",
    template: "%s | Open Source Connect Global",
  },

  description:
    "Open Source Connect Global 2026 is an international event connecting innovators, developers, mentors, universities, startups, and organizations worldwide.",

  keywords: [
    "Open Source",
    "Developer Conference",
    "Global Tech Event",
    "Hackathon",
    "Open Source Connect",
    "OSCG 2026",
    "OSCG",
    "osconnect",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo.png",
  },


  openGraph: {
    title: "Open Source Connect Global 2026",
    description:
      "Open Source Connect Global 2026 is an international event connecting innovators, developers, mentors, universities, startups, and organizations worldwide.",
    url: "https://osconnect.org",
    siteName: "Open Source Connect Global",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "Open Source Connect Global 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Open Source Connect Global 2026",
    description:
      "Open Source Connect Global 2026 is an international event connecting innovators, developers, mentors, universities, startups, and organizations worldwide.",
    images: ["/OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL!} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <GlobalBackground />
        <Navigation />
        <ScrollToTop />
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
