import { Box, Button, Center, Flex, Grid, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Image } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { BiTargetLock } from 'react-icons/bi';
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { MdTranslate } from 'react-icons/md';
import { FaBaby } from 'react-icons/fa';
import { FriendshipButton } from '../Button/FriendshipButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { WeeklyChart } from '../Chart/WeeklyChart';
import { MonthlyChart } from '../Chart/MonthlyChart';
import StarRatings from 'react-star-ratings';
import { initializeApp } from 'firebase/app';
import { NavLink } from '../NavLink/UserPage/NavLink';
import { auth } from '../../services/firebaseConfig';

export default function UserDataPage(props: any) {
    const weeklyXpSeries = [{ name: 'weeklyXpSeries', data: [31, 120, 10, 28, 61, 18, 109] }];

    const monthlyXpSeries = [
        {
            name: 'monthlyXpSeries',
            data: [
                31, 120, 10, 28, 61, 18, 109, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
                61, 61, 61, 61, 61, 61,
            ],
        },
    ];

    return (
        <>
            <Box>
                <Image
                    filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                    objectFit="cover"
                    w="100%"
                    maxH="25vw"
                    src="/images/Tests/backgroundImage.png"
                />
                <Flex w="100%" position="relative" bottom="4vw" pl="8vw">
                    <Center position="relative" borderRadius="100%" w="12.5vw" h="12.5vw" bg="white">
                        <Image
                            w="12vw"
                            h="12vw"
                            borderRadius="100%"
                            objectFit="cover"
                            src="/images/Tests/profilePhoto.png"
                        />

                        <Flex role="group" position="absolute" bottom="0" right="0">
                            <Image
                                cursor="pointer"
                                zIndex="1"
                                w="4vw"
                                src="/images/howdy-images/class/class-master.svg"
                            />
                            <Text
                                px="15px"
                                py="2px"
                                w="90px"
                                fontWeight="black"
                                color="white"
                                bg="howdyColors.master"
                                borderRadius="0 10px 10px 0"
                                position="absolute"
                                bottom=".5vw"
                                zIndex="-1"
                                left="0"
                                transition="left 1s, z-index .5s"
                                fontSize={['2xl', 'md', 'sm']}
                                wordBreak="keep-all"
                                textAlign="right"
                                _groupHover={{
                                    left: '3vw',
                                    zIndex: '0',
                                }}
                            >
                                Master
                            </Text>
                        </Flex>
                    </Center>
                    <Box color="howdyColors.mainBlack" flex="1" ml="10%" mt="5vw">
                        <Heading wordBreak="break-word" fontSize="4xl">
                            Helena Pena Rodrigues dos Santos
                        </Heading>
                        <Text mt="20px" fontSize="xl" color="howdyColors.mainBlack">
                            Olá! Me chamo Helena, XXXXX é meu idioma nativo, e desejo aprender a me comunicar em XXXX.
                        </Text>
                    </Box>
                    <FriendshipButton idUser={1} />
                </Flex>
                <Box bg="howdyColors.divider" h="1px" w="100%" mb="70" />
            </Box>
            <Box>
                <Flex>
                    <Flex width="100%">
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'xx-large', 'xxx-large']}
                        >
                            Desempenho
                        </Text>
                        <Flex
                            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                            ml="6%"
                            w="20%"
                            alignItems="center"
                            justifyContent="center"
                            bgColor="howdyColors.mainGreenTransparent"
                            borderRadius="10"
                            p="2"
                            color="howdyColors.mainGreen"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                        >
                            20000 XP
                        </Flex>
                        <Flex gap="5%" ml="6%" justify={'center'} align={'center'}>
                            <Icon color="howdyColors.mainGreen" fontSize="x-large">
                                <BiTargetLock />
                            </Icon>
                            <Text color="howdyColors.mainGreen">Inglês</Text>
                        </Flex>
                        <Flex gap="5%" ml="6%" justify={'center'} align={'center'}>
                            <Icon color="howdyColors.mainGreen" fontSize="x-large">
                                <FaBaby />
                            </Icon>
                            <Text color="howdyColors.mainGreen">Português</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <SimpleGrid pl="10%" flex="1" gap="4" minChildWidth="320px">
                    <WeeklyChart title="DESEMPENHO MENSAL" series={weeklyXpSeries} />
                    <MonthlyChart title="DESEMPENHO MENSAL" series={monthlyXpSeries} />
                </SimpleGrid>
                <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
            </Box>
            <Flex flexDir="column">
                <Flex flexDir="row">
                    <Text
                        mb="5"
                        color="howdyColors.mainBlack"
                        fontWeight={'bold'}
                        fontSize={['sm', 'xx-large', 'xxx-large']}
                    >
                        Nota média de suas atividades
                    </Text>
                    <Flex
                        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                        ml="6%"
                        w="20%"
                        alignItems="center"
                        justifyContent="center"
                        bgColor="howdyColors.mainGreenTransparent"
                        borderRadius="10"
                        p="1"
                        color="howdyColors.mainGreen"
                        fontWeight={'bold'}
                        fontSize={['sm', 'md', 'xx-large']}
                    >
                        EXCELENTE
                    </Flex>
                </Flex>
                <Box w="10%"></Box>
                <StarRatings rating={2} starRatedColor="#F2D63F" numberOfStars={5} name="rating" />
            </Flex>
            <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
        </>
    );
}

// export async function getStaticProps() {
// onAuthStateChanged(auth, (user) => {
//     console.log(user);
// });
// return {
//     props: {
//         // uid,
//     },
// };
// }
