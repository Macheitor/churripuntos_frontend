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
} from "@chakra-ui/react";
import { Activity } from "./Space";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Props {
  tasksDone: Activity[];
  onUpdateSpace: () => void;
}

const Summary = ({ tasksDone, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [deleteTaskDoneId, setDeleteTaskDoneId] = useState("");
  const [error, setError] = useState("");

  // Delete taskDone
  const deleteTaskDone = (taskDoneId: string) => {
    apiClient
      .delete(
        `/spaces/${localStorage.getItem(
          "currentSpaceId"
        )}/activities/${taskDoneId}`
      )
      .then((res) => {
        console.log(res);
        onUpdateSpace();
        setDeleteTaskDoneId("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
        setError(err.response.data.message);
        setDeleteTaskDoneId("");
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>SUMMARY</Heading>
      </Center>
      {tasksDone.map((t) => (
        <Box w="100%" bg={"gray.700"} borderRadius={10} key={t._id}>
          <HStack justify={"space-between"} p={2}>
            <Text>{t.taskname}</Text>
            <Text>{t.points} points</Text>
            <Text>{t.username}</Text>
            <Box
              bg="gray.600"
              border="3px"
              borderRadius={20}
              borderColor="gray.700"
            >
              <CloseIcon
                fontSize={8}
                mb={1}
                mr={2}
                ml={2}
                color="gray.700"
                onClick={(e) => {
                  setDeleteTaskDoneId(t._id);
                  onOpen();
                  e.stopPropagation();
                }}
              />
            </Box>
          </HStack>
        </Box>
      ))}
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
