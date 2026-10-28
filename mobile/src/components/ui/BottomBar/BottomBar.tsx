import { Home, ScrollText, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { TabRoute } from '@/types';

const TAB_ICONS: Record<TabRoute, typeof Home> = {
  home: Home,
  history: ScrollText,
  profile: User,
};

const TABS: { key: TabRoute; title: string }[] = [
  { key: 'home', title: 'Home' },
  { key: 'history', title: 'History' },
  { key: 'profile', title: 'Profile' },
];

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
  return (
    <View
      className="flex-row items-center justify-around border-t border-line bg-surface pb-1.5 pt-[9px]"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
      {TABS.map((tab) => {
        const active = currentTab === tab.key;
        const Icon = TAB_ICONS[tab.key];
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            className="min-w-[70px] items-center px-2 py-[3px]">
            <Icon size={22} color={active ? '#047857' : '#94a3b8'} strokeWidth={active ? 2.5 : 2} />
            <Text className={`mt-0.5 text-[10px] font-bold ${active ? 'text-green' : 'text-secondary'}`}>{tab.title}</Text>
            {tab.key === 'history' && dueCount > 0 ? (
              <View className="absolute -right-1 -top-0.5 h-[15px] min-w-[15px] items-center justify-center rounded-full bg-red">
                <Text className="text-[8px] font-black text-surface">{dueCount}</Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
