import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Button, Input, Flex, Collapse, useDisclosure, FormControl, FormLabel, HStack, VStack } from "@chakra-ui/react";
import { BiRename } from "react-icons/bi";
import { UPDATE_USERNAME } from "../../../api/user";
import { useForm } from "react-hook-form";
import { useSession } from "../../../auth";
import { UpdateNameValues } from "../../../interfaces";

const UpdateUsername = () => {
  const { user } = useSession();
  const { isOpen, onToggle } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateUsername] = useMutation(UPDATE_USERNAME, {
    onCompleted: () => {
      //TODO: show completion toast
    },
    onError: error => {
      console.log(error);
      //TODO: show error toast
    },
  });

  const handleUpdateName = useCallback(
    (formData: UpdateNameValues) => {
      if (formData.newName === undefined || formData.newName === "") {
        return;
        //TODO: Show error toast
      }

      if (formData.newName?.length < 3) {
        return;
        //TODO: Show error toast
      }

      updateUsername({ variables: { id: user.id, newName: formData.newName } });
    },
    [updateUsername, user]
  );

  return (
    <Flex flexDirection="column" alignItems="center">
      <VStack spacing="1rem">
        <Button leftIcon={<BiRename />} onClick={onToggle}>
          Verander gebruikersnaam
        </Button>
        <Collapse in={isOpen}>
          <form onSubmit={handleSubmit(handleUpdateName)}>
            <FormControl>
              <FormLabel>Nieuwe gebruikersnaam</FormLabel>
              <Input type="text" variant="filled" {...register("newName")} mb="1rem" />
            </FormControl>
            <HStack spacing="1rem">
              <Button onClick={onToggle}>Annuleren</Button>
              <Button type="submit">Bevestigen</Button>
            </HStack>
          </form>
        </Collapse>
      </VStack>
    </Flex>
  );
};

export default UpdateUsername;
