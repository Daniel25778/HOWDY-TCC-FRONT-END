import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { GrGoogle, GrSecure } from 'react-icons/gr';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { actionLoginGoogle } from '../../pages/api/actionLogWithGoogle';
import { actionLoginFacebook } from '../../pages/api/actionLoginFacebook';
import { actionLoginEmailAndPassword } from '../../pages/api/actionLoginEmailAndPassword';
import { FormEvent, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';

export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(event: FormEvent) {
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
    }

    return (
        <Flex
            as="form"
            onSubmit={handleSignUp}
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
                <Input value={email} onchange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" />
            </InputGroup>

            <InputGroup width={400} variant="filled" marginBottom="6">
                <InputLeftElement pointerEvents="none" children={<GiPadlock color="#6A7DFF" />} />
                <Input
                    value={password}
                    onchange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Senha"

                    mas olha só, esse input é do chakra
                />
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
                onClick={handleSignUp}
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

                <Button onClick={actionLoginFacebook} marginBottom="6" colorScheme="facebook" leftIcon={<BsFacebook />}>
                    <Text>FACEBOOK</Text>
                </Button>
            </Flex>
        </Flex>
    );
}
