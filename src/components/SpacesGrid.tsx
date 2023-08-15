import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import SpaceCard from "./SpaceCard";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useUserSpaces from "../hooks/useUserSpaces";

const CFaUserAlt = chakra(FaUserAlt);

const SpacesGrid = () => {
  const navigate = useNavigate();
  const { spaces, spacesError } = useUserSpaces();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    reset();
    onClose();
  };

  // Create space
  const onSubmitCreateSpace = (data: FieldValues) => {
    apiClient
      .post(`/spaces/`, data)
      .then(() => {
        closeModal();
        setIsLoading(false);
        window.location.reload(); // TODO: Find a way to reload only this component
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      alignItems="center"
    >
      <Box minW={{ base: "90%", md: "750px" }}>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
          }}
        >
          <GridItem area="nav">
            <NavBar />
          </GridItem>

          <HStack justify={"right"} mr={2}>
            <Button
              colorScheme="blue"
              onClick={() => {
                onOpen();
              }}
            >
              Create space
            </Button>
          </HStack>

          <Center>
            <GridItem area="main">
              {spacesError && <Text>{spacesError}</Text>}
              <SimpleGrid padding="10px" spacing={10}>
                {spaces.map((space) => (
                  <SpaceCard
                    key={space._id}
                    space={space}
                    onSelect={(spaceId) => {
                      localStorage.setItem("currentSpaceId", spaceId);
                      navigate(`/spaces/${spaceId}`);
                    }}
                  ></SpaceCard>
                ))}
              </SimpleGrid>
            </GridItem>
          </Center>
        </Grid>
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Create new space</ModalHeader>

            <ModalBody>
              <Stack spacing={4} p={1}>
                <form
                  id="formCreateSpace"
                  onSubmit={handleSubmit(onSubmitCreateSpace)}
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />

                      <Input
                        {...register("spacename")}
                        type="text"
                        placeholder="Spacename"
                      />
                    </InputGroup>
                    {error && (
                      <Text as="i" color="red">
                        {error}
                      </Text>
                    )}
                  </FormControl>
                </form>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" mr={3} onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="formCreateSpace"
                isLoading={isLoading}
                colorScheme="blue"
              >
                Create space
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default SpacesGrid;
