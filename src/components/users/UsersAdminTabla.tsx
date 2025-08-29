import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
  type GridSortModel,
} from "@mui/x-data-grid";
import type { UsersAdminType } from "./type";
import { Box, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Undo as UndoIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  QuestionMark as QuestionMarkIcon,
} from "@mui/icons-material";

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
  handleDelete,
  handleStatus,
  handleOpenEditDialog,
}: Props) => {
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
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={"row"} spacing={1}>
          <Tooltip title="Editar">
            <IconButton
              size="small"
              onClick={() => handleOpenEditDialog(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              params.row.status === "active"
                ? "Inhabilitar"
                : params.row.status === "inactive"
                ? "Habilitar"
                : "Fuera de rango"
            }
          >
            <IconButton
              size="small"
              color={
                params.row.status === "inactive"
                  ? "warning"
                  : params.row.status === "active"
                  ? "success"
                  : "error"
              }
              onClick={() => handleStatus(params.row.id, params.row.status)}
            >
              {params.row.status === "inactive" ? (
                <UndoIcon fontSize="small" />
              ) : params.row.status === "active" ? (
                <DoneIcon fontSize="small" />
              ) : (
                <QuestionMarkIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
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
