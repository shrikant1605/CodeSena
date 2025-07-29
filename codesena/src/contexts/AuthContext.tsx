'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  branch: string;
  year: string;
  interests: string[];
  avatar?: string;
  joinedAt: string;
  isVerified: boolean;
}

// User stats interface
export interface UserStats {
  points: number;
  rank: number;
  questionsAnswered: number;
  questionsAsked: number;
  projectsShared: number;
  workshopsAttended: number;
  streak: number;
  badges: string[];
  monthlyGoal: {
    target: number;
    current: number;
    description: string;
  };
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Signup data interface
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  branch: string;
  year: string;
  interests: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions (replace with real API calls)
const mockAPI = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return a mock user
    const user: User = {
      id: 'user_123',
      email,
      firstName: 'Student',
      lastName: 'User',
      university: 'Your University',
      branch: 'Computer Science',
      year: '3rd Year',
      interests: ['React', 'JavaScript', 'Node.js'],
      joinedAt: new Date().toISOString(),
      isVerified: true
    };
    
    return { user, token: 'mock_token_123' };
  },

  async signup(userData: SignupData): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      university: userData.university,
      branch: userData.branch,
      year: userData.year,
      interests: userData.interests,
      joinedAt: new Date().toISOString(),
      isVerified: false
    };
    
    return { user, token: `token_${Date.now()}` };
  },

  async getUserStats(userId: string): Promise<UserStats> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      points: 0,
      rank: 0,
      questionsAnswered: 0,
      questionsAsked: 0,
      projectsShared: 0,
      workshopsAttended: 0,
      streak: 0,
      badges: [],
      monthlyGoal: {
        target: 25,
        current: 0,
        description: 'Answer 25 questions this month'
      }
    };
  },

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, merge with existing user data
    const existingUser = JSON.parse(localStorage.getItem('codesena_user') || '{}');
    const updatedUser = { ...existingUser, ...userData };
    
    localStorage.setItem('codesena_user', JSON.stringify(updatedUser));
    return updatedUser;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('codesena_token');
        const savedUser = localStorage.getItem('codesena_user');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Fetch user stats
          const stats = await mockAPI.getUserStats(userData.id);
          setUserStats(stats);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user, token } = await mockAPI.login(email, password);
      
      localStorage.setItem('codesena_token', token);
      localStorage.setItem('codesena_user', JSON.stringify(user));
      
      setUser(user);
      
      // Fetch user stats
      const stats = await mockAPI.getUserStats(user.id);
      setUserStats(stats);
      
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user, token } = await mockAPI.signup(userData);
      
      localStorage.setItem('codesena_token', token);
      localStorage.setItem('codesena_user', JSON.stringify(user));
      
      setUser(user);
      
      // Fetch initial user stats
      const stats = await mockAPI.getUserStats(user.id);
      setUserStats(stats);
      
    } catch (err) {
      setError('Signup failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('codesena_token');
    localStorage.removeItem('codesena_user');
    setUser(null);
    setUserStats(null);
    setError(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const updatedUser = await mockAPI.updateUser(user.id, userData);
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update user data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (!user) return;
    
    try {
      const stats = await mockAPI.getUserStats(user.id);
      setUserStats(stats);
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    }
  };

  const value: AuthContextType = {
    user,
    userStats,
    loading,
    error,
    login,
    logout,
    signup,
    updateUser,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for user display name
export function useUserDisplayName() {
  const { user } = useAuth();
  
  if (!user) return 'Guest User';
  
  return `${user.firstName} ${user.lastName}`;
}

// Helper hook for user initials
export function useUserInitials() {
  const { user } = useAuth();
  
  if (!user) return 'GU';
  
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}