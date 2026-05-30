import { use } from "react";

import { Grid } from "@mui/material";
import DetailsMain from "@/modules/mechanic/components/detailsMain";
import { getServiceDetailsAction } from "@/modules/services/actions";
import DetailsSidebar from "@/modules/mechanic/components/detailsSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getServiceDetailsAction(id);

  if (!blog) {
    return {
      title: "Servis tapılmadı",
    };
  }

  return {
    title: `${blog.serviceName} | AvtoFix Blog`,
    description: blog.description,
  };
}

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const service = use(getServiceDetailsAction(id));

  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 8 }}>
            <DetailsMain service={service} />
          </Grid>
          <Grid spacing={2} size={{ xs: 12, md: 4 }}>
            <DetailsSidebar service={service} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
