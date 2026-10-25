import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import type { ResidentSession } from '@/types';
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
          setSession({
            isAuthenticated: restored.isAuthenticated ?? false,
            tenant: restored.tenant ?? { id: '', firstName: '', lastName: '', email: '', phone: '', emergencyContact: '', moveInDate: '', tenancyStatus: 'pending', roomNumber: '' },
            bills: restored.bills ?? [],
          });
        } else {
          // Load initial data from API
          try {
            const dashboard = await apiService.dashboard.getDashboard();
            if (active) {
              setSession({
                isAuthenticated: false,
                tenant: dashboard.tenant,
                bills: dashboard.bills,
              });
            }
          } catch (error) {
            console.error('Unable to load initial session data from API.', error);
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
