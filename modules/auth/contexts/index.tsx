"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/types";
import { getUserInfoService } from "../services";
import { queryClient } from "@/constants/values";
import { QueryClientProvider } from "@tanstack/react-query";
import AppModal from "@/components/ui/modal";
import { logoutService } from "@/modules/profile/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthState {
  user: AuthUser | null;
  authLoading: boolean;
  isMechanic: boolean;
  onLogout(): void;
  getUserInfo(): Promise<void>;
}

const AuthContext = createContext<AuthState>({
  authLoading: false,
  isMechanic: false,
  user: null,
  getUserInfo: async () => {},
  onLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMechanic = !!user?.specialistInfo;
  const router = useRouter();

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

  const onClose = () => setIsLogoutModalOpen(false);
  const onOpen = () => setIsLogoutModalOpen(true);

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await logoutService();
      setUser(null);
      toast.success("Hesabınızdan çıxış edildi");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Çıxış zamanı xəta baş verdi");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user,
          isMechanic,
          getUserInfo,
          authLoading: isLoading,
          onLogout: onOpen,
        }}
      >
        {children}
        <AppModal
          open={isLogoutModalOpen}
          onClose={onClose}
          title={"Hesabınızdan çıxış etmək istədiyinizə əminsinizmi?"}
          description={
            "Bu əməliyyatı təsdiqlədikdən sonra hesabınızdan çıxış edilmiş olacaq və yenidən giriş etməniz tələb olunacaq"
          }
          buttons={[
            {
              title: "Geri qayıt",
              onClick: onClose,
            },
            {
              title: "Çıxış et",
              variant: "contained",
              onClick: onLogout,
            },
          ]}
        />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
