import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Instagram, Mail, Twitter, Linkedin, Github, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4FD1D0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1AD5BD]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1AD5BD]/20 to-[#4FD1D0]/10 border border-[#1AD5BD]/20 group-hover:border-[#1AD5BD]/50 transition-colors">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                OSCG <span className="text-[#4FD1D0]">2026</span>
              </span>
            </Link>

            <p className="mb-8 text-base text-gray-400 leading-relaxed max-w-sm">
              Connecting the world through open source innovation and
              collaborative development. Join our global community today.
            </p>

            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-[#1AD5BD] hover:border-[#1AD5BD] transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-4">
              {["About", "Projects", "Speakers", "Sponsors", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#4FD1D0] transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-6 text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-4">
              {["Documentation", "Community", "Code of Conduct", "Help Center"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#4FD1D0] transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="mb-6 text-lg font-semibold text-white">Stay Updated</h4>
            <p className="mb-6 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates, announcements, and tech news.
            </p>

            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:border-[#1AD5BD]/50 focus:ring-1 focus:ring-[#1AD5BD]/50 transition-all"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-[#1AD5BD] hover:bg-[#17b8a3] text-black transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Open Source Connect Global. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;