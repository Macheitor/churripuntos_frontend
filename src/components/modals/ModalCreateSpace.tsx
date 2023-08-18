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
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  children: ReactNode;
  onCreateSpace: (spacename: string) => void;
}

const ModalAddUser = ({ children, onCreateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    onCreateSpace(data.spacename);
    onCloseModal();
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onCloseModal} isCentered>
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
                      {...register("spacename")}
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
