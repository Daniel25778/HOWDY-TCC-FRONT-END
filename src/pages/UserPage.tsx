import { Box, Button, Center, Flex, Grid, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Image } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header/Header';
import { BiTargetLock } from 'react-icons/bi';
import { AiOutlineMessage, AiOutlineHeart} from 'react-icons/ai';

import { MdTranslate } from 'react-icons/md';
import { FaBaby } from 'react-icons/fa';
import { FriendshipButton } from '../components/Button/FriendshipButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { WeeklyChart } from '../components/Chart/WeeklyChart';
import { MonthlyChart } from '../components/Chart/MonthlyChart';
import StarRatings from 'react-star-ratings';
import { initializeApp } from 'firebase/app';

export default function UserPage(props: any) {
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
            <Head>
                <title>HOWDY - USERNAME</title>
            </Head>
            <Header />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
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
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    <Button bgColor="howdyColors.mainBlue" color="howdyColors.mainWhite" borderRadius="15">
                        <Text color="howdyColors.mainWhite" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                            Postagens
                        </Text>
                    </Button>
                    
                    <Button bgColor="#e9e9e9" color="howdyColors.mainWhite" borderRadius="15">
                        <Text color="howdyColors.notSelection" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                           Amigos
                        </Text>
                    </Button>
            
                    <Button bgColor="howdyColors.mainBlue" color="howdyColors.mainWhite" borderRadius="15">
                        <Text color="howdyColors.mainWhite" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                            Aprendizado
                        </Text>
                    </Button>
                    
                    <Button bgColor="howdyColors.mainBlue" color="howdyColors.mainWhite" borderRadius="15">
                        <Text color="howdyColors.mainWhite" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                        Ensinamentos
                        </Text>
                    </Button>
                </Grid>
                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%" >
                        <Flex>
                            <Image
                                    borderRadius="100%"
                                    height="5rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                            ></Image>
                        </Flex>
                        <Flex>
                           <Flex flexDir="column">
                                <Flex align="center" gap="1%">
                                            <Text  color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>Helena Pena </Text>
                                            <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}> ● 19 Nov </Text>
                                 </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']} >Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit</Text>
                                <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={<Icon opacity="2" as={MdTranslate} color="howdyColors.mainWhite" fontSize={'x-large'} />}
                                >
                                </IconButton>
                           </Flex>
                        </Flex>
                    </Flex>
                    <Flex mb="1%">
                            <Image
                                borderRadius="50"
                                height="30rem"
                                objectFit="cover"
                                src="/images/Tests/Rectangle 23.svg"
                                alt="profilePhoto"
                            ></Image>
                    </Flex>
                    <Flex  justify="space-between" align="center"  width="20%">
                        <Flex align="center" gap="10%"  w="20%">
                            <IconButton 
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="#ffffff33"
                                    borderRadius="15"
                                    icon={<Icon opacity="2" as={AiOutlineMessage} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                    >
                                    </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>2 mil</Text>
                        </Flex>
                       
                         <Flex gap="10%"  w="20%" align="center">
                            <IconButton 
                                        w="10%"
                                        aria-label="Open navigation"
                                        bgColor="#ffffff33"
                                        borderRadius="15"
                                        icon={<Icon opacity="2" as={AiOutlineHeart} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                        >
                                        </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>1 mil</Text>
                         </Flex>
                    </Flex>
                </Flex>

                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%" >
                        <Flex>
                            <Image
                                    borderRadius="100%"
                                    height="5rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                            ></Image>
                        </Flex>
                        <Flex>
                           <Flex flexDir="column">
                                <Flex align="center" gap="1%">
                                    <Text  color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>Helena Pena </Text>
                                    <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}> ● 19 Nov </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']} >Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit</Text>
                                <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={<Icon opacity="2" as={MdTranslate} color="howdyColors.mainWhite" fontSize={'x-large'} />}
                                >
                                </IconButton>
                           </Flex>
                        </Flex>
                    </Flex>
                    <Flex mb="1%">
                            <Image
                                borderRadius="50"
                                height="30rem"
                                objectFit="cover"
                                src="/images/Tests/Rectangle 23.svg"
                                alt="profilePhoto"
                            ></Image>
                    </Flex>
                    <Flex  justify="space-between" align="center"  width="20%">
                        <Flex align="center" gap="10%"  w="20%">
                            <IconButton 
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="#ffffff33"
                                    borderRadius="15"
                                    icon={<Icon opacity="2" as={AiOutlineMessage} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                    >
                                    </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>2 mil</Text>
                        </Flex>
                       
                         <Flex gap="10%"  w="20%" align="center">
                            <IconButton 
                                        w="10%"
                                        aria-label="Open navigation"
                                        bgColor="#ffffff33"
                                        borderRadius="15"
                                        icon={<Icon opacity="2" as={AiOutlineHeart} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                        >
                                        </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>1 mil</Text>
                         </Flex>
                    </Flex>
                </Flex>


                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%" >
                        <Flex>
                            <Image
                                    borderRadius="100%"
                                    height="5rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                            ></Image>
                        </Flex>
                        <Flex>
                           <Flex flexDir="column">
                                <Flex align="center" gap="1%">
                                            <Text  color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>Helena Pena </Text>
                                            <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}> ● 19 Nov </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']} >Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit</Text>
                                <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={<Icon opacity="2" as={MdTranslate} color="howdyColors.mainWhite" fontSize={'x-large'} />}
                                >
                                </IconButton>
                           </Flex>
                        </Flex>
                    </Flex>
                    <Flex mb="1%">
                            <Image
                                borderRadius="50"
                                height="30rem"
                                objectFit="cover"
                                src="/images/Tests/Rectangle 23.svg"
                                alt="profilePhoto"
                            ></Image>
                    </Flex>
                    <Flex  justify="space-between" align="center"  width="20%">
                        <Flex align="center" gap="10%"  w="20%">
                            <IconButton 
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="#ffffff33"
                                    borderRadius="15"
                                    icon={<Icon opacity="2" as={AiOutlineMessage} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                    >
                                    </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>2 mil</Text>
                        </Flex>
                       
                         <Flex gap="10%"  w="20%" align="center">
                            <IconButton 
                                        w="10%"
                                        aria-label="Open navigation"
                                        bgColor="#ffffff33"
                                        borderRadius="15"
                                        icon={<Icon opacity="2" as={AiOutlineHeart} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                        >
                                        </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>1 mil</Text>
                         </Flex>
                    </Flex>
                </Flex>

                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%" >
                        <Flex>
                            <Image
                                    borderRadius="100%"
                                    height="5rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                            ></Image>
                        </Flex>
                        <Flex>
                           <Flex flexDir="column">
                                <Flex align="center" gap="1%">
                                    <Text  color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>Helena Pena </Text>
                                    <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}> ● 19 Nov </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']} >Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit</Text>
                                <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={<Icon opacity="2" as={MdTranslate} color="howdyColors.mainWhite" fontSize={'x-large'} />}
                                >
                                </IconButton>
                           </Flex>
                        </Flex>
                    </Flex>
                    <Flex mb="1%">
                            <Image
                                borderRadius="50"
                                height="30rem"
                                objectFit="cover"
                                src="/images/Tests/Rectangle 23.svg"
                                alt="profilePhoto"
                            ></Image>
                    </Flex>
                    <Flex  justify="space-between" align="center"  width="20%">
                        <Flex align="center" gap="10%"  w="20%">
                            <IconButton 
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="#ffffff33"
                                    borderRadius="15"
                                    icon={<Icon opacity="2" as={AiOutlineMessage} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                    >
                                    </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>2 mil</Text>
                        </Flex>
                       
                         <Flex gap="10%"  w="20%" align="center">
                            <IconButton 
                                        w="10%"
                                        aria-label="Open navigation"
                                        bgColor="#ffffff33"
                                        borderRadius="15"
                                        icon={<Icon opacity="2" as={AiOutlineHeart} color="howdyColors.mainBlue" fontSize={'x-large'} />}
                                        >
                                        </IconButton> 
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>1 mil</Text>
                         </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

// export async function getStaticProps() {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         console.log(user);
//     });
//     return {
//         props: {
//             // uid,
//         },
//     };
// }
