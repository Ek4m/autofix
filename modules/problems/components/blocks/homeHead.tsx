"use client";
import React, { FC } from "react";
import { useAuth } from "@/modules/auth/contexts";
import { useTranslations } from "next-intl";
import { HiCheckCircle, HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import SubmitButton from "@/components/ui/submitButton";

const HomeHead: FC<{ onShowPostModal(val: boolean): void }> = ({
  onShowPostModal,
}) => {
  const tFeed = useTranslations("feed");
  const { user, isMechanic } = useAuth();

  const onAdd = () => {
    if (!user) {
      toast.error("Problem paylaşmaq üçün daxil olun.");
      return;
    }
    if (!isMechanic) {
      toast.error("Bu ay limitinizi istifadə etdiniz.");
      return;
    }
    onShowPostModal(true);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-fg">{tFeed("title")}</h1>
        <p className="text-sm text-brand-muted-fg mt-0.5">
          {tFeed("subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {user && !isMechanic && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200`}
          >
            <HiCheckCircle size={13} />
            {tFeed("quota")}
          </div>
        )}
        <SubmitButton
          variant="contained"
          onClick={onAdd}
          title={tFeed("post_problem")}
          endIcon={<HiOutlinePlus size={16} />}
        />
      </div>
    </div>
  );
};

export default HomeHead;
