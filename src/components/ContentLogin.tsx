import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { GrGoogle, GrSecure } from 'react-icons/gr';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { themes } from '../styles/theme';

import { actionLoginGoogle } from '../pages/api/actionLogWithGoogle';

export function ContentLogin(props: any) {
    return (
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
    );
}
