import { FC, useState } from "react";
import { MechanicOffer, UserProblem } from "../types/interfaces";
import { TIME_UNITS } from "../constants";
import { HiOutlineClock } from "react-icons/hi";
import { useAuth } from "@/modules/auth/contexts";
import SubmitButton from "@/components/ui/submitButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { approveOffer, cancelOffer } from "../services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OfferListItem: FC<{
  offer: MechanicOffer;
  problem: UserProblem;
  onRefetch(): void;
}> = ({ offer, problem, onRefetch }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"cancel" | "accept">();
  const router = useRouter();

  const handleClickOpen = (t: typeof type) => {
    setType(t);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCancelOffer = useMutation({
    mutationFn: async () => {
      try {
        await cancelOffer(offer.id);
      } catch (error) {
        console.log(error);
      }
    },
    mutationKey: ["canceloffer", offer],
  });

  const onApproveOffer = useMutation({
    mutationFn: async () => {
      try {
        await approveOffer(offer.id);
      } catch (error) {
        console.log(error);
      }
    },
    mutationKey: ["canceloffer", offer],
  });

  const onSubmit = async () => {
    if (isCancel) {
      await onCancelOffer.mutateAsync();
      toast.success("Təklif ləğv edildi");
      onRefetch();
    } else {
      await onApproveOffer.mutateAsync();
      toast.success(
        "Təklif qəbul edildi, ustanın əlaqə məlumatlarına yönləndirildiniz",
      );
      setTimeout(() => {
        router.push(`/mechanic-info/${offer.userId}`);
      }, 1000);
    }
    handleClose();
  };

  const isMyPost = user?.id === problem.user.id;
  const isCancel = type === "cancel";

  return (
    <div className="p-4 bg-brand-bg rounded-xl border hover:border-primary transition-all duration-150">
      <div className="flex items-start gap-3">
        <div className="w-100 h-100 rounded bg-[lightgrey] p-2">
          {offer.user.specialistInfo?.objectName
            .split(" ")
            .map((c) => c[0].toUpperCase())
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Typography sx={{ fontWeight: "600" }} variant="h6">
              {offer.user.specialistInfo?.objectName}
            </Typography>
            {/* {offer.isVerified && (
                            <span className="badge-verified text-xs">
                              <HiOutlineShieldCheck size={10} /> Doğrulanmış
                            </span>
                          )} */}
          </div>
          <p className="text-sm text-brand-muted-fg mt-1.5 leading-relaxed">
            {offer.description}
          </p>
          <div className="flex items-center gap-4 mt-2.5">
            <span className="text-lg font-bold text-primary-DEFAULT tabular-nums">
              {offer.minPrice} ₼ / {offer.maxPrice} ₼
            </span>
            <span className="text-xs text-brand-muted-fg flex items-start gap-1">
              <HiOutlineClock size={15} /> Maks: {offer.minHours}{" "}
              {TIME_UNITS.find((e) => e.value === offer.minHoursUnit)?.label} /{" "}
              Min: {offer.maxHours}{" "}
              {TIME_UNITS.find((e) => e.value === offer.maxHoursUnit)?.label}
            </span>
          </div>
        </div>
      </div>
      {isMyPost && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SubmitButton
              variant="text"
              title="Ləğv et"
              onClick={() => handleClickOpen("cancel")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SubmitButton
              variant="contained"
              title="müraciət et"
              onClick={() => handleClickOpen("accept")}
            />
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle>
          {isCancel
            ? "Silmək istədiyinizə əminsiniz?"
            : "Təklifi qəbul etdiyinizə əminsiniz?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isCancel
              ? "Bu təklifi sildikdən sonra bir daha geri qaytara bilməyəcəksiniz"
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SubmitButton onClick={handleClose} title="Geri qayıt" />
          <SubmitButton
            loading={onCancelOffer.isPending || onApproveOffer.isPending}
            onClick={onSubmit}
            variant="contained"
            title={isCancel ? "Sil" : "Təsdiq et"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OfferListItem;
