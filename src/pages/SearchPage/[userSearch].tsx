import { Box, Text, Grid, Flex, Image, Heading, Center, Table, Thead, Tr, Th, Tbody, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../../components/Header/Header';
import { NavLink } from '../../components/NavLink/Header/NavLink';
import UserDataPage from '../../components/UserDataPage/UserDataPage';
import { BiTargetLock } from 'react-icons/bi';
import ProfilePhotoAndPatent from '../../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent';
import { useEffect, useState } from 'react';
import { api as apiFunction } from '../../services/api';
import { useRouter } from 'next/router';
import { getUserLogged } from '../../functions/getUserLogged';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Loading from '../../components/Loading/Loading';

interface SearchPageProps {
    userSearch?: string;
}

export default function SearchPage({ userSearch }: SearchPageProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const api = apiFunction();

    const [search, setSearch] = useState<any>('nulo');

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar resultado de pesquisa atraves do nome do usuario

            api.get(`users/getByName/${userSearch}`).then((res) => {
                setSearch(res.data);
                console.log(res.data);
            });
        }
    }, [router.isFallback]);

    if (router.isFallback) {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>HOWDY - Resultados de {userSearch}</title>
            </Head>
            <Header user={userLogged} />
            <Flex
                flexDir="column"
                alignItems="center"
                pt="15rem"
                as="main"
                px="100px"
                bg="red"
                bgImg="/images/background.png"
            >
                <Center fontWeight="bold" fontSize="2.5rem" color="howdyColors.mainBlack" flexDir="column" w="100%">
                    <Heading fontSize="2.5rem">Resultados da pesquisa:</Heading>
                    <Text display="flex">
                        " <Text color="howdyColors.mainBlue">{userSearch}</Text> "
                    </Text>
                </Center>
                <Table mt="10" minW="800px" w="70%" bg="howdyColors.mainWhite">
                    <Thead>
                        <Tr>
                            <Th pt="30px" textTransform="capitalize" color="howdyColors.mainBlack" fontSize="2.3rem">
                                Pessoas
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Box mt="70px" pl="50px">
                                <Flex>
                                    {/* <ProfilePhotoAndPatent user={search} size="8rem" /> */}
                                    <Box ml="30px">
                                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                                            XXXXXX Wilson
                                        </Text>
                                        <Flex mt="2rem">
                                            <Center>
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Inglês
                                                </Text>
                                            </Center>
                                            <Center ml="10">
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Português
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
                            </Box>
                        </Tr>
                        <Tr>
                            <Box mt="70px" pl="50px">
                                <Flex>
                                    {/* <ProfilePhotoAndPatent size="8rem" /> */}
                                    <Box ml="30px">
                                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                                            XXXXXX Wilson
                                        </Text>
                                        <Flex mt="2rem">
                                            <Center>
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Inglês
                                                </Text>
                                            </Center>
                                            <Center ml="10">
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Português
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
                            </Box>
                        </Tr>
                        <Tr>
                            <Box mt="70px" pl="50px">
                                <Flex>
                                    {/* <ProfilePhotoAndPatent size="8rem" /> */}
                                    <Box ml="30px">
                                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                                            XXXXXX Wilson
                                        </Text>
                                        <Flex mt="2rem">
                                            <Center>
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Inglês
                                                </Text>
                                            </Center>
                                            <Center ml="10">
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Português
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
                            </Box>
                        </Tr>
                        <Tr>
                            <Box mt="70px" pl="50px">
                                <Flex>
                                    {/* <ProfilePhotoAndPatent size="8rem" /> */}
                                    <Box ml="30px">
                                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                                            XXXXXX Wilson
                                        </Text>
                                        <Flex mt="2rem">
                                            <Center>
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Inglês
                                                </Text>
                                            </Center>
                                            <Center ml="10">
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Português
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
                            </Box>
                        </Tr>
                        <Tr>
                            <Box mt="70px" pl="50px">
                                <Flex>
                                    {/* <ProfilePhotoAndPatent size="8rem" /> */}
                                    <Box ml="30px">
                                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                                            XXXXXX Wilson
                                        </Text>
                                        <Flex mt="2rem">
                                            <Center>
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Inglês
                                                </Text>
                                            </Center>
                                            <Center ml="10">
                                                <Icon
                                                    as={BiTargetLock}
                                                    color="howdyColors.mainBlue"
                                                    w="30px"
                                                    h="30px"
                                                />
                                                <Text
                                                    ml="5"
                                                    fontWeight="thin"
                                                    fontSize="xl"
                                                    color="howdyColors.mainBlue"
                                                >
                                                    Português
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
                            </Box>
                        </Tr>
                    </Tbody>
                </Table>

                <Table mt="10" minW="800px" w="70%" bg="howdyColors.mainWhite">
                    <Thead>
                        <Tr>
                            <Th pt="30px" textTransform="capitalize" color="howdyColors.mainBlack" fontSize="2.3rem">
                                Atividades
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody></Tbody>
                </Table>
            </Flex>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { userSearch } = params;

    return {
        props: { userSearch },
    };
};
