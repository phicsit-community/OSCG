export type Speaker = {
  image: string;
  name: string;
  title: string;
  expertise: string;
  linkedin?: string;
  twitter?: string;
};

export const speakers: Speaker[] = [
  {
    image: "/speakers/Olena.png",
    name: "Olena Yara",
    title: "Founder, Yara Agency",
    expertise: "Marketing Strategist",
    linkedin: "https://www.linkedin.com/in/olena-yara-a26567223/"
  },
];