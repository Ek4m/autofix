"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/types";
import { getUserInfoService } from "../services";

interface AuthState {
  user: AuthUser | null;
  authLoading: boolean;
  isMechanic: boolean;
  getUserInfo(): Promise<void>;
}

const AuthContext = createContext<AuthState>({
  authLoading: false,
  isMechanic: false,
  user: null,
  getUserInfo: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMechanic = !!user?.mechanicInfo;
  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const userInfo = await getUserInfoService();
      setUser(userInfo);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getUserInfo();
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isMechanic, getUserInfo, authLoading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
