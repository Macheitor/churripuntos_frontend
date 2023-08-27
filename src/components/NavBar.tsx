import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <UserMenu></UserMenu>
    </HStack>
  );
};

export default NavBar;
