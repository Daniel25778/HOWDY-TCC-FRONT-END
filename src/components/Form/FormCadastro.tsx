import { Button, Flex, InputGroup, InputLeftElement, Text, Select } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { MdOutlineMailOutline,MdArrowDropDown } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi'; 
import { FaBaby } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import * as React from 'react';

interface FormCadastroProps {
    isLogged : string
}
type CreateUserFormData = {
    email: string;
    password: string;
    name: string;
};


const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória'),
    name: yup.string().required('O nome é obrigatório'),
});

export function FormCadastro(props: FormCadastroProps) {
    const {isLogged} = props

    const showAllInputs = isLogged !== 'isLogged'
 
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    });
    const { errors } = formState;

    const handleSignIn: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { email, password,  } = values;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password,)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    return (
        <Flex
            as="form"
            onSubmit={handleSubmit(handleSignIn)}
            padding="20"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
        >

        {showAllInputs && (
            <>
            
                <InputGroup width={400} variant="filled"  marginBottom="4">
                    <InputLeftElement pointerEvents="none">
                        <MdOutlineMailOutline color="#6A7DFF" />
                    </InputLeftElement>
                    <Input name="email" placeholder="Seu e-mail" type="email" error={errors.email} {...register('email')} />
                </InputGroup>

                <InputGroup width={400} variant="filled" marginBottom="6">
                    <InputLeftElement pointerEvents="none"> 
                        <GiPadlock color="#6A7DFF" /> 
                    </InputLeftElement>
                    <Input
                        name="password"
                        placeholder="Sua senha"
                        type="password"
                        error={errors.password}
                        {...register('password')}
                    />
                </InputGroup>

                <InputGroup width={400} variant="filled" marginBottom="6">
                <InputLeftElement pointerEvents="none"> 
                    <GiPadlock color="#6A7DFF" /> 
                </InputLeftElement>
                <Input
                    name="password"
                    placeholder="Confirme sua senha"
                    type="password"
                    error={errors.password}
                    {...register('password')}
                />
            </InputGroup>
               
            
            </>
            )}
           
            <InputGroup width={400} variant="filled" marginBottom="6">
                <InputLeftElement pointerEvents="none"> 
                    <BsPerson color="#6A7DFF" /> 
                </InputLeftElement>
                <Input
                    name="password"
                    placeholder="Seu nome"
                    type='text'
                    error={errors.password}
                    {...register('password')}
                />
            </InputGroup>

            <InputGroup width={400} variant="filled" marginBottom="6">
                <InputLeftElement pointerEvents="none"> 
                    <FaBaby color="#6A7DFF" /> 
                </InputLeftElement>
                <Input
                    name="nativeLanguage"
                    placeholder="Seu idioma nativo"
                    type="text"
                    error={errors.password}
                    {...register('password')}
                />
            </InputGroup>

            <Select  placeholder='Lingua de interesse' variant='filled' iconColor="howdyColors.mainBlue" icon={<MdArrowDropDown />} >
            
                <option value='option1'>Ingles</option>
            </Select>

            

            <Button
                _hover={{ bg: '#B9C2FD' }}
                width={400}
                maxWidth={400}
                marginTop="6"
                marginBottom="6"
                bg="#CBD2FF"
                color="howdyColors.mainBlue"
                type="submit"
                isLoading={formState.isSubmitting}
            >
                <Text>CADASTRAR</Text>
            </Button>

            <Flex
               
                width="100%"
                maxWidth={510}
                align="center"
                justify="center"
                borderRadius={8}
                flexDir="row"
            >
            </Flex>
        </Flex>
    );
}
