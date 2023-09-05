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
    addTodo: (state, action) => {
      state.todoList.push({ id: action.payload.id, text: action.payload.text, isCompleted: false });
    },
    removeTodo: (state, action) => {
      state.todoList.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
