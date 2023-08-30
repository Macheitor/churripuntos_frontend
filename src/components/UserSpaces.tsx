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
  useToast,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import useUserSpaces from "../hooks/useUserSpaces";
import { Space } from "../hooks/useSpace";
import GenericModal from "./modals/GenericModal";
import { FieldValues } from "react-hook-form";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";
import { useEffect } from "react";

const UserSpaces = () => {
  // Hook for navigate between pages
  const navigate = useNavigate();

  // Custom hook user spaces
  const { spaces, spacesError, onSpaceCreated } = useUserSpaces();

  const toast = useToast();

  const createSpace = (data: FieldValues) => {
    const spacename = data.spacename;

    spaceService
      .create(spacename)
      .then((res) => {
        onSpaceCreated(res.data.space);
        toast({
          title: `Space "${spacename}" created.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // At user spaces default tab is always the first one "Ranking"
  useEffect(() => {
    sessionStorage.setItem("currentTab", "0")
  }, [])

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

          <GenericModal
            title="Create new space"
            spacenameForm
            passwordForm
            repasswordForm
            dismissBtn="Cancel"
            actionBtn="Create space"
            onAction={(data?: FieldValues) => {
              data && createSpace(data);
            }}
          >
            <HStack justify={"right"} mr={2}>
              <Button colorScheme="blue">Create space</Button>
            </HStack>
          </GenericModal>

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
