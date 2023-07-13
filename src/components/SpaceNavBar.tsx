import { Button, HStack, Icon, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface Props {
  spacename: string;
}
const SpaceNavBar = ({ spacename }: Props) => {
  const navigate = useNavigate();

  return (
    <HStack justify={"space-between"} padding={2}>
      <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
      <Text>{spacename}</Text>
      <UserMenu></UserMenu>
    </HStack>
  );
};

export default SpaceNavBar;
