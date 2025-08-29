import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { UsersAdminType, UsersAdminUpdateType } from "./type";
import { useActionState, useState } from "react";
import type { ActionState } from "../../interfaces";
import type { UserFormValues } from "../../models";
import { createInitialState } from "../../helpers";
import type { UserAdminFormValues } from "../../models/userAdminModel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type UserAdminActionState = ActionState<UserAdminFormValues>;

interface Props {
  open: boolean;
  user?: UsersAdminUpdateType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserAdminActionState | undefined,
    formData: FormData
  ) => Promise<UserAdminActionState | undefined>;
}

export const UserAdminDialog = ({
  onClose,
  open,
  user,
  handleCreateEdit,
}: Props) => {
  const initialState = createInitialState<UserFormValues>();

  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>{user ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
      <Box key={user?.id ?? "new"} component={"form"} action={submitAction}>
        <DialogContent>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Nombre del usuario"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ""}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        {!user && (
          <DialogContent>
            <TextField
              name="password"
              autoFocus
              margin="dense"
              label="Clave usuario"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              variant="outlined"
              disabled={isPending}
              defaultValue={state?.formData?.password || ""}
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
        )}
        {!user && (
          <DialogContent>
            <InputLabel>Estado</InputLabel>
            <Select
              value={state?.formData?.status}
              label="Estado"
              defaultValue="active"
              name="status"
            >
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="inactive">Inactivo</MenuItem>
            </Select>
          </DialogContent>
        )}
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress /> : null}
          >
            {user ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
