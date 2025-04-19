export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  githubUsername?: string;
  subscription?: SubscriptionPlan;
  createdAt: number;
}

export interface SubscriptionPlan {
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: number;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  previewUrl: string;
}

export interface PortfolioSection {
  id: string;
  type: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact';
  title: string;
  content: Record<string, any>;
  order: number;
  isVisible: boolean;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  slug: string;
  templateId: string;
  sections: PortfolioSection[];
  customDomain?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
  isPublished: boolean;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  totalPortfolios: number;
  publishedPortfolios: number;
  revenueMonthly: number;
  revenueTotal: number;
}