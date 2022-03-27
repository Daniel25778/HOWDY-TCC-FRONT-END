import { Box, Button, Center, Flex, InputGroup, InputLeftElement, toast, useToast } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { auth } from '../services/firebaseConfig';
import { MdOutlineMailOutline } from 'react-icons/md';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { sendPasswordResetEmail } from 'firebase/auth';

const passwordRecoveryFormSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
});

type RecoverPasswordFormData = {
    email: string;
    password: string;
};

export default function PasswordRecovery(props: any) {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(passwordRecoveryFormSchema),
    });
    const { errors } = formState;

    const toast = useToast();

    const handleRecoverPassoword: SubmitHandler<RecoverPasswordFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { email } = values;

        sendPasswordResetEmail(auth, email)
            .then((result) => {
                // Password reset email sent!
                toast({
                    title: 'SUCESSO! SE VOCÊ REALMENTE POSSUIR UMA CONTA COM ESTE E-MAIL, SERÁ POSSÍVEL ALTERAR SUA SENHA',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 20000,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/user-not-found') {
                    return toast({
                        title: 'USUÁRIO NÃO ENCONTRADO',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                }
                return toast({
                    title: 'OPS... UM ERRO INESPERADO OCORREU, TENTE NOVAMENTE!',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                });
            });
    };

    return (
        <>
            <Center
                fontWeight="medium"
                fontSize="2rem"
                color="howdyColors.mainBlue"
                flexDir="column"
                h="35vh"
                w="100%"
                bgColor="howdyColors.mainWhite"
            >
                <Image
                    width={300}
                    objectFit="cover"
                    marginBottom={8}
                    src="/images/howdy-images/logo/logo-blue-howdy-row.svg"
                    alt="howdy logo"
                />
                Recupere sua conta
            </Center>
            <Flex justify="center" fontWeight="medium" minH="65vh" w="100%" bgColor="howdyColors.mainBlue">
                <Box
                    mt="30px"
                    as="form"
                    onSubmit={handleSubmit(handleRecoverPassoword)}
                    p="10"
                    pb="30"
                    w="500px"
                    h="300px"
                    bg="white"
                    borderRadius="1%"
                    flexDir="column"
                >
                    <Heading color="howdyColors.mainBlack" fontSize="1.7rem">
                        Insira seu e-mail
                    </Heading>
                    <Text py="20px" color="howdyColors.mainBlack" fontWeight="medium">
                        Se uma conta com este e-mail realmente existir, mandaremos um código para resetar a senha.
                    </Text>
                    <InputGroup width={400} variant="filled" marginBottom="10px">
                        <InputLeftElement fontSize="1.5rem" pointerEvents="none">
                            <MdOutlineMailOutline color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="email"
                            placeholder="E-mail"
                            type="text"
                            error={errors.email}
                            {...register('email')}
                        />
                    </InputGroup>
                    <Flex marginTop="6" marginBottom="6" justify="right" w="100%">
                        <Link href="/LoginPage" passHref>
                            <Button
                                _hover={{ bg: '#B9C2FD' }}
                                ml="5"
                                bg="howdyColors.notSelectionTransparent"
                                color="howdyColors.notSelection"
                                type="button"
                            >
                                CANCELAR
                            </Button>
                        </Link>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            ml="5"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            isLoading={formState.isSubmitting}
                        >
                            PRÓXIMO
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export async function getStaticProps() {
    console.log(auth);
    // onAuthStateChanged(auth, (user) => {
    //     console.log(user);
    // });
    return {
        props: {
            // uid,
        },
    };
}
