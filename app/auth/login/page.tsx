import LoginForm from "@/modules/auth/components/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daxil ol",
};

export default function LoginPage() {
  return <LoginForm />;
}
