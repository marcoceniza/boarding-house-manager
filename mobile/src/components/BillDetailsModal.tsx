import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import type { Bill } from '@/types';
import { formatDate, formatPHP } from '@/utils/format';
import { getBillStatus } from '@/utils/billing';
import { ActionButton } from './ui/ActionButton';
import { DetailLine } from './ui/DetailLine';
import { Label } from './ui/Label';
import { Surface } from './ui/Surface';
import { StatusPill } from './BillCard';

export default function BillDetailsModal({ bill, onClose }: { bill: Bill | null; onClose: () => void }) {
  if (!bill) return null;
  const status = getBillStatus(bill);
  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible>
      <View className="flex-1 justify-end bg-[#0f172a99]">
        <View className="max-h-[92%] rounded-t-[25px] bg-canvas px-[17px] pb-4 pt-2">
          <View className="mb-3 h-[5px] w-11 self-center rounded bg-slate-300" />
          <View className="flex-row items-center justify-between gap-2.5">
            <View>
              <Text className="text-2xl font-black text-ink">Bill statement</Text>
              <Text className="text-base leading-[18px] text-secondary">{bill.billingPeriod}</Text>
            </View>
            <Pressable accessibilityLabel="Close statement" onPress={onClose} className="h-9 w-9 items-center justify-center rounded-full bg-soft">
              <Text className="text-[27px] leading-[29px] text-secondary">×</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerClassName="gap-[13px] py-[15px]">
            <View className="flex-row items-center justify-between rounded-2xl border border-line bg-surface p-3.5">
              <View>
                <Label>Total amount</Label>
                <Text className="mt-1 text-3xl font-black text-ink">{formatPHP(bill.total, true)}</Text>
              </View>
              <StatusPill status={status} />
            </View>
            <Surface>
              <View className="flex-row items-center justify-between gap-2.5">
                <Text className="text-base leading-[18px] text-secondary">Due date</Text>
                <Text className="text-base font-bold text-ink">{formatDate(bill.dueDate)}</Text>
              </View>
              <View className="flex-row items-center justify-between gap-2.5">
                <Text className="text-base leading-[18px] text-secondary">Billing cycle</Text>
                <Text className="text-base font-bold text-ink">{bill.billingPeriod}</Text>
              </View>
              {status === 'paid' && bill.paidDate ? (
                <>
                  <View className="flex-row items-center justify-between gap-2.5">
                    <Text className="text-base leading-[18px] text-secondary">Paid date</Text>
                    <Text className="text-base font-bold text-ink">{formatDate(bill.paidDate)}</Text>
                  </View>
                  <View className="flex-row items-center justify-between gap-2.5">
                    <Text className="text-base leading-[18px] text-secondary">Payment method</Text>
                    <Text className="text-base font-bold text-ink">{bill.paymentMethod || 'Official receipt'}</Text>
                  </View>
                  {bill.paymentReference ? (
                    <Text className="mt-2 text-[11px] text-secondary">Reference: {bill.paymentReference}</Text>
                  ) : null}
                </>
              ) : null}
            </Surface>
            <Text className="text-lg font-extrabold text-ink">Breakdown of charges</Text>
            <Surface>
              <DetailLine label="Room rent" detail="Monthly base occupancy rate" amount={bill.breakdown.rent} />
              <DetailLine
                label="Water utility"
                detail={bill.breakdown.waterConsumption || 'Sub-metered usage'}
                amount={bill.breakdown.water}
              />
              <DetailLine
                label="Electricity utility"
                detail={bill.breakdown.electricityConsumption || 'Sub-metered usage'}
                amount={bill.breakdown.electricity}
              />
              <View className={`flex-row items-center justify-between gap-2.5 pt-[13px]`}>
                <Text className="text-base font-bold text-ink">Total due</Text>
                <Text className={`text-base font-bold text-ink font-extrabold text-green`}>{formatPHP(bill.total, true)}</Text>
              </View>
            </Surface>
            {bill.notes ? <Text className="text-base leading-[18px] text-secondary">{bill.notes}</Text> : null}
            <View className="mb-3.5 rounded-xl bg-amber-light p-3">
              <Text className="text-xs leading-[18px] text-amber">
                Payments are settled directly through the Haven House management office (Cash, GCash,
                or BDO bank transfer). Present your receipt or reference number to management.
              </Text>
            </View>
          </ScrollView>
          <ActionButton label="Close statement" onPress={onClose} secondary />
        </View>
      </View>
    </Modal>
  );
}
