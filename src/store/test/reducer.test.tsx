import todoReducer, { updateList } from "@/store/features/todo/todoSlice";
import type { DefaultTodoState } from "@/store/features/todo/todoSlice";
import { EMPTY_STRING } from "@/utils/Constants";
import { SPECIAL_TODO_LIST } from "@/utils/TestUtils";

const initialState: DefaultTodoState = {
  todoList: [],
};

describe("reducer", async () => {
  it("returns initialState by default", () => {
    const result = todoReducer(initialState, { type: EMPTY_STRING });
    
    expect(result).toBe(initialState);
  });

  it("updates state when passed UPDATE_LIST action", () => {
    const action = { type: updateList.type, payload: { list: SPECIAL_TODO_LIST } };
    const result = todoReducer(initialState, action);

    expect(result.todoList[0].text).toBe("Never");
    expect(result.todoList[1].text).toBe("Gonna");
    expect(result.todoList[2].text).toBe("Give");
    expect(result.todoList[3].text).toBe("You");
    expect(result.todoList[4].text).toBe("Up");
  });
});
