"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { FiAlertCircle } from "react-icons/fi";

import { useGetUsersProblems } from "@/modules/profile/hooks/useGetUsersProblems";
import SubmitButton from "@/components/ui/submitButton";
import { PostProblemModal } from "@/modules/problems/components/post";
import { OffersModal } from "@/modules/problems/components/offers";
import ProblemCard from "@/modules/problems/components/card";
import { UserProblem } from "@/modules/problems/types/interfaces";
import {
  PROBLEM_STATUS,
  PROBLEM_STATUS_CONFIG,
} from "@/modules/problems/constants";

export default function ProblemsPage() {
  const [tab, setTab] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<UserProblem | null>(
    null,
  );
  const { data: problems, isFetching } = useGetUsersProblems();

  const [dialogType, setDialogType] = useState<"cancel" | "reopen" | null>(
    null,
  );

  const closeDialog = () => {
    setDialogType(null);
    setSelectedProblem(null);
  };

  const onConfirmAction = () => {
    closeDialog();
  };

  const filteredProblems =
    problems?.filter((p) => p.status.includes(tab)) || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <Stack spacing={4}>
          {/* HEADER */}
          <Paper elevation={0}>
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              sx={{
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                  justifyContent: "space-between",
                },
              }}
              spacing={3}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Problemlərim
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Bütün problemlərinizi, təklifləri və statusları buradan idarə
                  edin.
                </Typography>
              </Box>
              <Box>
                {" "}
                <SubmitButton
                  variant="contained"
                  title="Yeni problem paylaş"
                  onClick={() => setShowPostModal(true)}
                />
              </Box>
            </Stack>
          </Paper>

          {/* INFO */}
          <Alert
            severity="warning"
            icon={<FiAlertCircle />}
            sx={{
              borderRadius: "18px",
            }}
          >
            Qəbul etdiyiniz təkliflər və problem statusları burada görünəcək.
          </Alert>

          {/* FILTERS */}
          <Paper
            elevation={0}
            sx={{
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab disabled={isFetching} label="Hamısı" value="" />
              {Object.values(PROBLEM_STATUS).map((v) => (
                <Tab
                  disabled={isFetching}
                  label={PROBLEM_STATUS_CONFIG[v].labelKey}
                  value={v}
                  key={v}
                />
              ))}
            </Tabs>
          </Paper>

          {/* LIST */}
          {/* LIST */}
          <Grid container spacing={3}>
            {filteredProblems.map((problem) => (
              <Grid
                key={problem.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4,
                }}
              >
                <Stack spacing={2}>
                  <ProblemCard
                    onViewOffers={() => setSelectedProblem(problem)}
                    onMakeOffer={() => {}}
                    problem={problem}
                    showActions
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>

          {/* EMPTY */}
          {filteredProblems.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 10,
                borderRadius: "28px",
                border: "1px solid",
                borderColor: "divider",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <FiAlertCircle
                size={52}
                style={{
                  marginBottom: 16,
                  opacity: 0.4,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Problem tapılmadı
              </Typography>

              <Typography color="text.secondary">
                Seçilmiş filterə uyğun problem yoxdur.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>

      {/* DIALOG */}
      <Dialog
        open={Boolean(dialogType)}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          {dialogType === "cancel"
            ? "Problemi ləğv et"
            : "Problemi yenidən aktiv et"}
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            {dialogType === "cancel"
              ? "Bu problemi ləğv etmək istədiyinizə əminsiniz?"
              : "Bu problemi yenidən aktiv etmək istədiyinizə əminsiniz?"}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 0,
          }}
        >
          <Button
            onClick={closeDialog}
            sx={{
              textTransform: "none",
            }}
          >
            Bağla
          </Button>

          <Button
            onClick={onConfirmAction}
            variant="contained"
            color={dialogType === "cancel" ? "error" : "primary"}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Təsdiqlə
          </Button>
        </DialogActions>
      </Dialog>
      {showPostModal && (
        <PostProblemModal
          onClose={() => {
            setShowPostModal(false);
          }}
        />
      )}
      {selectedProblem && (
        <OffersModal
          showUserSpecificItems
          onMakeOffer={() => {}}
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />
      )}
    </Box>
  );
}
