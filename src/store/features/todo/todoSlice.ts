import { createSlice } from "@reduxjs/toolkit";

export type TodoData = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type DefaultTodoState = {
  todoList: TodoData[];
};

const DEFAULT_TODO_STATE: DefaultTodoState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: DEFAULT_TODO_STATE,
  reducers: {
    updateList: (state, action) => {
      state.todoList = action.payload.list;
      return state;
    },
  },
});

export const { updateList } = todoSlice.actions;

export default todoSlice.reducer;
