import { useEffect } from "react";
import { useAlert, useAxios } from "../../hooks";
import { errorHelper } from "../../helpers";

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  // const [filterStatus, setFilterStatus] = useState<TaskFilterDoneType>("all");
  // const [search, setSearch] = useState("");
  // const [tasks, setTasks] = useState<TaskType[]>([]);
  // const [total, setTotal] = useState(0);
  // const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
  //   page: 1,
  //   pageSize: 10,
  // });
  // const [sortModel, setSortModel] = useState<GridSortModel>([]);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    listUsersAdminApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const listUsersAdminApi = async () => {
    try {
      // const orderBy = sortModel[0]?.field;
      // const orderDir = sortModel[0]?.sort;
      const response = await axios.get("/users", {
        params: {
          // page: paginationModel.page + 1,
          // limit: paginationModel.pageSize,
          // orderBy,
          // orderDir,
          // search,
          // done: filterStatus === "all" ? undefined : filterStatus,
        },
      });
      console.log("response: ", response);
      // setTasks(response.data.data);
      // setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };
  return (
    <div>
      <p>userspage</p>
    </div>
  );
};
