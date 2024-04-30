import { Timer, timerSlice } from "../slicies/timer-slice";

describe("TimerSlice", () => {
  it("should return initial state", () => {
    expect(timerSlice.reducer(undefined, { type: "" })).toEqual({
      state: "end",
      time: 0,
      totalTime: 0,
    });
  });
  it("should start", () => {
    const prevState = {
      state: "created",
      time: 0,
      totalTime: 1,
    } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.start())
    ).toMatchObject({
      state: "running",
      time: 0,
      totalTime: 1,
    });
  });
  it("should update time for running timer", () => {
    const prevState = { state: "running", time: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      state: "running",
      time: 50,
    });
  });
  it("should end if time exeed", () => {
    const prevState = { state: "running", time: 0, totalTime: 50 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50)).state
    ).toEqual("end");
  });
  it("should not update time for running timer", () => {
    const prevState = { state: "created", time: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      state: "created",
      time: 0,
    });
  });
  it("should return correct value for 1 min 5 seconds", () => {
    const timerVal = timerSlice
      .getSelectors()
      .getTimerValue({ totalTime: 65 * 1000, time: 0 } as Timer);
    expect(timerVal.m).toBe(1);
    expect(timerVal.s).toBe("05");
  });
  it("should return correct value for 0 seconds", () => {
    expect(
      timerSlice
        .getSelectors()
        .getTimerValue({ totalTime: 60 * 1000, time: 0 } as Timer).s
    ).toBe("00");
  });
});
