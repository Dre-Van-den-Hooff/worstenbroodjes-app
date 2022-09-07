import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Button, Input, Text, Collapse, useDisclosure, FormControl, FormLabel } from "@chakra-ui/react";
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
    onCompleted: () => {},
    onError: error => {
      console.log(error);
    },
  });

  const handleUpdateName = useCallback(
    (formData: UpdateNameValues) => {
      if (formData.newName === "") {
        return;
      }

      updateUsername({ variables: { id: user.id, newName: formData.newName } });
    },
    [updateUsername, user]
  );

  return (
    <>
      <Button leftIcon={<BiRename />} onClick={onToggle}>
        Verander gebruikersnaam
      </Button>
      <Collapse in={isOpen}>
        <form onSubmit={handleSubmit(handleUpdateName)}>
          <FormControl>
            <FormLabel>Nieuwe gebruikersnaam</FormLabel>
            <Input type="text" variant="filled" {...register("newName")} />
            <Button onClick={onToggle}>Annuleren</Button>
            <Button type="submit">Bevestigen</Button>
          </FormControl>
        </form>
      </Collapse>
    </>
  );
};

export default UpdateUsername;
