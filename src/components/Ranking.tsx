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
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  InputGroup,
  InputLeftElement,
  chakra,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Activity } from "./Space";
import RankingCard from "./RankingCard";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const CFaUserAlt = chakra(FaUserAlt);

interface Rank {
  username: string;
  points: number;
  userId: string;
}

interface User {
  _id: string;
  username: string;
}
interface Props {
  users: User[];
  tasksDone: Activity[];
  onUpdateSpace: () => void;
}

const Ranking = ({ users, tasksDone, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [usersFound, setUsersFound] = useState<User[]>([]);
  const [usersDisplay, setUsersDisplay] = useState("none");

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

  const getUsers = () => {
    apiClient
      .get(`/users`)
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
      });
  };

  const closeModal = () => {
    setUsersDisplay("none");
    setUsersFound([]);
    setAllUsers([]);
    setError("");
    reset();
    onClose();
  };

  // Add user
  const onSubmitAddUser = (data: FieldValues) => {
    const user = usersFound.find((u) => u.username === data.username);

    if (user) {
      apiClient
        .put(`/spaces/${localStorage.getItem("currentSpaceId")}/users`, user)
        .then(() => {
          closeModal();
          onUpdateSpace();
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setIsLoading(false);
          setUsersDisplay("none");
          setUsersFound([]);
          setAllUsers([]);
          setError(err.response.data.message);
        });
    } else {
      setError("username not found");
    }
  };

  const ranking = buildRanking(users, tasksDone).sort(
    (a, b) => b.points - a.points
  );

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"}>
        <Button
          colorScheme="blue"
          onClick={() => {
            onOpen();
            getUsers();
          }}
        >
          Add user
        </Button>
      </HStack>

      {ranking.map((r, index) => (
        <RankingCard
          position={index + 1}
          username={r.username}
          points={r.points}
          key={r.userId}
        />
      ))}

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add user to space</ModalHeader>

          <ModalBody>
            <Stack spacing={4} p={1}>
              <form id="formAddUser" onSubmit={handleSubmit(onSubmitAddUser)}>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />

                    <Input
                      {...register("username")}
                      type="text"
                      placeholder="Username"
                      onChange={(e) => {
                        setValue("username", e.target.value);
                        if (e.target.value.length >= 3) {
                          const usersFound = allUsers.filter((user) => {
                            return user.username
                              .toLowerCase()
                              .startsWith(e.target.value.toLowerCase());
                          });

                          if (usersFound.length !== 0) {
                            setUsersDisplay("");
                            setUsersFound(usersFound);
                          }
                        }
                      }}
                    />
                  </InputGroup>
                  {error && (
                    <Text as="i" color="red">
                      {error}
                    </Text>
                  )}
                </FormControl>
              </form>

              <Box display={usersDisplay}>
                {usersFound.map((user) => (
                  <Text
                    bg={"gray.600"}
                    borderRadius={10}
                    pl={2}
                    pb={1}
                    mb={1}
                    fontSize="lg"
                    key={user._id}
                    onClick={() => {
                      setValue("username", user.username);
                      setUsersDisplay("none");
                    }}
                  >
                    {user.username}
                  </Text>
                ))}
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="formAddUser"
              isLoading={isLoading}
              colorScheme="blue"
            >
              Add user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Ranking;
