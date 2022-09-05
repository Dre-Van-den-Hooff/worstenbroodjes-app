import { useState, useCallback, ChangeEvent } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Button,
  IconButton,
  Select,
  Input,
  VStack,
  useNumberInput,
  Flex,
} from "@chakra-ui/react";
import { FoodDrawerProps } from "../../../../interfaces";
import { MdAddShoppingCart } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { UPDATE_STATS } from "../../../../api/user";
import { useSession } from "../../../../auth";
import NotLoggedInAlert from "../../../alert";

const FoodDrawer = ({ isOpen, onOpen, onClose, btnRef }: FoodDrawerProps) => {
  const [selectedFood, setSelectedFood] = useState<string>("worstenbroodje");
  const [amount, setAmount] = useState<number>();
  const [successfulUpdate, setSuccessfulUpdate] = useState<boolean>(false);

  const { user } = useSession();

  const [updateUserStats] = useMutation(UPDATE_STATS, {
    onCompleted: data => {
      console.log(data);
      setSuccessfulUpdate(true);
    },
    onError: error => {
      //TODO: proper error handling
      console.log(error);
    },
  });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: 1,
    defaultValue: 1,
    onChange: value => handleAmountChange(Number(value)),
  });

  const handleAmountChange = useCallback((value: number) => {
    setAmount(value);
  }, []);

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFood(event.target.value);
  }, []);

  const handleConfirm = useCallback(() => {
    const updatedStats = {
      totalSpent: user.stats.totalSpent,
      lastPurchase: user.stats.lastPurchase,
      worstenbroodjes: selectedFood === "worstenbroodje" ? amount : user.stats.worstenbroodjes,
      pizzas: selectedFood === "pizza" ? amount : user.stats.pizzas,
      muffins: selectedFood === "muffin" ? amount : user.stats.muffins,
      paninis: selectedFood === "panini" ? amount : user.stats.paninis,
    };

    updateUserStats({ variables: { id: user.id, stats: updatedStats } });
  }, [updateUserStats, amount, selectedFood, user]);

  return (
    <>
      <IconButton
        aria-label="add-food"
        icon={<MdAddShoppingCart size="25px" />}
        variant="ghost"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {!user ? (
            <Flex justifyContent="center">
              <NotLoggedInAlert mt="3rem" mb="2rem" w="90%" />
            </Flex>
          ) : (
            <>
              <DrawerHeader>Voeg aankoop toe</DrawerHeader>
              <DrawerBody>
                <VStack spacing="1rem" alignItems="flex-start">
                  <Text>Kies een snack</Text>
                  <Select variant="filled" onChange={e => handleSelectChange(e)}>
                    <option value="worstenbroodje">Worstenbroodje</option>
                    <option value="pizza">Pizza</option>
                    <option value="panini">Panini</option>
                  </Select>
                  <Text>Hoeveel?</Text>
                  <Flex justifyContent="space-between" w="100%">
                    <Input {...getInputProps()} w="70%" variant="filled" />
                    <Button {...getIncrementButtonProps()}>+</Button>
                    <Button {...getDecrementButtonProps()}>-</Button>
                  </Flex>
                </VStack>
              </DrawerBody>
              {successfulUpdate && <Text>Joepie tis succesvol</Text>}
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Annuleren
                </Button>
                <Button colorScheme="blue" onClick={handleConfirm}>
                  Bevestigen
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FoodDrawer;
