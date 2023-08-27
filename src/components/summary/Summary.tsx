import { Box, Center, HStack, Heading, Text, Stack } from "@chakra-ui/react";
import { Activity, Space } from "../../hooks/useSpace";
import { ChevronRightIcon } from "@chakra-ui/icons";
import DrawerSummary from "./DrawerSummary";

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

  const findUsername = (userId: string) =>
    space.users.find((u) => u._id === userId)?.username;

  return (
    <>
      <Center>
        <Heading size={"lg"}>SUMMARY</Heading>
      </Center>
      {[...tasksDone].reverse().map((taskDone) => {
        let printDate = false;
        let date = getMyDate(taskDone.date);

        if (lastDate !== date) {
          lastDate = date;
          printDate = true;
        }

        return (
          <Stack key={taskDone._id}>
            {printDate && <Heading size={"md"}>{date}</Heading>}
            <HStack p={1}>
              <Box w="100%" bg={"gray.700"} borderRadius={10}>
                <DrawerSummary
                  space={space}
                  taskDoneSelected={taskDone}
                  onTaskDoneDeleted={(taskDone: Activity) =>
                    onTaskDoneDeleted(taskDone)
                  }
                >
                  <HStack justify={"space-between"} p={2}>
                    <Text>{taskDone.taskname}</Text>
                    <Text>{taskDone.points} points</Text>
                    <HStack>
                      <Text>{findUsername(taskDone.userId)}</Text>
                      <ChevronRightIcon boxSize={7} />
                    </HStack>
                  </HStack>
                </DrawerSummary>
              </Box>
            </HStack>
          </Stack>
        );
      })}
    </>
  );
};

export default Summary;
