import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";

export default function Event() {
  return (
    <Center py={6}>
      <Box w={"full"} bg={"white"} rounded={"sm"} p={6} overflow={"hidden"}>
        <Stack>
          <HStack>
            <Text
              color={"yellow.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Планирование
            </Text>
            <Spacer />
            <IconButton aria-label="редактировать" size="sm" variant="outline">
              <FiEye />
            </IconButton>
          </HStack>
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            Поездка в Ергаки
          </Heading>
          <Text color={"gray.500"} fontSize="sm" fontStyle="italic">
            Природный парк «Ергаки»
          </Text>
          <Text color={"gray.500"}>
            Приготовьтесь погрузиться в уникальную красоту горной природы и
            величественные пейзажи Ергаков! Расположенные в Саянских горах,
            Ергаки предлагают незабываемые приключения для любителей активного
            отдыха и природных красот.{" "}
          </Text>
          <Text color="gray.700" fontWeight="semibold">
            Бюджет: ₽34000
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Леонид Скорик</Text>
            <Text color={"gray.500"}>Июль 09, 2023 - Июль 10, 2023</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
