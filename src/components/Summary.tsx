import {
  Box,
  Center,
  HStack,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Activity } from "./Space";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Props {
  tasksDone: Activity[];
  deleteIcons: boolean;
  onUpdateSpace: () => void;
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
const Summary = ({ tasksDone, deleteIcons, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [deleteTaskDoneId, setDeleteTaskDoneId] = useState("");
  const [error, setError] = useState("");
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

  // Delete taskDone
  const deleteTaskDone = (taskDoneId: string) => {
    apiClient
      .delete(
        `/spaces/${localStorage.getItem(
          "currentSpaceId"
        )}/activities/${taskDoneId}`
      )
      .then((res) => {
        onUpdateSpace();
        setDeleteTaskDoneId("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
        setDeleteTaskDoneId("");
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>SUMMARY</Heading>
      </Center>
      {[...tasksDone].reverse().map((t) => {
        let printDate = false;
        // TODO: DO this right not using substring
        if (t.date.substring(0, 10) !== lastDate.substring(0, 10)) {
          lastDate = t.date;
          printDate = true;
        }

        return (
          <Stack key={t._id}>
            {printDate && <Heading size={"md"}>{getMyDate(t.date)}</Heading>}
            <HStack p={1}>
              <Box w="100%" bg={"gray.700"} borderRadius={10}>
                <HStack justify={"space-between"} p={2}>
                  <Text>{t.taskname}</Text>
                  <Text>{t.points} points</Text>
                  <Text>{t.username}</Text>
                </HStack>
              </Box>
              {deleteIcons && (
                <DeleteIcon
                  color="red"
                  onClick={(e) => {
                    setDeleteTaskDoneId(t._id);
                    onOpen();
                    e.stopPropagation();
                  }}
                />
              )}
            </HStack>
          </Stack>
        );
      })}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete this task done?</ModalHeader>

          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();

                setError("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteTaskDone(deleteTaskDoneId);
                onClose();
              }}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Summary;
