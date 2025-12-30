import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Send
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const resources = [
  { label: "Documentation", href: "/docs" },
  { label: "Projects", href: "/projects" },
  { label: "Community Guidelines", href: "/community-guidelines" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Media Kit", href: "/media" },
  { label: "Help Center", href: "/help" },
];

const applyLinks = [
  { label: "Speak With Us", href: "https://docs.google.com/forms/d/e/1FAIpQLSebMVP6o26ZtW2yTU2tc4ZRtebOxU_8Z5fw2DwBeVmeKEQLuQ/viewform?usp=header", target: "_blank" },
  { label: "Become a Mentor", href: "#" },
  { label: "Become Project Admin", href: "#" },
  {
    label: "Become Campus Lead",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSffTnzw6voymzgbWKycMZoQYrCMbqBfan_lCNisK2SPlxErWA/viewform",
    target: "_blank"
  },
  {
    label: "Become State Lead",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScVbMGn5ntgASDbMr0kir4I7T3HGqLClTJZmXtdInv0reGQqA/viewform",
    target: "_blank"
  },
  { label: "Become Sponsor", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-(--accent-secondary)/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-(--accent-primary)/5 rounded-full blur-3xl pointer-events-none" />


      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3 flex flex-col items-start">
            <Link href="/" className="mb-6 flex items-center gap-3 group">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-(--accent-primary)/30 to-(--accent-secondary)/10 border border-(--accent-primary)/20 group-hover:border-(--accent-primary)/50 transition-all duration-500 overflow-hidden shadow-lg shadow-(--accent-primary)/10">
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter leading-none uppercase">
                  OSCG
                </span>
                <span className="text-xs font-medium text-[var(--accent-secondary)] tracking-widest uppercase">
                  Global 2026
                </span>
              </div>
            </Link>

            <p className="mb-8 text-sm text-[var(--text-secondary)]/80 leading-relaxed max-w-sm">
              The ultimate destination for open source enthusiasts. Connecting
              innovators, developers, and mentors in a global ecosystem.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "https://x.com/osconnect1/" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/open-source-connect/" },
                { icon: Github, href: "https://github.com/" },
                { icon: Instagram, href: "https://www.instagram.com/osconnect.official/" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-5">
            <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] flex items-center gap-2">
              Resources
            </h4>
            <ul className="space-y-4">
              {resources.map(({ label, href }) => (
                <li key={label} className="group/link">
                  <Link
                    href={href}
                    className="text-[var(--text-muted)] hover:text-white transition-all duration-300 text-sm font-medium inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] flex items-center gap-2">
              Apply
            </h4>
            <ul className="space-y-4">
              {applyLinks.map(({ label, href, target }) => (
                <li key={label} className="group/link">
                  <Link
                    href={href}
                    target={target}
                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    className="text-[var(--text-muted)] hover:text-white transition-all duration-300 text-sm font-medium inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-9">
            <div className="p-[1px] rounded-3xl bg-linear-to-br from-white/10 to-transparent">
              <div className="bg-[#050505]/40 backdrop-blur-sm rounded-[23px] p-6 border border-white/5">
                <h4 className="mb-2 text-sm font-bold text-white tracking-tight">
                  Stay in the Loop
                </h4>
                <p className="mb-6 text-xs text-[var(--text-muted)] leading-relaxed">
                  Join our newsletter for the latest updates and early announcements.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="relative group">
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="h-11 w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]/50 focus:ring-4 focus:ring-[var(--accent-primary)]/10 transition-all text-xs"
                    />
                    <Button
                      size="icon"
                      className="absolute right-1 top-1 h-9 w-9 rounded-lg bg-[var(--accent-primary)] hover:bg-[#17b8a3] text-black transition-all hover:scale-105"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-(--text-muted)/60 leading-tight italic px-1">
                    * No spam, only high-quality tech updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; 2026 Open Source Connect Global. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
