import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
} from "@chakra-ui/react";
import { Activity } from "./Space";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import Form from "./Form";
import useRanking from "../hooks/useRanking";
import userService from "../services/user-service";

export interface Rank {
  username: string;
  points: number;
  userId: string;
}

export interface User {
  _id: string;
  username: string;
}

interface Props {
  users: User[];
  activities: Activity[];
  deleteIcons: boolean;
  onUpdateSpace: () => void;
}

const Ranking = ({ users, deleteIcons, activities, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { ranking } = useRanking(users, activities);

  const getAllUsers = () => {
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
        setAllUsers([]);
      });
    return () => cancel();
  };

  const handleDeleteUser = (userId: string) => {
    apiClient
      .delete(
        `/spaces/${localStorage.getItem("currentSpaceId")}/users/${userId}`
      )
      .then(() => {
        onUpdateSpace();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const closeModal = () => {
    setAllUsers([]);
    setError("");
    onClose();
  };

  // Add user
  const onAddUser = (username: string) => {
    const user = allUsers.find((u) => u.username === username);

    if (user) {
      apiClient
        .put(`/spaces/${localStorage.getItem("currentSpaceId")}/users`, user)
        .then(() => {
          closeModal();
          onUpdateSpace();
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setAllUsers([]);
          setError(err.response.data.message);
        });
    } else {
      setError("username not found");
    }
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <Button
          colorScheme="blue"
          onClick={() => {
            onOpen();
            getAllUsers();
          }}
        >
          Add user
        </Button>
      </HStack>

      {ranking.map((r, index) => (
        <HStack key={r.userId} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <HStack justify={"space-between"} ml={2} mr={2}>
              <Heading fontSize="2xl">{index + 1}</Heading>
              <Text>{r.username}</Text>
              <Text>{r.points} points</Text>
            </HStack>
          </Box>

          {deleteIcons && r.userId !== `${localStorage.getItem("userId")}` &&
            <DeleteIcon
              color="red"
              onClick={() => {
                handleDeleteUser(r.userId);
              }}
            />
          }
        </HStack>
      ))}

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Stack spacing={4} p={1}>
            <Form
              title="Add user to space"
              acceptText="Add user"
              acceptBtnDefault={false}
              cancelBtn={true}
              cancelText="Cancel"
              usernameInput={true}
              errorMsg={error}
              userList={allUsers.map((user) => user.username)}
              onAccept={(data: FieldValues) => {
                onAddUser(data.username);
              }}
              onCancel={closeModal}
            />
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Ranking;
