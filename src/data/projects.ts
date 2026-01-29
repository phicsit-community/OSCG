export interface Project {
  title: string;
  description: string;
  githubRepo: string;
  liveLink?: string;
  techStack: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  admin: {
    name: string;
    linkedin: string;
    github?: string;
    avatar?: string;
  };

}

export const PROJECTS: Project[] = [
  {
    title: "EVID-DGC",
    description: "A Blockchain-based Evidence Management System designed for transparency, security, and decentralized data integrity (DGC).",
    githubRepo: "https://github.com/Gooichand/blockchain-evidence",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Socket.IO Client"],
    level: "Advanced",
    liveLink:"https://blockchain-evidence.onrender.com/",
    admin: {
      name: "Gopichand Dandimeni",
      linkedin: "https://www.linkedin.com/in/gopichand-d-269709287/",
      github: "Gooichand",
      avatar: "https://github.com/Gooichand.png"
    },
  },
  {
    title: "Achievement Management System ",
    description: "A web-based platform where students and teachers track academic achievements in one place. Students view their accomplishments, teachers record them, and everyone gets a clear picture of academic progress — all automated and organized.",
    githubRepo: "https://github.com/Eswaramuthu/Achievement-Management-System",
    techStack: ["HTML", "CSS", "JavaScript", "SQLite"],
    level: "Beginner",
    // liveLink:"https://achievement-management-system.vercel.app/",
    admin: {
      name: "Eswaramuthu",
      linkedin: "https://www.linkedin.com/in/meswaramuthu/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "Eswaramuthu",
      avatar: "https://github.com/Eswaramuthu.png"
    },
  },
  {
    title: "VigyBag",
    description: "VigyBag is an e-commerce platform designed to empower villagers by providing them with a nationwide marketplace to sell their eco-friendly products across India. This platform bridges the gap between rural artisans and urban consumers, ensuring that their sustainable creations reach a wider audience.",
    githubRepo: "https://github.com/codervivek5/VigyBag",
    techStack: ["React", "Redux", "TailwindCSS", "Vite", "Node.js", "NPM", "Kotlin", "Android", "React Native"],
    level: "Advanced",
    liveLink:"https://vigy-bag.vercel.app/",
    admin: {
      name: "Vivek Kumar",
      linkedin: "https://www.linkedin.com/in/codervivek/",
      github: "codervivek5",
      avatar: "https://github.com/codervivek5.png"
    },
  },
];
