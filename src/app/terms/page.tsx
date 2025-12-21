import React from "react";
import {
  BookOpen,
  ScrollText,
  UserCheck,
  FileCheck,
  Lock,
  Scale,
  Megaphone,
  HandshakeIcon,
  AlertTriangle,
  ShieldAlert,
  Globe,
  Gavel,
  RefreshCw,
  FileText,
  Scissors,
  Share2,
  GitBranch,
} from "lucide-react";

const terms = [
  {
    icon: BookOpen,
    title: "Definitions",
    description: `“Program” refers to any initiative, event, cohort, challenge, mentorship, or collaboration organized by Open Source Connect.
“Submissions” means any content, code, documentation, designs, proposals, feedback, or materials you submit in connection with the Program.
“Include” and “including” mean “including without limitation”.
`,
  },
  {
    icon: ScrollText,
    title: "Program Rules",
    description:
      "This Agreement incorporates any applicable Program Rules, guidelines, codes of conduct, or instructions published by Open Source Connect. These materials form an integral part of this Agreement. Capitalized terms not defined here have the meaning given in the applicable Program Rules.",
  },
  {
    icon: UserCheck,
    title: "Eligibility",
    description:
      "You represent and warrant that you meet all eligibility requirements specified for the Program you participate in and that you are legally permitted to enter into this Agreement.",
  },
  {
    icon: FileCheck,
    title: "Representations and Warranties",
    description: (
      <>
        You represent and warrant that:
        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
          <li>
            All information you provide during registration or participation is
            truthful and accurate.
          </li>
          <li>
            You own or have the necessary rights to submit your Submissions.
          </li>
          <li>Your Submissions are original and lawful.</li>
          <li>
            Your Submissions are not malicious, defamatory, obscene, or abusive.
          </li>
          <li>
            Your Submissions do not infringe intellectual property rights,
            contractual obligations, or legal rights of any third party.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "Submissions and Ownership",
    description:
      "You retain ownership of your Submissions. Nothing in this Agreement transfers ownership of your work to Open Source Connect.",
  },
  {
    icon: Scale,
    title: "License to Open Source Connect",
    description:
      "By submitting content, you grant Open Source Connect a non-exclusive, worldwide, royalty-free, irrevocable license to use, reproduce, modify, distribute, display, and publish your Submissions solely for purposes of operating, administering, documenting, and promoting the Community and its Programs.",
  },
  {
    icon: GitBranch,
    title: "Open Source Licensing",
    description:
      "Where applicable, your code contributions are governed by the license of the relevant open-source project. You agree to comply fully with those license terms.",
  },
  {
    icon: Megaphone,
    title: "Publicity",
    description:
      "You grant Open Source Connect permission to publicly acknowledge your participation, including publishing your name, role, project information, and contributions on community-managed platforms and communications.",
  },
  {
    icon: HandshakeIcon,
    title: "No Compensation or Employment",
    description:
      "Participation in Open Source Connect is voluntary. Nothing in this Agreement constitutes an offer of employment, internship, agency, partnership, or fiduciary relationship. You may not represent yourself as an employee, contractor, or agent of Open Source Connect.",
  },
  {
    icon: AlertTriangle,
    title: "Code of Conduct and Removal",
    description:
      "Violation of community guidelines, misconduct, or breach of this Agreement may result in suspension or permanent removal from the Program or Community without notice.",
  },
  {
    icon: ShieldAlert,
    title: "Indemnification",
    description:
      "You agree to indemnify and hold harmless Open Source Connect, its organizers, partners, and volunteers from any claims, damages, losses, or legal expenses arising from your participation or Submissions, including third-party rights violations.",
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    description:
      "To the maximum extent permitted by law, Open Source Connect shall not be liable for indirect, incidental, special, or consequential damages arising out of participation in the Program. Liability, if any, is limited to direct damages only.",
  },
  {
    icon: Globe,
    title: "Third-Party Platforms",
    description:
      "Participation may involve third-party platforms such as GitHub, WhatsApp, NexFellow, or event tools. Open Source Connect is not responsible for third-party services, content, or disputes arising from their use.",
  },
  {
    icon: Gavel,
    title: "Governing Law",
    description:
      "This Agreement shall be governed by and interpreted in accordance with the laws of the applicable jurisdiction determined by Open Source Connect, without regard to conflict-of-law principles.",
  },
  {
    icon: RefreshCw,
    title: "Amendments",
    description:
      "Open Source Connect may update these Terms at any time. Continued participation after changes constitutes acceptance of the revised Agreement.",
  },
  {
    icon: FileText,
    title: "Entire Agreement",
    description:
      "This Agreement constitutes the entire understanding between you and Open Source Connect regarding participation and supersedes all prior communications relating to the subject matter.",
  },
  {
    icon: Scissors,
    title: "Severability",
    description:
      "If any provision of this Agreement is found unenforceable, the remaining provisions will continue in full force and effect.",
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#090E1A] pt-10 section-container">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="section-header">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-[#4FD1D0]">Terms</span>
          </h1>
          <div
            className="max-w-4xl mx-auto leading-[1.7] text-white/70"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          >
            By registering, accessing, or participating in any program, event,
            or initiative operated by Open Source Connect (“Community”, “we”,
            “our”, “us”), you agree to be bound by these Terms (“Agreement”).
            This Agreement forms a legally binding understanding between Open
            Source Connect and you (“Participant”, “Contributor”, “you”). <br />
            If you do not agree to these Terms, you must not register for or
            participate in Open Source Connect activities.
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 mb-20">
          {terms.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start gap-4">
                {/* <div className="mt-1">
                  <item.icon className="w-7 h-7 text-white flex-shrink-0" />
                </div> */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-white font-semibold text-2xl">
                    {index + 1}. {item.title}
                  </h3>
                  <div className="text-white/80 text-base leading-relaxed">
                    {item.description}
                  </div>
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

export default TermsPage;
