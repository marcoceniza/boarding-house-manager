import { useState } from 'react';

import type { LoginHandler, RegisterHandler } from '@/types';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export default function AuthScreen({
  onLogin,
  onRegister,
}: {
  onLogin: LoginHandler;
  onRegister: RegisterHandler;
}) {
  const [route, setRoute] = useState<'login' | 'register'>('login');

  if (route === 'login') {
    return (
      <LoginScreen
        onLogin={onLogin}
        onNavigateToRegister={() => setRoute('register')}
      />
    );
  }

  return (
    <RegisterScreen
      onNavigateToLogin={() => setRoute('login')}
      onRegister={onRegister}
    />
  );
}
