import { Button, HStack, Icon, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  spacename: string;
}
const SpaceNavBar = ({ spacename }: Props) => {
  const navigate = useNavigate();

  return (
    <HStack justify={"space-between"} padding={1}>
      <ChevronLeftIcon boxSize={2} onClick={() => navigate(-1)} />
      <Text fontSize="xl">{spacename}</Text>
      <EditIcon boxSize={2}/>
    </HStack>
  );
};

export default SpaceNavBar;
