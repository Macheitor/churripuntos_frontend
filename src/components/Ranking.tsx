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
import { Activity, User } from "../hooks/useSpace";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { CanceledError } from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import Form from "./Form";
import useRanking from "../hooks/useRanking";
import userService from "../services/user-service";
import ModalAcceptCancel from "./ModalAcceptCancel";
import ModalAddUser from "./ModalAddUser";

interface Props {
  users: User[];
  activities: Activity[];
  deleteIcons: boolean;
  onAddUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const Ranking = ({
  users,
  deleteIcons,
  activities,
  onAddUser,
  onDeleteUser,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [modalAddUser, setModalAddUser] = useState(false);
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

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <ModalAddUser allUsers={allUsers} onAccept={() => console.log("Add user")}>
          <Button
            colorScheme="blue"
            onClick={() => {
              onOpen();
              getAllUsers();
            }}
          >
            Add user
          </Button>
        </ModalAddUser>
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

          {deleteIcons && r.userId !== `${localStorage.getItem("userId")}` && (
            <ModalAcceptCancel
              acceptText="Delete user"
              title={`Are you sure you want to delete "${r.username}" ?`}
              onAccept={() => {
                const user: User = { username: r.username, _id: r.userId };
                onDeleteUser(user);
              }}
            >
              <DeleteIcon color="red" />
            </ModalAcceptCancel>
          )}
        </HStack>
      ))}
    </>
  );
};

export default Ranking;
