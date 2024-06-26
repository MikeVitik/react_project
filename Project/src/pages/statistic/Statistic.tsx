import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FilterType,
  RootState,
  StatisticValues,
  aggrigateStatistic,
  filterStatistic,
  generateStatistics,
} from "store";
import { InfoCard } from "../../components/InfoCard";
import { Chart } from "../../components/chart";
import { FocusIcon } from "../../components/icons/Focus";
import { PauseIcon } from "../../components/icons/Pause";
import { StopsIcon } from "../../components/icons/Stops";
import { PomodoroCount } from "./components/PomodoroCount";
import { SelectedDay } from "./components/SelectedDay";

export function StatisticConnect() {
  const [filter, setFilter] = useState<FilterType>("currentWeek");
  const items = useSelector((state: RootState) =>
    filterStatistic(state, filter)
  );
  const values = aggrigateStatistic(items);
  return (
    <Statistic
      filter={filter}
      onFilterChange={setFilter}
      values={values}
    ></Statistic>
  );
}

const items = generateStatistics();

const defaultValues = aggrigateStatistic(
  filterStatistic({ statisticInfo: items }, "currentWeek")
);
export function Statistic({
  filter = "currentWeek",
  onFilterChange,
  values = defaultValues,
}: {
  filter?: FilterType;
  onFilterChange?: (e: FilterType) => void;
  values?: StatisticValues[];
}) {
  const [selectedDay, onSelectDayChanged] = useState(0);
  const { workTime, completedPomodoro, pauseCount, pauseTime, focusValue } =
    values[selectedDay] || {};
  return (
    <>
      <div className="flex justify-between pb-4">
        <div>Ваша активность</div>
        <select
          className="w-1/4"
          value={filter}
          onChange={(e) => onFilterChange?.(e.target.value as FilterType)}
        >
          <option value="currentWeek">Эта неделя</option>
          <option value="pastWeek">Прошедшая неделя</option>
          <option value="twoWeeksAgo">Две недели назад</option>
        </select>
      </div>
      <div className="grid gap-8 grid-cols-12 mb-8">
        <div className="col-start-1 col-end-4">
          <SelectedDay selectedDay={selectedDay} workTime={workTime} />
        </div>
        <div className="col-start-1 col-end-4">
          <PomodoroCount pomodoroCount={completedPomodoro} />
        </div>
        <div className="row-start-1 row-end-3 col-start-4 col-end-13">
          <Chart
            selectedDay={selectedDay}
            onSelectDayChanged={onSelectDayChanged}
            values={values.map((val) => val.workTime)}
          />
        </div>
      </div>
      <div className="grid gap-8 grid-flow-col auto-cols-auto">
        <div>
          <InfoCard
            type={workTime === 0 ? "inactive" : "focus"}
            text="Фокус"
            data={Math.floor(focusValue) + "%"}
            icon={FocusIcon}
          ></InfoCard>
        </div>
        <div>
          <InfoCard
            type={workTime === 0 ? "inactive" : "pause"}
            text="Время на паузе"
            data={Math.floor(pauseTime) + "м"}
            icon={PauseIcon}
          ></InfoCard>
        </div>
        <div>
          <InfoCard
            type={workTime === 0 ? "inactive" : "stop"}
            text="Остановки"
            data={pauseCount.toString()}
            icon={StopsIcon}
          ></InfoCard>
        </div>
      </div>
    </>
  );
}
