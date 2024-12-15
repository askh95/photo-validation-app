import React from 'react';
import { useAuthStore } from './store/auth';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';

function App() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? <MainPage /> : <AuthPage />}
    </div>
  );
}

export default App;