import { groupSchema } from "@/lib/schema";
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  HStack,
  IconButton,
  Spacer,
  Divider,
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import { z } from "zod";
import Multiselect from "./Multiselect";

export default function Group({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery({
    queryKey: [`group/${id}`],
    queryFn: () =>
      fetch(`http://localhost:8080/api/v1/group/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(
      groupSchema.omit({
        eventsIds: true,
        itemsIds: true,
        teachersIds: true,
      })
    ),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const editGroup = useMutation({
    mutationKey: [`groups/edit/${id}`],
    mutationFn: async (data: z.infer<typeof groupSchema>) => {
      const res = await fetch(`http://localhost:8080/api/v1/group/${id}`, {
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
      queryClient.invalidateQueries([`group/${id}`]);
      onClose();
    },
  });

  const teachers = useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/teacher", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  if (isLoading || !data) return null;

  return (
    <>
      <Center>
        <Box
          w={"full"}
          bg={"white"}
          boxShadow={"smc"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Box p={6}>
            <HStack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {data.name}
              </Heading>
              <Spacer />
              <ButtonGroup>
                <IconButton
                  aria-label={`Редактировать ${data.name}`}
                  variant="outline"
                  onClick={onOpen}
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  aria-label={`Удалить ${data.name}`}
                  variant="outline"
                  colorScheme="red"
                  onClick={async () => {
                    await fetch(`http://localhost:8080/api/v1/group/${id}`, {
                      method: "DELETE",
                      headers: {
                        Accept: "*/*",
                      },
                    });
                    queryClient.invalidateQueries(["groups"]);
                  }}
                >
                  <FiTrash />
                </IconButton>
              </ButtonGroup>
            </HStack>
            <Divider mb={5} />
            <HStack>
              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>2</Text>
                  <Text fontSize={"sm"} color={"gray.700"}>
                    Мероприятий
                  </Text>
                </Stack>
              </Stack>
              <Spacer />
              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>11</Text>
                  <Text fontSize={"sm"} color={"gray.700"}>
                    Участников
                  </Text>
                </Stack>
              </Stack>
              <Spacer />
              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>7</Text>
                  <Text fontSize={"sm"} color={"gray.700"}>
                    Предметов
                  </Text>
                </Stack>
              </Stack>
            </HStack>
            <Button
              w={"full"}
              mt={8}
              bg={"green.400"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bgColor: "green.500",
              }}
            >
              Присоединиться
            </Button>
          </Box>
        </Box>
      </Center>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            const body = {
              ...data,
              eventsIds: !!data.events
                ? data.events.map((event) => event.id)
                : [null],
              teachersIds: !!data.teachers
                ? data.teachers.map((teacher) => teacher.id)
                : [null],
              itemsIds: !!data.items
                ? data.items.map((item) => item.id)
                : [null],
            };
            editGroup.mutate(body);
          })}
        >
          <ModalHeader>{data.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Название коллектива"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("name")}
                  autoComplete="off"
                />
                <Multiselect<any, any, true>
                  name={"teachers"}
                  control={control}
                  placeholder="Участники"
                  isMulti
                  options={teachers.data?.items || []}
                />
                <Multiselect<any, any, true>
                  name={"events"}
                  control={control}
                  placeholder="Мероприятия"
                  isMulti
                />
                <Multiselect<any, any, true>
                  name={"items"}
                  control={control}
                  placeholder="Вложения"
                  isMulti
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
                isLoading={editGroup.isLoading}
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
