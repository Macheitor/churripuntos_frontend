import React, { useEffect, useState } from "react";
import { Task } from "../hooks/useSpace";
import TaskCard from "./TaskCard";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  TagRightIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TaskAdd from "./TaskAdd";

interface Props {
  tasks: Task[];
}
const Tasks = ({ tasks }: Props) => {
  const [addTask, setAddTask] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {addTask ? (
        <TaskAdd onGoBack={() => console.log("go back")} />
      ) : (
        <>
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
          <Button float={"right"} marginY={1} onClick={() => setAddTask(true)}>
            {" "}
            Add task
          </Button>
        </>
      )}
      {/* 

       */}
    </>
  );
};

export default Tasks;
