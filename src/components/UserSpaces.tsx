import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import useUserSpaces from "../hooks/useUserSpaces";
import { Space } from "../hooks/useSpace";
import ModalCreateSpace from "./modals/ModalCreateSpace";

const UserSpaces = () => {
  // Hook for navigate between pages
  const navigate = useNavigate();

  // Custom hook user spaces
  const { spaces, spacesError, onSpaceCreated } = useUserSpaces();

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      alignItems="center"
    >
      {/* Box to fix the size of the view */}
      <Box minW={{ base: "90%", md: "750px" }}>
        {/* Grid of the user spaces */}
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
          }}
        >
          {/* Navbar item */}
          <GridItem area="nav">
            <NavBar />
          </GridItem>

          {/* Button for creating spaces */}
          <ModalCreateSpace
            onSpaceCreated={(space: Space) => onSpaceCreated(space)}
          >
            <HStack justify={"right"} mr={2}>
              <Button colorScheme="blue">Create space</Button>
            </HStack>
          </ModalCreateSpace>

          <Center>
            <GridItem area="main">
              {spacesError && <Text>{spacesError}</Text>}
              <SimpleGrid padding="10px" spacing={10}>
                {spaces.map((space: Space) => (
                  <Button
                    bg={"gray.700"}
                    borderRadius={10}
                    fontSize="2xl"
                    key={space._id}
                    onClick={() => {
                      navigate(`/spaces/${space._id}`);
                    }}
                  >
                    {space.spacename}
                  </Button>
                ))}
              </SimpleGrid>
            </GridItem>
          </Center>
        </Grid>
      </Box>
    </Flex>
  );
};

export default UserSpaces;
