import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Bill } from '@/types';
import { getBillStatus } from '@/utils/billing';
import { useResidentSession } from '@/hooks/use-resident-session';

import BillDetailsModal from '@/components/BillDetailsModal';
import { BottomBar } from '@/components/ui/BottomBar';
import HistoryScreen from '@/screens/tabs/HistoryScreen';

export default function HistoryRoute() {
  const { session, ready } = useResidentSession();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  useEffect(() => {
    if (ready && !session.isAuthenticated) router.replace('/');
  }, [ready, session.isAuthenticated]);

  if (!ready || !session.isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator color="#047857" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-canvas">
      <View className="flex-1">
        <HistoryScreen bills={session.bills} onOpenBill={setSelectedBill} />
      </View>
      <BottomBar
        currentTab="history"
        dueCount={session.bills.filter((bill) => getBillStatus(bill) !== 'paid').length}
        onSelect={(tab) => router.replace(tab === 'home' ? '/' : `/${tab}`)}
      />
      <BillDetailsModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
    </SafeAreaView>
  );
}
