import { View } from 'react-native';

export function Surface({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <View className={`rounded-[18px] border border-line bg-surface p-[15px] ${className}`}>{children}</View>;
}
