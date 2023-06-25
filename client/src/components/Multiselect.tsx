import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  HStack,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {}

function Multiselect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });
  return (
    <FormControl id={name} isInvalid={!!error}>
      <HStack>
        <Box width={"full"}>
          {/* @ts-ignore */}
          <Select<Option, IsMulti, Group>
            {...selectProps}
            {...field}
            options={options}
            getOptionValue={(option) => (option as any).id}
            getOptionLabel={(option) => (option as any).name}
            isClearable
            menuShouldScrollIntoView
            chakraStyles={{
              control: (provided) => ({
                ...provided,
                bg: "gray.100",
              }),
            }}
            loadingMessage={() => (
              <Center>
                <Spinner />
              </Center>
            )}
          />
        </Box>
      </HStack>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default Multiselect;
