import Group from "@/components/Group";
import RootLayout from "@/layouts/default";
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
  Stack,
  Box,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Groups() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/group", {
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
          gap={4}
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
              Добавить новый коллектив
            </Button>
          </GridItem>
        </Grid>
        <Divider mt={5} mb={5} />
        {groups.data && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {groups.data.items.map((g: any) => (
              <Group key={g.id} name={g.name} />
            ))}
          </Grid>
        )}
      </RootLayout>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent mx="2.5">
          <ModalHeader>Добавить новый коллектив</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Название коллектива"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  placeholder="Описание коллектива"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  rows={10}
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={onClose}
                bgColor={"green.400"}
                textColor={"white"}
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
