import { z } from "zod";

const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const schemaUserAdmin = z
  .object({
    username: z.string().min(3, "Nombre de usuario es obligatorio"),
    password: z.string().min(5, "Clave de usuario es obligatoria"),
    status: z.enum(Status),
  })
  .refine((data) => data.status === "active" || data.status === "inactive", {
    message: "El estado solo puede ser active o inactive",
    path: ["status"],
  });

export const schemaUserUpdate = z.object({
  username: z.string().min(3, "El nombre de usuario es obligarotio"),
});

export type UserAdminFormValues = z.infer<typeof schemaUserAdmin>;
