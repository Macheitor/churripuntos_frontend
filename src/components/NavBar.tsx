import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
  return (
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <AiOutlineUser size="30" />
    </HStack>
  );
};

export default NavBar;
