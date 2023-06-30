import Item from "@/components/Item";
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
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Items() {
  const item = useDisclosure();
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
      item.onClose();
      money.onClose();
      reset();
    },
  });

  // Везде где items нужно будет поменять порт 3000 на 8080, порт 3000 это из которого некстовский (не нестовский) экспрес возвращает моковые предметы
  const items = useQuery({
    queryKey: ["items"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/event/item", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  console.log(items.data);

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
                bgColor="purple.400"
                textColor={"white"}
                size="md"
                _hover={{
                  bgColor: "purple.500",
                }}
                onClick={item.onOpen}
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
        onClose={item.onClose}
        isOpen={item.isOpen}
        isCentered
        size="3xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            data.isMoney = false;
            createItem.mutate(data);
          })}
        >
          <ModalHeader>Добавить предметы</ModalHeader>
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
                placeholder="Название"
                bg={"gray.100"}
                border={0}
                color={"gray.700"}
                _placeholder={{
                  color: "gray.500",
                }}
                autoComplete="off"
                {...register("name")}
              />
              <Textarea
                placeholder="Описание"
                bg={"gray.100"}
                border={0}
                color={"gray.700"}
                _placeholder={{
                  color: "gray.500",
                }}
                autoComplete="off"
                {...register("description")}
              />
              <Input
                placeholder="Количество"
                bg={"gray.100"}
                border={0}
                color={"gray.700"}
                _placeholder={{
                  color: "gray.500",
                }}
                autoComplete="off"
                {...register("quantity")}
              />
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
                bgColor={"purple.400"}
                textColor={"white"}
                isLoading={createItem.isLoading}
                onClick={() => console.log(errors)}
              >
                Добавить
              </Button>
              <Button
                onClick={() => {
                  item.onClose();
                }}
              >
                Отменить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            data.name = `${data.price} рублей`;
            data.price = data.price ? parseInt(data.price) : 0;
            data.isMoney = true;
            createItem.mutate(data);
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
                  money.onClose();
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
