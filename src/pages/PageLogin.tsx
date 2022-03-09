import { Flex } from '@chakra-ui/react';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { FormLogin } from '../components/Form/FormLogin';
import { Divider } from '@chakra-ui/react'

export function PageLogin(props: any) {
    return (
        <>
            <Flex height="100%" width="40%" bg="howdyColors.mainBlue" align="center" flexDir="column" marginRight={40}>
                <Flex width="80%" height="50%" justify="center" align="center" flexDir="column">
                    <Image
                        width={400}
                        maxWidth={400}
                        objectFit="cover"
                        marginBottom={8}
                        src="/images/howdy-images/logo/logo-howdy-row.svg"
                        alt="howdy logo"
                    />

                    <Text fontSize={50} color="howdyColors.mainWhite">
                        Realize seu login
                    </Text>
                </Flex>
                <Spacer></Spacer>
                <Image marginLeft={30} src="/images/illustrations/women-reading.svg" alt="howdy logo" />
            </Flex>
            <FormLogin></FormLogin>
        </>
    );
}
