import React from "react";
import {
  Heart,
  MessageCircle,
  GitPullRequest,
  Shield,
  Users,
  Mic,
  Clock,
  FileText,
  Globe,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const guidelines = [
  {
    icon: Heart,
    title: "Respect and Inclusivity",
    description:
      "Every member must be treated with respect, regardless of skill level, identity, background, or location. Harassment, discrimination, bullying, personal attacks, or offensive language are not tolerated. Beginners are encouraged, and diverse perspectives are always welcome.",
  },
  {
    icon: MessageCircle,
    title: "Communication Standards",
    description:
      "Communication should be clear, constructive, and solution-oriented. Ask questions responsibly, offer help when possible, and keep discussions open and transparent unless confidentiality is required.",
  },
  {
    icon: GitPullRequest,
    title: "Open Source Contribution Ethics",
    description:
      "Contributors must only submit work they are authorized to share. Copyright, licensing, and privacy must be respected at all times. Plagiarism and copying from closed-source repositories are strictly prohibited. All contributions should be properly documented.",
  },
  {
    icon: Shield,
    title: "Security and Privacy",
    description:
      "Do not share credentials, internal documents, sensitive data, or private conversations outside the community. Security vulnerabilities should be reported privately to maintainers. User data and privacy must always be handled responsibly.",
  },
  {
    icon: Users,
    title: "Collaboration and Teamwork",
    description:
      "Avoid working in isolation on shared features without prior discussion. Ideas should be aligned with the team before implementation. Respect project leads while providing constructive feedback when needed. Collective success is always more important than individual recognition.",
  },
  {
    icon: Mic,
    title: "Transparency in Decision-Making",
    description:
      "Major decisions should be discussed in open community channels. Contributors must be informed about milestones, changes, and leadership updates. Hidden agendas, favoritism, or exclusive decision-making are not acceptable.",
  },
  {
    icon: Clock,
    title: "Accountability and Responsibility",
    description:
      "Members should honor commitments and communicate early if delays arise. Mistakes should be acknowledged and corrected collaboratively. Over-promising or disappearing from responsibilities without communication undermines the community.",
  },
  {
    icon: FileText,
    title: "Contribution Review and Feedback",
    description:
      "Reviews must be respectful, clear, and helpful. Contributions should never be rejected without explanation. Feedback should encourage learning, iteration, and improvement rather than discourage participation.",
  },
  {
    icon: Globe,
    title: "Community Representation",
    description:
      "When representing Open Source Connect publicly, maintain professionalism and ethical conduct. Do not speak on behalf of OSC without approval from core leadership. Every interaction reflects the values of the community.",
  },
  {
    icon: AlertTriangle,
    title: "Reporting Violations",
    description:
      "Any guideline violations should be reported privately to designated moderators or core leads, along with relevant context or evidence. All reports will be handled confidentially and with respect.",
  },
];

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen mt-10 section-container">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

  <div className="relative z-10 max-w-7xl mx-auto pt-[80px]">

        <div className="section-header">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Community <span className="text-[#4FD1D0]">Guidelines</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Open Source Connect (OSC) is a community-driven initiative built on
            collaboration, innovation, and inclusivity. To maintain a safe,
            productive, and transparent environment, we ask all members to follow
            these guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {guidelines.map((item, index) => (
            <Card
              key={index}
              className="unified-card overflow-hidden group"
            >
              <CardHeader className="relative pb-2">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2 group-hover:text-white/90 transition-colors text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>

        <div className="text-center pb-20 b">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-primary/20 backdrop-blur-sm">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="text-sm md:text-base font-medium text-black">
              By joining Open Source Connect, you agree to uphold these values.
            </p>
          </div>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">
            Together, we aim to build open-source projects that are ethical,
            inclusive, collaborative, and impactful on a global scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
