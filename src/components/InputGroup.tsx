import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputGroup,
    InputLeftElement,
    InputProps as ChakraInputProps,
    InputElementProps,
} from '@chakra-ui/react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';

interface InputGroupProps extends ChakraInputProps {
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputGroupProps> = ({ error = null, ...rest }, ref) => {
    return (
        <InputGroup width={400} variant="filled" marginBottom="4">
            <InputLeftElement pointerEvents="none" children={<MdOutlineMailOutline color="#6A7DFF" />} />
            <Input name="email" placeholder="E-mail" type="email" error={error.email} {...register('email')} />
        </InputGroup>
    );
};

export const Input = forwardRef(InputBase);
