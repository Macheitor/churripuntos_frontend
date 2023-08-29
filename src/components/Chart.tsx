import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Space } from "../hooks/useSpace";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

interface Props {
  space: Space;
}

const Chart = ({ space }: Props) => {
  // Helper function to get date in format YYYY-MM-DD
  const getDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Helper function to get a random color
  const randomColor = () => {
    const randomBetween = (min: number, max: number) =>
      min + Math.floor(Math.random() * (max - min + 1));

    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
    return rgb;
  };

  const accumulator = (arr: number[]) =>
    arr.map(
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    );

  const dates: string[] = [];

  const allPoints: { [key: string]: number[] } = {};
  space.users.forEach((user) => (allPoints[user._id] = []));

  const cumulativeAllPoints: { [key: string]: number[] } = {};
  space.users.forEach((user) => (allPoints[user._id] = []));

  let lastDate: string = "";
  const currentPoints: { [key: string]: number } = {};
  space.users.forEach((user) => (currentPoints[user._id] = 0));

  space.activities.forEach((activity) => {
    const dateDb = new Date(activity.date);
    const date = getDate(dateDb);

    if (date !== lastDate) {
      dates.push(date); // push x sample
      if (lastDate !== "") {
        for (const [key, value] of Object.entries(currentPoints)) {
          allPoints[key].push(value);
        }
      }

      space.users.forEach((user) => (currentPoints[user._id] = 0)); // reset points
      currentPoints[activity.userId] = activity.points;
      lastDate = date;
    } else {
      currentPoints[activity.userId] =
        currentPoints[activity.userId] + activity.points;
    }
  });
  // Push the last sample
  for (const [key, value] of Object.entries(currentPoints)) {
    allPoints[key].push(value);
  }

  for (const [key, value] of Object.entries(allPoints)) {
    cumulativeAllPoints[key] = accumulator(value);
  }

  const datasets = space.users
    .filter((u) => !u.isDeleted)
    .map((u) => {
      const color = randomColor();
      return {
        label: u.username,
        data: cumulativeAllPoints[u._id],
        borderColor: color,
        backgroundColor: color,
      };
    });

  const realdata = { labels: dates, datasets };

  return <Line options={options} data={realdata} />;
};

export default Chart;
