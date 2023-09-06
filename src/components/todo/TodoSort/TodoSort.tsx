import styles from "./TodoSort.module.css";
import { FC } from "react";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import { EMPTY_STRING } from "@/utils/Constants";
import { TodoSortOption } from "@/utils/TodoUtils";

type TodoSort = {
  className?: string;
  onChangeSort: (sortOption: TodoSortOption) => void;
};

const TodoSort: FC<TodoSort> = ({ className = EMPTY_STRING, onChangeSort }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <button type="button" onClick={() => onChangeSort(TodoSortOption.ALL)} className={styles.label}>
        {LabelsProvider.ALL}
      </button>
      <button type="button" onClick={() => onChangeSort(TodoSortOption.ACTIVE)} className={styles.label}>
        {LabelsProvider.ONLY_ACTIVE}
      </button>
      <button type="button" onClick={() => onChangeSort(TodoSortOption.COMPLETED)} className={styles.label}>
        {LabelsProvider.ONLY_COMPLETED}
      </button>
    </div>
  );
};

export default TodoSort;
