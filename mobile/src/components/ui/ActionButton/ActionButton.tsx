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
  const containerVariant = secondary ? 'border border-line bg-soft' : 'bg-green';
  const textVariant = secondary ? 'text-slate-700' : 'text-surface';
  const disabledClass = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[46px] items-center justify-center rounded-[13px] px-[15px] ${containerVariant} active:opacity-80 ${disabledClass} ${className}`}>
      <Text className={`text-base font-extrabold ${textVariant}`}>
        {label}
      </Text>
    </Pressable>
  );
}
