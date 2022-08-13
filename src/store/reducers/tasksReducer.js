import { TASK_REQUEST, TASK_ERROR, TASK_SUCCESS } from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return { ...state, loading: true };
    case TASK_SUCCESS:
      return { loading: true, error: "", tasks: action.payload };
    case TASK_ERROR:
      return { loading: false, error: action.payload, tasks: [] };
    default:
      return state;
  }
};
