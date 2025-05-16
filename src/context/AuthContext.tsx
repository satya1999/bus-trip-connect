
import { createContext, useContext, useState, ReactNode } from "react";

type UserType = "customer" | "owner" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, type: UserType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // For demo purposes we're using mock functions
  // In a real implementation, these would connect to Supabase
  const login = async (email: string, password: string, type: UserType) => {
    // Mock successful login
    setUser({
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name: email.split("@")[0],
      email,
      type,
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, type: UserType) => {
    // Mock successful registration
    setUser({
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      type,
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
