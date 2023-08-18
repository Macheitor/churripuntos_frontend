
import { Activity, User } from "../hooks/useSpace";

export interface Rank {
  username: string;
  points: number;
  userId: string;
}

const buildRanking = (users: User[], arr: Activity[]) => {
  let result = arr.reduce((acc: Rank[], val) => {
    const index = acc.findIndex((obj) => obj.userId === val.userId);
    if (index !== -1) {
      acc[index].points += val.points;
    } else {
      acc.push({
        username: val.username,
        points: val.points,
        userId: val.userId,
      });
    }
    return acc;
  }, []);

  // Add users with 0 points
  users.map((u) => {
    const index = result.findIndex((obj) => obj.userId === u._id);
    if (index === -1) {
      result.push({
        username: u.username,
        points: 0,
        userId: u._id,
      });
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
