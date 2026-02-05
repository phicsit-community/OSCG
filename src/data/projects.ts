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
    liveLink: "https://blockchain-evidence.onrender.com/",
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
    liveLink: "https://vigy-bag.vercel.app/",
    admin: {
      name: "Vivek Kumar",
      linkedin: "https://www.linkedin.com/in/codervivek/",
      github: "codervivek5",
      avatar: "https://github.com/codervivek5.png"
    },
  },
  {
    title: "MyCSES",
    description: "MyCSES is a repository of solutions the famous CSES sheet of DSA. My main idea is to first collect all the solutions and then create a website for that",
    githubRepo: "https://github.com/ks-iitjmu/MyCSES",
    techStack: ["C++", "DSA", "Algorithms"],
    level: "Intermediate",
    admin: {
      name: "Kunal Sharma",
      linkedin: "https://www.linkedin.com/in/ks-iitjmu/",
      github: "ks-iitjmu",
      avatar: "https://github.com/ks-iitjmu.png"
    },
  },
  {
    title: "Customise.in",
    description: "Customise.in is a purpose-built digital marketplace designed to facilitate the creation of highly customized products. It addresses the gap between individuals seeking bespoke items and skilled makers capable of producing them. The platform enables buyers to submit detailed customization requests, receive structured proposals from makers, and manage the entire order lifecycle through a secure and transparent workflow.",
    githubRepo: "https://github.com/tarun-chowadary/custom-connect",
    techStack: ["React.js", "TypeScript", "TailwindCSS", "Supabase", "Shadcn/ui"],
    level: "Intermediate",
    liveLink: "https://custom-connect-silk.vercel.app/",
    admin: {
      name: "Tarun Chowadary",
      linkedin: "https://www.linkedin.com/in/tarunchowadary",
      github: "tarun-chowadary",
      avatar: "https://github.com/tarun-chowadary.png"
    },
  },
  {
    title: "TravX",
    description: "TravX is an artificial intelligence powered tourism super app designed to revolutionise the Indian travel experience by unifying planning, booking, safety, and cultural immersion into a single platform. It includes features like AI itinerary planning, safety shields, offline payments, and real-time translation.",
    githubRepo: "https://github.com/ArumugaPerumal2907/TravX",
    techStack: ["React 19", "TypeScript", "TailwindCSS", "Google Gemini AI", "Recharts"],
    level: "Beginner",
    admin: {
      name: "Arumuga Perumal",
      linkedin: "https://www.linkedin.com/in/arumuga-perumal-b63207246/?skipRedirect=true",
      github: "ArumugaPerumal2907",
      avatar: "https://github.com/ArumugaPerumal2907.png"
    },
  },
  {
    title: "Repo-Lyzer",
    description: "Repo-lyzer is a developer-focused CLI tool built in Go language that analyzes and compares GitHub repositories to help understand code structure, quality, and changes efficiently. It provides insights like file tree analysis, repository comparison, and actionable metrics, making it easier for developers and recruiters to evaluate projects quickly.",
    githubRepo: "https://github.com/agnivo988/Repo-lyzer",
    techStack: ["Go", "GitHub Actions", "CLI"],
    level: "Intermediate",
    admin: {
      name: "Agniva Mukherjee",
      linkedin: "https://www.linkedin.com/in/agniva-mukherjee-a09042267/",
      github: "agnivo988",
      avatar: "https://github.com/agnivo988.png"
    },
  },
  {
    title: "Cipher Chat",
    description: "Cipher Chat is a secure, real-time private chat application designed for fast, reliable, and confidential one-to-one communication. It uses modern web technologies to deliver a smooth user experience with strong authentication and real-time messaging.",
    githubRepo: "https://github.com/agnivo988/Cipher_chat",
    techStack: ["TypeScript", "Elysia.js", "TailwindCSS", "Next.js"],
    level: "Beginner",
    liveLink: "https://cipher-chat-pi.vercel.app",
    admin: {
      name: "Agniva Mukherjee",
      linkedin: "https://www.linkedin.com/in/agniva-mukherjee-a09042267/",
      github: "agnivo988",
      avatar: "https://github.com/agnivo988.png"
    },
  },
  {
    title: "CollegeMoMO",
    description: "CollegeMoMO is a cutting-edge frontend application designed specifically for college communities. It replicates the core user experience of popular social media platforms with a fresh, gradient-themed UI optimized for visual media sharing, real-time interactions, and seamless user engagement.",
    githubRepo: "https://github.com/abhishekkumar177/College_Media",
    techStack: ["React 19", "Vite", "TailwindCSS", "Node.js", "Express.js", "MongoDB"],
    level: "Beginner",
    admin: {
      name: "Abhishek Kumar",
      linkedin: "https://www.linkedin.com/in/abhishek-kumar-771583288/",
      github: "abhishekkumar177",
      avatar: "https://github.com/abhishekkumar177.png"
    },
  },
  {
    title: "githubAnalyyzer",
    description: "Githubanalyzer builds open-source tools that analyze GitHub profiles and repositories using AI to generate insights, metrics, and developer-friendly reports.",
    githubRepo: "https://github.com/shreyashpatel5506/githubanalyzer",
    techStack: ["NextJS", "MongoDB", "AI APIs", "Github"],
    level: "Beginner",
    liveLink: "https://gitprofileai.vercel.app",
    admin: {
      name: "Shreyash Patel",
      linkedin: "https://www.linkedin.com/in/shreyash-patel-ba27b02a6/",
      github: "shreyashpatel5506",
      avatar: "https://github.com/shreyashpatel5506.png"
    },
  },
  {
    title: "AI Paper Evaluator",
    description: "AI Paper Evaluator simplifies the grading process by using AI based logic to evaluate student answer sheets against an instructor's key. It supports multiple roles and provides detailed AI-driven feedback.",
    githubRepo: "https://github.com/SharanyaAchanta/AI-Paper-Evaluator",
    techStack: ["Python", "Streamlit", "OCR", "Text Processing"],
    level: "Intermediate",
    admin: {
      name: "Sharanya Achanta",
      linkedin: "https://www.linkedin.com/in/sharanya-achanta-946297276/",
      github: "SharanyaAchanta",
      avatar: "https://github.com/SharanyaAchanta.png"
    },
  },
  {
    title: "swapX",
    description: "SwapX is a modern, mobile-first marketplace platform designed exclusively for university students to buy, sell, swap, and rent items securely. It solves the issue of trust in campus commerce by enforcing campus-email verification (.edu/.ac) and providing a fee-free environment.",
    githubRepo: "https://github.com/Kiran95021/swapX",
    techStack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "TanStack Query"],
    level: "Beginner",
    admin: {
      name: "Kiran95021",
      linkedin: "", // Not provided
      github: "Kiran95021",
      avatar: "https://github.com/Kiran95021.png"
    },
  },
  {
    title: "WellGodds Web",
    description: "A modern wallpaper website offering high-quality wallpapers for mobile, tablet, and desktop devices. Features include user uploads, categorization, and profile management.",
    githubRepo: "https://github.com/WallGodds/WallGodds-Web",
    // liveLink: "https://github.com/WallGodds/WallGodds-Web", // Omitted as it matches githubRepo
    techStack: ["React", "Firebase"],
    level: "Intermediate",
    admin: {
      name: "Parnab Bagchi",
      linkedin: "https://www.linkedin.com/in/parnab-bagchi-072966251/",
      github: "WallGodds",
      avatar: "https://github.com/WallGodds.png"
    },
  },
  {
    title: "Orbit-CLI",
    description: "Orbilt-CLI is a powerful command-line AI agent that brings advanced AI capabilities directly into your terminal. With seamless integration of Google Gemini, secure device flow authentication, and a modern full-stack architecture.",
    githubRepo: "https://github.com/Dutta2005/Orbit-CLI",
    techStack: ["Next.js", "Express.js", "Node.js", "Google Gemini", "AI SDK", "Prisma ORM", "NeonDB"],
    level: "Intermediate",
    admin: {
      name: "Dutta2005",
      linkedin: "", // Not provided
      github: "Dutta2005",
      avatar: "https://github.com/Dutta2005.png"
    },
  },
  {
    title: "EduLinkUp",
    description: "EduLinkUp is a modern, feature-rich educational platform for students preparing for competitive examinations and skill development. It provides an immersive learning experience with comprehensive course management, 24/7 access to courses, interactive community discussions, and AI-powered features.",
    githubRepo: "https://github.com/EduLinkUp/EduLinkUp.git",
    liveLink: "https://your-edulinkup.vercel.app/",
    techStack: ["NextJS", "TypeScript", "Tailwind CSS"],
    level: "Intermediate",
    admin: {
      name: "Eccentric Explorer",
      linkedin: "https://linkedin.com/in/eccentricexplorer",
      github: "EduLinkUp",
      avatar: "https://github.com/EduLinkUp.png"
    },
  },
  {
    title: "Explainable Credit Intelligence Platform",
    description: "Explainable Credit Intelligence Platform is a data-driven system designed to analyze financial data and predict credit risk in a transparent and trustworthy way. It uses machine learning models to score customers while also providing clear explanations about why a particular decision was made.",
    githubRepo: "https://github.com/mehtahet619/Explainable-Credit-Intelligence-Platform.git",
    techStack: ["Python", "Scikit-learn", "SHAP", "Pandas", "NumPy", "Flask", "PostgreSQL", "Docker"],
    level: "Advanced",
    admin: {
      name: "Het Mehta",
      linkedin: "https://www.linkedin.com/in/het-mehta-5b9a47236",
      github: "mehtahet619",
      avatar: "https://github.com/mehtahet619.png"
    },
  },
  {
    title: "NoteNexus",
    description: "NoteNexus is a modern, collaborative web platform designed to help college students share and find academic resources like notes, Previous Year Questions (PYQs), lab manuals, and e-books.",
    githubRepo: "https://github.com/tusharg2210/NoteNexus",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Firebase RTDB", "Firebase Auth", "Cloudinary", "Vite"],
    level: "Beginner",
    admin: {
      name: "tusharg2210",
      linkedin: "https://www.linkedin.com/in/tushargnita",
      github: "tusharg2210",
      avatar: "https://github.com/tusharg2210.png"
    },
  },
  {
    title: "NarrativeX AI",
    description: "Multi-feature AI storytelling platform with Story Creator, Character Creator, Plot Generator, World Builder, and Story Analyzer. Helps writers and game developers generate immersive content using generative AI.",
    githubRepo: "https://github.com/setusairam/NarrativeX-AI",
    techStack: ["React.js", "Python", "Flask", "OpenAI API", "Generative AI"],
    level: "Intermediate",
    admin: {
      name: "Setu Sairam",
      linkedin: "https://www.linkedin.com/in/setusairam-y/",
      github: "setusairam",
      avatar: "https://github.com/setusairam.png"
    },
  },
  {
    title: "Matix Automator",
    description: "Event management automation tool for ticketing and participant management. Features QR code generation/scanning, email automation, and e-certificate generation.",
    githubRepo: "https://github.com/setusairam/Matix-Auto",
    techStack: ["React.js", "Python", "Flask", "SQLite", "QR Code"],
    level: "Intermediate",
    admin: {
      name: "Setu Sairam",
      linkedin: "https://www.linkedin.com/in/setusairam-y/",
      github: "setusairam",
      avatar: "https://github.com/setusairam.png"
    },
  },
  {
    title: "Premium Photography website",
    description: "A website showcasing premium photography masterpieces, also allowing users to register for wedding and event photography consultations.",
    githubRepo: "link",
    techStack: ["MERN"],
    level: "Intermediate",
    admin: {
      name: "HEMANT KUMAR",
      linkedin: "", // Not provided
      github: "", // Not provided
      avatar: "" // Not provided
    },
  },
  {
    title: "Sanatan Food",
    description: "Modern, responsive Food Delivery Web Application featuring secure user authentication, interactive menus, and a seamless ordering experience.",
    githubRepo: "https://github.com/gitKeshav11/Sanatan_Food-Full_Stack_Project.git",
    techStack: ["Java 17", "Spring Boot", "React.js", "Tailwind CSS", "MySQL", "Docker"],
    level: "Intermediate",
    admin: {
      name: "Keshav Upadhyay",
      linkedin: "https://www.linkedin.com/in/keshavupadhyayje/",
      github: "gitKeshav11",
      avatar: "https://github.com/gitKeshav11.png"
    },
  },
  {
    title: "Obys Agency Website",
    description: "Obys Agency Website is a modern, animation-rich frontend project inspired by creative agency websites. It focuses on smooth scrolling, micro-interactions, and advanced animations using GSAP and Locomotive Scroll. This project is ideal for contributors interested in UI/UX, animations, and performance-optimized frontend development.",
    githubRepo: "https://github.com/raghavy11",
    liveLink: "https://obys-agency-clone-two.vercel.app/",
    techStack: ["HTML5", "CSS3", "JavaScript", "GSAP", "Locomotive Scroll", "Shery.js"],
    level: "Intermediate",
    admin: {
      name: "raghavy11",
      linkedin: "", // Not provided
      github: "raghavy11",
      avatar: "https://github.com/raghavy11.png"
    },
  },
  {
    title: "typing-speed-test",
    description: "Test your typing speed and accuracy with this animated HTML, CSS, and JS app.",
    githubRepo: "https://github.com/iakshra22/typing-speed-test",
    liveLink: "https://github.com/iakshra22/typing-speed-test",
    techStack: ["html", "css", "js", "react"],
    level: "Intermediate",
    admin: {
      name: "Akshra Dang",
      linkedin: "https://www.linkedin.com/in/akshra-dang-aa0648321/",
      github: "iakshra22",
      avatar: "https://github.com/iakshra22.png"
    },
  },
  {
    title: "README Design Kit",
    description: "README Design Kit is your all-in-one solution for creating professional, accessible, and visually appealing documentation. This curated collection of templates, components, and AI-powered tools eliminates the guesswork from writing README files, letting you focus on what matters: your code.",
    githubRepo: "https://github.com/Mayur-Pagote/README_Design_Kit",
    liveLink: "https://readme-design-kit.vercel.app/",
    techStack: ["TypeScript", "HTML", "CSS", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Mayur Pagote",
      linkedin: "https://www.linkedin.com/in/mayurpagote/",
      github: "Mayur-Pagote",
      avatar: "https://github.com/Mayur-Pagote.png"
    },
  },
  {
    title: "Verdigo_Eco-friendly_Project",
    description: "VerdiGo is a comprehensive environmental impact platform that empowers users to track, reduce, and offset their carbon footprint while promoting sustainable living practices. Features Carbon Footprint Calculator, Air Quality Monitoring, Green Lane Navigation, Local Harvest, and WasteLess.",
    githubRepo: "https://github.com/Meghali54/Verdigo_Eco-friendly_Project",
    liveLink: "https://verdigo-eco-friendly-project.vercel.app/",
    techStack: ["React 19.1.0", "Vite", "React Router", "Tailwind CSS", "Node.js", "Express 5.1.0"],
    level: "Intermediate",
    admin: {
      name: "Meghali Dutta",
      linkedin: "https://www.linkedin.com/in/meghali-dutta",
      github: "Meghali54",
      avatar: "https://github.com/Meghali54.png"
    },
  },
  {
    title: "SkinEasy",
    description: "SkinEasy is packed with features to make skincare simple, smart, and personal. AI-Powered Skin Analysis, Personalized Skincare Routines, and Chat with Chansey AI. Trained to provide empathetic and accurate information.",
    githubRepo: "https://github.com/Meghali54/SkinEasy.git",
    techStack: ["Next.js", "React", "Shadcn UI", "Tailwind CSS", "NextAuth.js", "MongoDB"],
    level: "Advanced",
    admin: {
      name: "Meghali Dutta",
      linkedin: "https://www.linkedin.com/in/meghali-dutta",
      github: "Meghali54",
      avatar: "https://github.com/Meghali54.png"
    },
  },
  {
    title: "Lawkey",
    description: "LawKey is an open-source, AI-powered legal guidance assistant designed to make laws accessible, understandable, and actionable for the general public. It simplifies complex legal information related to cybercrime, women safety laws, property laws, etc.",
    githubRepo: "https://github.com/zafrose3/Lawkey",
    techStack: ["Python", "FastAPI", "Neo4j", "PostgreSQL", "spaCy", "Transformer", "React", "Tailwind"],
    level: "Advanced",
    admin: {
      name: "Amrisha Zafreen",
      linkedin: "https://www.linkedin.com/in/amrisha-zafreen/",
      github: "zafrose3",
      avatar: "https://github.com/zafrose3.png"
    },
  },
  {
    title: "Jobmap",
    description: "JobMap is an open-source, AI-powered career intelligence platform that analyzes recent job postings from public job portals and datasets to identify current hiring trends, in-demand skills, and evolving role requirements.",
    githubRepo: "https://github.com/zafrose3/Jobmap",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLite", "spaCy", "Scikit-Learn", "React", "Next.js", "Tailwind CSS"],
    level: "Intermediate",
    admin: {
      name: "Amrisha Zafreen",
      linkedin: "https://www.linkedin.com/in/amrisha-zafreen/",
      github: "zafrose3",
      avatar: "https://github.com/zafrose3.png"
    },
  },
  {
    title: "EdgeCareer.AI",
    description: "EdgeCareer – AI-Powered Career Coach. A cutting-edge AI-driven career platform that provides personalized job recommendations, AI resume reviews, and real-time career insights to help users.",
    githubRepo: "https://github.com/amitkumardemo/EdgeCareer.git",
    liveLink: "https://edge-career.vercel.app/",
    techStack: ["React 19", "Next.js 15", "Tailwind CSS", "Shadcn UI", "NeonDB", "Prisma", "Clerk", "Inngest", "Gemini API"],
    level: "Intermediate",
    admin: {
      name: "Amit Kumar",
      linkedin: "https://www.linkedin.com/in/amit-kumar-686196225/",
      github: "amitkumardemo",
      avatar: "https://github.com/amitkumardemo.png"
    },
  },
  {
    title: "CareHub",
    description: "CareHub is a healthcare platform for booking doctor appointments, video consultations, and managing medical records with a credit-based system. Features include verified doctors, subscription plans, and secure, user-friendly access.",
    githubRepo: "https://github.com/amitkumardemo/CareHub.git",
    techStack: ["React 19", "Next.js 15", "Tailwind CSS", "Shadcn UI", "Prisma", "NeonDB", "Clerk", "Vonage Video API"],
    level: "Intermediate",
    admin: {
      name: "Amit Kumar",
      linkedin: "https://www.linkedin.com/in/amit-kumar-686196225/",
      github: "amitkumardemo",
      avatar: "https://github.com/amitkumardemo.png"
    },
  },
  {
    title: "AI StoryForge Multimodal Story Generator",
    description: "AI Story Generator ✨📖 An AI-powered story generator built using React (frontend) and Groq API (backend) for generating unique, creative stories from user prompts. Designed for writers, creators, and anyone looking for fast, AI-generated storytelling.",
    githubRepo: "https://github.com/Nsanjayboruds/AI-StoryForge-Multimodal-Story-Generator",
    liveLink: "https://story-generator-using-groq-api.vercel.app/login",
    techStack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Groq AI API (LLaMA 3)"],
    level: "Intermediate",
    admin: {
      name: "Nishant Borude",
      linkedin: "https://www.linkedin.com/in/nishant-borude-554293311/",
      github: "Nsanjayboruds",
      avatar: "https://github.com/Nsanjayboruds.png"
    },
  },
  {
    title: "RIVETO",
    description: "RIVETO is a full-stack, AI-powered e-commerce web application featuring a complete payment gateway integration and comprehensive admin panel. Built with modern web technologies, it provides a scalable foundation for online retail businesses with intelligent features and secure payment processing.",
    githubRepo: "https://github.com/Nsanjayboruds/RIVETO",
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay", "Cloudinary", "AI Agents"],
    level: "Advanced",
    admin: {
      name: "Nishant Borude",
      linkedin: "https://www.linkedin.com/in/nishant-borude-554293311/",
      github: "Nsanjayboruds",
      avatar: "https://github.com/Nsanjayboruds.png"
    },
  },
  {
    title: "Quizzy",
    description: "Quizzy is a comprehensive and secure online examination platform designed to make remote testing reliable and efficient. It features advanced security measures like real-time tab switching detection and a secure browser mode to prevent cheating.",
    githubRepo: "https://github.com/SparshM8/QUIZZY.git",
    techStack: ["React 18", "Tailwind CSS", "Lucide React", "Node.js", "Express.js", "JWT", "bcryptjs", "MySQL", "Docker"],
    level: "Intermediate",
    admin: {
      name: "SparshM8",
      linkedin: "https://linkedin.com/in/sparshm8",
      github: "SparshM8",
      avatar: "https://github.com/SparshM8.png"
    },
  },
  {
    title: "Curi-Cuisine",
    description: "Curi-Cuisine is an AI-powered culinary assistant dedicated to reducing food waste by helping users generate recipes from ingredients they already have. The platform features a smart \"Ingredient Bank\" that allows users to add items via text, voice, or camera scanning.",
    githubRepo: "https://github.com/SparshM8/Curi-Cuisine.git",
    techStack: ["React", "Vite", "Node.js", "Express.js", "Google Gemini API", "Google Vision API", "TensorFlow.js"],
    level: "Intermediate",
    admin: {
      name: "SparshM8",
      linkedin: "https://linkedin.com/in/sparshm8",
      github: "SparshM8",
      avatar: "https://github.com/SparshM8.png"
    },
  },
  {
    title: "VayuRakshak",
    description: "VayuRakshak (वायु रक्षक - Guardian of Air) is an intelligent air quality monitoring and pollution management platform.",
    githubRepo: "https://github.com/Mrunalx863/VayuRakshak",
    techStack: ["Next.js", "TypeScript", "Tailwindcss", "Nest.js", "Leaflet-maps", "Supabase"],
    level: "Intermediate",
    admin: {
      name: "Mrunalx863",
      linkedin: "", // Not provided
      github: "Mrunalx863",
      avatar: "https://github.com/Mrunalx863.png"
    },
  },
  {
    title: "UrjaDrishti",
    description: "UrjaDrishti is a AI-Driven Digital Twin for Extra High voltage Substations It is an intelligent digital twin platform for EHV 400/220kV substations that integrates real-time monitoring, predictive analytics, and 3D visualization to transform substation operations from reactive to proactive.",
    githubRepo: "https://github.com/Mrunalx863/UrjaDrishti",
    techStack: ["React", "Javascript", "Tailwindcss", "Leaflet-maps", "Django", "Supabase"],
    level: "Intermediate",
    admin: {
      name: "Mrunalx863",
      linkedin: "", // Not provided
      github: "Mrunalx863",
      avatar: "https://github.com/Mrunalx863.png"
    },
  },
  {
    title: "StudentVerse UI",
    description: "StudentVerse UI is an open-source, student-driven platform where learners create, share, and explore reusable UI components and mini tools. Ideal for beginners, college projects, and open-source contributions",
    githubRepo: "https://github.com/Shubham-cyber-prog/StudentVerse-UI.git",
    liveLink: "https://studentverse-ui.netlify.app/",
    techStack: ["JavaScript", "React", "Node", "Express", "Typescript", "Tailwind", "MongoDB"],
    level: "Intermediate",
    admin: {
      name: "Subham Nayak",
      linkedin: "https://www.linkedin.com/in/subhamnayak/",
      github: "Shubham-cyber-prog",
      avatar: "https://github.com/Shubham-cyber-prog.png"
    },
  },
  {
    title: "Smart Campus",
    description: "Smart Campus Admin is a comprehensive, enterprise-grade campus management platform designed to transform traditional educational institutions into intelligent, connected, and efficient ecosystems.",
    githubRepo: "https://github.com/Shubham-cyber-prog/Smart-Campus.git",
    techStack: ["JavaScript", "Typescript", "React", "Tailwind", "Node", "Express"],
    level: "Intermediate",
    admin: {
      name: "Subham Nayak",
      linkedin: "https://www.linkedin.com/in/subhamnayak/",
      github: "Shubham-cyber-prog",
      avatar: "https://github.com/Shubham-cyber-prog.png"
    },
  },
  {
    title: "Mediconnect",
    description: "Rural and remote areas face serious challenges in accessing quality healthcare. Mediconnect uses digital technology (video calls, mobile apps, remote monitoring) to connect rural patients with qualified doctors and specialists without physical travel.",
    githubRepo: "https://www.linkedin.com/in/shivank-pandey-50b669327",
    liveLink: "https://www.linkedin.com/in/shivank-pandey-50b669327",
    techStack: ["Html", "css", "javascript"],
    level: "Beginner",
    admin: {
      name: "Shivank Pandey",
      linkedin: "https://www.linkedin.com/in/shivank-pandey-50b669327",
      github: "shivank-pandey-50b669327", // Placeholder as provided link is LinkedIn
      avatar: "" // No avatar provided/inferred
    },
  },
  {
    title: "Achimpa.ai",
    description: "It's an agent bot with 5 different personalities.",
    githubRepo: "https://github.com/hey-nivesh/Achimpa.ai",
    techStack: ["React Native", "Groq"],
    level: "Intermediate",
    admin: {
      name: "Nivesh Jain",
      linkedin: "https://www.linkedin.com/in/nivesh-jain-523104248 ",
      github: "hey-nivesh",
      avatar: "https://github.com/hey-nivesh.png"
    },
  },
  {
    title: "Smart-Queue-Crowd-Predictor",
    description: "A campus-focused solution to reduce waiting time by predicting crowd density in shared spaces like canteens and libraries using Google technologies.",
    githubRepo: "https://github.com/RAKSHNA01/Smart-Queue-Crowd-Predictor",
    techStack: ["HTML"],
    level: "Beginner",
    admin: {
      name: "Rakshna R",
      linkedin: "https://www.linkedin.com/in/rakshna-r-087674370/",
      github: "RAKSHNA01",
      avatar: "https://github.com/RAKSHNA01.png"
    },
  },
  {
    title: "EventHub",
    description: "A project to manage events for personal or professional use.",
    githubRepo: "https://github.com/Lakshya2025-web/it.git",
    liveLink: "N/A",
    techStack: ["nextjs(frontend)", "django(backend)", "postgresql(database)"],
    level: "Intermediate",
    admin: {
      name: "Lakshya Agarwal",
      linkedin: "https://www.linkedin.com/in/lakshya-agarwal-1706bb322/",
      github: "Lakshya2025-web",
      avatar: "https://github.com/Lakshya2025-web.png"
    },
  },
  {
    title: "StructureSolve",
    description: "Structure Solve is a comprehensive, MERN-stack-based web platform designed to be a one-stop solution for learning, practicing, and mastering Data Structures and Algorithms (DSA).",
    githubRepo: "https://github.com/Roshansuthar1105/structuresolve",
    liveLink: "https://structuresolve.netlify.app/",
    techStack: ["Mern", "Tailwind", "MongoDB", "Express", "Node", "React"],
    level: "Beginner",
    admin: {
      name: "Roshan Suthar",
      linkedin: "https://www.linkedin.com/in/roshansuthar",
      github: "Roshansuthar1105",
      avatar: "https://github.com/Roshansuthar1105.png"
    },
  },
  {
    title: "CodeMint",
    description: "An open-source hub for frontend developers to discover, learn, and contribute components, CSS snippets, UI blocks, effects, and color utilities.",
    githubRepo: "https://github.com/Roshansuthar1105/codemint",
    techStack: ["React", "Tailwind", "Html", "Css", "Motion", "React-hot-toast"],
    level: "Beginner",
    admin: {
      name: "Roshan Suthar",
      linkedin: "https://www.linkedin.com/in/roshansuthar",
      github: "Roshansuthar1105",
      avatar: "https://github.com/Roshansuthar1105.png"
    },
  },
  {
    title: "SmartChunk",
    description: "SmartChunk is a lightweight, structure-aware semantic chunking toolkit designed to supercharge RAG (Retrieval-Augmented Generation) and LLM pipelines. Unlike naive splitters, SmartChunk respects document structure and semantic flow.",
    githubRepo: "https://github.com/ayush585/SmartChunk",
    liveLink: "https://test.pypi.org/project/smartchunk/",
    techStack: ["Python"],
    level: "Advanced",
    admin: {
      name: "Ayushman Mukherjee",
      linkedin: "https://www.linkedin.com/in/ayushman-mukherjee-437a49314/",
      github: "ayush585",
      avatar: "https://github.com/ayush585.png"
    },
  },
  {
    title: "GetRichify",
    description: "GetRichify is an AI-powered startup idea generator that transforms ordinary concepts into extraordinary (and hilariously exaggerated) business opportunities. The platform combines humor with creativity to help users brainstorm and explore business ideas in an entertaining way.",
    githubRepo: "https://github.com/harshitSingh1/getrichify-ai",
    liveLink: "https://get-rich-o-matic.lovable.app/",
    techStack: ["React", "Typescript", "CSS", "Vite"],
    level: "Beginner",
    admin: {
      name: "Harshit Singh",
      linkedin: "https://linkedin.com/in/harshit-singh-06834221b",
      github: "harshitSingh1",
      avatar: "https://github.com/harshitSingh1.png"
    },
  },
  {
    title: "Lumen - AI Accessibility Suite",
    description: "Transform any webpage for focus, readability, and accessibility using AI-powered tools and built-in browser APIs. Lumen was born from the vision of creating a comprehensive solution that leverages AI to make the web truly accessible for all.",
    githubRepo: "https://github.com/harshitSingh1/Lumen-Extension",
    techStack: ["HTML", "CSS", "JavaScript", "Chrome Extension", "Gemini API", "Chrome APIs"],
    level: "Beginner",
    admin: {
      name: "Harshit Singh",
      linkedin: "https://linkedin.com/in/harshit-singh-06834221b",
      github: "harshitSingh1",
      avatar: "https://github.com/harshitSingh1.png"
    },
  },
  {
    title: "FixMyCity",
    description: "A real-time grievance redressal platform that enables citizens to report and track civic issues such as potholes, garbage dumps, and broken streetlights using images and location. Features GPS-based location tagging and live status tracking.",
    githubRepo: "https://github.com/shikha-gupta-lang/fixmycity",
    liveLink: "https://lnkd.in/gDuFyG5C",
    techStack: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express", "MongoDB Atlas"],
    level: "Intermediate",
    admin: {
      name: "Vinayak Pandeya",
      linkedin: "https://www.linkedin.com/in/vinayakpandeya/",
      github: "shikha-gupta-lang", // Inferred from repo owner as direct github profile wasn't provided in the usual spot, checking if 'shikha-gupta-lang' is correct or if it's the org. Using repo owner for now.
      avatar: "https://github.com/shikha-gupta-lang.png"
    },
  },
  {
    title: "PulseNet- Social media project",
    description: "It's a social media platform with all the features like facebook and named as pulseNet.",
    githubRepo: "https://github.com/pranathiK25/Social-Media-Project-Frontend-SURETrust",
    liveLink: "https://github.com/pranathiK25/Social-Media-Project-Backend-SURETrust", // Using backend repo as live link as requested
    techStack: ["React.js", "Node.js", "express.js", "mongodb"],
    level: "Beginner",
    admin: {
      name: "Kalavagunta Pranathi Sai",
      linkedin: "https://www.linkedin.com/in/kalavagunta-pranathi-sai-6a4220274",
      github: "pranathiK25",
      avatar: "https://github.com/pranathiK25.png"
    },
  },
  {
    title: "NeuroFleetX AI Powered Urban Fleet and Traffic Intelligence",
    description: "NeuroFleetX is a full-stack application designed to provide smart fleet management and real-time traffic insights using AI-powered analytics. It helps urban fleet operators optimize routes, track vehicles, and make data-driven decisions.",
    githubRepo: "https://github.com/pranathiK25/Neurofleetx_Infosys_springboard", // Using deployed link as repo as requested
    liveLink: "https://github.com/pranathiK25/Neurofleetx_Infosys_springboard",
    techStack: ["React", "Java Springboot", "Mysql"],
    level: "Intermediate",
    admin: {
      name: "Kalavagunta Pranathi Sai",
      linkedin: "https://www.linkedin.com/in/kalavagunta-pranathi-sai-6a4220274",
      github: "pranathiK25",
      avatar: "https://github.com/pranathiK25.png"
    },
  },
  {
    title: "Solana Token Launchpad",
    description: "A token launchpad for Solana.",
    githubRepo: "https://github.com/GauravKarakoti/Solana-Token-Launchpad",
    liveLink: "Haven't deployed yet, will deploy if selected",
    techStack: ["Vite", "Solana"],
    level: "Beginner",
    admin: {
      name: "Gaurav Karakoti",
      linkedin: "https://linkedin.co/in/gaurav-karakoti",
      github: "GauravKarakoti",
      avatar: "https://github.com/GauravKarakoti.png"
    },
  },
  {
    title: "Solana Faucet",
    description: "A faucet for Solana.",
    githubRepo: "https://github.com/GauravKarakoti/Solana-Faucet",
    techStack: ["Vite", "Solana"],
    level: "Beginner",
    admin: {
      name: "Gaurav Karakoti",
      linkedin: "https://linkedin.co/in/gaurav-karakoti",
      github: "GauravKarakoti",
      avatar: "https://github.com/GauravKarakoti.png"
    },
  },
  {
    title: "agro connect",
    description: "An agriculture based app giving solutions to agri based problems.",
    githubRepo: "https://github.com/om767/agri-website",
    techStack: ["HTML", "CSS", "python", "mysql", "fastapi", "flask"],
    level: "Intermediate",
    admin: {
      name: "Om Barge",
      linkedin: "www.linkedin.com/in/ om-barge-b442bb306",
      github: "om767",
      avatar: "https://github.com/om767.png"
    },
  },
  {
    title: "event hub",
    description: "An event management app.",
    githubRepo: "https://github.com/om767/eventhub",
    liveLink: "https://github.com/om767/eventhub",
    techStack: ["HTML", "CSS", "Python", "flask", "mysql"],
    level: "Intermediate",
    admin: {
      name: "Om Barge",
      linkedin: "www.linkedin.com/in/ om-barge-b442bb306",
      github: "om767",
      avatar: "https://github.com/om767.png"
    },
  },
  {
    title: "ANIMUS – Animal Safety System",
    description: "Describe injuries, location, or any help needed for faster rescue. Use your device camera to instantly capture animals in trouble. A Lifeline for Animals in Need.",
    githubRepo: "https://github.com/ABHIJEET-0001/Animus",
    liveLink: "https://github.com/ABHIJEET-0001/Animus",
    techStack: ["PYTHON", "JAVA"],
    level: "Advanced",
    admin: {
      name: "Abhijeet",
      linkedin: "", // Not provided
      github: "ABHIJEET-0001",
      avatar: "https://github.com/ABHIJEET-0001.png"
    },
  },
  {
    title: "STEM Quest - Gamified Learning Platform",
    description: "STEM Quest - Gamified Learning Platform. A modern, interactive STEM learning website designed for students in grades 6-10.",
    githubRepo: "https://github.com/ABHIJEET-0001/BinaryBros-0.2",
    techStack: ["React 18", "Tailwind CSS 3", "Vite"],
    level: "Intermediate",
    admin: {
      name: "Abhijeet",
      linkedin: "", // Not provided
      github: "ABHIJEET-0001",
      avatar: "https://github.com/ABHIJEET-0001.png"
    },
  },
  {
    title: "ThreatLens",
    description: "It's a rule based threat detection system for windows.",
    githubRepo: "https://github.com/d1-d3m0n/ThreatLens",
    techStack: ["GoLang"],
    level: "Intermediate",
    admin: {
      name: "Dev Shishodia",
      linkedin: "https://www.linkedin.com/in/devshishodia",
      github: "d1-d3m0n",
      avatar: "https://github.com/d1-d3m0n.png"
    },
  },
  {
    title: "dev-shell",
    description: "A powershell based penetration testing framework for windows, which can be used to conduct various kind of attacks and reconnaissance on the systems.",
    githubRepo: "https://github.com/d1-d3m0n/dev-shell",
    techStack: ["Powershell"],
    level: "Intermediate",
    admin: {
      name: "Dev Shishodia",
      linkedin: "https://www.linkedin.com/in/devshishodia",
      github: "d1-d3m0n",
      avatar: "https://github.com/d1-d3m0n.png"
    },
  },
  {
    title: "Real time chat app",
    description: "Here we are basically made a real time chat app. Using socket io.",
    githubRepo: "https://github.com/ggauravky/chat-app",
    techStack: ["Full stack", "socket io"],
    level: "Intermediate",
    admin: {
      name: "Gauravky",
      linkedin: "https://www.linkedin.com/in/gauravky/",
      github: "ggauravky",
      avatar: "https://github.com/ggauravky.png"
    },
  },
  {
    title: "LinkID",
    description: "LinkID is a simple and secure platform to create and manage a single profile containing all important links (socials, projects, resumes, portfolios). It helps users share their digital identity using one short link.",
    githubRepo: "https://github.com/vishnukothakapu/linkid",
    techStack: ["Next.js", "TailwindCSS", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase"],
    level: "Intermediate",
    admin: {
      name: "Vishnu Kiran",
      linkedin: "https://linkedin.com/in/kothakapuvishnukiran",
      github: "vishnukothakapu",
      avatar: "https://github.com/vishnukothakapu.png"
    },
  },
  {
    title: "AI File Assistant",
    description: "Developed an AI-powered file assistant that enables users to interact with files and folders using natural language commands. The system intelligently performs operations such as file search, organization, content retrieval, and summarization.",
    githubRepo: "https://github.com/Springboard-Internship-2025/AI-Based-Smart-File-Assist-for-context-Query-and-Efficient-Info-Ext-from-Multi-Doc_Nov_Batch-6_2025.git",
    techStack: ["Python", "NLP", "LLMs", "Semantic Search", "File System Automation"],
    level: "Advanced",
    admin: {
      name: "Manoj",
      linkedin: "https://www.linkedin.com/in/manoj0902/",
      github: "manoj0902", // Inferred from linkedin
      avatar: "https://github.com/manoj0902.png"
    },
  },
  {
    title: "trinetra - simhastha - ujjain2028",
    description: "Trinetra is a crowd safety security and surveillance system made for Simhastha '28. It uses YOLO v8n for security, AI for crowd direction, heatmaps for diversion, and includes a website for crowd tracking.",
    githubRepo: "https://github.com/Dhruv290405/TRINETRA",
    techStack: ["prisma", "tailwind css", "yolov8n", "PERN stack", "leaf maps", "heatmaps api", "a.i."],
    level: "Intermediate",
    admin: {
      name: "Dhruv Tiwari",
      linkedin: "https://www.linkedin.com/in/-dhruv-tiwari",
      github: "Dhruv290405",
      avatar: "https://github.com/Dhruv290405.png"
    },
  },
  {
    title: "SlimStack",
    description: "Slimstack is a client-side developer utility that scans local projects and system directories to analyze developer tooling bloat. It detects unused dependencies, redundant global packages, and bloated Docker artifacts.",
    githubRepo: "https://github.com/arceuzvx/SlimStack",
    techStack: ["Python", "Node.js", "Docker"],
    level: "Intermediate",
    admin: {
      name: "Shreya Dutta",
      linkedin: "https://www.linkedin.com/in/shreya-dutta-cybersecurity/",
      github: "arceuzvx",
      avatar: "https://github.com/arceuzvx.png"
    },
  },
  {
    title: "AI-Enabled Healthcare CRM System",
    description: "HealthCare AI is a cutting-edge, AI-enabled healthcare appointment management system designed to revolutionize patient care delivery and medical practice efficiency. Built for the BPUT Hackathon 2025.",
    githubRepo: "https://github.com/ManashR7488/Hospital-CRM-System",
    techStack: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "LangChain", "Gemini 2.5 Flash"],
    level: "Advanced",
    admin: {
      name: "ManashR7488",
      linkedin: "", // Not provided
      github: "ManashR7488",
      avatar: "https://github.com/ManashR7488.png"
    },
  },
  {
    title: "GitPulse",
    description: "GitHub Pulse is a feature on GitHub that shows the recent activity of a repository over the default branch.",
    githubRepo: "https://github.com/SoumyaMishra-7/gitpulse_04",
    techStack: ["MongoDB", "React", "Node.js", "Express", "JavaScript", "Git", "GitHub"],
    level: "Intermediate",
    admin: {
      name: "SoumyaMishra-7",
      linkedin: "", // Not provided
      github: "SoumyaMishra-7",
      avatar: "https://github.com/SoumyaMishra-7.png"
    },
  },
  {
    title: "AI-Powered Financial Entry Automation Tool",
    description: "A smart software solution designed to automate the process of recording, categorizing, and managing financial transactions using AI and ML.",
    githubRepo: "https://github.com/Kasim-09/T3_FSD_BOOTSTRAP-5",
    techStack: ["Python", "NumPy", "Pandas", "Matplotlib"],
    level: "Intermediate",
    admin: {
      name: "Kasimhussain Vijapura",
      linkedin: "https://www.linkedin.com/in/kasimhussain-vijapura", // Inferred pattern or just name from request 'Kasimhussain Vijapura'
      github: "Kasim-09",
      avatar: "https://github.com/Kasim-09.png"
    },
  },
  {
    title: "dairy mangement",
    description: "Management software for the dairy farming industry developed using open-source technologies with frontend and backend teams.",
    githubRepo: "N/A",
    techStack: ["Frappe", "Raven Chat", "Custom Dock Types"],
    level: "Intermediate",
    admin: {
      name: "Hareharan",
      linkedin: "https://www.linkedin.com/in/hareharan-/",
      github: "internetartsy", // Inferred from the other project in this batch 'JK' which uses 'internetartsy'
      avatar: "https://github.com/internetartsy.png"
    },
  },
  {
    title: "Jammu and Kashmir Policy Project",
    description: "Government agricultural data digitization project using OCR, blockchain security, mapping, and multilingual translation to Urdu.",
    githubRepo: "https://github.com/internetartsy/JK",
    liveLink: "https://github.com/internetartsy/JK",
    techStack: ["Frappe", "Python", "Rust", "Native App"],
    level: "Advanced",
    admin: {
      name: "Hareharan",
      linkedin: "https://www.linkedin.com/in/hareharan-/",
      github: "internetartsy",
      avatar: "https://github.com/internetartsy.png"
    },
  },
  {
    title: "Resume Builder",
    description: "A powerful and user-friendly Resume Builder web application with Firebase authentication.",
    githubRepo: "https://github.com/joni7679/OSCGOpenSourceResumeBulider",
    techStack: ["React", "Tailwind CSS", "DaisyUI", "Firebase Auth", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Joni Halder",
      linkedin: "https://www.linkedin.com/in/joni-halder/",
      github: "joni7679",
      avatar: "https://github.com/joni7679.png"
    },
  },
  {
    title: "Grocery Store Website",
    description: "This is a Grocery Store website built using HTML, CSS, and JavaScript.",
    githubRepo: "https://github.com/joni7679/grocery_store.com",
    liveLink: "https://github.com/joni7679/grocery_store.com",
    techStack: ["HTML", "CSS", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Joni Halder",
      linkedin: "https://www.linkedin.com/in/joni-halder/",
      github: "joni7679",
      avatar: "https://github.com/joni7679.png"
    },
  },
  {
    title: "Dictionary",
    description: "A Python Tkinter desktop dictionary app that fetches and displays word meanings and examples using an online dictionary API.",
    githubRepo: "https://github.com/Aadi1039/Dictionary",
    techStack: ["Python Tkinter"],
    level: "Intermediate",
    admin: {
      name: "Aditya Kumar",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-1o39/",
      github: "Aadi1039",
      avatar: "https://github.com/Aadi1039.png"
    },
  },
  {
    title: "CSV-Parser-Cpp",
    description: "C++ CSV parser with in-memory sorting, derived columns, and interactive CLI.",
    githubRepo: "https://github.com/Aadi1039/CSV-Parser-Cpp",
    techStack: ["C++"],
    level: "Intermediate",
    admin: {
      name: "Aditya Kumar",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-1o39/",
      github: "Aadi1039",
      avatar: "https://github.com/Aadi1039.png"
    },
  },
  {
    title: "PrivGPT Studio",
    description: "PrivGPT Studio is a privacy-first AI workspace supporting local and cloud models with multimedia analysis, voice input, and collaboration features.",
    githubRepo: "https://github.com/Rucha-Ambaliya/PrivGPT-Studio",
    liveLink: "https://discord.gg/J9z5T52rkZ",
    techStack: ["Next.js", "TypeScript", "React", "Flask", "MongoDB", "Tailwind", "Ollama", "Gemini"],
    level: "Intermediate",
    admin: {
      name: "Rucha Ambaliya",
      linkedin: "https://www.linkedin.com/in/rucha-ambaliya",
      github: "Rucha-Ambaliya",
      avatar: "https://github.com/Rucha-Ambaliya.png"
    },
  },
  {
    title: "School Website",
    description: "EduStream is a comprehensive Full-Stack Academic Management Portal with real-time notices and AI-integrated support.",
    githubRepo: "https://github.com/Sitaram8472/School_Website",
    techStack: ["MERN", "AI"],
    level: "Intermediate",
    admin: {
      name: "Sitaram Sahu",
      linkedin: "https://www.linkedin.com/in/sitaram-sahu/",
      github: "Sitaram8472",
      avatar: "https://github.com/Sitaram8472.png"
    },
  },
  {
    title: "Code A2Z",
    description: "Code A2Z is an ecosystem built to empower developers by enabling collaborative coding, real-time editing, intelligent project organization, and structured contributions.",
    githubRepo: "https://github.com/Code-A2Z/code-a2z",
    liveLink: "https://code-a2z.vercel.app/",
    techStack: ["React", "Vite", "TypeScript", "MUI", "Express", "MongoDB"],
    level: "Intermediate",
    admin: {
      name: "Avdhesh Varshney",
      linkedin: "https://www.linkedin.com/in/avdhesh-varshney",
      github: "Code-A2Z", // Using org name as repo owner is org, defaulting to it or user if known. Request said 'Avdhesh Varshney'. The repo url is Code-A2Z/code-a2z. I will try to find the user github if possible or just use the org. Actually let's use the repo owner name from url which is Code-A2Z.
      avatar: "https://github.com/Code-A2Z.png"
    },
  },
  {
    title: "Task Manager",
    description: "A full-stack task management web application with secure authentication, real-time updates, and scalable architecture.",
    githubRepo: "https://github.com/NavyaAgarwal02/Task-Manager",
    liveLink: "https://student-task-manager-frontend.onrender.com/",
    techStack: ["MERN Stack"],
    level: "Advanced",
    admin: {
      name: "Navya Agarwal",
      linkedin: "https://www.linkedin.com/in/inavyaagarwal/",
      github: "NavyaAgarwal02",
      avatar: "https://github.com/NavyaAgarwal02.png"
    },
  },
  {
    title: "HTMLify",
    description: "HTMLify is a web service for sharing code snippets and hosting HTML projects.",
    githubRepo: "https://github.com/Artizote/HTMLify",
    liveLink: "https://HTMLify.me",
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Aman Babu Hemant",
      linkedin: "https://linkedin.com/in/AmanBabuHemant",
      github: "Artizote",
      avatar: "https://github.com/Artizote.png"
    },
  },
  {
    title: "Vibe Chat",
    description: "A real-time chat application with synchronized video watching features for group interaction.",
    githubRepo: "https://github.com/SN-Verse/VibeChat",
    techStack: ["JavaScript", "Socket.io", "React", "Node.js", "Express", "MongoDB"],
    level: "Intermediate",
    admin: {
      name: "Soumyajit Nandi",
      linkedin: "https://www.linkedin.com/in/soumyajit-nandi-5298b4260/",
      github: "SN-Verse", // Org or user
      avatar: "https://github.com/SN-Verse.png"
    },
  },
  {
    title: "Rakshak-ambulance",
    description: "An emergency response platform connecting ambulances, hospitals, and patients with real-time coordination.",
    githubRepo: "https://github.com/aashutoshkumarbhardwaj/Rakshak-ambulance-",
    liveLink: "https://rakshak-ambulance.vercel.app/",
    techStack: ["Next.js", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    level: "Intermediate",
    admin: {
      name: "Aashutosh Kumar Bhardwaj",
      linkedin: "https://www.linkedin.com/in/aashutoshkumarbhardwaj",
      github: "aashutoshkumarbhardwaj",
      avatar: "https://github.com/aashutoshkumarbhardwaj.png"
    },
  },
  {
    title: "Titli - social media all in one",
    description: "An open-source link infrastructure for creators offering smart routing and customizable bio links.",
    githubRepo: "https://github.com/aashutoshkumarbhardwaj/Titli-linkShortner",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "NextAuth"],
    level: "Intermediate",
    admin: {
      name: "Aashutosh Kumar Bhardwaj",
      linkedin: "https://www.linkedin.com/in/aashutoshkumarbhardwaj",
      github: "aashutoshkumarbhardwaj",
      avatar: "https://github.com/aashutoshkumarbhardwaj.png"
    },
  },
  {
    title: "Gharse",
    description: "A platform connecting home cooks with customers for affordable home-style meals.",
    githubRepo: "https://github.com/jaiashwinisatish/GharSe",
    liveLink: "https://ghar-se-eight.vercel.app/",
    techStack: ["React", "TypeScript", "TailwindCSS", "Supabase"],
    level: "Intermediate",
    admin: {
      name: "Ashwini Jaiswal",
      linkedin: "https://www.linkedin.com/in/ashwini-jaiswal-095165282/",
      github: "jaiashwinisatish",
      avatar: "https://github.com/jaiashwinisatish.png"
    },
  },
  {
    title: "Pixory",
    description: "AI-Assisted Image Storage & Analysis Platform. Built with Spring Boot and Cloudinary for secure uploads, integrating Google Gemini for automated image analysis.",
    githubRepo: "https://github.com/RohitSalv/pixory-project",
    liveLink: "https://pixory-three.vercel.app/",
    techStack: ["Angular", "Spring Boot", "MySQL", "REST APIs", "JWT Authentication", "Cloudinary", "Google Gemini API"],
    level: "Intermediate",
    admin: {
      name: "Rohit Salve",
      linkedin: "https://www.linkedin.com/in/rohit-salve-6054b324a",
      github: "RohitSalv",
      avatar: "https://github.com/RohitSalv.png"
    },
  },
  {
    title: "Investment Calculator",
    description: "Investment-Calculator is a smart financial tool that helps users calculate SIP, Lumpsum, and SWP returns instantly.",
    githubRepo: "https://github.com/Surja2003/Investment-Calculator",
    liveLink: "https://surja2003.github.io/Investment-Calculator/",
    techStack: ["JAVASCRIPT", "CSS", "HTML", "REACT", "VITE"],
    level: "Intermediate",
    admin: {
      name: "Nespendra Das",
      linkedin: "https://www.linkedin.com/in/nespendra-das-939577338",
      github: "Surja2003",
      avatar: "https://github.com/Surja2003.png"
    },
  },
  {
    title: "Summarify.Ai",
    description: "Summarify is a web app for fast document summarization and adaptive highlighting.",
    githubRepo: "https://github.com/Surja2003/Summarify.ai",
    techStack: ["TypeScript", "CSS", "Python", "HTML"],
    level: "Intermediate",
    admin: {
      name: "Nespendra Das",
      linkedin: "https://www.linkedin.com/in/nespendra-das-939577338",
      github: "Surja2003",
      avatar: "https://github.com/Surja2003.png"
    },
  },
  {
    title: "CitiFix",
    description: "A Crowdsourced Civic issue reporting and resolving system with integrated twitter complaining System",
    githubRepo: "https://github.com/aryachackraborty-spec/citifix-CAE",
    techStack: ["React", "Javascript", "Tailwind CSS", "Vite", "Node.js"],
    level: "Intermediate",
    admin: {
      name: "Arya Chackraborty",
      linkedin: "https://www.linkedin.com/in/arya-chackraborty",
      github: "aryachackraborty-spec",
      avatar: "https://github.com/aryachackraborty-spec.png"
    },
  },
  {
    title: "Basketball Ai shot analyser",
    description: "used YOLOv8 for object detection and Polynomial Regression for trajectory physics.",
    githubRepo: "https://github.com/Manyaaa-ops/Basketball-AI-Analytics",
    techStack: ["YOLOv8", "Polynomial Regression"],
    level: "Beginner",
    admin: {
      name: "Manyaaa-ops",
      linkedin: "", // Not provided
      github: "Manyaaa-ops",
      avatar: "https://github.com/Manyaaa-ops.png"
    },
  },
  {
    title: "pm-internship-portal",
    description: "the project was related to internship and job oportunities for student with better and advanced filteration facility and ai recommendation was integrated in the project",
    githubRepo: "https://github.com/yashrajpurohit7/pm-internship-portal-website",
    techStack: ["MERN stack"],
    level: "Advanced",
    admin: {
      name: "Yashwant Singh",
      linkedin: "https://www.linkedin.com/in/yashwant-singh-40856b307",
      github: "yashrajpurohit7",
      avatar: "https://github.com/yashrajpurohit7.png"
    },
  },
  {
    title: "pm-internship-backend",
    description: "backend to support first project",
    githubRepo: "https://github.com/yashrajpurohit7/pm-internship-backend",
    techStack: ["javascript"],
    level: "Advanced",
    admin: {
      name: "Yashwant Singh",
      linkedin: "https://www.linkedin.com/in/yashwant-singh-40856b307",
      github: "yashrajpurohit7",
      avatar: "https://github.com/yashrajpurohit7.png"
    },
  },
  {
    title: "RISC-V CPU",
    description: "RISC-V_CPU is an open-source, industry-oriented implementation of a pipelined RISC-V RV32I processor core written in synthesizable Verilog HDL.",
    githubRepo: "https://github.com/ArjunPShetty/RISC-V_CPU.git",
    liveLink: "https://github.com/ArjunPShetty/RISC-V_CPU.git",
    techStack: ["Verilog HDL", "RISC-V RV32I", "Amd Vivado"],
    level: "Intermediate",
    admin: {
      name: "Arjun Shetty",
      linkedin: "www.linkedin.com/in/arjunpshetty",
      github: "ArjunPShetty",
      avatar: "https://github.com/ArjunPShetty.png"
    },
  },
  {
    title: "Fusion",
    description: "A project of ai app where real world conversation will taken palce",
    githubRepo: "https://github.com/ArjunPShetty/Fusion.git",
    techStack: ["python", "html", "css", "js"],
    level: "Beginner",
    admin: {
      name: "Arjun Shetty",
      linkedin: "www.linkedin.com/in/arjunpshetty",
      github: "ArjunPShetty",
      avatar: "https://github.com/ArjunPShetty.png"
    },
  },
  {
    title: "SkillServe",
    description: "Complete service marketplace with real-time chat, booking, payments, AI chatbot and GPS tracking.",
    githubRepo: "https://github.com/yashduggal01/SkillServe.git",
    liveLink: "https://skillserve.onrender.com",
    techStack: ["MERN stack", "Socket.IO", "JWT", "Stripe", "Google Gemini API", "MongoDB Atlas", "Cloudinary"],
    level: "Intermediate",
    admin: {
      name: "Yash Duggal",
      linkedin: "https://www.linkedin.com/in/yash-duggal-157080289",
      github: "yashduggal01",
      avatar: "https://github.com/yashduggal01.png"
    },
  },
  {
    title: "NIRAIVIZHI – AI Waterborne Disease Prediction System",
    description: "Smart IoT robot + mobile app to monitor water quality and predict disease outbreaks using ML and WHO thresholds.",
    githubRepo: "https://github.com/Jeeveshsankar/NIRAIVIZHI",
    techStack: ["Flutter", "Firebase", "ESP32", "IoT Sensors", "ML", "Fusion 360"],
    level: "Advanced",
    admin: {
      name: "Jeevesh Sankar",
      linkedin: "https://www.linkedin.com/in/jeeveshsankar",
      github: "Jeeveshsankar",
      avatar: "https://github.com/Jeeveshsankar.png"
    },
  },
  {
    title: "ElderSafe – Smart Health Monitoring System",
    description: "IoT-based continuous health monitoring with emergency alerts for elderly people.",
    githubRepo: "https://github.com/Jeeveshsankar/HEALTH-MONITORING-SYSTEM",
    techStack: ["ESP32", "sensors", "web dashboard", "real-time alerts"],
    level: "Advanced",
    admin: {
      name: "Jeevesh Sankar",
      linkedin: "https://www.linkedin.com/in/jeeveshsankar",
      github: "Jeeveshsankar",
      avatar: "https://github.com/Jeeveshsankar.png"
    },
  },
  {
    title: "Offline RAG Chatbot for PDF",
    description: "Privacy-first offline chatbot using local LLMs and FAISS for PDF-based Q&A.",
    githubRepo: "https://github.com/iamakashjha/Offline-RAG-Chatbot-for-PDF",
    techStack: ["Python", "Streamlit", "FAISS", "Ollama", "RAG architecture"],
    level: "Beginner",
    admin: {
      name: "Akash Jha",
      linkedin: "https://www.linkedin.com/in/iamakashjha/",
      github: "iamakashjha",
      avatar: "https://github.com/iamakashjha.png"
    },
  },
  {
    title: "Amazon Electronics Sales Analysis",
    description: "Data analysis of Amazon electronics sales with Python and BI dashboards.",
    githubRepo: "https://github.com/iamakashjha/Amazon-Electronics-Sales-Data-Analysis-with-Python",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI"],
    level: "Intermediate",
    admin: {
      name: "Akash Jha",
      linkedin: "https://www.linkedin.com/in/iamakashjha/",
      github: "iamakashjha",
      avatar: "https://github.com/iamakashjha.png"
    },
  },
  {
    title: "Voice-Powered Interactive Weather Application",
    description: "Voice-enabled real-time weather application using APIs.",
    githubRepo: "https://pankaj955956.github.io/-voice-powered-advanced-weather-app/",
    liveLink: "https://pankaj955956.github.io/-voice-powered-advanced-weather-app/",
    techStack: ["JavaScript", "OpenWeather API", "Web Speech API"],
    level: "Intermediate",
    admin: {
      name: "Pankaj DS",
      linkedin: "https://www.linkedin.com/in/pankaj-ds/",
      github: "pankaj955956",
      avatar: "https://github.com/pankaj955956.png"
    },
  },
  {
    title: "Periodic Table Explorer",
    description: "Interactive React app for visualizing periodic table elements.",
    githubRepo: "https://github.com/shwetap3000/Periodic-Table-Explorer.git",
    techStack: ["React", "JavaScript", "CSS"],
    level: "Beginner",
    admin: {
      name: "Sweta Prasad",
      linkedin: "www.linkedin.com/in/sweta-prasad-49a786320",
      github: "shwetap3000",
      avatar: "https://github.com/shwetap3000.png"
    },
  },
  {
    title: "AgentUnit",
    description: "Framework for benchmarking multi-agent AI systems.",
    githubRepo: "https://github.com/aviralgarg05/agentunit",
    liveLink: "https://pypi.org/project/agentunit/",
    techStack: ["Python"],
    level: "Intermediate",
    admin: {
      name: "Aviral Garg",
      linkedin: "https://www.linkedin.com/in/aviral-garg-b7b053280/",
      github: "aviralgarg05",
      avatar: "https://github.com/aviralgarg05.png"
    },
  },
  {
    title: "Mika – AI Voice Companion",
    description: "AI-powered voice assistant with 3D avatar interaction.",
    githubRepo: "https://github.com/RakshitV-12/Mika-Your_personalized_AI_Companion",
    liveLink: "LinkedIn demo post",
    techStack: ["Python", "OpenAI API", "Whisper", "ElevenLabs", "VTube Studio"],
    level: "Beginner",
    admin: {
      name: "Rakshit Verma",
      linkedin: "www.linkedin.com/in/rakshitverma16",
      github: "RakshitV-12",
      avatar: "https://github.com/RakshitV-12.png"
    },
  },
  {
    title: "StructDB Mini Database",
    description: "Python-based mini DB engine with indexing and SQL-like queries.",
    githubRepo: "https://github.com/poojapadiyar143/MINI-db",
    techStack: ["Python", "Data Structures", "Tkinter"],
    level: "Intermediate",
    admin: {
      name: "Pooja Padiyar",
      linkedin: "https://www.linkedin.com/in/pooja-padiyar-bb427833b",
      github: "poojapadiyar143",
      avatar: "https://github.com/poojapadiyar143.png"
    },
  },
  {
    title: "Email Spam Detection System",
    description: "ML + NLP full stack app for spam classification with OCR support.",
    githubRepo: "https://github.com/poojapadiyar143/Email-spam-detection",
    techStack: ["Python", "Flask", "Scikit-learn", "SQLite"],
    level: "Intermediate",
    admin: {
      name: "Pooja Padiyar",
      linkedin: "https://www.linkedin.com/in/pooja-padiyar-bb427833b",
      github: "poojapadiyar143",
      avatar: "https://github.com/poojapadiyar143.png"
    },
  },
  {
    title: "Coin-View",
    description: "Crypto price tracking dashboard with live data.",
    githubRepo: "https://github.com/Swaim-Sahay/CoinView",
    liveLink: "https://coin-view-phi.vercel.app/",
    techStack: ["React", "Vite", "CoinGecko API"],
    level: "Beginner",
    admin: {
      name: "Swaim-Sahay",
      linkedin: "", // Not provided
      github: "Swaim-Sahay",
      avatar: "https://github.com/Swaim-Sahay.png"
    },
  },
  {
    title: "Book Recommendation App",
    description: "Personal library app with Google Books API and smart search.",
    githubRepo: "https://github.com/Swaim-Sahay/BookRecommendation",
    liveLink: "https://deployed-book.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Swaim-Sahay",
      linkedin: "", // Not provided
      github: "Swaim-Sahay",
      avatar: "https://github.com/Swaim-Sahay.png"
    },
  },
  {
    title: "SS-Capture",
    description: "Full-page screenshots tool for capturing complete webpages in one click.",
    githubRepo: "https://github.com/harshyadav152/Ss-capture",
    techStack: ["Next.js", "React", "MongoDB", "Tailwind", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Vinay Kumar",
      linkedin: "https://www.linkedin.com/in/vinaykumar812",
      github: "harshyadav152", // Repo owner seems to be harshyadav152, but admin name is Vinay Kumar. Using repo owner for github handle.
      avatar: "https://github.com/harshyadav152.png"
    },
  },
  {
    title: "AI Course Generator",
    description: "Automatically generates courses and quizzes using Bloom’s Taxonomy.",
    githubRepo: "NA",
    techStack: ["Python", "Django", "Flask", "FastAPI"],
    level: "Intermediate",
    admin: {
      name: "Prabhash Avala",
      linkedin: "https://www.linkedin.com/in/prabhash-avala",
      github: "PrabhashAvala", // Inferred
      avatar: "https://github.com/PrabhashAvala.png"
    },
  },
  {
    title: "Uni-Event",
    description: "Mobile-first open-source platform for university event management.",
    githubRepo: "https://github.com/roshankumar0036singh/Uni-Event",
    techStack: ["React Native", "TypeScript", "Firebase", "Docker", "Expo"],
    level: "Advanced",
    admin: {
      name: "Roshan Singh",
      linkedin: "https://www.linkedin.com/in/roshan-singh-3704392b4",
      github: "roshankumar0036singh",
      avatar: "https://github.com/roshankumar0036singh.png"
    },
  },
  {
    title: "AI-Driven Phishing Detection System",
    description: "Real-time phishing detection using ML models and Google Gemini API with Chrome extension.",
    githubRepo: "https://github.com/roshankumar0036singh/AI-Driven-Phishing-Detection-System",
    techStack: ["Python", "FastAPI", "TensorFlow", "LightGBM", "React", "Docker", "PostgreSQL"],
    level: "Advanced",
    admin: {
      name: "Roshan Singh",
      linkedin: "https://www.linkedin.com/in/roshan-singh-3704392b4",
      github: "roshankumar0036singh",
      avatar: "https://github.com/roshankumar0036singh.png"
    },
  },
  {
    title: "8byte – Social Networking Platform",
    description: "Full-featured social networking app with video calls, encrypted messaging, and portfolios.",
    githubRepo: "https://github.com/Ayush-Patel-56/User-Auth",
    liveLink: "https://8byte-beryl.vercel.app/",
    techStack: ["Django", "DRF", "PostgreSQL", "Tailwind", "JavaScript", "Agora RTC"],
    level: "Intermediate",
    admin: {
      name: "Ayush Patel",
      linkedin: "www.linkedin.com/in/ayush-patel-15429b359",
      github: "Ayush-Patel-56",
      avatar: "https://github.com/Ayush-Patel-56.png"
    },
  },
  {
    title: "SONIQ – Music Streaming Platform",
    description: "Spotify-inspired music platform with remix and karaoke features.",
    githubRepo: "https://github.com/Ayush-Patel-56/soniq-music-player",
    liveLink: "Figma design link",
    techStack: ["HTML", "CSS", "JavaScript", "Django", "Tailwind"],
    level: "Intermediate",
    admin: {
      name: "Ayush Patel",
      linkedin: "www.linkedin.com/in/ayush-patel-15429b359",
      github: "Ayush-Patel-56",
      avatar: "https://github.com/Ayush-Patel-56.png"
    },
  },
  {
    title: "AI Summarization Tool",
    description: "Flask-based NLP app for summarizing text and documents with analytics and PDF export.",
    githubRepo: "https://github.com/Anshika09Singh/ai-summarizer",
    techStack: ["Python", "Flask", "Transformers (BART)", "spaCy", "HTML", "CSS", "JS"],
    level: "Intermediate",
    admin: {
      name: "Anshika Singh",
      linkedin: "https://www.linkedin.com/in/anshika-singh093",
      github: "Anshika09Singh",
      avatar: "https://github.com/Anshika09Singh.png"
    },
  },
  {
    title: "Eco-Agent",
    description: "Python suite to track and optimize carbon footprint of AI training.",
    githubRepo: "https://github.com/Dbansal06/Eco-Agent",
    techStack: ["Python", "CodeCarbon", "Streamlit", "Pandas", "NumPy"],
    level: "Intermediate",
    admin: {
      name: "Deenu Bansal",
      linkedin: "https://www.linkedin.com/in/deenu-bansal",
      github: "Dbansal06",
      avatar: "https://github.com/Dbansal06.png"
    },
  },
  {
    title: "Alumni Management System",
    description: "Web platform to connect alumni with networking, events, and job opportunities.",
    githubRepo: "https://github.com/omkarhole/Alumni-Management-System",
    techStack: ["React", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
    level: "Beginner",
    admin: {
      name: "Omkar Hole",
      linkedin: "https://www.linkedin.com/in/omkar-hole-c0der",
      github: "omkarhole",
      avatar: "https://github.com/omkarhole.png"
    },
  },
  {
    title: "Currency Converter",
    description: "A web-based Currency Converter application that allows users to convert one currency into another using predefined or real-time exchange rates.",
    githubRepo: "https://github.com/Manassri1220/currency-converter",
    techStack: ["HTML", "CSS", "JAVASCRIPT"],
    level: "Intermediate",
    admin: {
      name: "Manas Srivastava",
      linkedin: "https://www.linkedin.com/in/manas-srivastava-209b15245",
      github: "Manassri1220",
      avatar: "https://github.com/Manassri1220.png"
    },
  },
  {
    title: "Rock Paper Scissors ( Mini Game )",
    description: "An interactive Rock Paper Scissors game where the user plays against the computer.",
    githubRepo: "https://github.com/Manassri1220/rock-paper-scissors",
    techStack: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Manas Srivastava",
      linkedin: "https://www.linkedin.com/in/manas-srivastava-209b15245",
      github: "Manassri1220",
      avatar: "https://github.com/Manassri1220.png"
    },
  },
  {
    title: "ClinIQ",
    description: "ClinIQ is an AI-powered health platform designed to make healthcare more accessible. It features an AI symptom checker, a verified doctor directory, and an appointment booking system.",
    githubRepo: "https://github.com/akshay0611/ClinIQ",
    liveLink: "https://cliniq-iota.vercel.app/",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Supabase", "Gemini API", "GitHub Actions"],
    level: "Intermediate",
    admin: {
      name: "Akshay Kumar",
      linkedin: "https://www.linkedin.com/in/akshaykumar0611/",
      github: "akshay0611",
      avatar: "https://github.com/akshay0611.png"
    },
  },
  {
    title: "EduBridge",
    description: "EduBridge is a full-stack web application designed to provide interactive learning resources, quizzes, and AI-driven guidance for students.",
    githubRepo: "https://github.com/AditixAnand/EduBridge",
    techStack: ["HTML", "CSS", "JavaScript", "Python", "Flask", "OpenAI API"],
    level: "Advanced",
    admin: {
      name: "Aditi Anand",
      linkedin: "https://www.linkedin.com/in/aditi-anand-745458318/",
      github: "AditixAnand",
      avatar: "https://github.com/AditixAnand.png"
    },
  },
  {
    title: "EventMaster",
    description: "Techxcelerate – EventMaster is a Smart Event Booking and Entry Management System designed to streamline event ticketing and automate entry processes.",
    githubRepo: "https://github.com/AditixAnand/Techxcelerate-EventMaster-for-smart-event-booking-and-Entry-Management-System",
    techStack: ["HTML", "CSS", "JavaScript", "QR/NFC ticketing"],
    level: "Beginner",
    admin: {
      name: "Aditi Anand",
      linkedin: "https://www.linkedin.com/in/aditi-anand-745458318/",
      github: "AditixAnand",
      avatar: "https://github.com/AditixAnand.png"
    },
  },
  {
    title: "Student Management System",
    description: "A Student Management System is a basic academic project developed to manage student records digitally.",
    githubRepo: "https://github.com/your-username/student-management-system",
    liveLink: "N/A",
    techStack: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Nishtha Priyadarshi",
      linkedin: "https://www.linkedin.com/in/nishtha-priyadarshi-764250286",
      github: "unknown", // Cannot infer easily, using placeholder or checking if I should omit
      avatar: "" // Unknown
    },
  },
  {
    title: "Buy Me a Chai",
    description: "Buy Me a Chai is a full-stack creator support platform where users can financially support creators by making small donations.",
    githubRepo: "https://github.com/codecrafter34/Buy-Me-A-Chai",
    techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB", "Razorpay"],
    level: "Beginner",
    admin: {
      name: "Saksham Gupta",
      linkedin: "https://www.linkedin.com/in/saksham-gupta-813869287/",
      github: "codecrafter34",
      avatar: "https://github.com/codecrafter34.png"
    },
  },
  {
    title: "unimart",
    description: "Unimart is a web-based e-commerce platform that enables users to buy and sell fully customized products according to their personal preferences.",
    githubRepo: "https://github.com/student-sejalsingh/uniMart",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Razorpay"],
    level: "Intermediate",
    admin: {
      name: "Sejal Kumari",
      linkedin: "https://www.linkedin.com/in/sejal-kumari-944384313",
      github: "student-sejalsingh",
      avatar: "https://github.com/student-sejalsingh.png"
    },
  },
  {
    title: "TypeFlow",
    description: "TypeFlow is a real-time typing trainer and analytics dashboard with speed, accuracy tracking and visualizations.",
    githubRepo: "https://github.com/abhi9vaidya/TypeFlow",
    liveLink: "typeflow1535.vercel.app",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    level: "Intermediate",
    admin: {
      name: "Abhinav Vaidya",
      linkedin: "https://www.linkedin.com/in/abhi9vaidya15/",
      github: "abhi9vaidya",
      avatar: "https://github.com/abhi9vaidya.png"
    },
  },
  {
    title: "Guitariz",
    description: "Guitariz is a web app for guitar players that analyzes uploaded audio to detect chords and provide practice tools.",
    githubRepo: "https://github.com/abhi9vaidya/Guitariz",
    techStack: ["React", "TypeScript", "FastAPI", "Python", "ML audio processing"],
    level: "Intermediate",
    admin: {
      name: "Abhinav Vaidya",
      linkedin: "https://www.linkedin.com/in/abhi9vaidya15/",
      github: "abhi9vaidya",
      avatar: "https://github.com/abhi9vaidya.png"
    },
  },
  {
    title: "LCBAD comics",
    description: "Just a web development project with user authentication.",
    githubRepo: "https://github.com/AthiestAtom/LCBAD/",
    liveLink: "https://athiestatom.github.io/LCBAD/",
    techStack: ["TypeScript", "Vite"],
    level: "Beginner",
    admin: {
      name: "Jashan Bansal",
      linkedin: "https://www.linkedin.com/in/jashan-bansal-02309b317",
      github: "AthiestAtom",
      avatar: "https://github.com/AthiestAtom.png"
    },
  },
  {
    title: "Laptop price predictor",
    description: "A machine learning project that predicts laptop prices based on user preferences.",
    githubRepo: "N/A",
    liveLink: "N/A",
    techStack: ["Python", "Streamlit"],
    level: "Intermediate",
    admin: {
      name: "Jashan Bansal",
      linkedin: "https://www.linkedin.com/in/jashan-bansal-02309b317",
      github: "AthiestAtom", // Inferred from other project
      avatar: "https://github.com/AthiestAtom.png"
    },
  },
  {
    title: "Coderrr",
    description: "Opensource TUI based AI agent, a free version of Claude Code.",
    githubRepo: "https://github.com/Akash-nath29/Coderrr",
    liveLink: "https://coderrr.aksn.lol",
    techStack: ["Python", "TypeScript"],
    level: "Intermediate",
    admin: {
      name: "Akash Nath",
      linkedin: "https://www.linkedin.com/in/akash-nath29",
      github: "Akash-nath29",
      avatar: "https://github.com/Akash-nath29.png"
    },
  },
  {
    title: "KRISHI MITRA",
    description: "Its a farmer assistant app which is user friendly and is ai integrated for weather forecasting, soil quality detection, crop suggestion and diseases.",
    githubRepo: "https://github.com/pandacoder251/krishi-mitra-frontend-",
    techStack: ["HTML5", "Tailwind CSS", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Pousali Dolai",
      linkedin: "https://www.linkedin.com/in/pousali-dolai-b8971a344",
      github: "pandacoder251",
      avatar: "https://github.com/pandacoder251.png"
    },
  },
  {
    title: "G-secure",
    description: "About G-Secure is a modern, secure, and user-friendly password management solution designed to keep your credentials safe and always within reach.",
    githubRepo: "https://github.com/HarshYadav152/Gsecure",
    liveLink: "https://gsecure.geetasystems.co.in",
    techStack: ["React", "Next JS", "Node.js", "Tailwind CSS", "MongoDB"],
    level: "Intermediate",
    admin: {
      name: "Harsh Yadav",
      linkedin: "https://linkedin.com/in/harshyadav152",
      github: "HarshYadav152",
      avatar: "https://github.com/HarshYadav152.png"
    },
  },
  {
    title: "SaveBook",
    description: "SaveBook is a modern web application designed for note-taking and knowledge management.",
    githubRepo: "https://github.com/HarshYadav152/SaveBook",
    techStack: ["React", "Next JS", "Node.js", "Tailwind CSS", "MongoDB"],
    level: "Intermediate",
    admin: {
      name: "Harsh Yadav",
      linkedin: "https://linkedin.com/in/harshyadav152",
      github: "HarshYadav152",
      avatar: "https://github.com/HarshYadav152.png"
    },
  },
  {
    title: "DIGITAL FARMER MARKET WITH BIDDING SYSTEM",
    description: "TerraFresh is a high-end MERN stack marketplace designed to bridge the gap between local farmers and consumers. It features a real-time auction system, 3D immersive UI, and automated weather-based agricultural insights.",
    githubRepo: "https://github.com/RahulSharma4532/Digital-Farming-Market-with-Bidding-System.git",
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas"],
    level: "Intermediate",
    admin: {
      name: "Rahul Sharma",
      linkedin: "www.linkedin.com/in/rahul-sharma1906/",
      github: "RahulSharma4532",
      avatar: "https://github.com/RahulSharma4532.png"
    },
  },
  {
    title: "QuickGPT",
    description: "Built an Ai Chat Application with Image Generted.",
    githubRepo: "https://github.com/santhosh-07-sandy/QuickGPT",
    liveLink: "https://quick-gpt-bice.vercel.app/",
    techStack: ["MERN Stack"],
    level: "Intermediate",
    admin: {
      name: "Santhosh",
      linkedin: "https://www.linkedin.com/in/santhosh2k3/",
      github: "santhosh-07-sandy",
      avatar: "https://github.com/santhosh-07-sandy.png"
    },
  },
  {
    title: "CollegeManagement",
    description: "The Campus Management App is an Android-based application designed to simplify and digitalize campus-related activities.",
    githubRepo: "https://github.com/RajMajhi/CollegeManagement",
    techStack: ["Java", "XML", "Firebase", "Android Studio"],
    level: "Advanced",
    admin: {
      name: "Raj Majhi",
      linkedin: "https://www.linkedin.com/in/raj-majhi/",
      github: "RajMajhi",
      avatar: "https://github.com/RajMajhi.png"
    },
  },
  {
    title: "Task Manager (ongoing)",
    description: "Student Task Manager is a web-based productivity app built with Python (FastAPI) and a simple HTML/CSS/JS frontend.",
    githubRepo: "https://github.com/RajMajhi/Taskmanager",
    techStack: ["Python (FastAPI)", "HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Raj Majhi",
      linkedin: "https://www.linkedin.com/in/raj-majhi/",
      github: "RajMajhi",
      avatar: "https://github.com/RajMajhi.png"
    },
  },
  {
    title: "Vybe",
    description: "Firebase-powered social media platform with community circles and real-time interaction.",
    githubRepo: "https://github.com/pushkar1007/Vybe",
    techStack: ["React.js", "Chakra UI", "Firebase", "Firestore"],
    level: "Intermediate",
    admin: {
      name: "Pushkar Nanwani",
      linkedin: "www.linkedin.com/in/pushkar-nanwani",
      github: "pushkar1007",
      avatar: "https://github.com/pushkar1007.png"
    },
  },
  {
    title: "VishwaGuru",
    description: "AI-powered civic engagement platform simplifying democratic processes in India.",
    githubRepo: "https://github.com/RohanExploit/Vishwaguru",
    techStack: ["Python", "FastAPI", "ML", "React", "JavaScript"],
    level: "Intermediate",
    admin: {
      name: "Rohan Vijay Gaikwad",
      linkedin: "https://www.linkedin.com/in/rohanvijaygaikwad",
      github: "RohanExploit",
      avatar: "https://github.com/RohanExploit.png"
    },
  },
  {
    title: "AI Fitness Trainer",
    description: "Computer vision based real-time exercise tracking and feedback system.",
    githubRepo: "https://github.com/PathakAman66/ai-fitness",
    techStack: ["Python", "OpenCV", "MediaPipe", "Streamlit", "FastAPI"],
    level: "Intermediate",
    admin: {
      name: "Aman Pathak",
      linkedin: "https://www.linkedin.com/in/aman-pathak-a87543321",
      github: "PathakAman66",
      avatar: "https://github.com/PathakAman66.png"
    },
  },
  {
    title: "AI Symptoms Checker",
    description: "AI-powered symptom analysis and emergency scoring system.",
    githubRepo: "https://github.com/PathakAman66/ai-symptoms-checker",
    techStack: ["Python", "NLP", "ML", "FastAPI"],
    level: "Beginner",
    admin: {
      name: "Aman Pathak",
      linkedin: "https://www.linkedin.com/in/aman-pathak-a87543321",
      github: "PathakAman66",
      avatar: "https://github.com/PathakAman66.png"
    },
  },
  {
    title: "E-Gram Panchayat",
    description: "Digital governance platform for rural administration systems.",
    githubRepo: "https://github.com/Ananya-R2004/E-Gram-Panchayat",
    techStack: ["HTML", "CSS", "JavaScript", "TypeScript"],
    level: "Intermediate",
    admin: {
      name: "Ananya R",
      linkedin: "https://www.linkedin.com/in/ananya-r-a7b57b2a4",
      github: "Ananya-R2004",
      avatar: "https://github.com/Ananya-R2004.png"
    },
  },
  {
    title: "Pincode Location Fetcher",
    description: "React app that fetches geo information from pin codes using OpenStreetMap API.",
    githubRepo: "https://github.com/jaya-sri-mattaparthi/Pincode-Location-Fetcher",
    techStack: ["React", "HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Jaya Sri Mattaparthi",
      linkedin: "https://www.linkedin.com/in/jaya-sri-mattaparthi",
      github: "jaya-sri-mattaparthi",
      avatar: "https://github.com/jaya-sri-mattaparthi.png"
    },
  },
  {
    title: "Smart Parking Management System",
    description: "Computer vision based CCTV parking slot detection system.",
    githubRepo: "https://github.com/Anindya-Dev/Galaxy-Geeks",
    techStack: ["Flask", "YOLO", "OpenCV", "JavaScript"],
    level: "Advanced",
    admin: {
      name: "Anindya Bhattacharya",
      linkedin: "https://www.linkedin.com/in/anindya-bhattacharya-83b68a254",
      github: "Anindya-Dev",
      avatar: "https://github.com/Anindya-Dev.png"
    },
  },
  {
    title: "Community Forum",
    description: "Platform to share food for underprivileged people.",
    githubRepo: "https://github.com/Vadlayugendraachari/community-forum-client",
    techStack: ["MERN stack"],
    level: "Intermediate",
    admin: {
      name: "Vadla Yugendra Achari",
      linkedin: "https://www.linkedin.com/in/vadla-yugendra-achari-4a25b722b",
      github: "Vadlayugendraachari",
      avatar: "https://github.com/Vadlayugendraachari.png"
    },
  },
  {
    title: "E-Learning Platform",
    description: "Online learning platform with courses and APIs.",
    githubRepo: "https://github.com/DhruveshOm/E-Learning-platform.git",
    techStack: ["HTML", "CSS", "React", "Firebase", "ML", "APIs"],
    level: "Beginner",
    admin: {
      name: "Dhruvesh Singh Om",
      linkedin: "www.linkedin.com/in/dhruvesh-singh-om",
      github: "DhruveshOm",
      avatar: "https://github.com/DhruveshOm.png"
    },
  },
  {
    title: "Student Faculty Management System",
    description: "Centralized academic management web application.",
    githubRepo: "https://github.com/saran709/Student-Faculty-Management-System",
    techStack: ["PHP", "MySQL", "HTML", "CSS", "JS", "Bootstrap"],
    level: "Intermediate",
    admin: {
      name: "Saran",
      linkedin: "https://www.linkedin.com/in/saran709",
      github: "saran709",
      avatar: "https://github.com/saran709.png"
    },
  },
  {
    title: "CircuitBhai",
    description: "AI-powered platform for electronics repair and recycling to reduce e-waste.",
    githubRepo: "https://github.com/himanshusingh109/CircuitBhai",
    liveLink: "https://circuitbhai-nrw8.onrender.com",
    techStack: ["React", "Node", "Express", "MongoDB", "Gemini API"],
    level: "Intermediate",
    admin: {
      name: "Himanshu Singh",
      linkedin: "https://www.linkedin.com/in/singh-himanshu01",
      github: "himanshusingh109",
      avatar: "https://github.com/himanshusingh109.png"
    },
  },
  {
    title: "PersonaCore",
    description: "Multi-agent personal AI system with long-term memory.",
    githubRepo: "https://github.com/SnehaTingare/Persona_Core",
    techStack: ["React", "FastAPI", "LLMs", "FAISS", "Docker"],
    level: "Advanced",
    admin: {
      name: "Sneha Tingare",
      linkedin: "https://www.linkedin.com/in/sneha-tingare",
      github: "SnehaTingare",
      avatar: "https://github.com/SnehaTingare.png"
    },
  },
  {
    title: "create-server-startup",
    description: "CLI tool to scaffold Node.js backend projects.",
    githubRepo: "https://github.com/TechAmigo2k25/create-server-startup",
    techStack: ["JavaScript", "TypeScript"],
    level: "Intermediate",
    admin: {
      name: "Pushpak Jaiswal",
      linkedin: "https://www.linkedin.com/in/pushpak-jaiswal",
      github: "TechAmigo2k25",
      avatar: "https://github.com/TechAmigo2k25.png"
    },
  },
  {
    title: "CardiAI",
    description: "AI-powered heart disease prediction web app with personalized recommendations.",
    githubRepo: "https://github.com/sonuku725020-commits/Heart_Disease_Analysis",
    liveLink: "https://heartdiseaseanalysis-khvdeoxbhwtxkwzgke5b6b.streamlit.app/",
    techStack: ["Python", "scikit-learn", "Streamlit", "Pandas", "Plotly"],
    level: "Intermediate",
    admin: {
      name: "Sonu Anand",
      linkedin: "https://www.linkedin.com/in/sonu-anand-135599379",
      github: "sonuku725020-commits",
      avatar: "https://github.com/sonuku725020-commits.png"
    },
  },
  {
    title: "Student CGPA Trend Analysis System",
    description: "Semester-wise CGPA analysis to understand academic performance trends using data visualization.",
    githubRepo: "https://github.com/dwivediadarsh496-commits/-CGPA-Trend-Analysis",
    liveLink: "https://huggingface.co/spaces/AdarshRani/cgpa-trend-analysis-gradio",
    techStack: ["Python", "NumPy", "Pandas", "Matplotlib", "Excel"],
    level: "Beginner",
    admin: {
      name: "Adarsh Dwivedi",
      linkedin: "www.linkedin.com/in/adarsh-dwivedi-498ba4373",
      github: "dwivediadarsh496-commits",
      avatar: "https://github.com/dwivediadarsh496-commits.png"
    },
  },
  {
    title: "UrbanWell NASA API Version",
    description: "Healthcare monitoring platform using real satellite data from NASA Earth observation systems.",
    githubRepo: "https://github.com/Shobhit-7/Healthcare-AI-Pro-Gemini-FREE",
    techStack: ["Python", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Shobhit Shukla",
      linkedin: "https://www.linkedin.com/in/shobhit-shukla-a47511261",
      github: "Shobhit-7",
      avatar: "https://github.com/Shobhit-7.png"
    },
  },
  {
    title: "Flight Price Prediction System",
    description: "ML system predicting real-world flight prices based on user inputs and market data.",
    githubRepo: "https://github.com/kuldeep0009-hub",
    techStack: ["Python", "TensorFlow", "ML", "Deep Learning", "Pandas", "NumPy", "Web Scraping"],
    level: "Intermediate",
    admin: {
      name: "Kuldeep Sharma",
      linkedin: "https://www.linkedin.com/in/kuldeep-sharma9/",
      github: "kuldeep0009-hub",
      avatar: "https://github.com/kuldeep0009-hub.png"
    },
  },
  {
    title: "SolarSim – NASA Space App Challenge 2025",
    description: "Solar weather monitoring and CME detection platform using ML and mobile apps.",
    githubRepo: "https://github.com/jayeshpandey01/Nasa-Space-App-Challage-2025",
    techStack: ["Python", "React Native", "TensorFlow", "PyTorch"],
    level: "Intermediate",
    admin: {
      name: "Jayesh Pandey",
      linkedin: "https://www.linkedin.com/in/pandey-jayesh/",
      github: "jayeshpandey01",
      avatar: "https://github.com/jayeshpandey01.png"
    },
  },
  {
    title: "Weather App",
    description: "Basic weather application built using frontend web technologies.",
    githubRepo: "https://github.com/aditya-ai00/weather",
    techStack: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    admin: {
      name: "Aditya Kumar",
      linkedin: "https://www.linkedin.com/in/aditya-kumar23/",
      github: "aditya-ai00",
      avatar: "https://github.com/aditya-ai00.png"
    },
  },
  {
    title: "WASP – Workplace Activity Simulation Program",
    description: "Open-source desktop automation tool simulating activity to bypass inactivity tracking.",
    githubRepo: "https://github.com/Deadpool2000/WASP",
    liveLink: "https://openinitia.github.io/wasp/",
    techStack: ["Python"],
    level: "Intermediate",
    admin: {
      name: "Salil Mhatre",
      linkedin: "https://linkedin.com/in/salil-mhatre-d2k",
      github: "Deadpool2000",
      avatar: "https://github.com/Deadpool2000.png"
    },
  },
  {
    title: "Farmer_care",
    description: "MERN platform bridging farmers with modern AI tools to boost productivity.",
    githubRepo: "https://github.com/dwivediprashant/Farmer_care",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
    level: "Intermediate",
    admin: {
      name: "Prashant Dwivedi",
      linkedin: "", // Not provided
      github: "dwivediprashant",
      avatar: "https://github.com/dwivediprashant.png"
    },
  },
  {
    title: "Nebula",
    description: "Real-time collaborative code editing web application.",
    githubRepo: "https://github.com/DebjaniBose31/nebula",
    techStack: ["React", "TypeScript", "Python", "HTML", "CSS"],
    level: "Intermediate",
    admin: {
      name: "Debjani Bose",
      linkedin: "https://www.linkedin.com/in/debjani-bose-6697ab293",
      github: "DebjaniBose31",
      avatar: "https://github.com/DebjaniBose31.png"
    },
  },
  {
    title: "Valorant Narrator",
    description: "Real-time voice narration system converting Valorant text chat into voice comms.",
    githubRepo: "https://github.com/JavaProgswing/valorantnarratorOPS",
    liveLink: "https://valnarrator.vercel.app/",
    techStack: ["Java", "JavaFX"],
    level: "Intermediate",
    admin: {
      name: "Yashasvi Allen Kujur",
      linkedin: "https://www.linkedin.com/in/yashasvi-allen-kujur-ba5a1533b/",
      github: "JavaProgswing",
      avatar: "https://github.com/JavaProgswing.png"
    },
  },
  {
    title: "Chess Automation",
    description: "Desktop automation tool for chess gameplay and analysis.",
    githubRepo: "https://github.com/JavaProgswing/ChessAutomationv",
    liveLink: "https://github.com/JavaProgswing/chess-server",
    techStack: ["Python", "Selenium", "Java Spring Boot"],
    level: "Intermediate",
    admin: {
      name: "Yashasvi Allen Kujur",
      linkedin: "https://www.linkedin.com/in/yashasvi-allen-kujur-ba5a1533b/",
      github: "JavaProgswing",
      avatar: "https://github.com/JavaProgswing.png"
    },
  },
  {
    title: "Mail Mind Pro",
    description: "AI-powered Gmail assistant that analyzes emails, categorizes them intelligently, detects urgency, and generates smart responses using Google Gemini AI.",
    githubRepo: "https://github.com/Beastyy69/Mail-Mind-Pro",
    liveLink: "https://www.linkedin.com/posts/harshitshaw_ai-productivity-emailassistant-activity-7394569371836219392-tgZn",
    techStack: ["HTML5", "CSS", "Vanilla JavaScript", "Google Gemini API", "Google OAuth 2.0"],
    level: "Advanced",
    admin: {
      name: "Harshit Shaw",
      linkedin: "https://www.linkedin.com/in/harshitshaw/",
      github: "Beastyy69",
      avatar: "https://github.com/Beastyy69.png"
    },
  },
  {
    title: "Price-Pilot",
    description: "Modern web app that compares cab fares across multiple ride-hailing services in real time using interactive maps, surge detection, and route visualization to find the most cost-effective ride.",
    githubRepo: "https://github.com/IndieHub25/Price-Pilot",
    techStack: ["React 18", "TypeScript", "Vite", "TailwindCSS", "Google Maps APIs", "Jest", "React Testing Library"],
    level: "Beginner",
    admin: {
      name: "Mantej Singh Arora",
      linkedin: "https://www.linkedin.com/in/mantej-singh-arora/",
      github: "IndieHub25",
      avatar: "https://github.com/IndieHub25.png"
    },
  },
];
