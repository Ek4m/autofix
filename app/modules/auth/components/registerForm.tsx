"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FiEye, FiEyeOff, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaCar, FaWrench, FaCheck, FaCreditCard } from "react-icons/fa";
import Link from "next/link";

const SPECIALIZATIONS = [
  "Mühərrik",
  "Elektrik",
  "Əyləc sistemi",
  "Asqı sistemi",
  "Sürət qutusu",
  "Kondisioner",
  "Kuzov",
  "Ümumi təmir",
];

const CITIES = [
  "Bakı",
  "Sumqayıt",
  "Gəncə",
  "Lənkəran",
  "Mingəçevir",
  "Naxçıvan",
];

export default function RegisterView() {
  const tAuth = useTranslations("auth");
  const [role, setRole] = useState<"user" | "mechanic">("user");
  const [mechanicStep, setMechanicStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">(
    "basic",
  );

  // Forms
  const signupUserForm = useForm();
  const mechanicStep1Form = useForm();
  const mechanicStep2Form = useForm();

  const handleSignupUser = useCallback(
    async (data: any) => {
      if (data.password !== data.confirmPassword) {
        signupUserForm.setError("confirmPassword", {
          message: "Şifrələr uyğun deyil",
        });
        return;
      }
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1400));
      setIsLoading(false);
      toast.success("Qeydiyyat uğurlu! Hesabınız yaradıldı.");
      window.location.href = "/login";
    },
    [signupUserForm],
  );

  const handleMechanicFinish = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsLoading(false);
    toast.success(
      "Mexanik hesabınız yaradıldı! Doğrulama üçün sənədlərinizi göndərin.",
    );
    window.location.href = "/auth/login";
  };

  return (
    <div className="animate-fade-in">
      {/* Tab Switcher */}
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
              setMechanicStep(1);
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
              setMechanicStep(1);
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

      {/* --- USER SIGNUP FORM --- */}
      {role === "user" && (
        <form
          onSubmit={signupUserForm.handleSubmit(handleSignupUser)}
          className="space-y-4 animate-fade-in"
        >
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              {tAuth("fullname")}
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Əli Həsənov"
              {...signupUserForm.register("fullname", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              {tAuth("email")}
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="sizin@email.az"
              {...signupUserForm.register("email", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              {tAuth("phone")}
            </label>
            <input
              type="tel"
              className="input-field"
              placeholder="+994 55 000 00 00"
              {...signupUserForm.register("phone", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              {tAuth("password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field pr-10"
                {...signupUserForm.register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted-fg"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              Şifrəni təsdiqlə
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field pr-10"
                {...signupUserForm.register("confirmPassword", {
                  required: true,
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted-fg"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={16} />
                ) : (
                  <FiEye size={16} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            {isLoading ? (
              "Yüklənir..."
            ) : (
              <>
                {tAuth("signup")} <FiChevronRight size={16} />
              </>
            )}
          </button>
        </form>
      )}

      {role === "mechanic" && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    mechanicStep >= step
                      ? "bg-primary text-white"
                      : "bg-brand-muted text-brand-muted-fg"
                  }`}
                >
                  {mechanicStep > step ? <FaCheck size={14} /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 rounded-full ${mechanicStep > step ? "bg-primary" : "bg-brand-muted"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {mechanicStep === 1 && (
            <form
              onSubmit={mechanicStep1Form.handleSubmit(() =>
                setMechanicStep(2),
              )}
              className="space-y-4 animate-fade-in"
            >
              <div>
                <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                  {tAuth("fullname")}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Vüsal Əliyev"
                  {...mechanicStep1Form.register("fullname", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                  {tAuth("email")}
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="mexanik@email.az"
                  {...mechanicStep1Form.register("email", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                  {tAuth("password")}
                </label>
                <input
                  type="password"
                  className="input-field"
                  {...mechanicStep1Form.register("password", {
                    required: true,
                  })}
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                {tAuth("continue")} <FiChevronRight size={16} />
              </button>
            </form>
          )}

          {mechanicStep === 2 && (
            <form
              onSubmit={mechanicStep2Form.handleSubmit(() =>
                setMechanicStep(3),
              )}
              className="space-y-4 animate-fade-in"
            >
              <div>
                <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                  {tAuth("mechanic.garage")}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="AutoPro Servis"
                  {...mechanicStep2Form.register("garageName", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                  {tAuth("mechanic.specialization")}
                </label>
                <select
                  className="input-field"
                  {...mechanicStep2Form.register("specialization", {
                    required: true,
                  })}
                >
                  <option value="">İxtisas seçin...</option>
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  className="input-field"
                  placeholder="Təcrübə (il)"
                  {...mechanicStep2Form.register("experience", {
                    required: true,
                  })}
                />
                <select
                  className="input-field"
                  {...mechanicStep2Form.register("city", { required: true })}
                >
                  <option value="">Şəhər...</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setMechanicStep(1)}
                  className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  <FiChevronLeft /> {tAuth("back")}
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  {tAuth("continue")} <FiChevronRight />
                </button>
              </div>
            </form>
          )}

          {mechanicStep === 3 && (
            <div className="animate-fade-in space-y-4">
              <p className="text-sm text-brand-muted-fg">
                {tAuth("mechanic.plan_desc")}
              </p>
              <div className="space-y-3">
                {/* Basic Plan */}
                <button
                  onClick={() => setSelectedPlan("basic")}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedPlan === "basic"
                      ? "border-primary bg-primary/5"
                      : "border-brand-border"
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span>{tAuth("plan.basic")}</span>
                    <span>{tAuth("plan.basic_price")}</span>
                  </div>
                  <p className="text-xs text-brand-muted-fg mt-1">
                    {tAuth("plan.basic_desc")}
                  </p>
                </button>
                {/* Premium Plan */}
                <button
                  onClick={() => setSelectedPlan("premium")}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedPlan === "premium"
                      ? "border-amber-400 bg-amber-50"
                      : "border-brand-border"
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span>{tAuth("plan.premium")} ⭐</span>
                    <span className="text-amber-700">
                      {tAuth("plan.premium_price")}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted-fg mt-1">
                    {tAuth("plan.premium_desc")}
                  </p>
                </button>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg flex gap-2">
                <FaCreditCard
                  className="text-blue-600 shrink-0 mt-1"
                  size={14}
                />
                <p className="text-[10px] text-blue-700">
                  Ödəniş hər post zamanı aparılır. Abunəlik yoxdur.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setMechanicStep(2)}
                  className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  <FiChevronLeft /> {tAuth("back")}
                </button>
                <button
                  onClick={handleMechanicFinish}
                  disabled={isLoading}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    "Gözləyin..."
                  ) : (
                    <>
                      <FaCheck /> Hesab yarat
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
