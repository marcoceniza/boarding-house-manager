import { Pressable, Text, TextInput, View } from 'react-native';

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  rightAction,
  keyboardType,
  autoCapitalize = 'sentences',
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  rightAction?: { label: string; onPress: () => void };
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words';
}) {
  return (
    <View className="mb-3.5">
      <Text className="mb-1.5 text-sm font-bold text-slate-700">{label}</Text>
      <View>
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={secureTextEntry}
          className={`rounded-xl border border-line bg-surface px-[13px] py-3 text-sm text-ink ${rightAction ? 'pr-[58px]' : ''}`}
          value={value}
        />
        {rightAction ? (
          <Pressable onPress={rightAction.onPress} className="absolute bottom-0 right-[13px] top-0 justify-center">
            <Text className="text-xs font-bold text-secondary">{rightAction.label}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
