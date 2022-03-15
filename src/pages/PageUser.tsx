import { Box, Center, Flex, Icon, IconButton } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import Head from 'next/head';
import { HeaderWeb } from '../components/Header/Header';
import { BsFillSuitHeartFill, BsPersonDash, BsPersonPlus } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { FriendshipButton } from '../components/Button/FriendshipButton';

export default function UserPage(props: any) {
    return (
        <>
            <Head>
                <title>HOWDY - USERNAME</title>
            </Head>
            <HeaderWeb />
            <Box pt="7rem" as="main" w="100%" h="100vh" px="100px" bgImg="/images/background.png">
                <Box>
                    <Image
                        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                        objectFit="cover"
                        w="100%"
                        maxH="25vw"
                        src="/images/Tests/backgroundImage.png"
                    />
                    <Flex w="100%" position="relative" bottom="4vw" pl="8vw">
                        <Center borderRadius="100%" w="12.5vw" h="12.5vw" bg="white">
                            <Image
                                w="12vw"
                                h="12vw"
                                borderRadius="100%"
                                objectFit="cover"
                                src="/images/Tests/profilePhoto.png"
                            />
                        </Center>
                        <Box color="howdyColors.mainBlack" flex="1" ml="10%" mt="5vw">
                            <Heading wordBreak="break-all" fontSize="4xl">
                                Helena Pena Rodrigues dos Santos
                            </Heading>
                            <Text mt="20px" fontSize="xl" color="howdyColors.mainBlack">
                                Olá! Me chamo Helena, XXXXX é meu idioma nativo, e desejo aprender a me comunicar em
                                XXXX.
                            </Text>
                        </Box>
                        <FriendshipButton idUser={1} />
                    </Flex>
                </Box>
            </Box>
        </>
    );
}
