import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import type { LoginHandler } from '@/types';
import { ActionButton } from '@/components/ui/ActionButton';
import { Field } from '@/components/ui/Field';


import AuthLayout from './AuthLayout';

export default function LoginScreen({
  onLogin,
  onNavigateToRegister,
}: {
  onLogin: LoginHandler;
  onNavigateToRegister: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const loginError = await onLogin(email, password);
      if (loginError) setError(loginError);
    } catch (cause) {
      console.error('Unable to complete resident login.', cause);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout intro="Welcome home! Access your room lease, monthly statements, and utility records anytime.">
      {error ? <Text className="mb-3 rounded-xl bg-red-light p-3 text-sm leading-[22px] text-red">{error}</Text> : null}
      <Field
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email address"
        onChangeText={setEmail}
        placeholder="name@havenhouse.ph"
        value={email}
      />
      <Field
        autoCapitalize="none"
        label="Password"
        onChangeText={setPassword}
        placeholder="Enter your password"
        rightAction={{ label: showPassword ? 'Hide' : 'Show', onPress: () => setShowPassword(!showPassword) }}
        secureTextEntry={!showPassword}
        value={password}
      />
      <ActionButton
        disabled={loading}
        label={loading ? 'Signing in…' : 'Sign in'}
        onPress={submit}
        className="mt-1"
      />
      <Pressable onPress={onNavigateToRegister} className="items-center py-[19px]">
        <Text className="text-base leading-[22px] text-secondary">
          New resident moving in? <Text className="font-extrabold text-green">Register here</Text>
        </Text>
      </Pressable>
      <Text className="text-center text-sm text-muted">Resident Portal · Haven House Mobile Prototype</Text>
    </AuthLayout>
  );
}
