export type Language = 'en' | 'es';

export interface QuizQuestion {
  id: string;
  text: {
    en: string;
    es: string;
  };
  type: 'single' | 'multiple' | 'boolean';
  options?: {
    value: string;
    label: {
      en: string;
      es: string;
    };
  }[];
}

export interface QuizResponse {
  [questionId: string]: string | string[] | boolean;
}

export interface Recommendation {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  category: 'DIY' | 'Low-Cost' | 'Professional';
  cost: '$' | '$$' | '$$$';
  triggerCondition: (responses: QuizResponse) => boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'Safety' | 'Funding' | 'Contractor' | 'Support';
  description: {
    en: string;
    es: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  zipCodes: string[];
  verified: boolean;
}

export interface ProfessionalGuidance {
  id: string;
  role: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  whenToCall: {
    en: string;
    es: string;
  };
  whatToAsk: {
    en: string[];
    es: string[];
  };
}

