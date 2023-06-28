import Teacher from "@/components/Teacher";
import RootLayout from "@/layouts/default";
import { signUpSchema } from "@/lib/schema";
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Teachers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, reset } = useForm<
    z.infer<typeof signUpSchema>
  >({
    resolver: zodResolver(signUpSchema),
  });

  const queryClient = useQueryClient();
  const createTeacher = useMutation({
    mutationKey: ["teachers/create"],
    mutationFn: async (data: z.infer<typeof signUpSchema>) => {
      console.log(JSON.stringify(data));
      const res = await fetch(`http://localhost:8080/api/v1/teacher`, {
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
      queryClient.invalidateQueries(["teachers"]);
      onClose();
      reset();
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
            <Button
              bgColor="green.400"
              textColor={"white"}
              size="md"
              _hover={{
                bgColor: "green.500",
              }}
              onClick={onOpen}
            >
              Добавить нового преподавателя
            </Button>
          </GridItem>
        </Grid>
        <Divider mt={5} mb={5} />
        {teachers.data && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {teachers.data &&
              teachers.data.items?.map((t: any) => (
                <Teacher key={t.id} id={t.id} defaultValues={t} />
              ))}
          </Grid>
        )}
      </RootLayout>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="3xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            createTeacher.mutate(data);
          })}
        >
          <ModalHeader>Добавить нового преподавателя</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type={"submit"}
                bgColor={"green.400"}
                textColor={"white"}
                isLoading={createTeacher.isLoading}
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
