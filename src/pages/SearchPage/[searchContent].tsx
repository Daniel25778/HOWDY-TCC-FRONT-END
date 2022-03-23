import { Box, Text, Grid, Flex, Image } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../../components/Header/Header';
import { NavLink } from '../../components/NavLink/Header/NavLink';
import UserDataPage from '../../components/UserDataPage/UserDataPage';

export default function SearchPage() {
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
            <Header />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage />
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href="/UserPage/Post/1" title="Postagens" />
                    <NavLink href="/UserPage/Friends/1" title="Amigos" />
                    <NavLink href="/UserPage/Learn/1" title="Aprendizado" />
                    <NavLink href="/UserPage/Teach/1" title="Ensinamentos" />
                </Grid>
                <Flex width="100%" mt="5%" flexDir="column">
                    <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'xx-large', 'xxx-large']}>
                        Total : {/*{userFriends} */}
                    </Text>
                    <Grid mt="4%" justifyItems={'center'} templateColumns="repeat(3, 1fr)">
                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text>Jenny Wilson</Text>
                            </Flex>
                        </Flex>

                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text></Text>
                            </Flex>
                        </Flex>

                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text></Text>
                            </Flex>
                        </Flex>

                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text></Text>
                            </Flex>
                        </Flex>

                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text></Text>
                            </Flex>
                        </Flex>

                        <Flex>
                            <Flex>
                                <Image
                                    borderRadius="20%"
                                    height="15rem"
                                    objectFit="cover"
                                    src="/images/Tests/profilePhoto.png"
                                    alt="profilePhoto"
                                ></Image>
                            </Flex>
                            <Flex>
                                <Text></Text>
                            </Flex>
                        </Flex>
                    </Grid>
                </Flex>
            </Box>
        </>
    );
}
