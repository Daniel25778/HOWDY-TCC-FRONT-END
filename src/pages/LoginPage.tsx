import { Center, Flex } from '@chakra-ui/react';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { FormLogin } from '../components/Form/FormLogin';
import { Divider } from '@chakra-ui/react';
import { GetStaticPaths } from 'next';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function PageLogin(props: any) {
    return (
        <Flex
            w="100%"
            h="100vh"
            align="center"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
        >
            <Flex height="100%" width="40%" bg="howdyColors.mainBlue" align="center" flexDir="column">
                <Flex width="80%" height="50%" justify="center" align="center" flexDir="column">
                    <Image
                        width={400}
                        maxWidth={400}
                        objectFit="cover"
                        marginBottom={8}
                        src="/images/howdy-images/logo/logo-white-howdy-row.svg"
                        alt="howdy logo"
                    />

                    <Text fontWeight="medium" fontSize={50} color="howdyColors.mainWhite">
                        Realize seu login
                    </Text>
                </Flex>
                <Spacer />
                <Image src="/images/illustrations/women-reading.svg" alt="howdy logo" />
            </Flex>

            <Flex align="center" justifyContent="center" height="100%" width="70%">
                <FormLogin />
            </Flex>
        </Flex>
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
