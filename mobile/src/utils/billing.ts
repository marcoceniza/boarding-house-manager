import type { Bill, BillStatus } from '@/types';

export function getBillStatus(bill: Bill, referenceDate = new Date()): BillStatus {
  if (bill.status === 'paid' || bill.paidDate) return 'paid';
  const today = [
    referenceDate.getFullYear(),
    String(referenceDate.getMonth() + 1).padStart(2, '0'),
    String(referenceDate.getDate()).padStart(2, '0'),
  ].join('-');
  return bill.dueDate < today ? 'overdue' : 'unpaid';
}
