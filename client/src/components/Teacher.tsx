import { signUpSchema } from "@/lib/schema";
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FiTrash, FiEdit, FiPhone } from "react-icons/fi";
import { z } from "zod";

export default function Teacher({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [`teacher/${id}`],
    queryFn: () =>
      fetch(`http://localhost:8080/api/v1/teacher/${id}`, {
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
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const editTeacher = useMutation({
    mutationKey: [`teachers/edit/${id}`],
    mutationFn: async (data: z.infer<typeof signUpSchema>) => {
      const res = await fetch(`http://localhost:8080/api/v1/teacher/${id}`, {
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
      queryClient.invalidateQueries([`teacher/${id}`]);
      onClose();
    },
  });

  if (isLoading || !data) return null;

  return (
    <>
      <Center>
        <Box w={"full"} bg={"white"} rounded={"sm"} p={6} overflow={"hidden"}>
          <Text fontSize="sm" textColor="gray.500">
            ID {id}
          </Text>
          <Stack>
            <HStack>
              <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
                {data.name}
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
            <HStack>
              <FiPhone />
              <Text color={"gray.700"} fontSize="md" fontStyle="italic">
                {data.phone}
              </Text>
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
          <ModalHeader>{data.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Ваше имя"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  autoComplete="off"
                  {...register("name")}
                />
                <Input
                  placeholder="+7 (___) ___-__-__"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("phone")}
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
