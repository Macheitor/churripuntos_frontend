import { HStack, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  spacename: string;
}
const SpaceNavBar = ({ spacename }: Props) => {
  const navigate = useNavigate();

  return (
    <HStack justify={"space-between"} padding={5}>
      <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
      <Text fontSize="xl">{spacename}</Text>
      <EditIcon boxSize={6} />
    </HStack>
  );
};

export default SpaceNavBar;
