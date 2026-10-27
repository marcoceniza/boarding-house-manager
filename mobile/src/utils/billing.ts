import type { Bill, BillStatus } from '@/types';

export function mapApiBillToBill(raw: Record<string, any>): Bill {
  const [yearStr, monthStr] = (raw.billing_period as string).split('-');
  const statusMap: Record<number, BillStatus> = { 0: 'unpaid', 1: 'paid', 2: 'overdue' };
  return {
    id: String(raw.id),
    billingPeriod: raw.billing_period,
    billingMonth: parseInt(monthStr, 10),
    billingYear: parseInt(yearStr, 10),
    dueDate: raw.due_date,
    paidDate: raw.paid_at ?? null,
    paymentMethod: raw.payment_method ?? null,
    paymentReference: null,
    breakdown: {
      rent: raw.rent,
      water: raw.water,
      electricity: raw.electricity,
    },
    total: raw.total,
    status: statusMap[raw.status as number] ?? 'unpaid',
    notes: raw.notes,
  };
}

export function getBillStatus(bill: Bill, referenceDate = new Date()): BillStatus {
  if (bill.status === 'paid' || bill.paidDate) return 'paid';
  const today = [
    referenceDate.getFullYear(),
    String(referenceDate.getMonth() + 1).padStart(2, '0'),
    String(referenceDate.getDate()).padStart(2, '0'),
  ].join('-');
  return bill.dueDate < today ? 'overdue' : 'unpaid';
}
