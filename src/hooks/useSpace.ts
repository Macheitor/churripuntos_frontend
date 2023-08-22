import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient, { CanceledError } from "../services/api-client";

export interface User {
  isAdmin?: boolean;
  username: string;
  _id: string;
  isDeleted: boolean
}

export interface Task {
  taskname: string;
  points: number;
  _id: string;
}

export interface Activity {
  userId: string;
  taskId: string;
  taskname: string;
  points: number;
  date: string;
  validated: boolean;
  _id: string;
}

export interface Space {
  spacename: string;
  users: User[];
  tasks: Task[];
  activities: Activity[];
  _id: string;
}

interface FetchGetSpaceResponse {
  status: string;
  space: Space;
}

const useSpace = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState<Space>({
    spacename: "",
    users: [],
    tasks: [],
    activities: [],
    _id: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    apiClient
      .get<FetchGetSpaceResponse>(`/spaces/${spaceId}`, { signal })
      .then((res) => {
        setSpace(res.data.space);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });

    return () => controller.abort();
  }, []);

  const onSpacenameChanged = (newSpacename: string) => {
    setSpace({ ...space, spacename: newSpacename });
  };

  const onUserAdded = (user: User) => {
    setSpace({ ...space, users: [...space.users, user] });
  };

  const onUserKicked = (user: User) => {
    setSpace({
      ...space,
      users: space.users.filter((u) => u._id !== user._id),
    });
  };

  const onTaskCreated = (task: Task) => {
    setSpace({ ...space, tasks: [...space.tasks, task] });
  };

  const onTaskDeleted = (task: Task) => {
    setSpace({
      ...space,
      tasks: space.tasks.filter((t) => t._id !== task._id),
    });
  };

  const onTaskDone = (activity: Activity) => {
    setSpace({ ...space, activities: [...space.activities, activity] });
  };

  const onTaskDoneDeleted = (taskDone: Activity) => {
    setSpace({
      ...space,
      activities: space.activities.filter(
        (activity) => activity._id !== taskDone._id
      ),
    });
  };

  return {
    space,
    onSpacenameChanged,
    onUserAdded,
    onUserKicked,
    onTaskCreated,
    onTaskDeleted,
    onTaskDone,
    onTaskDoneDeleted,
  };
};

export default useSpace;
