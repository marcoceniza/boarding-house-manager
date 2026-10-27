import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BillDetailsModal from '@/components/BillDetailsModal';
import { BottomBar } from '@/components/ui/BottomBar';
import type { Bill } from '@/types';
import { getBillStatus, mapApiBillToBill } from '@/utils/billing';
import AuthScreen from '@/screens/auth/AuthScreen';
import HomeScreen from '@/screens/tabs/HomeScreen';
import { useResidentSession } from '@/hooks/use-resident-session';
import { apiService } from '@/services/api';

export default function IndexRoute() {
  const { session, setSession, ready } = useResidentSession();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const response = await apiService.auth.login(email, password);
      await apiService.token.set(response.data.token);
      const profile = await apiService.auth.getCurrentUser();
      const tenant = profile.data;
      const billsResponse = await apiService.billing.getBillingHistory();
      const bills = (billsResponse.data ?? []).map(mapApiBillToBill);
      setSession((current) => ({
        ...current,
        isAuthenticated: true,
        tenant: {
          id: String(tenant.id),
          firstName: tenant.first_name,
          lastName: tenant.last_name,
          email: tenant.email,
          phone: tenant.phone ?? '',
          emergencyContact: tenant.emergency_contact ?? '',
          moveInDate: tenant.move_in_date,
          tenancyStatus: tenant.status === 1 && !tenant.ended_at ? 'active' : 'ended',
          roomNumber: tenant.room?.room_number ?? '',
        },
        bills,
      }));
      router.replace('/');
      return null;
    } catch {
      return 'Invalid credentials. Please try again.';
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    await apiService.auth.register(email, password);
  };

  const dueCount = session.bills.filter((bill) => getBillStatus(bill) !== 'paid').length;
  if (!ready) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator color="#047857" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-canvas">
      {!session.isAuthenticated ? (
        <AuthScreen onLogin={login} onRegister={register} />
      ) : (
        <>
          <View className="flex-row items-center justify-between border-b border-line bg-surface px-4 py-2.5">
            <View className="flex-row items-center gap-2">
              <View className="h-[34px] w-[34px] items-center justify-center rounded-[11px] bg-green"><Text className="text-base font-black text-surface">H</Text></View>
              <View>
                <Text className="text-xl font-extrabold text-ink">Haven House</Text>
                <Text className="text-sm text-secondary">Resident portal</Text>
              </View>
            </View>
          </View>
          <View className="flex-1">
            <HomeScreen session={session} onHistory={() => router.replace('/history')} onOpenBill={setSelectedBill} />
          </View>
          <BottomBar
            currentTab="home"
            dueCount={dueCount}
            onSelect={(tab) => router.replace(tab === 'home' ? '/' : `/${tab}`)}
          />
        </>
      )}
      <BillDetailsModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
    </SafeAreaView>
  );
}
