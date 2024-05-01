import { StatisticItem, aggrigateStatistic, statisticInfo } from "../statistic";

describe("Statistic slice", () => {
  describe("filter selector", () => {
    it("currentWeek filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const items = statisticInfo.selectors.filter(
        {
          statisticInfo: [
            // In filter
            { startDate: new Date(2024, 3, 17) } as any,
            { startDate: new Date(2024, 3, 15) } as any,
            { startDate: new Date(2024, 3, 21) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 22) } as any,
          ],
        },
        "currentWeek",
        currentDate
      );
      expect(items).toEqual([
        { startDate: new Date(2024, 3, 17) } as any,
        { startDate: new Date(2024, 3, 15) } as any,
        { startDate: new Date(2024, 3, 21) } as any,
      ]);
    });
    it("currentWeek filter and current date is Sunday", () => {
      const currentDate = new Date(2024, 3, 21);
      expect(
        statisticInfo.selectors.filter(
          {
            statisticInfo: [
              { isCompleted: true, startDate: currentDate } as any,
            ],
          },
          "currentWeek",
          currentDate
        )
      ).toEqual([{ isCompleted: true, startDate: currentDate }]);
    });
    it("pastWeek filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const tasks = statisticInfo.selectors.filter(
        {
          statisticInfo: [
            // In filter
            { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 15) } as any,
          ],
        },
        "pastWeek",
        currentDate
      );
      expect(tasks).toEqual([
        { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
      ]);
    });
    it("twoWeeksAgo filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const tasks = statisticInfo.selectors.filter(
        {
          statisticInfo: [
            // In filter
            { isCompleted: true, startDate: new Date(2024, 3, 1) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 2, 31) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
          ],
        },
        "twoWeeksAgo",
        currentDate
      );
      expect(tasks).toEqual([
        { isCompleted: true, startDate: new Date(2024, 3, 1) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
      ]);
    });
  });
  describe("aggrigateTasks", () => {
    it("should return all week values for one the Monday item", () => {
      const items: StatisticItem[] = [
        {
          completedPomodoro: 40000,
          taskId: -15,
          pauseTime: 17875,
          startDateString: new Date(2024, 3, 15).toUTCString(),
          workTime: 145296,
          type: "work",
        },
      ];
      const values = aggrigateStatistic(items);
      expect(values.map((v) => v.day)).toEqual([0, 1, 2, 3, 4, 5, 6]);
      expect(values[0]).toMatchSnapshot();
      expect(values[1]).toMatchSnapshot();
    });
    it("should summarize same day values", () => {
      const workItem: StatisticItem = {
        completedPomodoro: 40000,
        taskId: -15,
        pauseTime: 17875,
        startDateString: new Date(2024, 3, 15).toUTCString(),
        workTime: 145296,
        type: "work",
      };
      const pauseItem: StatisticItem = {
        taskId: -15,
        startDateString: new Date(2024, 3, 15).toUTCString(),
        type: "pause",
        pauseTime: 17875,
      };
      const items: StatisticItem[] = [workItem, workItem, pauseItem, pauseItem];
      const values = aggrigateStatistic(items);
      expect(values[0]).toMatchSnapshot();
    });
  });
});
