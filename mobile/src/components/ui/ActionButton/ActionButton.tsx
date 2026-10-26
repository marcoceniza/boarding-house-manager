import { Pressable, Text } from 'react-native';

export function ActionButton({
  label,
  onPress,
  secondary = false,
  disabled = false,
  className = '',
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[46px] items-center justify-center rounded-[13px] px-[15px] ${secondary ? 'border border-line bg-soft' : 'bg-green'} active:opacity-80 ${disabled ? 'opacity-50' : ''} ${className}`}>
      <Text className={`text-base font-extrabold text-surface ${secondary ? 'text-slate-700' : ''}`}>
        {label}
      </Text>
    </Pressable>
  );
}
