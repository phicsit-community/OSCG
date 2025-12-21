import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Instagram, Twitter, Linkedin, Github, Send } from "lucide-react";
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

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Event Overview", href: "/timeline" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "mailto:hello@osconnect.org" },
];

const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-(--accent-secondary)/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-(--accent-primary)/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-divider mb-16" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-(--accent-primary)/20 to-(--accent-secondary)/10 border border-(--accent-primary)/20 group-hover:border-(--accent-primary)/50 transition-colors">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                OSCG{" "}
                <span className="text-[var(--accent-secondary)]">2026</span>
              </span>
            </Link>

            <p className="mb-8 text-base text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Connecting the world through open source innovation and
              collaborative development. Join our global community today.
            </p>

            <div className="flex gap-3">
              <Link
                href="https://x.com/osconnect1/"
                target="_blank"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/open-source-connect/"
                target="_blank"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/phicsit-community/OSCG"
                target="_blank"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/osconnect.official/"
                target="_blank"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-base font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(
                ({label, href}) => (
                  <li key={label}>
                    <Link
                      href={`${href.toLowerCase()}`}
                      className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors text-sm font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-base font-semibold text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-(--text-muted) hover:text-(--accent-secondary) transition-colors text-sm font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-5 text-base font-semibold text-white">
              Stay Updated
            </h4>
            <p className="mb-5 text-sm text-(--text-muted)">
              Subscribe to our newsletter for the latest updates, announcements,
              and tech news.
            </p>

            <div className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/50 transition-all"
                />
                <Button
                  size="icon"
                  className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-[var(--accent-primary)] hover:bg-[#17b8a3] text-black transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-(--text-muted)">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
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
