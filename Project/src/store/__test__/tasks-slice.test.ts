import {
  addTask,
  changeTask,
  deleteTask,
  getTaskIndex,
  incrementPomodoro,
  selectCanDecrement,
  tasksSlice,
} from "../slicies/tasks-slice";

describe("TasksSlice", () => {
  it("shoul add task", () => {
    expect(
      tasksSlice.reducer(tasksSlice.getInitialState(), addTask("task1"))
    ).toEqual([{ id: 0, name: "task1", pomodoroCount: 1 }]);
  });
  it("getTaskIndex should return correct index for id = 0", () => {
    expect(
      getTaskIndex({ tasks: [{ id: 0, name: "task", pomodoroCount: 1 }] }, 0)
    ).toBe(0);
  });
  it("cannot decrement pomodoro if has only one", () => {
    expect(
      selectCanDecrement(
        { tasks: [{ id: 0, name: "task", pomodoroCount: 1 }] },
        0
      )
    ).toBe(false);
  });
  it("should increment task pomodoro count", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    state = tasksSlice.reducer(state, addTask("task2"));

    expect(tasksSlice.reducer(state, incrementPomodoro(state[1].id))).toEqual([
      expect.any(Object),
      { id: state[1].id, name: "task2", pomodoroCount: 2 },
    ]);
  });
  it("changeTask should change name of task", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    expect(
      tasksSlice.reducer(state, changeTask(state[0].id, "ChangedName"))[0].name
    ).toEqual("ChangedName");
  });
  it("add should generate difference id", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    state = tasksSlice.reducer(state, addTask("task2"));
    expect(state[0].id).not.toEqual(state[1].id);
  });
  it("delete should remove task", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    const nextState = tasksSlice.reducer(state, deleteTask(state[0].id));
    expect(nextState.length).toBe(0);
  });
});
