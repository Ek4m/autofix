import RegisterForm from "@/modules/auth/components/registerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qeydiyyatdan keç",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
