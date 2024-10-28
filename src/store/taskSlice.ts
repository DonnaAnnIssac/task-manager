import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskContent } from "../types";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskContent>) => {
      const newTask: Task = {
        id: state.length + 1,
        title: action.payload.title,
        description: action.payload.description,
        status: "IN_PROGRESS",
      };
      state.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const taskToBeUpdated = state.find(
        (task) => task.id === action.payload.id
      );
      if (taskToBeUpdated) {
        taskToBeUpdated.status =
          action.payload.status === "IN_PROGRESS" ? "DONE" : "IN_PROGRESS";
      }
    },
  },
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
