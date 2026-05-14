import { useTranslations } from "next-intl";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { HiXMark } from "react-icons/hi2";
import { Grid, Typography } from "@mui/material";

import { OfferForm } from "../types/dtos";

import TextField from "@/components/ui/textField";
import SelectField from "@/components/ui/selectField";
import SubmitButton from "@/components/ui/submitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeImagePath } from "@/helpers/fileOps";
import { UserProblem } from "../types/interfaces";
import { TIME_UNITS } from "../constants";
import { offerSchema } from "../schemas";
import { offerSolution } from "../services";
import { useAuth } from "@/modules/auth/contexts";

export function OfferSolution({
  onClose,
  problem,
}: {
  onClose: () => void;
  problem: UserProblem;
}) {
  const { user } = useAuth();
  const form = useForm<OfferForm, object, OfferForm>({
    defaultValues: {
      minHoursUnit: "1",
      maxHoursUnit: "1",
    },
    resolver: yupResolver(offerSchema),
  });
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const handlePostSubmit: SubmitHandler<OfferForm> = async (
    data: OfferForm,
  ) => {
    try {
      await offerSolution(data, problem.id, user?.id);
      toast.success(
        "Təklifiniz uğurla paylaşıldı! İstifadəçi üçün maraqlı olduqda cavab verəcək.",
      );
      form.reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Xəta baş verdi!");
      }
    }
  };
  const tCommon = useTranslations("common");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl max-h-[95vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <Typography variant="h6">Həll təklif et!</Typography>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-brand-muted transition-colors"
          >
            <HiXMark size={18} className="text-brand-muted-fg" />
          </button>
        </div>
        <FormProvider {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(handlePostSubmit)}
          >
            <Grid container spacing={2} sx={{ padding: 3 }}>
              <Grid size={12}>
                <img
                  src={makeImagePath(problem.thumbnail)}
                  alt={problem.title}
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="button">{problem.title}</Typography>
                <hr />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      multiline
                      maxRows={10}
                      hasError={Boolean(fieldState.error)}
                      label="Ətraflı təsvir"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="minHours"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      hasError={Boolean(fieldState.error)}
                      label="Ən tez nə vaxta düzələr?"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="minHoursUnit"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={TIME_UNITS}
                      hasError={Boolean(fieldState.error)}
                      label="Zaman vahidini seçin"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="maxHours"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      hasError={Boolean(fieldState.error)}
                      label="Ən gec nə vaxta düzələr?"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="maxHoursUnit"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={TIME_UNITS}
                      hasError={Boolean(fieldState.error)}
                      label="Zaman vahidini seçin"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      hasError={Boolean(fieldState.error)}
                      label="Minimum zəhmət haqqı(təqribi, azn)"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="maxPrice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      hasError={Boolean(fieldState.error)}
                      label="Maks. zəhmət haqqı(təqribi, azn)"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              className="px-5 py-4 border-t border-brand-border"
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <SubmitButton
                  onClick={onClose}
                  variant="outlined"
                  type="button"
                  title={tCommon("cancel")}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SubmitButton
                  variant="contained"
                  loading={isSubmitting}
                  type="submit"
                  title={tCommon("submit")}
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
