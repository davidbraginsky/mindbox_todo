import todoReducer, { updateList } from "@/store/features/todo/todoSlice";
import type { DefaultTodoState } from "@/store/features/todo/todoSlice";
import { EMPTY_STRING } from "@/utils/Constants";

const initialState: DefaultTodoState = {
  todoList: [],
};

const updatedTodoState = {
  list: [
    { id: "500", text: "Never", isCompleted: false },
    { id: "600", text: "Gonna", isCompleted: false },
    { id: "700", text: "Give", isCompleted: false },
    { id: "800", text: "You", isCompleted: false },
    { id: "900", text: "Up", isCompleted: true },
  ],
};

describe("reducer", async () => {
  it("returns initialState by default", () => {
    const result = todoReducer(initialState, { type: EMPTY_STRING });
    expect(result).toBe(initialState);
  });

  it("updates state when passed UPDATE_LIST action", () => {
    const action = { type: updateList.type, payload: updatedTodoState };
    const result = todoReducer(initialState, action);
    console.log(result)
    expect(result.todoList[0].text).toBe("Never")
    expect(result.todoList[1].text).toBe("Gonna")
    expect(result.todoList[2].text).toBe("Give")
    expect(result.todoList[3].text).toBe("You")
    expect(result.todoList[4].text).toBe("Up")
  });
});
