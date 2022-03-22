import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { FormLogin } from '../components/Form/FormLogin';
import { Divider } from '@chakra-ui/react';
import { GetStaticPaths } from 'next';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { MdOutlineMailOutline } from 'react-icons/md';
import Link from 'next/link';

export default function PasswordRecovery(props: any) {
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
                <Box mt="30px" as="form" padding="10" w="500px" h="300px" bg="white" borderRadius="1%" flexDir="column">
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
                            //error={errors.email}
                            //{...register('email')}
                        />
                    </InputGroup>
                    <Flex marginTop="6" marginBottom="6" justify="right" w="100%">
                        <Link href="/LoginPage" passHref prefetch>
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
                            //isLoading={formState.isSubmitting}
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
