import styles from "./TodoSort.module.css";
import { FC } from "react";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import { EMPTY_STRING } from "@/utils/Constants";
import { TodoSortOption } from "@/utils/TodoUtils";
import SortBtn from "@/components/todo/TodoSort/SortBtn/SortBtn";

type TodoSort = {
  className?: string;
  onChangeSort: (sortOption: TodoSortOption) => void;
  sortOption?: TodoSortOption;
};

const TodoSort: FC<TodoSort> = ({ className = EMPTY_STRING, onChangeSort, ...rest }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <SortBtn onClick={() => onChangeSort(TodoSortOption.ALL)} activeCondition={TodoSortOption.ALL} {...rest}>
        {LabelsProvider.ALL}
      </SortBtn>
      <SortBtn onClick={() => onChangeSort(TodoSortOption.ACTIVE)} activeCondition={TodoSortOption.ACTIVE} {...rest}>
        {LabelsProvider.ONLY_ACTIVE}
      </SortBtn>
      <SortBtn
        onClick={() => onChangeSort(TodoSortOption.COMPLETED)}
        activeCondition={TodoSortOption.COMPLETED}
        {...rest}
      >
        {LabelsProvider.ONLY_COMPLETED}
      </SortBtn>
    </div>
  );
};

export default TodoSort;
