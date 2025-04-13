export interface Deal {
  client: string;
  value: number;
  status: 'Closed Won' | 'In Progress' | 'Closed Lost';
  sales_rep?: string;
}

export interface Client {
  name: string;
  industry: string;
  contact: string;
}

export interface SalesRep {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}

export interface SalesRepsResponse {
  salesReps: SalesRep[];
}

export interface DealsResponse {
  deals: Deal[];
}

export interface AIResponse {
  answer: string;
} 