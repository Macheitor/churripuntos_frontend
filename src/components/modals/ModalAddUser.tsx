import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Stack,
  ModalHeader,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Space, User } from "../../hooks/useSpace";
import { FieldValues, useForm } from "react-hook-form";
import { CanceledError } from "../../services/api-client";
import spaceService from "../../services/space-service";
import { EmailIcon } from "@chakra-ui/icons";

interface Props {
  children: ReactNode;
  space: Space;
  onUserAdded: (user: User) => void;
}

const ModalAddUser = ({ children, space, onUserAdded }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const addUser = (data: FieldValues) => {
    spaceService
      .addUser(space, data.email)
      .then((res) => {
        onUserAdded(res.data.user);
        onCloseModal();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div
        onClick={() => {
          onOpen();
        }}
      >
        {children}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add user</ModalHeader>
          <ModalBody>
            <Stack spacing={4} p={1}>
              <form id="formAddUser" onSubmit={handleSubmit(addUser)}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.300" />}
                    />
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="email"
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
            <Button type="submit" form="formAddUser" colorScheme="blue">
              Add user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddUser;
