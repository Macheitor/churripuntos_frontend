import { Activity, User } from "../hooks/useSpace";

export interface Rank extends User {
  points: number;
  isUserInSpace: boolean;
}

const buildRanking = (users: User[], arr: Activity[]) => {
  let result: Rank[] = users.map((user) => ({
    ...user,
    points: 0,
    isUserInSpace: true,
  }));

  arr.forEach((activity) => {
    const index = result.findIndex((user) => user._id === activity.userId);
    if (index !== -1) {
      result[index].points += activity.points;
    } 
    // Ignore the users with activities that are not in the space anymore
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
