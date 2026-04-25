import { Controller, useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";

import { PostProblemForm } from "../types/dtos";
import SelectField from "@/components/ui/selectField";
import { NUMBER_OF_VIP_POST_DAYS } from "../vault";
import TextField from "@/components/ui/textField";

const PremiumPost = () => {
  const { control } = useFormContext<PostProblemForm>();

  return (
    <>
      <Grid size={12}>
        <Controller
          name="vipInfo.vipLifeTime"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              options={NUMBER_OF_VIP_POST_DAYS}
              hasError={Boolean(fieldState.error)}
              label="Neçə gün müddətində postunuz vip olaraq görünəcək?"
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          name="vipInfo.minBudget"
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
          name="vipInfo.maxBudget"
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
    </>
  );
};

export default PremiumPost;
