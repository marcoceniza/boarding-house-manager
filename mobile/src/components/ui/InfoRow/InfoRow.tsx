import { Text, View } from 'react-native';

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3 border-b border-soft py-3">
      <Text className="text-xs leading-[18px] text-secondary">{label}</Text>
      <Text className="shrink text-right text-[11px] font-bold text-ink">{value}</Text>
    </View>
  );
}
