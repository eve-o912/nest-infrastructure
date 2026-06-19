export interface FinancialPassport {
  id: string;
  businessId: string;
  score: number;
  maxScore: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
}

export interface Pillar {
  id: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
  weight: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  improvementSuggestions: string[];
  metrics: PillarMetric[];
}

export interface PillarMetric {
  name: string;
  value: number;
  target: number;
  status: 'on_track' | 'behind' | 'ahead';
}

export interface Lender {
  id: string;
  name: string;
  logo?: string;
  minScore: number;
  maxLoanAmount: number;
  interestRate: number;
  term: string;
  requirements: string[];
  consentGranted: boolean;
  matchScore: number;
}

export interface PassportReport {
  type: 'profit_loss' | 'cash_flow' | 'balance_sheet' | 'tax_summary';
  generatedAt: string;
  period: string;
  data: any;
}

export interface ConsentSettings {
  lenderId: string;
  consentGranted: boolean;
  grantedAt?: string;
  revokedAt?: string;
  dataSharingPreferences: string[];
}
