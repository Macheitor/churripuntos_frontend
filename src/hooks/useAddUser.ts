import { useToast } from "@chakra-ui/react";
import spaceService from "../services/space-service";
import { Space } from "./useSpace";
import { CanceledError } from "../services/api-client";

const addUser = (space: Space, email: string) => {
  const toast = useToast();

  spaceService
    .addUser(space, email)
    .then((res) => {

      toast({
        title: `user ${res.data.user.username} added to "${space.spacename}".`,
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

export default addUser;
