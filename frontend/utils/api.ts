import axios from 'axios';
import { SalesRepsResponse, SalesRep, DealsResponse, AIResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSalesReps = async (): Promise<SalesRepsResponse> => {
  const response = await api.get('/api/sales-reps');
  return response.data;
};

export const getSalesRep = async (id: number): Promise<SalesRep> => {
  const response = await api.get(`/api/sales-reps/${id}`);
  return response.data;
};

export const getAllDeals = async (): Promise<DealsResponse> => {
  const response = await api.get('/api/deals');
  return response.data;
};

export const askAI = async (question: string): Promise<AIResponse> => {
  const response = await api.post('/api/ai', { question });
  return response.data;
}; 