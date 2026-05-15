import { Controller, useForm } from "react-hook-form";
import { PostServiceForm } from "../types/dtos";
import { useTranslations } from "next-intl";
import { FiX } from "react-icons/fi";
import { FaBolt, FaCreditCard, FaStar } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { Grid } from "@mui/material";
import TextField from "@/components/ui/textField";
import categoriesList from "@/data/categories.json";
import { useMemo } from "react";
import SwitchField from "@/components/ui/switchField";
import { yupResolver } from "@hookform/resolvers/yup";
import { postServiceSchema } from "../schemas";
import MultiSelectField from "@/components/ui/selectWithSearch";
import { postService } from "../services";

export function PostServiceModal({ onClose }: { onClose: () => void }) {
  const tCommon = useTranslations("common");
  const form = useForm<PostServiceForm, object, PostServiceForm>({
    resolver: yupResolver(postServiceSchema),
    defaultValues: {
      isVip: false,
      categories: [],
    },
  });

  const categories = useMemo(
    () =>
      categoriesList.flatMap((cat) =>
        cat.subcategories.map((c) => ({
          ...c,
          name: `${cat.name} / ${c.name}`,
        })),
      ),
    [],
  );
  const {
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: PostServiceForm) => {
    const response = await postService(values);
    console.log(response);
  };

  const isVip = form.watch("isVip");
  const postCost = isVip ? "6.00" : "2.50";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl max-h-[95vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <div>
            <h2 className="text-base font-bold text-brand-fg">Xidmət Paylaş</h2>
            <p className="text-xs text-brand-muted-fg mt-0.5">
              Post dəyəri:{" "}
              <span className="font-bold text-primary-DEFAULT tabular-nums">
                {postCost} ₼
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-brand-muted transition-colors"
          >
            <FiX size={18} className="text-brand-muted-fg" />
          </button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-y-auto flex-1 px-5 py-5 space-y-4"
        >
          <Grid spacing={2} container>
            <Grid size={12}>
              <Controller
                name="serviceName"
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
                name="categories"
                control={control}
                render={({ field, fieldState }) => (
                  <MultiSelectField
                    {...field}
                    options={categories.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                    hasError={Boolean(fieldState.error)}
                    label="Xidmət kateqoriyası"
                    helperText={fieldState.error?.message}
                    placeholder="Seçin"
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
                    placeholder="Xidmət haqqında ətraflı məlumat..."
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="priceMin"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    hasError={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label="Min. qiymət (₼)"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="priceMax"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    hasError={Boolean(fieldState.error)}
                    label="Max. qiymət (₼)"
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          {/* Premium toggle */}
          <div
            className={`p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${isVip ? "border-amber-400 bg-amber-50" : "border-brand-border hover:border-amber-300"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${isVip ? "bg-amber-400" : "bg-brand-muted"}`}
                >
                  <FaStar
                    size={18}
                    className={isVip ? "text-white" : "text-brand-muted-fg"}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-fg">
                    Premium Post — <span className="tabular-nums">6.00 ₼</span>
                  </p>
                  <p className="text-xs text-brand-muted-fg">
                    Standart: <span className="tabular-nums">2.50 ₼</span>
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
            {isVip && (
              <p className="mt-2 text-xs text-amber-700 flex items-center gap-1.5">
                <FaBolt size={11} /> Xidmətiniz lentdə birinci sırada,
                vurğulanmış göstəriləcək
              </p>
            )}
          </div>

          {/* Cost summary */}
          <div className="p-3.5 bg-navy-DEFAULT/5 border border-navy-DEFAULT/10 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCreditCard size={15} className="text-navy-DEFAULT" />
              <span className="text-sm font-medium text-navy-DEFAULT">
                Bu post üçün tutulacaq məbləğ
              </span>
            </div>
            <span className="text-base font-bold text-navy-DEFAULT tabular-nums">
              {postCost} ₼
            </span>
          </div>
        </form>

        <div className="px-5 py-4 border-t border-brand-border shrink-0 flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 py-3">
            {tCommon("cancel")}
          </button>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
          >
            {isSubmitting ? (
              <>
                <ImSpinner8 className="animate-spin h-4 w-4 text-white" />{" "}
                Göndərilir...
              </>
            ) : (
              <>Xidməti Yayımla · {postCost} ₼</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
