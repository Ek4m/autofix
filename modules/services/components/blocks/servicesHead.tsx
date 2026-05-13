import SubmitButton from "@/components/ui/submitButton";
import { useAuth } from "@/modules/auth/contexts";
import { useTranslations } from "next-intl";
import React, { FC } from "react";
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
          <SubmitButton
            variant="contained"
            title={tServices("post_service")}
            endIcon={<FiPlus size={16} />}
            onClick={onAdd}
          />
        </div>
      )}
    </div>
  );
};

export default ServicesHead;
