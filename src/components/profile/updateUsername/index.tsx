import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  HStack,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { BiRename } from "react-icons/bi";
import { UPDATE_USERNAME } from "../../../api/user";
import { useForm } from "react-hook-form";
import { useSession } from "../../../auth";
import { UpdateNameValues } from "../../../interfaces";

const UpdateUsername = () => {
  const { user } = useSession();
  const toast = useToast();

  const { register, handleSubmit } = useForm();

  const [updateUsername] = useMutation(UPDATE_USERNAME, {
    onCompleted: () => {
      toast({
        title: "Succes",
        description: "Gebruikersnaam is bijgewerkt.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
    onError: error => {
      toast({
        title: "Error",
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleUpdateName = useCallback(
    (formData: UpdateNameValues) => {
      if (formData.newName === undefined || formData.newName === "") {
        toast({
          title: "Error",
          description: "Nieuwe naam mag niet leeg zijn.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      if (formData.newName?.length < 3) {
        toast({
          title: "Error",
          description: "Nieuwe naam moet langer zijn dan 3 karakters.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      updateUsername({ variables: { id: user.id, newName: formData.newName } });
    },
    [updateUsername, user, toast]
  );

  return (
    <Center>
      <Popover>
        <PopoverTrigger>
          <Button leftIcon={<BiRename />}>Verander gebruikersnaam</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <form onSubmit={handleSubmit(handleUpdateName)}>
              <FormControl>
                <FormLabel>Nieuwe gebruikersnaam</FormLabel>
                <Input type="text" variant="filled" {...register("newName")} mb="1rem" />
              </FormControl>
              <HStack spacing="1rem">
                <Spacer />
                <Button type="submit">Bevestigen</Button>
              </HStack>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};

export default UpdateUsername;
