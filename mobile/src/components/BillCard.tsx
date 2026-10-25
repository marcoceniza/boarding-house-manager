import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Bill, BillStatus } from '@/types';
import { formatDate, formatPHP } from '@/utils/format';
import { getBillStatus } from '@/utils/billing';
import { Label } from './ui/Label';
import { Surface } from './ui/Surface';

export function StatusPill({ status }: { status: BillStatus }) {
  const appearance = {
    paid: { text: 'Paid', container: 'bg-green-light', textStyle: 'text-green' },
    unpaid: { text: 'Unpaid', container: 'bg-amber-light', textStyle: 'text-amber' },
    overdue: { text: 'Overdue', container: 'bg-red-light', textStyle: 'text-red' },
  }[status];
  return (
    <View className={`rounded-full px-[9px] py-[5px] ${appearance.container}`}>
      <Text className={`text-[10px] font-extrabold ${appearance.textStyle}`}>{appearance.text}</Text>
    </View>
  );
}
export function BillCard({
  bill,
  onOpen,
  defaultExpanded = false,
}: {
  bill: Bill;
  onOpen: (bill: Bill) => void;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const status = getBillStatus(bill);
  return (
    <Surface className="p-3.5">
      <View className="flex-row items-center justify-between gap-2.5">
        <View className="flex-1">
          <Label>Billing period</Label>
          <Text className="text-base font-extrabold text-ink">{bill.billingPeriod}</Text>
        </View>
        <StatusPill status={status} />
      </View>
      <View className={`flex-row items-center justify-between gap-2.5 mb-2.5 mt-3 border-t border-soft pt-2.5`}>
        <Text className="text-xs leading-[18px] text-secondary">
          {status === 'paid' && bill.paidDate
            ? `Paid on ${formatDate(bill.paidDate)}`
            : `Due on ${formatDate(bill.dueDate)}`}
        </Text>
        <View className="items-end">
          <Label>Total</Label>
          <Text className="text-[17px] font-black text-ink">{formatPHP(bill.total)}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-2.5">
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          onPress={() => setExpanded(!expanded)}
          className="min-h-[34px] justify-center">
          <Text className="text-[11px] font-bold text-secondary">
            {expanded ? 'Hide breakdown  −' : 'Quick breakdown  +'}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => onOpen(bill)}
          className="min-h-[34px] justify-center">
          <Text className={`text-[11px] font-bold text-secondary font-extrabold text-green`}>Full statement  ›</Text>
        </Pressable>
      </View>
      {expanded && (
        <View className="mt-2 gap-2 rounded-xl bg-soft p-[11px]">
          <View className="flex-row items-center justify-between gap-2.5">
            <Text className="text-xs leading-[18px] text-secondary">Room rent</Text>
            <Text className="text-xs font-bold text-ink">{formatPHP(bill.breakdown.rent)}</Text>
          </View>
          <View className="flex-row items-center justify-between gap-2.5">
            <Text className="text-xs leading-[18px] text-secondary">Water</Text>
            <Text className="text-xs font-bold text-ink">{formatPHP(bill.breakdown.water)}</Text>
          </View>
          <View className="flex-row items-center justify-between gap-2.5">
            <Text className="text-xs leading-[18px] text-secondary">Electricity</Text>
            <Text className="text-xs font-bold text-ink">{formatPHP(bill.breakdown.electricity)}</Text>
          </View>
        </View>
      )}
    </Surface>
  );
}
