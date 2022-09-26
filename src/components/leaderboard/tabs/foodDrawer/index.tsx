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
  useToast,
} from "@chakra-ui/react";
import { FoodDrawerProps } from "../../../../interfaces";
import { MdAddShoppingCart } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { UPDATE_STATS } from "../../../../api/user";
import { useSession } from "../../../../auth";
import NotLoggedInAlert from "../../../alert";

const FoodDrawer = ({ isOpen, onOpen, onClose, btnRef, refetchUsers }: FoodDrawerProps) => {
  const [selectedFood, setSelectedFood] = useState<string>("worstenbroodje");
  const [amount, setAmount] = useState<number>(1);
  const [showNegativeAmount, setShowNegativeAmount] = useState<boolean>(false);

  const toast = useToast();
  const { user } = useSession();

  const [updateUserStats] = useMutation(UPDATE_STATS, {
    onCompleted: () => {
      toast({
        title: "Succes",
        description: "Statistieken zijn bijgewerkt.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      refetchUsers();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Er ging iets mis bij het bijwerken van je statistieken.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
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
    if (amount >= 1) {
      const updatedStats = {
        totalSpent: user.stats.totalSpent,
        lastPurchase: user.stats.lastPurchase,
        worstenbroodjes:
          selectedFood === "worstenbroodje" ? user.stats.worstenbroodjes + amount : user.stats.worstenbroodjes,
        pizzas: selectedFood === "pizza" ? user.stats.pizzas + amount : user.stats.pizzas,
        muffins: selectedFood === "muffin" ? user.stats.muffins + amount : user.stats.muffins,
        paninis: selectedFood === "panini" ? user.stats.paninis + amount : user.stats.paninis,
      };

      setShowNegativeAmount(false);
      updateUserStats({ variables: { id: user.id, stats: updatedStats } });
      onClose();
    } else {
      setShowNegativeAmount(true);
    }
  }, [updateUserStats, amount, selectedFood, user, onClose]);

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
                  {showNegativeAmount && (
                    <Text color="red">Gelieve geen negative getallen of 0 in te voeren, sloeber</Text>
                  )}
                </VStack>
              </DrawerBody>
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
