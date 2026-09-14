import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, SaasPlanId } from '../types/weton';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loginWithGmail: (email: string, nama?: string) => void;
  logout: () => void;
  upgradePlan: (plan: SaasPlanId) => void;
  recordDonation: (nominal: number) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isDonationModalOpen: boolean;
  setIsDonationModalOpen: (open: boolean) => void;
  isSaasModalOpen: boolean;
  setIsSaasModalOpen: (open: boolean) => void;
  requireAuth: (callback: () => void) => boolean;
}

const STORAGE_KEY = 'weton_jowo_user_profile_v1';
export const ADMIN_EMAILS = ['dindafomo@gmail.com'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const parsed: UserProfile = JSON.parse(saved);
      // Strictly enforce that ONLY dindafomo@gmail.com holds admin/owner rights
      const isActuallyAdmin = parsed.email?.toLowerCase() === 'dindafomo@gmail.com';
      return {
        ...parsed,
        role: isActuallyAdmin ? 'admin' : 'user',
        isAdmin: isActuallyAdmin,
      };
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isSaasModalOpen, setIsSaasModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Strictly enforce dindafomo@gmail.com as sole Administrator
  const isAdmin = Boolean(user && user.email.toLowerCase() === 'dindafomo@gmail.com');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving user profile to local storage', e);
    }
  }, [user]);

  const loginWithGmail = (email: string, customNama?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const defaultName = customNama?.trim() || cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Strict admin check: ONLY dindafomo@gmail.com is Administrator; ALL other emails are regular users
    const userIsAdmin = cleanEmail === 'dindafomo@gmail.com';

    const avatarUrl = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(cleanEmail)}`;

    const newUser: UserProfile = {
      email: cleanEmail,
      nama: defaultName,
      avatarUrl,
      plan: userIsAdmin ? 'vip' : 'gratis',
      tanggalGabung: new Date().toISOString().split('T')[0],
      isDonatur: userIsAdmin,
      totalDonasi: userIsAdmin ? 100000 : 0,
      role: userIsAdmin ? 'admin' : 'user',
      isAdmin: userIsAdmin,
    };

    setUser(newUser);
    setIsLoginModalOpen(false);

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const upgradePlan = (plan: SaasPlanId) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    setUser({ ...user, plan });
  };

  const recordDonation = (nominal: number) => {
    if (user) {
      setUser({
        ...user,
        isDonatur: true,
        totalDonasi: (user.totalDonasi || 0) + nominal,
      });
    }
  };

  const requireAuth = (callback: () => void): boolean => {
    if (user) {
      callback();
      return true;
    } else {
      setPendingAction(() => callback);
      setIsLoginModalOpen(true);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin,
        loginWithGmail,
        logout,
        upgradePlan,
        recordDonation,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isDonationModalOpen,
        setIsDonationModalOpen,
        isSaasModalOpen,
        setIsSaasModalOpen,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
