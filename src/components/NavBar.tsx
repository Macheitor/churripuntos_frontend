import { Button, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

import ColorModeSwitch from "./ColorModeSwitch";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <UserMenu></UserMenu>
    </HStack>
  );
};

export default NavBar;
