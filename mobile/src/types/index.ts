export type BillStatus = 'paid' | 'unpaid' | 'overdue';
export type TabRoute = 'home' | 'history' | 'profile';
export type HistoryFilter = 'all' | 'paid' | 'unpaid_overdue';

export interface BillBreakdown {
  rent: number;
  water: number;
  electricity: number;
  waterConsumption?: string;
  electricityConsumption?: string;
}

export interface Bill {
  id: string;
  billingPeriod: string;
  billingMonth: number;
  billingYear: number;
  dueDate: string;
  paidDate?: string | null;
  paymentMethod?: string | null;
  paymentReference?: string | null;
  breakdown: BillBreakdown;
  total: number;
  status: BillStatus;
  notes?: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  moveInDate: string;
  tenancyStatus: 'active' | 'pending' | 'ended';
  roomNumber: string;
  avatarUrl?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomType: string;
  floor: string;
  monthlyRate: number;
  maxOccupancy: number;
  amenities: string[];
  depositAmount: number;
  submeterDetails: {
    waterMeterNo: string;
    electricMeterNo: string;
  };
}

export interface ResidentSession {
  isAuthenticated: boolean;
  tenant: Tenant;
  bills: Bill[];
}

export type LoginHandler = (email: string, password: string) => Promise<string | null>;
export type RegisterHandler = (email: string, password: string) => Promise<void>;
export type BillSelectionHandler = (bill: Bill) => void;
export type ResidentProfileUpdates = Pick<Tenant, 'firstName' | 'lastName' | 'phone' | 'emergencyContact'>;
export type ResidentProfileUpdateHandler = (updates: ResidentProfileUpdates) => void;
