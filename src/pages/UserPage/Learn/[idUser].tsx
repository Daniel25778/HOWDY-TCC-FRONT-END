import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Activity } from "../../../components/Activity/Activity";
import { Header } from "../../../components/Header/Header";
import { NavLink } from "../../../components/NavLink/UserPage/NavLink";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';

export default function LearnPage(){

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
    return(
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
                <Header user={userLogged}/>
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage></UserDataPage>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href="/UserPage/Post/1" title="Postagens"></NavLink>
                    <NavLink href="/UserPage/Friends/1" title="Amigos"></NavLink>
                    <NavLink href="/UserPage/Learn/1" title="Aprendizado"></NavLink>
                    <NavLink href="/UserPage/Teach/1" title="Ensinamentos"></NavLink>
                </Grid>
                <Text mt="5%" color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'xx-large', 'xxx-large']}>
                        Atividades desbloqueadas: {/*{userFriends} */}
                </Text>
                <Flex  gap={10} align="center" width="100%" mt="1%" flexDir="column">
                        <Activity></Activity>
                        <Box bg="howdyColors.divider" h="1px" w="50%" mt="30"  />
                        <Activity></Activity>
                </Flex>
            </Box>

        </>
    )
}            