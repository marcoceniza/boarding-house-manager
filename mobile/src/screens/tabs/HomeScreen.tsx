import { Pressable, ScrollView, Text, View } from 'react-native';
import type { BillSelectionHandler, ResidentSession } from '@/types';
import { formatDate, formatPHP } from '@/utils/format';
import { getBillStatus } from '@/utils/billing';
import { ActionButton } from '@/components/ui/ActionButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { Label } from '@/components/ui/Label';
import { Surface } from '@/components/ui/Surface';
import { BillCard } from '@/components/BillCard';

export default function HomeScreen({
  session,
  onHistory,
  onOpenBill,
}: {
  session: ResidentSession;
  onHistory: () => void;
  onOpenBill: BillSelectionHandler;
}) {
  const currentBills = session.bills.filter((bill) => {
    const status = getBillStatus(bill);
    return status === 'unpaid' || status === 'overdue';
  });
  const totalDue = currentBills.reduce((sum, bill) => sum + bill.total, 0);
  const overdueCount = currentBills.filter((bill) => getBillStatus(bill) === 'overdue').length;
  const nextBill = [...currentBills].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  return (
    <ScrollView contentContainerClassName="gap-3.5 p-4 pb-[26px]" showsVerticalScrollIndicator={false}>
      <AppHeader
        action={session.tenant.roomNumber}
        subtitle="HAVEN HOUSE RESIDENT"
        title={`Kamusta, ${session.tenant.firstName}!`}
      />

      <Surface>
        <View className="flex-row items-center justify-between gap-2.5">
          <View className="flex-1">
            <Label>YOUR ROOM</Label>
            <Text className="text-2xl font-extrabold text-ink">{session.tenant.roomNumber}</Text>
          </View>
          <View className="rounded-full bg-green-light px-[9px] py-1.5">
            <Text className="mt-1 text-sm font-extrabold text-green">Active tenant</Text>
          </View>
        </View>
        <View className="mt-3 flex-row justify-between gap-2 border-t border-soft pt-2.5">
          <Text className="text-sm leading-[18px] text-secondary">Ground floor</Text>
          <Text className="text-sm leading-[18px] text-secondary">Moved in {formatDate(session.tenant.moveInDate)}</Text>
        </View>
      </Surface>

      <View className="rounded-3xl bg-green-dark p-[19px]">
        <View className="flex-row items-center justify-between gap-2.5">
          <Text className="shrink text-sm font-extrabold tracking-[0.9px] text-emerald-200">CURRENT OUTSTANDING BALANCE</Text>
          <Text className="overflow-hidden rounded-full bg-white/10 px-[9px] py-1.5 text-sm font-bold text-emerald-100">{totalDue ? overdueCount ? 'Action needed' : 'Pending' : 'All settled'}</Text>
        </View>
        <Text className="mt-3 text-[40px] font-black tracking-[-0.8px] text-surface">{formatPHP(totalDue, true)}</Text>
        <Text className="text-base leading-[17px] text-slate-300">
          {totalDue
            ? `${currentBills.length} outstanding ${currentBills.length === 1 ? 'bill' : 'bills'} across rent and utilities`
            : 'You have no outstanding balance. Thank you for paying on time!'}
        </Text>
        <View className="mt-3.5 flex-row justify-between gap-2 border-t border-white/20 pt-3">
          <Text className="text-sm leading-[17px] text-slate-300">
            {overdueCount ? `${overdueCount} overdue` : totalDue ? 'Upcoming due' : 'Account in good standing'}
          </Text>
          {nextBill ? (
            <Text className="text-[11px] leading-[17px] text-slate-300">Earliest due: {formatDate(nextBill.dueDate)}</Text>
          ) : null}
        </View>
      </View>

      <View className="mt-0.5 flex-row items-center justify-between gap-2">
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-ink">Current bills</Text>
          <Text className="mt-0.5 text-base leading-[18px] text-secondary">Active unpaid and overdue statements</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onHistory}>
          <Text className="font-extrabold text-green">View history ›</Text>
        </Pressable>
      </View>
      {currentBills.length ? (
        currentBills.map((bill, index) => (
          <BillCard
            bill={bill}
            defaultExpanded={index === 0}
            key={bill.id}
            onOpen={onOpenBill}
          />
        ))
      ) : (
        <Surface className="items-center gap-2.5 py-[25px]">
          <Text className="overflow-hidden rounded-[18px] bg-green-light p-[13px] text-[25px] font-black text-green">✓</Text>
          <Text className="text-lg font-extrabold text-ink">No outstanding bills</Text>
          <Text className="text-base text-center leading-[18px] text-secondary">
            All rent and sub-metered utilities are settled. Review past records in your history.
          </Text>
          <ActionButton label="Browse billing history" onPress={onHistory} secondary />
        </Surface>
      )}
      <View className="gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3.5">
        <Text className="text-lg font-extrabold text-green-dark">Need help with your sub-meter readings?</Text>
        <Text className="text-base leading-[18px] text-secondary">
          Utility meters are read on the 28th of each month. For billing inquiries, inspections, or
          lease renewals, contact the Haven House caretaker or office.
        </Text>
        <Text className="text-sm font-extrabold text-green">Caretaker: 0917-888-HAVEN</Text>
      </View>
    </ScrollView>
  );
}
