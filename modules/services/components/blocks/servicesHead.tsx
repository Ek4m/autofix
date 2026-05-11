import { useAuth } from "@/modules/auth/contexts";
import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const ServicesHead: FC<{ onShowPostModal(val: boolean): void }> = ({
  onShowPostModal,
}) => {
  const tServices = useTranslations("services");
  const { user, isMechanic } = useAuth();

  const onAdd = () => {
    if (!user) {
      toast.error("Xidmət paylaşmaq üçün daxil olun.");
      return;
    }
    onShowPostModal(true);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-fg">
          {tServices("title")}
        </h1>
        <p className="text-sm text-brand-muted-fg mt-0.5">
          {tServices("subtitle")}
        </p>
      </div>
      {isMechanic && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-navy-DEFAULT/5 border border-navy-DEFAULT/10 rounded-lg">
            <FaCreditCard size={13} className="text-navy-DEFAULT" />
            <span className="text-xs font-medium text-navy-DEFAULT">
              Standart: 2.50 ₼ · Premium: 6.00 ₼
            </span>
          </div>
          <button
            onClick={onAdd}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus size={16} />
            {tServices("post_service")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesHead;
