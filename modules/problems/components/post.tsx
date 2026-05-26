import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { HiStar } from "react-icons/hi";
import { toast } from "sonner";
import { HiBolt, HiXMark } from "react-icons/hi2";
import { Grid } from "@mui/material";

import citiesList from "@/data/cities.json";
import brandList from "@/data/brands.json";

import { PostProblemForm } from "../types/dtos";

import TextField from "@/components/ui/textField";
import SelectField from "@/components/ui/selectField";
import categoryList from "@/data/categories.json";
import SwitchField from "@/components/ui/switchField";
import SubmitButton from "@/components/ui/submitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { postProblemSchema } from "../schemas";
import { createProblemPost } from "../services";
import FileUpload from "@/components/ui/fileUploadField";
import { uploadFiles } from "@/modules/upload/services";
import { EntityType } from "@/constants/enums";

export function PostProblemModal({ onClose }: { onClose: () => void }) {
  const form = useForm<PostProblemForm, object, PostProblemForm>({
    defaultValues: { isVip: false, images: [] },
    resolver: yupResolver(postProblemSchema),
  });
  const {
    control,
    formState: { isSubmitting },
    watch,
    handleSubmit,
    setValue,
  } = form;

  const categories = useMemo(
    () =>
      categoryList.flatMap((cat) =>
        cat.subcategories.map((c) => ({
          ...c,
          id: c.id.toString(),
          name: `${cat.name} / ${c.name}`,
        })),
      ),
    [],
  );

  const handlePostSubmit: SubmitHandler<PostProblemForm> = async (
    data: PostProblemForm,
  ) => {
    try {
      const problem = await createProblemPost(data);
      const images = data.images;
      await uploadFiles(images, EntityType.PROBLEM, problem.id);
      toast.success(
        "Probleminiz uğurla paylaşıldı! Mexaniklər tezliklə cavab verəcək.",
      );
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const tCommon = useTranslations("common");

  const isPremium = watch("isVip");
  const brand = watch("brandId");

  const modelList = useMemo(() => {
    if (!brand) return [];
    return brandList.find((e) => e.id === Number(brand))?.models || [];
  }, [brand]);

  useEffect(() => {
    if (brand) {
      setValue("modelId", null);
    }
  }, [brand]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl max-h-[95vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <h2 className="text-base font-bold text-brand-fg">Problem Paylaş</h2>
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
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label="Problem başlığı"
                      helperText={fieldState.error?.message}
                      placeholder="Problem başlığı"
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={10}
                      hasError={Boolean(fieldState.error)}
                      label="Ətraflı təsvir"
                      helperText={fieldState.error?.message}
                      placeholder="Problemin nə vaxtdan başladığını yazın..."
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="brandId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={brandList.map((m) => ({
                        label: m.name,
                        value: m.id,
                      }))}
                      hasError={Boolean(fieldState.error)}
                      label="Marka"
                      helperText={fieldState.error?.message}
                      placeholder="Seçin"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Controller
                  name="modelId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={modelList.map((m) => ({
                        label: m.name,
                        value: m.id,
                      }))}
                      hasError={Boolean(fieldState.error)}
                      label="Model"
                      helperText={fieldState.error?.message}
                      placeholder="Seçin"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  name="carYear"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label="İl"
                      helperText={fieldState.error?.message}
                      placeholder="Məs: 2019"
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={categories.map((m) => ({
                        label: m.name,
                        value: Number(m.id),
                      }))}
                      hasError={Boolean(fieldState.error)}
                      label="Kateqoriya seçin"
                      helperText={fieldState.error?.message}
                      placeholder="Seçin"
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      {...field}
                      options={citiesList.map((c) => ({
                        label: c.name,
                        value: c.id.toString(),
                      }))}
                      hasError={Boolean(fieldState.error)}
                      label="Şəhər seçin"
                      helperText={fieldState.error?.message}
                      placeholder="Seçin"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="minBudget"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      hasError={Boolean(fieldState.error)}
                      label="Minimum büdcə"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="maxBudget"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="number"
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label="Maksimum büdcə"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="images"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FileUpload
                      helperText={fieldState.error?.message}
                      multiple
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${isPremium ? "border-amber-400 bg-amber-50" : "border-brand-border hover:border-amber-300"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${isPremium ? "bg-amber-400" : "bg-brand-muted"}`}
                      >
                        <HiStar
                          size={18}
                          className={
                            isPremium ? "text-white" : "text-brand-muted-fg"
                          }
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-fg">
                          Premium Post — 0 ₼
                        </p>
                        <p className="text-xs text-brand-muted-fg">
                          İstifadəçilər üçün pulsuzdur
                        </p>
                      </div>
                    </div>
                    <Controller
                      name="isVip"
                      control={control}
                      render={({ field, fieldState }) => (
                        <SwitchField
                          {...field}
                          hasError={Boolean(fieldState.error)}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  {isPremium && (
                    <p className="mt-2 text-xs text-amber-700 flex items-center gap-1.5">
                      <HiBolt size={11} /> Postunuz lentdə birinci sırada
                      göstəriləcək
                    </p>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              className="px-5 py-4 border-t border-brand-border"
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <SubmitButton
                  variant="outlined"
                  type="button"
                  onClick={onClose}
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
