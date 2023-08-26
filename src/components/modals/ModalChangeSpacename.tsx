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
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";

interface Props {
  children: ReactNode;
  space: Space;
  onSpacenameChanged: (newSpacename: string) => void;
}
const ModalChangeSpacename = ({
  children,
  space,
  onSpacenameChanged,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    const newSpacename = data.newSpacename;
    spaceService
      .changeSpacename(space, newSpacename)
      .then(() => {
        onSpacenameChanged(newSpacename);
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
          <ModalHeader>Change spacename</ModalHeader>

          <ModalBody>
            <form id="changeSpacename" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p={1}>
                <FormControl>
                  <Input
                    {...register("newSpacename", {
                      required: true,
                      maxLength: 12,
                    })}
                    type="text"
                    placeholder={space.spacename}
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" form="changeSpacename" colorScheme="blue">
              Change spacename
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalChangeSpacename;
