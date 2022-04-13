import { Box, Flex, Grid, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { MdTranslate } from 'react-icons/md';
import { Header } from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import { NavLink } from '../../../components/NavLink/UserPage/NavLink';
import UserDataPage from '../../../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { api } from '../../../services/api';
import {GetStaticPaths,  GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Post from '../../../components/Post/Post';
import { isUndefined } from 'util';
import Filter from '../../../components/Filter/Filter';
import Comments from '../../../components/Comments/Comments';


interface PostUserPageProps {
    idUser: string;
}

export default  function PostPage(props: PostUserPageProps) {
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
                if(response.data?.error) setUserPosts([]);
                else if(response.data) setUserPosts(response.data);
            })


        }
    } , [router.isFallback]);
    
    if (router.isFallback) {
        return (
            <Loading />
        )
      }

    return (
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
                   
            <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage user={user}/>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href={`/UserPage/Post/${idUser}`} title="Postagens"></NavLink>
                    <NavLink href={`/UserPage/Friends/${idUser}`} title="Amigos"></NavLink>
                    <NavLink href={`/UserPage/Learn/${idUser}`} title="Aprendizado"></NavLink>
                    <NavLink href={`/UserPage/Teach/${idUser}`} title="Ensinamentos"></NavLink>
                </Grid>
                {
                    userPosts !== 'nulo' && userPosts.map(post => (
                        <Post key={post.id} userPosts={post} user={user} />
                    ))
                }
                {/* <Comments></Comments> */}
            </Box>
        </>
    );
};

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
  
