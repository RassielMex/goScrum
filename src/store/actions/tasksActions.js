import axios from "axios";
import { TASK_ERROR, TASK_SUCCESS, TASK_REQUEST } from "../types";

const { REACT_APP_API_END_POINT: API_END_POINT } = process.env;

export const taskRequest = () => {
  return {
    type: TASK_REQUEST,
  };
};

export const taskSuccess = (data) => {
  return {
    type: TASK_SUCCESS,
    payload: data,
  };
};

export const taskError = (error) => {
  return {
    type: TASK_ERROR,
    payload: error,
  };
};

export const getTasks = (path) => (dispatch) => {
  dispatch(taskRequest);
  const endPoint = `${API_END_POINT}task/${path}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
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
  //dispatch(taskRequest);
  const endPoint = `${API_END_POINT}task/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
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
  //dispatch(taskRequest);

  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];
  const newIndex =
    statusArray.indexOf(task.status) === 2
      ? 0
      : statusArray.indexOf(task.status) + 1;
  const endPoint = `${API_END_POINT}task/${task._id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
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
