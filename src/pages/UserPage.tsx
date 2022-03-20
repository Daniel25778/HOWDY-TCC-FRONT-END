import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Image } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header/Header';
import { BiTargetLock } from 'react-icons/bi';
import { FaBaby } from 'react-icons/fa';
import { FriendshipButton } from '../components/Button/FriendshipButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Chart } from '../components/Chart/Chart';
import { ApexOptions } from 'apexcharts';

export default function UserPage(props: any) {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            foreColor: '#29B995',
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            axisBorder: {
                color: 'black',
            },
            axisTicks: {
                color: 'black',
            },
        },
        colors: ['#6A7DFF'],
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
        },
    };

    const chartWeeklyCategories = ['Há 6 dias', '', 'Há 4 dias', '', 'Há 2 dias', '', 'Hoje'];
    const weeklyChartOptions: ApexOptions = { ...options };
    weeklyChartOptions.xaxis.categories = chartWeeklyCategories;

    const weeklyXpSeries = [{ name: 'weeklyXpSeries', data: [31, 120, 10, 28, 61, 18, 109] }];
    return (
        <>
            <Head>
                <title>HOWDY - USERNAME</title>
            </Head>
            <Header />
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
                                Olá! Me chamo Helena, XXXXX é meu idioma nativo, e desejo aprender a me comunicar em
                                XXXX.
                            </Text>
                        </Box>
                        <FriendshipButton idUser={1} />
                    </Flex>
                    <Divider mb="70"></Divider>
                </Box>
                <Flex>
                    <Flex gap="8%" width="100%">
                        <Text fontWeight={'bold'} fontSize={['sm', 'xx-large', 'xxx-large']}>
                            Desempenho
                        </Text>
                        <Flex
                            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                            width="10%"
                            alignItems="center"
                            justifyContent="center"
                            bgColor="howdyColors.mainGreenTransparent"
                            borderRadius="10"
                            p="2"
                        >
                            <Text color="howdyColors.mainGreen" fontWeight={'bold'} fontSize={['sm', 'md', 'xx-large']}>
                                20000 XP
                            </Text>
                        </Flex>
                        <Flex gap="10" justify={'center'} align={'center'}>
                            <Icon color="howdyColors.mainGreen" fontSize="x-large">
                                <BiTargetLock></BiTargetLock>
                            </Icon>
                            <Text color="howdyColors.mainGreen">Inglês</Text>
                        </Flex>
                        <Flex gap="10" justify={'center'} align={'center'}>
                            <Icon color="howdyColors.mainGreen" fontSize="x-large">
                                <FaBaby></FaBaby>
                            </Icon>
                            <Text color="howdyColors.mainGreen">Português</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex p="9%" justify={'center'} align={'center'}>
                    <Flex w="50%">
                        <Chart title="DESEMPENHO SEMANAL" options={weeklyChartOptions} series={weeklyXpSeries} />
                    </Flex>
                    <Flex w="50%">
                        <Chart title="DESEMPENHO SEMANAL" options={weeklyChartOptions} series={weeklyXpSeries} />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export async function GetStaticProps() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        console.log(user);
    });

    return {
        props: {
            // uid,
        },
    };
}
