import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";
import { Space } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";

interface Props {
  children: ReactNode;
  onSpaceCreated: (space: Space) => void;
}

const ModalAddUser = ({ children, onSpaceCreated }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
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

    onCloseModal();
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create new space</ModalHeader>

          <ModalBody>
            <Stack spacing={4} p={1}>
              <form id="formCreateSpace" onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />

                    <Input
                      {...register("spacename", {
                        required: true,
                        maxLength: 12,
                      })}
                      type="text"
                      placeholder="Spacename"
                    />
                  </InputGroup>
                </FormControl>
              </form>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" form="formCreateSpace" colorScheme="blue">
              Create space
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddUser;
