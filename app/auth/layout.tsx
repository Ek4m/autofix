"use client";
import React from "react";
import Link from "next/link";
import AppLogo from "@/components/ui/AppLogo";
import { FaShieldAlt, FaBolt, FaStar } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-brand-bg">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-navy flex-col relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[40px] border-white" />
          <div className="absolute bottom-20 right-5 w-96 h-96 rounded-full border-[60px] border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[30px] border-primary" />
        </div>
        <div className="relative z-10 flex flex-col h-full px-10 py-10 bg-primary">
          <div className="flex items-center gap-3">
            <AppLogo size={44} />
            <span className="text-white font-bold text-2xl tracking-tight">
              AutoFixHub
            </span>
          </div>
          <div className="mt-16">
            <h1 className="text-white text-4xl font-bold leading-tight text-balance">
              Avtomobiliniz üçün{" "}
              <span className="text-primary-light">etibarlı mexanik</span> tapın
            </h1>
            <p className="mt-4 text-white/60 text-base leading-relaxed">
              Problemini paylaş, verified mexaniklərdən real qiymət təklifləri
              al. Sürətli, şəffaf, etibarlı.
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {[
              {
                Icon: FaShieldAlt,
                text: "Doğrulanmış mexaniklər",
                sub: "Lisenziya yoxlanılmış peşəkarlar",
              },
              {
                Icon: FaBolt,
                text: "Sürətli təkliflər",
                sub: "Ortalama 15 dəqiqə ərzində cavab",
              },
              {
                Icon: FaStar,
                text: "Reytinq sistemi",
                sub: "Real müştəri rəylərinə əsaslanan",
              },
            ].map((f) => (
              <div key={f.text} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.Icon size={18} className="text-primary-light" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.text}</p>
                  <p className="text-white/50 text-xs mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-3 gap-4 pb-2">
            {[
              { value: "2,400+", label: "Aktiv İstifadəçi" },
              { value: "340+", label: "Verified Mexanik" },
              { value: "8,900+", label: "Həll Edilmiş Problem" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3.5">
                <p className="text-white font-bold text-xl tabular-nums">
                  {s.value}
                </p>
                <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <Link
            href="/car-problems-feed"
            className="flex items-center gap-2 lg:hidden"
          >
            <AppLogo size={32} />
            <span className="font-bold text-base text-navy">AutoFixHub</span>
          </Link>
          <div className="lg:hidden" />
        </div>
        <div className="flex-1 flex items-start justify-center px-6 py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
