import React from "react";
import { Task } from "../hooks/useSpace";
import TaskCard from "./TaskCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";

interface Props {
  tasks: Task[];
}
const Tasks = ({ tasks }: Props) => {
  return (
    <SimpleGrid spacing={1}>
      <Heading size={"lg"}>TASK LIST</Heading>
      {tasks.map((task) => (
        <TaskCard
          taskName={task.taskname}
          taskPoints={task.points}
          key={task._id}
        />
      ))}
    </SimpleGrid>
  );
};

export default Tasks;
