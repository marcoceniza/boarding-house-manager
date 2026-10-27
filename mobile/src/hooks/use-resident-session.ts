import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import type { ResidentSession } from '@/types';
import { mapApiBillToBill } from '@/utils/billing';
import { apiService } from '@/services/api';

export const RESIDENT_SESSION_KEY = 'haven_house_resident_session';

export function useResidentSession() {
  const [session, setSession] = useState<ResidentSession>(() => ({
    isAuthenticated: false,
    tenant: { id: '', firstName: '', lastName: '', email: '', phone: '', emergencyContact: '', moveInDate: '', tenancyStatus: 'pending', roomNumber: '' },
    bills: [],
  }));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(RESIDENT_SESSION_KEY)
      .then(async (saved) => {
        if (active && saved) {
          const restored = JSON.parse(saved) as Partial<ResidentSession>;
          const restoredSession: ResidentSession = {
            isAuthenticated: restored.isAuthenticated ?? false,
            tenant: restored.tenant ?? { id: '', firstName: '', lastName: '', email: '', phone: '', emergencyContact: '', moveInDate: '', tenancyStatus: 'pending', roomNumber: '' },
            bills: restored.bills ?? [],
          };
          setSession(restoredSession);
          // Re-fetch bills from API when the session is authenticated to pick up new billings
          if (restoredSession.isAuthenticated) {
            try {
              const billsResponse = await apiService.billing.getBillingHistory();
              const freshBills = (billsResponse.data ?? []).map(mapApiBillToBill);
              if (active) {
                setSession((current) => ({ ...current, bills: freshBills }));
              }
            } catch (error) {
              console.error('Unable to refresh bills from API.', error);
            }
          }
        }
      })
      .catch((cause: unknown) => {
        console.error('Unable to restore Haven House session.', cause);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(RESIDENT_SESSION_KEY, JSON.stringify(session)).catch((cause: unknown) => {
      console.error('Unable to save Haven House session.', cause);
    });
  }, [ready, session]);

  return { session, setSession, ready };
}
