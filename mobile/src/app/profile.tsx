import { router } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RESIDENT_SESSION_KEY, useResidentSession } from '@/hooks/use-resident-session';
import { getBillStatus } from '@/utils/billing';

import { BottomBar } from '@/components/ui/BottomBar';
import ProfileScreen from '@/screens/tabs/ProfileScreen';

export default function ProfileRoute() {
  const { session, setSession, ready } = useResidentSession();

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
        <ProfileScreen
          onLogout={() => {
            const loggedOut = { ...session, isAuthenticated: false };
            AsyncStorage.setItem(RESIDENT_SESSION_KEY, JSON.stringify(loggedOut))
              .then(() => {
                setSession(loggedOut);
                router.replace('/');
              })
              .catch((cause: unknown) => {
                console.error('Unable to save resident sign-out state.', cause);
                Alert.alert('Unable to sign out', 'Please try again.');
              });
          }}
          onUpdate={(updates) => {
            setSession((current) => ({ ...current, tenant: { ...current.tenant, ...updates } }));
          }}
          tenant={session.tenant}
        />
      </View>
      <BottomBar
        currentTab="profile"
        dueCount={session.bills.filter((bill) => getBillStatus(bill) !== 'paid').length}
        onSelect={(tab) => router.replace(tab === 'home' ? '/' : `/${tab}`)}
      />
    </SafeAreaView>
  );
}
