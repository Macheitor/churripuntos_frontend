import {
  Button,
  HStack,
  Heading,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Input,
  Center,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Props {
  spacename: string;
  spaceId: string;
  onClick: (section: "Ranking" | "Tasks" | "Summary") => void;
  onUpdateSpace: () => void;
}
const SpaceNavBar = ({ spacename, spaceId, onClick, onUpdateSpace }: Props) => {
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<{ newSpacename: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSpacename = (newSpacename: FieldValues) => {
    setIsLoading(true);
    apiClient
      .put(`/spaces/${localStorage.getItem("currentSpaceId")}`, newSpacename)
      .then(() => {
        onClose();
        onUpdateSpace();
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
        reset();
      });
  };

  return (
    <>
      <Stack>
        <HStack justify={"space-between"} padding={3}>
          <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
          <Heading fontSize="xl" onClick={() => onOpen()}>
            {spacename}
          </Heading>
          <EditIcon boxSize={6} />
        </HStack>
        <HStack justifyContent="center">
          <Button onClick={() => onClick("Ranking")}>Ranking</Button>
          <Button onClick={() => onClick("Tasks")}>Tasks List</Button>
          <Button onClick={() => onClick("Summary")}>Summary</Button>
        </HStack>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Change spacename</ModalHeader>

          <ModalBody>
            <form
              id="changeSpacename"
              onSubmit={handleSubmit(onChangeSpacename)}
            >
              <Stack spacing={4} p={1} boxShadow="md">
                <FormControl>
                  <Input
                    {...register("newSpacename")}
                    type="text"
                    placeholder={spacename}
                  />
                </FormControl>
              </Stack>
            </form>
            <Center>
              {error && (
                <Text as="i" color="red">
                  {error}
                </Text>
              )}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                reset();
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="changeSpacename"
              isLoading={isLoading}
              colorScheme="blue"
            >
              Change spacename
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpaceNavBar;
