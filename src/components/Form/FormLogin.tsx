import { Button, Flex, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { GrGoogle } from 'react-icons/gr';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { actionLoginGoogle } from '../../pages/api/actionLogWithGoogle';
import { actionLoginFacebook } from '../../pages/api/actionLoginFacebook';
import * as React from 'react';

type SignInFormData = {
    email: string;
    password: string;
};

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória'),
});

export function FormLogin() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    });
    const { errors } = formState;

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { email, password } = values;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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
            height="600"
            width="100%"
            maxWidth={510}
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
        >
            <InputGroup width={400} variant="filled" marginBottom="4">
                <InputLeftElement pointerEvents="none" children={<MdOutlineMailOutline color="#6A7DFF" />} />
                <Input name="email" placeholder='E-mail' type="email" error={errors.email} {...register('email')} />
            </InputGroup>

            <InputGroup width={400} variant="filled" marginBottom="6">
                <InputLeftElement pointerEvents="none" children={<GiPadlock color="#6A7DFF" />} />
                <Input name="password" placeholder='Senha' type="password" error={errors.password} {...register('password')} />
            </InputGroup>

            <Text color="howdyColors.mainBlue"> Esqueci minha senha </Text>

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
                <Text>ENTRAR</Text>
            </Button>

            <Text color="howdyColors.mainBlue">Não tem uma conta? Registre-se</Text>

            <Flex
                marginTop="20"
                width="100%"
                maxWidth={510}
                align="center"
                justify="center"
                borderRadius={8}
                flexDir="row"
            >
                <Text marginRight={6} color="howdyColors.mainBlack">
                    Ou entre com{' '}
                </Text>

                <Button
                    type="button"
                    _hover={{ bg: '#F86559' }}
                    onClick={actionLoginGoogle}
                    marginBottom="6"
                    bg="howdyColors.colorGoogle"
                    color="howdyColors.mainWhite"
                    marginRight="5"
                    leftIcon={<GrGoogle color="howdyColors.mainWhite" />}
                >
                    <Text>GOOGLE</Text>
                </Button>

                <Button
                    type="button"
                    onClick={actionLoginFacebook}
                    marginBottom="6"
                    colorScheme="facebook"
                    leftIcon={<BsFacebook />}
                >
                    <Text>FACEBOOK</Text>
                </Button>
            </Flex>
        </Flex>
    );
}
