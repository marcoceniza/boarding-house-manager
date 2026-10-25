import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function AuthLayout({
  intro,
  children,
}: {
  intro: string;
  children: ReactNode;
}) {
  // Offset the keyboard height on iOS so the top fields clear the status bar /
  // safe area. Android's reported keyboard height already covers the full offset.
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      className="flex-1 bg-canvas">
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="grow justify-center p-6 pb-12">
        <View className="mb-3.5 h-16 w-16 self-center items-center justify-center rounded-[22px] bg-green">
          <Text className="text-[30px] font-black text-surface">H</Text>
        </View>
        <Text className="text-center text-[26px] font-black text-ink">Haven House</Text>
        <Text className="mt-0.5 text-center text-[11px] font-extrabold tracking-[2px] text-green">TENANT PORTAL</Text>
        <Text className="mb-5 mt-3 text-center text-sm leading-[21px] text-secondary">{intro}</Text>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
