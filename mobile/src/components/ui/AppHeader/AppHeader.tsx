import { Text, View } from 'react-native';

export function AppHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <View className="mb-0.5 flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="text-2xl font-black tracking-[-0.5px] text-ink">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-xs leading-[18px] text-secondary">{subtitle}</Text> : null}
      </View>
      {action ? <Text className="overflow-hidden rounded-full bg-green-light px-[11px] py-[7px] text-[11px] font-extrabold text-green">{action}</Text> : null}
    </View>
  );
}
