import { useMemo, useState } from "react";
import { TodoData } from "@/store/features/todo/todoSlice";
import { TodoSortOption } from "@/utils/TodoUtils";

type UseSortedListFunc = (props: UseSortedListProps) => UseSortedListOutput;

type UseSortedListProps = {
  list: TodoData[];
};

export type onChangeSortFunc = (sortOption: TodoSortOption) => void;

type UseSortedListOutput = {
  onChangeSort: onChangeSortFunc;
  sortedList: TodoData[];
  sortOption: TodoSortOption;
};

const useSortedList: UseSortedListFunc = ({ list }) => {
  const [sortOption, setSortOption] = useState<TodoSortOption>(TodoSortOption.ALL);

  const sortedList = useMemo(() => {
    let output: TodoData[] = [];

    switch (sortOption) {
      case TodoSortOption.ALL: {
        output = list;
        break;
      }
      case TodoSortOption.ACTIVE: {
        output = list.filter((todo) => todo.isCompleted === false);
        break;
      }
      case TodoSortOption.COMPLETED: {
        output = list.filter((todo) => todo.isCompleted);
        break;
      }
    }

    return output;
  }, [list, sortOption]);

  const onChangeSort: onChangeSortFunc = (sortOption) => {
    setSortOption(sortOption);
  };

  return { onChangeSort, sortedList, sortOption };
};

export default useSortedList;
