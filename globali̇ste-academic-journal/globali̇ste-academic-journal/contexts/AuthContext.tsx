import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate anonymous login on mount
    const timer = setTimeout(() => {
      setUser({ uid: 'anon-user-123', isAnonymous: true });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const signIn = () => {
    setUser({ uid: 'admin-user-1', isAnonymous: false, email: 'admin@globaliste.com' });
  };

  const signOut = () => {
    setUser({ uid: 'anon-user-123', isAnonymous: true });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};