import { Box, Text,Grid, Flex, Image, Icon, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { BiTargetLock } from "react-icons/bi";
import { Header } from "../../../components/Header/Header";
import { NavLink } from "../../../components/NavLink/UserPage/NavLink";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";

export default function FriendsPage(){
    // const router = useRouter();
    // if (router.isFallback) {
    //   return (
    //       <>
          
    //           <Loading></Loading>

    //       </>
    //   );
    // }
    return(
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
                <Header />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage></UserDataPage>
                <Grid  templateColumns='repeat(4, 1fr)' gap={6}>
                    <NavLink href="/UserPage/Post/1" title="Postagens"></NavLink>
                    <NavLink href="/UserPage/Friends/1" title="Amigos"></NavLink>
                    <NavLink href="/UserPage/Learn/1" title="Aprendizado"></NavLink>
                    <NavLink href="/UserPage/Teach/1" title="Ensinamentos"></NavLink>
                </Grid>
                <Flex width="100%" mt="5%" flexDir="column">
                    <Text
                        color="howdyColors.mainBlack"
                        fontWeight={'bold'}
                        fontSize={['sm', 'xx-large', 'xxx-large']}
                    >
                        Total : {/*{userFriends} */}
                    </Text>
                    <SimpleGrid mt="4%" justifyItems="center" spacing={20}  templateColumns='repeat(3, 1fr)' >
                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="11vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text  fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="17vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="11vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="11vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="11vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex>
                            <Flex >
                                <Image
                                        borderRadius="20%"
                                        height="12rem"
                                        objectFit="cover"
                                        src="/images/Tests/profilePhoto.png"
                                        alt="profilePhoto">
                                </Image>
                                <Flex pl="11vw" role="group" position="absolute" left="0" bottom="0" right="0">
                                    <Image
                                        cursor="pointer"
                                        zIndex="1"
                                        w="3vw"
                                        src="/images/howdy-images/class/class-master.svg"
                                    />
                                    <Text
                                        ml="10vw"
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
                            </Flex>
                            <Flex width="40%" gap="5%" flexDir={"column"} ml="4%">
                                <Text fontSize={["sm", "md", "x-large"]} fontWeight="bold">Jenny Wilson</Text>
                                <Text fontSize={["sm", "md", "medium"]}>150 XP</Text>
                                <Flex>
                                    <Icon color="howdyColors.mainBlue" fontSize="x-large">
                                        <BiTargetLock />
                                    </Icon>
                                    <Text color="howdyColors.mainBlue">Inglês</Text>
                                </Flex>
                            </Flex>
                        </Flex>

                        
                    </SimpleGrid>
                </Flex>
                
            </Box>
        </>
    )
}            