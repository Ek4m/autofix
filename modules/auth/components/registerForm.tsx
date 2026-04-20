"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaCar, FaWrench } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "@/components/ui/textField";
import PhoneField from "@/components/ui/phoneField";
import PasswordField from "@/components/ui/passwordField";
import SubmitButton from "@/components/ui/submitButton";
import RegisterMechanic from "./registerMechanic";

import { RegisterForm } from "../types/dtos";
import { createRegisterSchema } from "../schemas/register";
import { registerService } from "../services";
import { toast } from "sonner";

export default function RegisterView() {
  const tAuth = useTranslations("auth");
  const [role, setRole] = useState<"user" | "mechanic">("user");

  const formMethods = useForm<RegisterForm, object, RegisterForm>({
    resolver: yupResolver(createRegisterSchema(role === "mechanic")),
  });
  const { setValue } = formMethods;

  useEffect(() => {
    if (role === "user") {
      setValue("mechanic", null);
    }
  }, [role, setValue]);

  const { control, handleSubmit } = formMethods;

  const handleSignupUser: SubmitHandler<RegisterForm> = async (
    data: RegisterForm,
  ) => {
    try {
      await registerService(data);
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
          className="pb-3 px-1 mr-6 text-base font-semibold tab-inactive"
        >
          {tAuth("login")}
        </Link>
        <div className="pb-3 px-1 text-base font-semibold tab-active border-b-2 border-primary">
          {tAuth("signup")}
        </div>
      </div>

      {/* Role Selection */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-brand-fg mb-3">
          {tAuth("role_select")}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setRole("user");
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === "user"
                ? "border-primary bg-primary/5"
                : "border-brand-border"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${role === "user" ? "bg-primary text-white" : "bg-brand-muted"}`}
            >
              <FaCar size={20} />
            </div>
            <span className="text-sm font-semibold">{tAuth("role_user")}</span>
            <span className="text-[10px] text-brand-muted-fg text-center">
              Aylıq 1 pulsuz post
            </span>
          </button>
          <button
            onClick={() => {
              setRole("mechanic");
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === "mechanic"
                ? "border-primary bg-primary/5"
                : "border-brand-border"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${role === "mechanic" ? "bg-primary text-white" : "bg-brand-muted"}`}
            >
              <FaWrench size={20} />
            </div>
            <span className="text-sm font-semibold">
              {tAuth("role_mechanic")}
            </span>
            <span className="text-[10px] text-brand-muted-fg text-center">
              Post başına ödəniş
            </span>
          </button>
        </div>
      </div>
      <form
        {...formMethods}
        onSubmit={handleSubmit(handleSignupUser)}
        className="space-y-4 animate-fade-in"
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              hasError={Boolean(fieldState.error)}
              label={tAuth("fullname")}
              helperText={fieldState.error?.message}
              placeholder="Əli Həsənov"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="email"
              hasError={Boolean(fieldState.error)}
              label={tAuth("email")}
              helperText={fieldState.error?.message}
              placeholder="sizin@email.az"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <PhoneField
              {...field}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              placeholder={tAuth("password")}
              hasError={Boolean(fieldState.error)}
              label={tAuth("password")}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              placeholder={"Şifrəni təsdiqləyin"}
              hasError={Boolean(fieldState.error)}
              label={"Şifrəni təsdiqləyin"}
              helperText={fieldState.error?.message}
            />
          )}
        />
        {role === "mechanic" && <RegisterMechanic control={control} />}
        <SubmitButton title={tAuth("signup")} type="submit" />
      </form>
      <p className="mt-8 text-center text-sm text-brand-muted-fg">
        {tAuth("has_account")}{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          {tAuth("login")}
        </Link>
      </p>
    </div>
  );
}
