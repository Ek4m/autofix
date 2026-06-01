import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { HiXMark } from "react-icons/hi2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import citiesList from "@/data/cities.json";
import brandList from "@/data/brands.json";

import { PostProblemForm } from "../types/dtos";

import TextField from "@/components/ui/textField";
import SelectField from "@/components/ui/selectField";
import categoryList from "@/data/categories.json";
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
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">Problem Paylaş</Typography>

        <IconButton onClick={onClose}>
          <HiXMark />
        </IconButton>
      </DialogTitle>

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handlePostSubmit)}
          encType="multipart/form-data"
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
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

              <Grid size={{ xs: 12, md: 6 }}>
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

              <Grid size={{ xs: 12, md: 6 }}>
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
                      {...field}
                      type="number"
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
            </Grid>
          </DialogContent>

          <DialogActions
            sx={{
              p: 3,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Grid container spacing={2} sx={{ width: "100%" }}>
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
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
