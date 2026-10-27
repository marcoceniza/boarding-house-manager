import { Text, View } from 'react-native';

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3 border-b border-soft py-3">
      <Text className="text-base leading-[18px] text-secondary">{label}</Text>
      <Text className="shrink text-right text-base font-bold text-ink">{value}</Text>
    </View>
  );
}
