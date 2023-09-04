import { createSlice } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type DefaultTodoState = {
  todoList: Todo[];
};

const DEFAULT_TODO_STATE: DefaultTodoState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: DEFAULT_TODO_STATE,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({ id: action.payload.id, text: action.payload.text, isCompleted: false });
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
