import { Badge, Box, Button, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Space, User } from "../hooks/useSpace";
import { DeleteIcon } from "@chakra-ui/icons";
import useRanking from "../hooks/useRanking";
import ModalAddUser from "./modals/ModalAddUser";
import ModalKickOutUser from "./modals/ModalKickOutUser";
import { useState } from "react";

interface Props {
  space: Space;
  currentUser: User;
  onUserAdded: (user: User) => void;
  onUserKicked: (user: User) => void;
}

const Ranking = ({
  space,
  currentUser,
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

      {ranking.map((rank, index) => (
        <HStack key={rank._id} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <HStack justify={"space-between"} ml={2} mr={2}>
              <Heading fontSize="2xl">{index + 1}</Heading>
              <HStack>
              <Text>{rank.username}</Text>


              { rank.isAdmin && <Badge>ADMIN</Badge>}
              </HStack>
              <Text>{rank.points} points</Text>
            </HStack>
          </Box>

          {showDeleteIcon && rank._id !== currentUser._id && (
            <ModalKickOutUser
              space={space}
              user={rank}
              onUserKicked={() => {
                onUserKicked(rank);
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
