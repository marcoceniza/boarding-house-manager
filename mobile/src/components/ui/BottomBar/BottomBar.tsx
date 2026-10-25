import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { TabRoute } from '@/types';

export function BottomBar({
  currentTab,
  onSelect,
  dueCount,
}: {
  currentTab: TabRoute;
  onSelect: (tab: TabRoute) => void;
  dueCount: number;
}) {
  const insets = useSafeAreaInsets();
  const tabs: { key: TabRoute; title: string; glyph: string }[] = [
    { key: 'home', title: 'Home', glyph: '⌂' },
    { key: 'history', title: 'History', glyph: '▤' },
    { key: 'profile', title: 'Profile', glyph: '○' },
  ];
  return (
    <View
      className="flex-row items-center justify-around border-t border-line bg-surface pb-1.5 pt-[9px]"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
      {tabs.map((tab) => (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: currentTab === tab.key }}
          key={tab.key}
          onPress={() => onSelect(tab.key)}
          className="min-w-[70px] items-center px-2 py-[3px]">
          <Text className={`text-[19px] font-bold text-secondary ${currentTab === tab.key ? 'font-extrabold text-green' : ''}`}>{tab.glyph}</Text>
          <Text className={`mt-0.5 text-[10px] font-bold text-secondary ${currentTab === tab.key ? 'font-extrabold text-green' : ''}`}>{tab.title}</Text>
          {tab.key === 'history' && dueCount > 0 ? (
            <View className="absolute -right-1 -top-0.5 h-[15px] min-w-[15px] items-center justify-center rounded-full bg-red"><Text className="text-[8px] font-black text-surface">{dueCount}</Text></View>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}
