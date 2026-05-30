"use client";
import SelectField from "@/components/ui/selectField";
import SubmitButton from "@/components/ui/submitButton";
import TextField from "@/components/ui/textField";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { ContactUsForm } from "../types/dtos";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactUsSchema } from "../schemas";
import PhoneField from "@/components/ui/phoneField";
import { useAuth } from "@/modules/auth/contexts";
import { sendContactMessage } from "../services";
import { toast } from "sonner";
import { REASON_OPTIONS } from "../constants";

const ContactForm = () => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ContactUsForm>({
    resolver: yupResolver(contactUsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      reason: "GENERAL",
      message: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("fullName", user.fullName);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user, setValue]);

  const onSubmit = async (body: ContactUsForm) => {
    try {
      const response = await sendContactMessage(body);
      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} spacing={3}>
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Ad və soyad"
            placeholder="Elvin Salmanov"
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="E-poçt"
            placeholder="example@gmail.com"
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <PhoneField
            {...field}
            label="Telefon nömrəsi"
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="reason"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Müraciət səbəbi"
            options={REASON_OPTIONS}
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="subject"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Mövzu"
            placeholder="Mövzunu daxil edin"
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            multiline
            minRows={6}
            label="Mesaj"
            placeholder="Mesajınızı yazın..."
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <SubmitButton
        type="submit"
        title="Göndər"
        loading={isSubmitting}
        variant="contained"
        color="warning"
      />
    </Stack>
  );
};

export default ContactForm;
