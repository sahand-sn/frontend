export interface Experience {
  id: number;
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
}

export interface Skill {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Expert";
}

export interface ResumeFormData extends EditResume {
  title: string;
  summary: string;
  id: number;
}

export interface EditResume {
  experiences: Omit<Experience, "id">[];
  educations: Omit<Education, "id">[];
  skills: Omit<Skill, "id">[];
}
