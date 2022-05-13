import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from "next";

import { ActivityCreate } from "../../../components/Activity/ActivityCreate";
import { NavLink } from "../../../components/NavLink/UserPage/NavLink";


interface TeachUserPageProps {
    idUser: string;
}


export default function TeachPage(props: TeachUserPageProps) {

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [userActivitys, setUserActivitys] = useState<any>('nulo');
    

    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then(response => {
                response.data && setUser(response.data[0]);
            });

           //Pegar postagens do usuario atraves do id

           api.get(`activities/${idUser}`).then(response => {
            if(response.data?.error) setUserActivitys([]);
            else if(response.data) {
                setUserActivitys(response.data);
            }
           });
        }
    } , [router.isFallback]);
    
    if (router.isFallback) {
        return (
            <Loading />
        )
      }
    return(
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
            {console.log("sfsfs" + userActivitys)}
                <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                {/* @ts-ignore */}
                <UserDataPage user={user}></UserDataPage>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href={`/UserPage/Post/${idUser}`} title="Postagens"/>
                    <NavLink href={`/UserPage/Friends/${idUser}`} title="Amigos"/>
                    <NavLink href={`/UserPage/Learn/${idUser}`} title="Aprendizado"/>
                    <NavLink href={`/UserPage/Teach/${idUser}`} title="Ensinamentos"/>
                </Grid>
                <Flex w="100%" justify="center">
                    <Flex  gap={10} align="center" width="50%" mt="1%" flexDir="column">
                            {
                                userActivitys !== 'nulo' && userActivitys?.map(UserActivity => (
                                    <ActivityCreate key={UserActivity.id} userActivitys={UserActivity} user={user}/>
                                ))
                            }
                            
                            <Box bg="howdyColors.divider" h="1px" w="50%" mt="30"  />
                    </Flex>
                </Flex>
                
            </Box>
        </>
    )
}            

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idUser } = params;

    return {
        props: { idUser },
    };
};