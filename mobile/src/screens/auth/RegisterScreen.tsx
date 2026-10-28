
import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import type { RegisterHandler } from '@/types';
import { ActionButton } from '@/components/ui/ActionButton';
import { Field } from '@/components/ui/Field';
import AuthLayout from './AuthLayout';

type RegisterScreenProps = {
  onRegister: RegisterHandler;
  onNavigateToLogin: () => void;
};

export default function RegisterScreen({
  onRegister,
  onNavigateToLogin,
}: RegisterScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setRegistered(false);

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await onRegister(
        normalizedEmail,
        password,
        confirmPassword,
      );

      setRegistered(true);
      setPassword('');
      setConfirmPassword('');
    } catch (cause: unknown) {
      console.error('Registration failed:', cause);

      const responseMessage =
        typeof cause === 'object' &&
        cause !== null &&
        'response' in cause
          ? (
              cause as {
                response?: {
                  data?: { message?: unknown };
                };
              }
            ).response?.data?.message
          : undefined;

      setError(
        typeof responseMessage === 'string'
          ? responseMessage
          : 'Unable to complete registration. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout intro="Register using the email address on your active tenancy record. We'll send a verification link before you can sign in.">
      {error ? (
        <Text className="mb-3 rounded-xl bg-red-light p-3 text-sm text-red">
          {error}
        </Text>
      ) : null}

      {registered ? (
        <Text className="mb-3 rounded-xl bg-green p-3 text-sm text-surface">
          A verification link has been sent to your email. Check your
          inbox and tap the link to complete registration.
        </Text>
      ) : null}

      <Field
        autoCapitalize="none"
        keyboardType="email-address"
        label="Tenancy email address"
        onChangeText={setEmail}
        placeholder="resident@havenhouse.ph"
        value={email}
      />

      <Field
        autoCapitalize="none"
        label="Password (8+ characters)"
        onChangeText={setPassword}
        rightAction={{
          label: showPassword ? 'Hide' : 'Show',
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={!showPassword}
        value={password}
      />

      <Field
        autoCapitalize="none"
        label="Confirm password"
        onChangeText={setConfirmPassword}
        rightAction={{
          label: showPassword ? 'Hide' : 'Show',
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={!showPassword}
        value={confirmPassword}
      />

      <ActionButton
        disabled={loading}
        label={loading ? 'Creating profile…' : 'Complete registration'}
        onPress={submit}
        className="mt-1"
      />

      <Pressable
        onPress={onNavigateToLogin}
        className="items-center py-[19px]"
      >
        <Text className="text-base text-secondary">
          Already have an account?{' '}
          <Text className="font-extrabold text-green">
            Sign in
          </Text>
        </Text>
      </Pressable>
    </AuthLayout>
  );
}