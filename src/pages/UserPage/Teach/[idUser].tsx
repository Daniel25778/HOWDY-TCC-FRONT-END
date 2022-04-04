import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { useRouter } from 'next/router';


interface TeachUserPageProps {
    idUser: string;
}


export default function TeachPage(props: TeachUserPageProps) {

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [userPosts, setUserPosts] = useState<any>('nulo');
    

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

            api.get(`posts/user/${idUser}`).then(response => {
                response.data && setUserPosts(response.data[0]);
            })


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
                <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage user={props.idUser}></UserDataPage>
            </Box>
        </>
    )
}            