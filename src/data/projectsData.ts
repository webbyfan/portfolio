export type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

export const defaultProjects: Project[] = [
  {
    title: "Resume Builder",
    description: "an ATS checker ,free resume builder web app that helps job seekers create professional resumes.",
    link: "https://example.com",
    tags: ["React", "CSS","Node.js"],
  },
  {
    title: "Study Buddy",
    description: "A tiny productivity app for organizing study sessions.",
    link: "https://example.com",
    tags: ["TypeScript", "Vite"],
  },
  {
    title: "Pixel Planner",
    description: "A pixel-art inspired task board for creative teams.",
    link: "https://example.com",
    tags: ["Design", "UI"],
  },
];

export const projectsData: Project[] = [
  ...defaultProjects,
];
