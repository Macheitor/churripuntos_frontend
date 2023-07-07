import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { AiOutlineUser } from "react-icons/ai";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <HStack>
        <ColorModeSwitch />
        <AiOutlineUser size="30" />
      </HStack  >
    </HStack>
  );
};

export default NavBar;
