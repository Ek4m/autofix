"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { FiStar } from "react-icons/fi";
import TextField from "@/components/ui/textField";
import SubmitButton from "@/components/ui/submitButton";
import { rateMechanic } from "../services";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  problemId: number;
}

export default function MechanicRatingModal({
  open,
  onClose,
  problemId,
}: Props) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const handleSubmit = useMutation({
    mutationFn: async () => {
      await rateMechanic({ comment, problemId, rating });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(
        "Fikirləriniz qeydə alındı, vaxt ayırdığınız üçün təşəkkür edirik!",
      );
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          pb: 1,
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Ustanı qiymətləndir
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Xidmət tamamlandı. Zəhmət olmasa ustanın performansını
            qiymətləndirin.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: "12px !important",
        }}
      >
        <Stack spacing={3}>
          {/* Rating */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              Reytinq
            </Typography>

            <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
              <Rating
                value={rating}
                onChange={(_, value) => setRating(value || 5)}
                size="large"
                icon={<FiStar fill="currentColor" />}
                emptyIcon={<FiStar />}
              />

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                }}
              >
                {rating}/5
              </Typography>
            </Stack>
          </Box>
          <Box>
            <TextField
              value={comment}
              onChange={setComment}
              placeholder="Usta haqqında fikirlərinizi yazın..."
              multiline
              rows={5}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 1,
        }}
      >
        <SubmitButton
          variant="outlined"
          onClick={onClose}
          loading={handleSubmit.isPending}
          title="Bağla"
        />
        <SubmitButton
          variant="contained"
          onClick={() => handleSubmit.mutate()}
          loading={handleSubmit.isPending}
          title="Qiymətləndir"
        />
      </DialogActions>
    </Dialog>
  );
}
