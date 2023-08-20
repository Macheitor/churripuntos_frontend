import { Activity, User } from "../hooks/useSpace";

export interface Rank extends User {
  points: number;
}

const buildRanking = (users: User[], arr: Activity[]) => {
  let result: Rank[] = users.map((user) => ({ ...user, points: 0 }));

  arr.forEach((activity) => {
    const index = result.findIndex((user) => user._id === activity.userId);
    if (index !== -1) {
      result[index].points += activity.points;
    } else {
      console.log("weird shit happened")
    }
  });
  return result;
};

const useRanking = (users: User[], activities: Activity[]) => {
  const ranking = buildRanking(users, activities).sort(
    (a, b) => b.points - a.points
  );
  return { ranking };
};

export default useRanking;
