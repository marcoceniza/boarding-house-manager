import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { ResidentProfileUpdateHandler, Tenant } from '@/types';
import { formatDate } from '@/utils/format';
import { ActionButton } from '@/components/ui/ActionButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { Field } from '@/components/ui/Field';
import { InfoRow } from '@/components/ui/InfoRow';
import { Surface } from '@/components/ui/Surface';


export default function ProfileScreen({
  tenant,
  onUpdate,
  onLogout,
}: {
  tenant: Tenant;
  onUpdate: ResidentProfileUpdateHandler;
  onLogout: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [firstName, setFirstName] = useState(tenant.firstName);
  const [lastName, setLastName] = useState(tenant.lastName);
  const [phone, setPhone] = useState(tenant.phone);
  const [emergencyContact, setEmergencyContact] = useState(tenant.emergencyContact);

  const openEdit = () => {
    setFirstName(tenant.firstName);
    setLastName(tenant.lastName);
    setPhone(tenant.phone);
    setEmergencyContact(tenant.emergencyContact);
    setEditing(true);
  };
  const updateProfile = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Missing name', 'First and last name are required.');
      return;
    }
    onUpdate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      emergencyContact: emergencyContact.trim(),
    });
    setEditing(false);
  };

  return (
    <ScrollView contentContainerClassName="gap-3.5 p-4 pb-[26px]" showsVerticalScrollIndicator={false}>
      <AppHeader title="My profile" subtitle="Resident account and tenancy details" />
      <Surface>
        <View className="flex-row items-center gap-3">
          <View className="h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-green">
            <Text className="text-[19px] font-black text-surface">
              {tenant.firstName[0]}
              {tenant.lastName[0]}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-extrabold text-ink">{tenant.firstName} {tenant.lastName}</Text>
            <Text className="text-xs leading-[18px] text-secondary">{tenant.email}</Text>
            <Text className="mt-1 text-[10px] font-extrabold text-green">● Active resident</Text>
          </View>
          <Pressable onPress={openEdit} className="rounded-[10px] bg-soft px-[11px] py-2">
            <Text className="text-[11px] font-bold text-secondary">Edit</Text>
          </Pressable>
        </View>
        <View className="mt-3.5 gap-2 border-t border-soft pt-3">
          <Text className="text-xs leading-[18px] text-secondary">Mobile: {tenant.phone}</Text>
          <Text className="text-xs leading-[18px] text-secondary">Emergency: {tenant.emergencyContact}</Text>
        </View>
      </Surface>

      <View className="mt-0.5 flex-row items-center justify-between gap-2">
        <Text className="text-base font-extrabold text-ink">Room & tenancy details</Text>
        <Text className="mt-0.5 text-xs leading-[18px] text-secondary">Admin managed</Text>
      </View>
      <Surface>
        <InfoRow label="Assigned room" value={tenant.roomNumber} />
        <InfoRow label="Lease start date" value={formatDate(tenant.moveInDate)} />
      </Surface>

      <ActionButton
        label="Sign out of resident account"
        onPress={() => setConfirmLogout(true)}
        secondary
        className="border-rose-200 bg-red-light"
      />

      <Modal animationType="fade" onRequestClose={() => setEditing(false)} transparent visible={editing}>
        <View className="flex-1 justify-end bg-[#0f172a99]" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
          <View className="m-[18px] gap-3 rounded-[22px] bg-surface p-[18px]">
            <Text className="text-[19px] font-black text-ink">Edit resident details</Text>
            <Text className="text-xs leading-[18px] text-secondary">
              Room leases and billing records cannot be changed here.
            </Text>
            <View className="flex-row gap-2.5">
              <View className="flex-1">
                <Field label="First name" onChangeText={setFirstName} value={firstName} />
              </View>
              <View className="flex-1">
                <Field label="Last name" onChangeText={setLastName} value={lastName} />
              </View>
            </View>
            <Field keyboardType="phone-pad" label="Mobile number" onChangeText={setPhone} value={phone} />
            <Field
              label="Emergency contact"
              onChangeText={setEmergencyContact}
              value={emergencyContact}
            />
            <View className="flex-row gap-2.5">
              <View className="flex-1">
                <ActionButton label="Cancel" onPress={() => setEditing(false)} secondary />
              </View>
              <View className="flex-1">
                <ActionButton label="Save changes" onPress={updateProfile} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        onRequestClose={() => setConfirmLogout(false)}
        transparent
        visible={confirmLogout}>
        <View className="flex-1 justify-end bg-[#0f172a99]" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
          <View className="m-[18px] gap-3 rounded-[22px] bg-surface p-[18px]">
            <Text className="text-[19px] font-black text-ink">Sign out of Haven House?</Text>
            <Text className="text-xs leading-[18px] text-secondary">
              You will need to sign in again to view your bills and room statements.
            </Text>
            <View className="flex-row gap-2.5">
              <View className="flex-1">
                <ActionButton label="Stay logged in" onPress={() => setConfirmLogout(false)} secondary />
              </View>
              <View className="flex-1">
                <ActionButton
                  label="Sign out"
                  onPress={() => {
                    setConfirmLogout(false);
                    onLogout();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
