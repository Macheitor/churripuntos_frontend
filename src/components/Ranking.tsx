import { Box, Button, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Space, User } from "../hooks/useSpace";
import { DeleteIcon } from "@chakra-ui/icons";
import useRanking from "../hooks/useRanking";
import ModalAddUser from "./modals/ModalAddUser";
import ModalKickOutUser from "./modals/ModalKickOutUser";
import { useState } from "react";

interface Props {
  space: Space;
  currentUserId: string;
  onUserAdded: (user: User) => void;
  onUserKicked: (user: User) => void;
}

const Ranking = ({
  space,
  currentUserId,
  onUserAdded,
  onUserKicked,
}: Props) => {
  const users = space.users;
  const activities = space.activities;

  const { ranking } = useRanking(users, activities);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [removeBtn, setRemoveBtn] = useState("Remove");

  const toggleRemoveBtn = () => {
    if (removeBtn === "Remove") {
      setShowDeleteIcon(true);
      setRemoveBtn("Cancel");
    } else {
      setShowDeleteIcon(false);
      setRemoveBtn("Remove");
    }
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      {ranking.map((user, index) => (
        <HStack key={user._id} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <HStack justify={"space-between"} ml={2} mr={2}>
              <Heading fontSize="2xl">{index + 1}</Heading>
              <Text>{user.username}</Text>
              <Text>{user.points} points</Text>
            </HStack>
          </Box>

          {showDeleteIcon && user._id !== currentUserId && (
            <ModalKickOutUser
              space={space}
              user={user}
              onUserKicked={() => {
                onUserKicked(user);
                if (ranking.length === 2) toggleRemoveBtn();
              }}
            >
              <DeleteIcon color="red" />
            </ModalKickOutUser>
          )}
        </HStack>
      ))}

      <HStack justify={"right"} p={1}>
        <ModalAddUser space={space} onUserAdded={(user) => onUserAdded(user)}>
          <Button
            colorScheme="blue"
            onClick={() => {
              // Force removeBtn to Remove
              setShowDeleteIcon(false);
              setRemoveBtn("Remove");
            }}
          >
            Add user
          </Button>
        </ModalAddUser>

        {ranking.length > 1 && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              toggleRemoveBtn();
            }}
          >
            {removeBtn}
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Ranking;
