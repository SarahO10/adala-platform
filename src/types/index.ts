export interface Section {
  id: string;
  number: string;
  title: string;
  color: string;
  icon: string;
  description: string;
  content: React.ReactNode;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface Case {
  id: string;
  title: string;
  client: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  nextHearing?: Date;
} 