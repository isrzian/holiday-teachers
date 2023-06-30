import { ItemStatus } from "@/lib/consts";
import { itemsSchema } from "@/lib/schema";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Spacer,
  IconButton,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FiTrash, FiEdit, FiPhone } from "react-icons/fi";
import { z } from "zod";

export default function Item({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { data, isLoading } = useQuery({
  //   queryKey: [`item/${id}`],
  //   queryFn: () =>
  //     fetch(`http://localhost:8080/api/v1/event/item${id}`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     }).then((res) => res.json()),
  // });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof itemsSchema>>({
    resolver: zodResolver(itemsSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const editTeacher = useMutation({
    mutationKey: [`items/edit/${id}`],
    mutationFn: async (data: z.infer<typeof itemsSchema>) => {
      const res = await fetch(`http://localhost:8080/api/v1/event/item/${id}`, {
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
      queryClient.invalidateQueries([`item/${id}`]);
      onClose();
    },
  });

  // if (isLoading || !data) return null;

  return (
    <>
      <Center>
        <Box
          w={"full"}
          bg={"white"}
          rounded={"sm"}
          p={6}
          overflow={"hidden"}
          border="1px"
          borderStyle="dashed"
          borderColor={defaultValues.isMoney ? "green.500" : "purple.500"}
        >
          <Text fontSize="sm" textColor="gray.500">
            ID {defaultValues.id}
          </Text>
          <Stack>
            <HStack>
              <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
                {defaultValues.name}
              </Heading>
              <Spacer />
              <ButtonGroup>
                <IconButton
                  aria-label="редактировать"
                  size="sm"
                  variant="outline"
                  onClick={onOpen}
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  aria-label="удалить"
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                >
                  <FiTrash />
                </IconButton>
              </ButtonGroup>
            </HStack>
          </Stack>
        </Box>
      </Center>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            editTeacher.mutate(data);
          })}
        >
          <ModalHeader>{defaultValues.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
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
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type="submit"
                bgColor={"green.400"}
                textColor={"white"}
                isLoading={editTeacher.isLoading}
                onClick={() => console.log(errors)}
              >
                Сохранить
              </Button>
              <Button onClick={onClose}>Отменить</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
