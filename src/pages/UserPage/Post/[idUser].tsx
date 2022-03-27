import { Box, Flex, Grid, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { MdTranslate } from 'react-icons/md';
import useRouter from 'use-react-router';
import { Header } from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import { NavLink } from '../../../components/NavLink/UserPage/NavLink';
import UserDataPage from '../../../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';

export default function PostPage() {
    const api = apiFunction();
    const [userLogged, setUserLogged] = useState<any>(null);

    useEffect(() => {
        getUserLogged(api).then((res) => {
            setUserLogged(res);
        });
    }, []);

    // const router = useRouter();
    // if (router.isFallback) {
    //   return (
    //       <>

    //           <Loading></Loading>

    //       </>
    //   );
    // }
    return (
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
            <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage></UserDataPage>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href="/UserPage/Post/1" title="Postagens"></NavLink>
                    <NavLink href="/UserPage/Friends/1" title="Amigos"></NavLink>
                    <NavLink href="/UserPage/Learn/1" title="Aprendizado"></NavLink>
                    <NavLink href="/UserPage/Teach/1" title="Ensinamentos"></NavLink>
                </Grid>
                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%">
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
                                    <Text
                                        color="howdyColors.mainBlack"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'x-large']}
                                    >
                                        Helena Pena{' '}
                                    </Text>
                                    <Text color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                        {' '}
                                        ● 19 Nov{' '}
                                    </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                    Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit
                                </Text>
                                <IconButton
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="howdyColors.mainBlue"
                                    borderRadius="15"
                                    icon={
                                        <Icon
                                            opacity="2"
                                            as={MdTranslate}
                                            color="howdyColors.mainWhite"
                                            fontSize={'x-large'}
                                        />
                                    }
                                ></IconButton>
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
                    <Flex justify="space-between" align="center" width="20%">
                        <Flex align="center" gap="10%" w="20%">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                2 mil
                            </Text>
                        </Flex>

                        <Flex gap="10%" w="20%" align="center">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineHeart}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                1 mil
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%">
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
                                    <Text
                                        color="howdyColors.mainBlack"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'x-large']}
                                    >
                                        Helena Pena{' '}
                                    </Text>
                                    <Text color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                        {' '}
                                        ● 19 Nov{' '}
                                    </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                    Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit
                                </Text>
                                <IconButton
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="howdyColors.mainBlue"
                                    borderRadius="15"
                                    icon={
                                        <Icon
                                            opacity="2"
                                            as={MdTranslate}
                                            color="howdyColors.mainWhite"
                                            fontSize={'x-large'}
                                        />
                                    }
                                ></IconButton>
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
                    <Flex justify="space-between" align="center" width="20%">
                        <Flex align="center" gap="10%" w="20%">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                2 mil
                            </Text>
                        </Flex>

                        <Flex gap="10%" w="20%" align="center">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    true ? (
                                        <Icon
                                            opacity="2"
                                            as={AiFillHeart}
                                            color="howdyColors.mainRed"
                                            fontSize={'x-large'}
                                        />
                                    ) : (
                                        <Icon
                                            opacity="2"
                                            as={AiOutlineHeart}
                                            color="howdyColors.mainBlue"
                                            fontSize={'x-large'}
                                        />
                                    )
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                1 mil
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%">
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
                                    <Text
                                        color="howdyColors.mainBlack"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'x-large']}
                                    >
                                        Helena Pena{' '}
                                    </Text>
                                    <Text color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                        {' '}
                                        ● 19 Nov{' '}
                                    </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                    Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit
                                </Text>
                                <IconButton
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="howdyColors.mainBlue"
                                    borderRadius="15"
                                    icon={
                                        <Icon
                                            opacity="2"
                                            as={MdTranslate}
                                            color="howdyColors.mainWhite"
                                            fontSize={'x-large'}
                                        />
                                    }
                                ></IconButton>
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
                    <Flex justify="space-between" align="center" width="20%">
                        <Flex align="center" gap="10%" w="20%">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                2 mil
                            </Text>
                        </Flex>

                        <Flex gap="10%" w="20%" align="center">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineHeart}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                1 mil
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                    <Flex mb="1%" gap="3%" width="40%">
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
                                    <Text
                                        color="howdyColors.mainBlack"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'x-large']}
                                    >
                                        Helena Pena{' '}
                                    </Text>
                                    <Text color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                        {' '}
                                        ● 19 Nov{' '}
                                    </Text>
                                </Flex>
                                <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                    Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit
                                </Text>
                                <IconButton
                                    w="10%"
                                    aria-label="Open navigation"
                                    bgColor="howdyColors.mainBlue"
                                    borderRadius="15"
                                    icon={
                                        <Icon
                                            opacity="2"
                                            as={MdTranslate}
                                            color="howdyColors.mainWhite"
                                            fontSize={'x-large'}
                                        />
                                    }
                                ></IconButton>
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
                    <Flex justify="space-between" align="center" width="20%">
                        <Flex align="center" gap="10%" w="20%">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                2 mil
                            </Text>
                        </Flex>

                        <Flex gap="10%" w="20%" align="center">
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineHeart}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                1 mil
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
