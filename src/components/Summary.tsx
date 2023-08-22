import {
  Box,
  Center,
  HStack,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Activity, Space } from "../hooks/useSpace";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ModalDeleteTaskDone from "./modals/ModalDeleteTaskDone";

interface Props {
  space: Space;
  onTaskDoneDeleted: (taskDone: Activity) => void;
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Summary = ({ space, onTaskDoneDeleted }: Props) => {
  const tasksDone = space.activities;

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState("Delete");

  let lastDate = "";

  const getMyDate = (taskDateDB: string) => {
    const currentDate = new Date();
    const taskDate = new Date(taskDateDB);

    if (
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear()
    ) {
      if (taskDate.getDate() === currentDate.getDate()) return "Today";
      if (taskDate.getDate() === currentDate.getDate() - 1) return "Yesterday";
    }

    const day = taskDate.getDay();
    const date = taskDate.getDate();
    const month = taskDate.getMonth() + 1;
    const year = taskDate.getFullYear();

    const result = `${days[day].substring(0, 3)}, ${date} ${months[
      month - 1
    ].substring(0, 3)} ${year}
  `;
    return result;
  };

  const toggleDeleteBtn = () => {
    if (deleteBtn === "Delete") {
      setShowDeleteIcon(true);
      setDeleteBtn("Cancel");
    } else {
      setShowDeleteIcon(false);
      setDeleteBtn("Delete");
    }
  };

  const findUsername = (userId: string) => space.users.find(u => u._id === userId)?.username

  return (
    <>
      <Center>
        <Heading size={"lg"}>SUMMARY</Heading>
      </Center>
      {[...tasksDone].reverse().map((t) => {
        let printDate = false;
        let date = getMyDate(t.date);

        if (lastDate !== date) {
          lastDate = date;
          printDate = true;
        }

        return (
          <Stack key={t._id}>
            {printDate && <Heading size={"md"}>{date}</Heading>}
            <HStack p={1}>
              <Box w="100%" bg={"gray.700"} borderRadius={10}>
                <HStack justify={"space-between"} p={2}>
                  <Text>{t.taskname}</Text>
                  <Text>{t.points} points</Text>
                  <Text>{findUsername(t.userId)}</Text>
                </HStack>
              </Box>
              {showDeleteIcon && (
                <ModalDeleteTaskDone
                  space={space}
                  taskDone={t}
                  onTaskDoneDeleted={(taskDone) => onTaskDoneDeleted(taskDone)}
                >
                  <DeleteIcon
                    color="red"
                  />
                </ModalDeleteTaskDone>
              )}
            </HStack>
          </Stack>
        );
      })}
      {tasksDone.length > 0 && (
        <HStack justify={"right"} p={1}>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              toggleDeleteBtn();
            }}
          >
            {deleteBtn}
          </Button>
        </HStack>
      )}
    </>
  );
};

export default Summary;
