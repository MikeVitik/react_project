import { addListener, isAnyOf } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button";
import { TaskItem } from "../../../components/TaskItem";
import {
  cancelTaskEdit,
  editTask,
  updateEditTaskName,
} from "../../../store/slicies/task-editor";
import {
  addTask,
  changeTask,
  selectTotalTime,
} from "../../../store/slicies/tasks-slice";
import { RootState } from "../../../store/store";
import { TaskMenu } from "./TaskMenu";

export function Tasks() {
  const { isEdit, editTaskName, editTaskId } = useSelector(
    (state: RootState) => {
      return state.taskEditor;
    }
  );
  const tasks = useSelector((state: RootState) => {
    return state.tasks;
  });
  const fullTime = useSelector(selectTotalTime);
  const taskNameRef = useRef<HTMLInputElement>(null);
  const isChangeDisabled = !editTaskName;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = dispatch(
      addListener({
        predicate: isAnyOf(addTask, editTask),
        effect: () => {
          taskNameRef.current!.focus();
        },
      })
    ) as any;
    return unsubscribe();
  }, [dispatch]);
  return (
    <div className="w-3/4">
      <input
        ref={taskNameRef}
        className="my-5 py-4 px-9 bg-light-gray  font-light"
        type="text"
        placeholder="Название задачи"
        value={editTaskName}
        onChange={(e) => dispatch(updateEditTaskName(e.target.value))}
      ></input>
      {isEdit && (
        <div className="flex gap-2">
          <Button
            text="Изменить"
            variant="normal"
            disabled={isChangeDisabled}
            onClick={() => {
              dispatch(changeTask(editTaskId, editTaskName));
            }}
          ></Button>
          <Button
            text="Отменить"
            variant="danger"
            onClick={() => {
              dispatch(cancelTaskEdit());
            }}
          ></Button>
        </div>
      )}
      {!isEdit && (
        <Button
          text="Добавить"
          variant="normal"
          disabled={isChangeDisabled}
          onClick={() => dispatch(addTask(taskNameRef.current!.value))}
        ></Button>
      )}
      <div className="pt-6 w-full">
        {tasks.map(({ id, pomodoroCount, name }) => {
          return (
            <TaskItem key={id} pomodoroCount={pomodoroCount} taskName={name}>
              <TaskMenu taskId={id} />
            </TaskItem>
          );
        })}
      </div>
      <div className="pt-4 text-light-text font-light border-light-text border-t">
        {fullTime}
      </div>
    </div>
  );
}
