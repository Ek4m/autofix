"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "next/link";
import { LoginForm } from "../types/dtos";
import TextField from "@/components/ui/textField";
import PasswordField from "@/components/ui/passwordField";
import SubmitButton from "@/components/ui/submitButton";
import { loginSchema } from "../schemas/login";
import { loginService } from "../services";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts";

export default function LoginView() {
  const tAuth = useTranslations("auth");
  const { getUserInfo } = useAuth();
  const formMethods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const { control, handleSubmit, formState } = formMethods;
  const { isSubmitting } = formState;

  const handleLogin: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    try {
      await loginService(data);
      await getUserInfo();
      toast.success("Uğurla daxil oldunuz!");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex border-b border-brand-border mb-8">
        <Link
          href="/auth/login"
          className="pb-3 px-1 mr-6 text-base font-semibold tab-active"
        >
          {tAuth("login")}{" "}
        </Link>
        <Link
          href="/auth/register"
          className="pb-3 px-1 text-base font-semibold tab-inactive"
        >
          {tAuth("signup")}{" "}
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-brand-fg mb-1">Xoş gəldiniz!</h2>
      <p className="text-sm text-brand-muted-fg mb-6">Hesabınıza daxil olun</p>
      <form
        {...formMethods}
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4 animate-fade-in"
      >
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              hasError={Boolean(fieldState.error)}
              label={tAuth("email")}
              helperText={fieldState.error?.message}
              placeholder="sizin@email.az"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              hasError={Boolean(fieldState.error)}
              label={tAuth("password")}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <SubmitButton
          title={tAuth("login")}
          variant="contained"
          loading={isSubmitting}
          type="submit"
        />
      </form>
    </div>
  );
}
