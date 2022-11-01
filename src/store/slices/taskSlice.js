import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_API_END_POINT: API_END_POINT } = process.env;

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    loading: false,
    tasks: [],
    error: null,
  },
  reducers: {
    taskRequest: (state) => {
      state.loading = true;
    },
    taskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    },
    taskError: (state, action) => {
      state.loading = false;
      state.tasks = [];
      state.error = action.payload;
    },
  },
});

export const getTasks = (path) => (dispatch) => {
  dispatch(taskRequest());
  const endPoint = `${API_END_POINT}task/${path}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };
  axios
    .get(endPoint, { headers })
    .then((response) => {
      dispatch(taskSuccess(response.data.result));
    })
    .catch((err) => {
      dispatch(taskError(err));
    });
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(taskRequest());
  const endPoint = `${API_END_POINT}task/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };
  axios
    .delete(endPoint, { headers })
    .then((response) => {
      dispatch(getTasks(""));
    })
    .catch((err) => {
      dispatch(taskError(err));
    });
};

export const editStatus = (task) => (dispatch) => {
  dispatch(taskRequest());

  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];
  const newIndex =
    statusArray.indexOf(task.status) === 2
      ? 0
      : statusArray.indexOf(task.status) + 1;
  const endPoint = `${API_END_POINT}task/${task._id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };
  axios
    .patch(
      endPoint,
      {
        task: {
          title: task.title,
          importance: task.importance,
          status: statusArray[newIndex],
          description: task.description,
        },
      },
      { headers }
    )
    .then((response) => {
      dispatch(getTasks(""));
    })
    .catch((err) => {
      dispatch(taskError(err));
    });
};

export const createTask = (task) => (dispatch) => {
  const endPoint = `${API_END_POINT}task/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };
  axios
    .post(endPoint, { task }, { headers })
    .then((response) => {
      //console.log(response);
      dispatch(getTasks(""));
      //showAlert(true, "Tu tarea ha sido creada");
      //resetForm();
    })
    .catch((error) => {
      dispatch(taskError(error));
    });
};

export const { taskRequest, taskSuccess, taskError } = taskSlice.actions;

export default taskSlice.reducer;
