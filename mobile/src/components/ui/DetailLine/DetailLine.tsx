import { Text, View } from 'react-native';

import { formatPHP } from '@/utils/format';

export function DetailLine({ label, detail, amount }: { label: string; detail: string; amount: number }) {
  return (
    <View className="flex-row items-center justify-between border-b border-soft py-2.5">
      <View className="flex-1">
        <Text className="text-base font-bold text-ink">{label}</Text>
        <Text className="mt-0.5 text-base leading-[18px] text-secondary">{detail}</Text>
      </View>
      <Text className="text-base font-bold text-ink">{formatPHP(amount, true)}</Text>
    </View>
  );
}
