
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  imageUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeUrl?: string;
}

export interface SkillData {
  subject: string;
  A: number; // proficiency
  fullMark: number;
}

export enum SectionType {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  SKILLS = 'SKILLS',
  ABOUT = 'ABOUT'
}

// Added ChatMessage interface to fix the import error in ChatInterface.tsx
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
