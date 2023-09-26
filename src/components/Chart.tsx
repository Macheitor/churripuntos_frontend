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
  cumulative: boolean;
}

const Chart = ({ space, cumulative = true }: Props) => {
  // Helper function to get date in format YYYY-MM-DD
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Helper function to get a random color
  const randomColor = (index: number) => {
    const randomBetween = (min: number, max: number) =>
      min + Math.floor(Math.random() * (max - min + 1));

    let rgb;

    switch (index) {
      case 0:
        rgb = "(0,0,0)";
        break;
      case 1:
        rgb = "rgb(255,255,255)";
        break;
      case 2:
        rgb = "rgb(255,0,0)";
        break;
      case 3:
        rgb = "rgb(0,255,0)";
        break;
      case 4:
        rgb = "rgb(0,0,255)";
        break;
      case 5:
        rgb = "rgb(255,255,0)";
        break;
      case 6:
        rgb = "rgb(0,255,255)";
        break;
      case 7:
        rgb = "rgb(255,0,255)";
        break;
      case 8:
        rgb = "rgb(192,192,192)";
        break;
      case 9:
        rgb = "rgb(128,128,128)";
        break;
      case 10:
        rgb = "rgb(128,0,0)";
        break;
      case 11:
        rgb = "rgb(128,128,0)";
        break;
      case 12:
        rgb = "rgb(0,128,0)";
        break;
      case 13:
        rgb = "rgb(128,0,128)";
        break;
      case 14:
        rgb = "rgb(0,128,128)";
        break;
      case 15:
        rgb = "rgb(0,0,128)";
        break;

      default:
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
    }
    return rgb;
  };

  const accumulator = (arr: number[]) =>
    arr.map(
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    );

  // Dates string
  const dates: string[] = [];
  const allPoints: { [key: string]: number[] } = {};
  const cumulativeAllPoints: { [key: string]: number[] } = {};
  const currentPoints: { [key: string]: number } = {};
  let lastDate: string = "";

  space.users.forEach((user) => (allPoints[user._id] = []));
  space.users.forEach((user) => (currentPoints[user._id] = 0));

  // Go over all activites and add points by user and by date
  space.activities.forEach((activity) => {
    // Take the activity date and format it
    const dateDb = new Date(activity.date);
    const date = formatDate(dateDb);

    // Check if this is new date, therefore we need to store a new date and the accumulated points
    if (date !== lastDate) {
      // Store new date
      dates.push(date);
      // Check if we are in the first round (we have no points to push)
      if (lastDate !== "") {
        // We have store values, therefore store them
        for (const [key, value] of Object.entries(currentPoints)) {
          allPoints[key].push(value);
        }
      }

      // New date, new round. Reset points for each user
      space.users.forEach((user) => (currentPoints[user._id] = 0));
      // Store the points of the current entry
      currentPoints[activity.userId] = activity.points;
      // Update the lastDate flag
      lastDate = date;
    } else {
      // No new date. Store the points for its corresponding user.
      currentPoints[activity.userId] =
        currentPoints[activity.userId] + activity.points;
    }
  });

  // Push the last sample
  for (const [key, value] of Object.entries(currentPoints)) {
    allPoints[key].push(value);
  }

  if (cumulative) {
    for (const [key, value] of Object.entries(allPoints)) {
      cumulativeAllPoints[key] = accumulator(value);
    }
  }

  // Each date has the accumulated points
  const datasets = space.users
    .filter((u) => !u.isDeleted)
    .map((u, index) => {
      const color = randomColor(index);
      return {
        label: u.username,
        data: cumulative ? cumulativeAllPoints[u._id] : allPoints[u._id],
        borderColor: color,
        backgroundColor: color,
      };
    });

  const realdata = { labels: dates, datasets };

  return <Line options={options} data={realdata} />;
};

export default Chart;
