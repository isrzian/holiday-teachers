import Item from "@/components/Teacher";
import RootLayout from "@/layouts/default";
import { ItemStatus } from "@/lib/consts";
import { itemsSchema } from "@/lib/schema";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ButtonGroup,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { parse } from "path";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Items() {
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const money = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof itemsSchema>>({
    resolver: zodResolver(itemsSchema),
  });

  const queryClient = useQueryClient();
  const createItem = useMutation({
    mutationKey: ["items/create"],
    mutationFn: async (data: z.infer<typeof itemsSchema>) => {
      console.log(JSON.stringify(data));
      const res = await fetch(`http://localhost:8080/api/v1/event/item`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      onClose();
      reset();
    },
  });

  const items = useQuery({
    queryKey: ["items"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/event/item", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  return (
    <>
      <RootLayout>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={2}
        >
          <GridItem>
            <ButtonGroup>
              <Button
                bgColor="green.400"
                textColor={"white"}
                size="md"
                _hover={{
                  bgColor: "green.500",
                }}
                onClick={onOpen}
              >
                Добавить предмет(-ы)
              </Button>
              <Button
                bgColor="green.400"
                textColor={"white"}
                size="md"
                _hover={{
                  bgColor: "green.500",
                }}
                onClick={money.onOpen}
              >
                Добавить денежные средства
              </Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
        <Divider mt={5} mb={5} />
        {items.data && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {items.data &&
              items.data.items?.map((t: any) => (
                <Item key={t.id} id={t.id} defaultValues={t} />
              ))}
          </Grid>
        )}
      </RootLayout>
      <Modal
        onClose={money.onClose}
        isOpen={money.isOpen}
        isCentered
        size="3xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            const body = {
              ...data,
              name: `Деньги от ${session.data?.user.name}`,
              price: data.price ? parseInt(data.price) : 0,
              isMoney: true,
            };
            createItem.mutate(body);
          })}
        >
          <ModalHeader>Добавить денежные средства</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Select
                placeholder="Статус предмета"
                bg={"gray.100"}
                border={0}
                color={"gray.700"}
                _placeholder={{
                  color: "gray.500",
                }}
                {...register("status")}
              >
                {Object.entries(ItemStatus).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Сумма"
                bg={"gray.100"}
                border={0}
                color={"gray.700"}
                _placeholder={{
                  color: "gray.500",
                }}
                autoComplete="off"
                {...register("price")}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type={"submit"}
                bgColor={"green.400"}
                textColor={"white"}
                isLoading={createItem.isLoading}
                onClick={() => console.log(errors)}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Отменить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
