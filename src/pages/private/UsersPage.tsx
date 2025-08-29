import { useEffect, useState } from "react";
import { useAlert, useAxios } from "../../hooks";
import { errorHelper, hanleZodError } from "../../helpers";
import type {
  UsersAdminFilterStatusType,
  UsersAdminType,
  UsersAdminUpdateType,
} from "../../components/users/type";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import {
  UserAdminDialog,
  UserAdminFilter,
  UserAdminHeader,
  UsersAdminTabla,
  type UserAdminActionState,
} from "../../components/users";
import {
  schemaUserAdmin,
  schemaUserUpdate,
  type UserAdminFormValues,
} from "../../models/userAdminModel";
import { Box } from "@mui/material";

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  const [filterStatus, setFilterStatus] =
    useState<UsersAdminFilterStatusType>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UsersAdminType[]>([]);
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState<UsersAdminUpdateType | null>(null);

  useEffect(() => {
    listUsersAdminApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, paginationModel, sortModel]);

  const listUsersAdminApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get("/users", {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          orderBy,
          orderDir,
          search,
          status: filterStatus === "all" ? undefined : filterStatus,
        },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };
  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUser(null);
  };

  const handleOpenEditDialog = (user: UsersAdminType) => {
    setOpenDialog(true);
    setUser(user);
  };

  const handleCreateEdit = async (
    _: UserAdminActionState | undefined,
    formdata: FormData
  ) => {
    let rawData = {};
    if (user) {
      rawData = {
        username: formdata.get("username") as string,
      };
    } else {
      rawData = {
        username: formdata.get("username") as string,
        password: formdata.get("password") as string,
        status: formdata.get("status") as string,
      };
    }
    try {
      if (user) {
        schemaUserUpdate.parse(rawData);
      } else {
        schemaUserAdmin.parse(rawData);
      }
      if (user?.id) {
        await axios.patch(`/users/${user.id}/username`, rawData);
        showAlert("Usuario editado", "success");
      } else {
        await axios.post("/users", rawData);
        showAlert("Usuario creado", "success");
      }
      listUsersAdminApi();
      handleCloseDialog();
      return;
    } catch (error) {
      const err = hanleZodError<UserAdminFormValues>(error, rawData);
      showAlert(err.message, "error");
      return err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm("¿Estas seguro de eliminar?");
      if (!confirmed) return;

      await axios.delete(`/users/${id}`);
      showAlert("Usuario eliminado", "success");
      listUsersAdminApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  const handleStatus = async (id: number, status: string) => {
    try {
      const confirmed = window.confirm(
        "¿Estas seguro de que quieres cambiar el estado?"
      );
      if (!confirmed) return;
      const newStatus =
        status === "inactive"
          ? "active"
          : status === "active"
          ? "inactive"
          : "Fuera de rango";
      await axios.patch(`/users/${id}`, { status: newStatus });
      showAlert("Estado de usuario modificado", "success");
      listUsersAdminApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header con titulo y boton agregar */}
      <UserAdminHeader handleOpenCreateDialog={handleOpenCreateDialog} />

      {/* Barra de herramientas con filtros y busquedas */}
      <UserAdminFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSearch={setSearch}
      ></UserAdminFilter>

      {/* Tabla */}
      <UsersAdminTabla
        users={users}
        rowCount={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        handleDelete={handleDelete}
        handleStatus={handleStatus}
        handleOpenEditDialog={handleOpenEditDialog}
      />

      {/* Dialog */}
      <UserAdminDialog
        open={openDialog}
        user={user}
        onClose={handleCloseDialog}
        handleCreateEdit={handleCreateEdit}
      />
    </Box>
  );
};
