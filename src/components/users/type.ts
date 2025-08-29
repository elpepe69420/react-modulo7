export type UsersAdminFilterStatusType = "active" | "inactive" | "all";

export type UsersAdminType = {
  id: number;
  username: string;
  password: string;
  status: string;
};

export type UsersAdminUpdateType = {
  id: number;
  username: string;
};
