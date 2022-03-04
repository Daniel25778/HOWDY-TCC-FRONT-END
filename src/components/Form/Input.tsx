import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputGroup,
    InputLeftElement,
    InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

interface InputProps extends ChakraInputProps {
    inputGroupWidth : number;
    inputGroupVariant : string;
    inputMarginBottom : string;
    name: string;
    label?: string;
    error?: FieldError;
    inputLeftElementChildren: ReactNode,
    inputLeftElementPointerEvents : string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, error = null, ...rest },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup width={400} variant="filled" marginBottom="4">  
            <InputLeftElement pointerEvents="none" children={<GiPadlock color="#6A7DFF" />} />
            <ChakraInput pl="45" name={name} id={name} ref={ref} {...rest} />
            </InputGroup>
          

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);
