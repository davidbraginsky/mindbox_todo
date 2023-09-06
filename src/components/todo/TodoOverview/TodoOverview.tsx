import styles from "./TodoOverview.module.css";
import { FC } from "react";
import Row from "@/components/layout/Row/Row";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import { EMPTY_STRING } from "@/utils/Constants";

type TodoOverviewProps = {
  className?: string;
  totalNumberOfTodos?: number;
  numberOfFinishedTodos?: number;
};

const TodoOverview: FC<TodoOverviewProps> = ({
  className = EMPTY_STRING,
  totalNumberOfTodos = 0,
  numberOfFinishedTodos = 0,
}) => {
  return (
    <Row className={`${styles.wrapper} ${className}`}>
      {totalNumberOfTodos ? (
        <>
          <div>
            <span className={styles.totalAmountLabel}>{LabelsProvider.TOTAL_NUMBER}:</span>
            <span className={styles.badge}>{totalNumberOfTodos}</span>
          </div>
          <div>
            <span className={styles.completedLabel}>{LabelsProvider.COMPLETED}:</span>
            <span
              className={styles.badge}
            >{`${numberOfFinishedTodos} ${LabelsProvider.FROM} ${totalNumberOfTodos}`}</span>
          </div>
        </>
      ) : null}
    </Row>
  );
};

export default TodoOverview;
