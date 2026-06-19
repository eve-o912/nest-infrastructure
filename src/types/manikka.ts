export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  type: 'image' | 'document' | 'chart';
  url: string;
  name: string;
}

export interface Alert {
  id: string;
  type: 'low_cash' | 'payment_due' | 'stock_shortage' | 'anomaly' | 'insight';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  actionRequired: boolean;
  actionUrl?: string;
  dismissed: boolean;
  createdAt: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: ScenarioParameters;
  results: ScenarioResults;
  createdAt: string;
}

export interface ScenarioParameters {
  timeframe: number; // days
  revenueChange: number; // percentage
  expenseChange: number; // percentage
  oneTimeExpense?: number;
  oneTimeRevenue?: number;
}

export interface ScenarioResults {
  projectedCashPosition: number;
  projectedRevenue: number;
  projectedExpenses: number;
  netCashFlow: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  icon: string;
  category: 'forecast' | 'analysis' | 'optimization' | 'compliance';
}

export interface ForecastData {
  timeframe: number; // days
  dailyProjections: DailyProjection[];
  confidence: number;
}

export interface DailyProjection {
  date: string;
  projectedInflow: number;
  projectedOutflow: number;
  netCashFlow: number;
  cashPosition: number;
}
