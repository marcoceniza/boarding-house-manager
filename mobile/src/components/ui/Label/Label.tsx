import { Text } from 'react-native';

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <Text className={`mb-[3px] text-[10px] font-extrabold uppercase tracking-[0.7px] text-muted ${className}`}>{children}</Text>;
}
