import { z } from "zod";

const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const schemaUserAdmin = z
  .object({
    username: z.string().min(3, "Nombre de usuario es obligatorio"),
    status: z.enum(Status),
  })
  .refine((data) => data.status === "active" || data.status === "inactive", {
    message: "El estado solo puede ser active o inactive",
    path: ["status"],
  });

export type UserAdminFormValues = z.infer<typeof schemaUserAdmin>;
