import React from "react";
import {
  Database,
  Settings,
  Eye,
  Globe,
  Shield,
  Flag,
  Scale,
  RefreshCw,
  Mail,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

const policy = [
  {
    icon: Database,
    title: "Information We Collect",
    description:
      "When you join or interact with Open Source Connect Community, we may collect basic personal information such as your name or display name, social media handles including GitHub, LinkedIn, and Twitter/X, and any profile details you choose to make public. We may also collect information related to your participation in community activities, such as events, contributions, or roles. We only collect information that is necessary to operate and improve our community initiatives.",
  },
  {
    icon: Settings,
    title: "How We Use Your Information",
    description:
      "The information we collect is used to manage and identify community members, highlight contributors, mentors, and leaders, enable collaboration on open-source projects, and communicate updates, events, and opportunities. It also helps us improve our programs and overall community experience.",
  },
  {
    icon: Eye,
    title: "Public Information",
    description:
      "Some information, such as your name and GitHub or other social handles, may be visible to other community members or displayed on our platforms to recognize contributions and support open collaboration. You remain in control of what information you choose to share.",
  },
  {
    icon: Globe,
    title: "International Data Transfers",
    description:
      "As a global community, user information may be processed or stored in countries outside your own. When transferring data internationally, we take reasonable steps to ensure appropriate safeguards are in place to protect your information in accordance with applicable laws.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "We take reasonable and appropriate measures to protect your information from unauthorized access, misuse, or disclosure. However, no online system can guarantee complete security.",
  },
  {
    icon: Flag,
    title: "Privacy Terms for North America",
    description:
      "For users located in North America, we process personal data in accordance with applicable privacy laws such as the California Consumer Privacy Act (CCPA) and other relevant federal or state regulations. Users have the right to know what personal information is collected, how it is used, and to request access, correction, or deletion of their data. Where applicable, users may also opt out of certain data uses. We do not sell personal information and only use data for community-related purposes as outlined in this policy.",
  },
  {
    icon: Flag,
    title: "Privacy Terms for Europe",
    description:
      "For users located in Europe, we process personal data in compliance with the General Data Protection Regulation (GDPR) and related local laws. Our lawful bases for processing include user consent, legitimate interests related to community operations, and compliance with legal obligations. European users have the right to access, rectify, erase, or restrict the processing of their personal data, as well as the right to data portability and to withdraw consent at any time. Users also have the right to lodge a complaint with their local data protection authority.",
  },
  {
    icon: Scale,
    title: "Your Rights",
    description:
      "You have the right to request access to your personal data, request corrections or deletion, and withdraw consent for data usage where applicable. These requests can be made by contacting us directly.",
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    description:
      "We may update this Privacy Policy from time to time to reflect changes in our practices. Any updates will be posted on this page with a revised date.",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: (
      <>
        If you have any questions or concerns about this Privacy Policy or how
        your data is handled, please contact us at{" "}
        <Link href="mailto:hello@osconnect.org">
          <span className="underline text-[#4FD1D0]">hello@osconnect.org</span>
        </Link>
        .
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#090E1A] mt-10 section-container">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="section-header">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
             <span className="text-[#4FD1D0]">Privacy Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Open Source Connect Community (“we”, “our”, “us”) respects your
            privacy and is committed to protecting the personal information you
            share with us. This Privacy Policy outlines what information we
            collect, how it is used, and the rights you have regarding your
            data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 mb-20">
          {policy.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <item.icon className="w-7 h-7 text-white flex-shrink-0" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-white font-semibold text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pb-20 b">
          {/* <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-primary/20 backdrop-blur-sm">
            <CheckCircle className="w-6 h-6 text-primary" />
            <p className="text-sm md:text-base font-medium">
              By joining Open Source Connect, you agree to uphold these values.
            </p>
          </div> */}
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">
            Together, we aim to build open-source projects that are ethical,
            inclusive, collaborative, and impactful on a global scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
