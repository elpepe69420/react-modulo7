import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
  type GridSortModel,
} from "@mui/x-data-grid";
import type { UsersAdminType } from "./type";
import { Box, Chip } from "@mui/material";

interface Props {
  users: UsersAdminType[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (model: GridSortModel) => void;
  handleDelete: (id: number) => void;
  handleStatus: (id: number, status: string) => void;
  handleOpenEditDialog: (user: UsersAdminType) => void;
}

export const UsersAdminTabla = ({
  users,
  rowCount,
  paginationModel,
  setPaginationModel,
  setSortModel,
  sortModel,
}: // handleDelete,
// handleStatus,
// handleOpenEditDialog
Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={
            params.value === "active"
              ? "Activo"
              : params.value === "inactive"
              ? "Inactivo"
              : "Sin valor"
          }
          color={
            params.value === "active"
              ? "success"
              : params.value === "inactive"
              ? "warning"
              : "error"
          }
          size="small"
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <Box height={545}>
      <DataGrid
        rows={users}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode={"server"}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10, 20]}
        disableColumnFilter
      />
    </Box>
  );
};
