import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  FormControl,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Space } from "../../hooks/useSpace";
import { FieldValues, useForm } from "react-hook-form";
import userService from "../../services/user-service";
import { CanceledError } from "../../services/api-client";

interface Props {
  children: ReactNode;
  space: Space;
  currentUserId: string;
  onUsernameChanged: (userId: string, newUsername: string) => void;
}
const ModalChangeUsername = ({
  children,
  space,
  currentUserId,
  onUsernameChanged,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    const userId = currentUserId;
    const newUsername = data.newUsername;
    userService
      .changeUsername(userId, newUsername)
      .then(() => {
        onUsernameChanged(userId, newUsername);
        onCloseModal();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
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
          <ModalHeader>Change username</ModalHeader>

          <ModalBody>
            <form id="changeUsername" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p={1}>
                <FormControl>
                  <Input
                    {...register("newUsername")}
                    type="text"
                    placeholder={
                      space.users.find((user) => user._id === currentUserId)
                        ?.username
                    }
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" form="changeUsername" colorScheme="blue">
              Change username
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalChangeUsername;
