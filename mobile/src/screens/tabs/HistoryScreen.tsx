import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import type { Bill, BillSelectionHandler, HistoryFilter } from '@/types';
import { getBillStatus } from '@/utils/billing';
import { ActionButton } from '@/components/ui/ActionButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { Surface } from '@/components/ui/Surface';
import { BillCard } from '@/components/BillCard';

export default function HistoryScreen({
  bills,
  onOpenBill,
}: {
  bills: Bill[];
  onOpenBill: BillSelectionHandler;
}) {
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const sortedBills = useMemo(
    () =>
      [...bills].sort(
        (a, b) => b.billingYear - a.billingYear || b.billingMonth - a.billingMonth,
      ),
    [bills],
  );
  const paidCount = sortedBills.filter((bill) => getBillStatus(bill) === 'paid').length;
  const dueCount = sortedBills.filter((bill) => getBillStatus(bill) !== 'paid').length;
  const shownBills = sortedBills.filter((bill) => {
    if (filter === 'paid') return getBillStatus(bill) === 'paid';
    if (filter === 'unpaid_overdue') return getBillStatus(bill) !== 'paid';
    return true;
  });
  const filters: { key: HistoryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All bills', count: sortedBills.length },
    { key: 'paid', label: 'Paid', count: paidCount },
    { key: 'unpaid_overdue', label: 'Due', count: dueCount },
  ];
  return (
    <ScrollView contentContainerClassName="gap-3.5 p-4 pb-[26px]" showsVerticalScrollIndicator={false}>
      <AppHeader
        subtitle="Review your monthly statements, meter readings, and payment receipts."
        title="Billing history"
      />
      <View className="flex-row gap-1 rounded-[15px] bg-slate-200 p-1">
        {filters.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setFilter(item.key)}
            className={`min-h-[38px] flex-1 items-center justify-center rounded-xl px-1 ${filter === item.key ? 'bg-surface' : ''}`}>
            <Text className={`text-[11px] font-bold text-secondary ${filter === item.key ? 'text-ink' : ''}`}>
              {item.label}  {item.count}
            </Text>
          </Pressable>
        ))}
      </View>
      {shownBills.length ? (
        shownBills.map((bill) => <BillCard bill={bill} key={bill.id} onOpen={onOpenBill} />)
      ) : (
        <Surface className="items-center gap-2.5 py-[25px]">
          <Text className="text-base font-extrabold text-ink">No bills found</Text>
          <Text className="text-xs leading-[18px] text-secondary">
            {filter === 'paid'
              ? 'No bills have been marked as paid yet.'
              : 'There are no unpaid or overdue bills.'}
          </Text>
          <ActionButton label="Show all bills" onPress={() => setFilter('all')} secondary />
        </Surface>
      )}
    </ScrollView>
  );
}
