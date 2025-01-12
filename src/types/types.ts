export interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  professionalSummary: string;
  experience: Array<{
    title: string;
    company: string;
    date: string;
    description: string[];
  }>;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    date: string;
  }>;
}
