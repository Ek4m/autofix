import { initDb, Service } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const service = await Service.findOne({ where: { id, userId: user.id } });
  if (!service) {
    return new Response("Service not found", { status: 404 });
  }
  await service.destroy();
  return new Response("Service deleted successfully", { status: 200 });
};
