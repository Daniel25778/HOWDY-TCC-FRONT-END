import { Box, Grid, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Header } from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import { NavLink } from '../../../components/NavLink/UserPage/NavLink';
import UserDataPage from '../../../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Post from '../../../components/Post/Post';

interface PostUserPageProps {
    idUser: string;
}

export default function PostPage(props: PostUserPageProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();
    const toast = useToast();

    const [user, setUser] = useState<any>('nulo');

    const [userPosts, setUserPosts] = useState<any>('nulo');

    const [stateFlexButton, setStateFlexButton] = useState<any>('flex');

    const [friendshipState, setFriendshipState] = useState<string>(null);

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((userLogged) => {
                setUserLogged(userLogged);

                userLogged &&
                    api
                        .get(`friendships/isUserMyFriend/${idUser}`)
                        .then((res) => {
                            if (res?.data?.message == 'You are not your own friend ;-;') {
                                setStateFlexButton('none');
                            } else if (res?.data?.length === 0) {
                                setFriendshipState('userIsNotFriend');
                            } else if (res?.data?.isPending == 0) {
                                //botão de cancelar amizade
                                setFriendshipState('areFriends');
                            } else if (res?.data?.isPending == 1 && userLogged?.idUser == res?.data?.idUserSender) {
                                console.log('caiu');
                                //botão de cancelar seu envio de amizade
                                setFriendshipState('cancelFriendshipRequest');
                            } else if (res?.data?.isPending == 1 && userLogged?.idUser == res?.data?.idUserAcceptor) {
                                //botão de aceitar ou recusar amizade
                                setFriendshipState('acceptOrDeclineFriendshipRequest');
                            } //confere se realmente só existem 4 bot
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
            });

            //Resgatar status de amizade do usuario logado

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then((response) => {
                response.data && setUser(response.data[0]);
            });

            //Pegar postagens do usuario atraves do id

            api.get(`posts/user/${idUser}`).then((response) => {
                if (response.data?.error) setUserPosts([]);
                else if (response.data) setUserPosts(response.data);
            });
        }
    }, [router.isFallback]);

    if (router.isFallback) {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>

            <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px"  bgImg="/images/background.png">
                <UserDataPage
                    idUser={idUser}
                    stateFlexButton={stateFlexButton}
                    friendshipState={friendshipState}
                    setFriendshipState={setFriendshipState}
                    user={user}
                />
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href={`/UserPage/Post/${idUser}`} title="Postagens"></NavLink>
                    <NavLink href={`/UserPage/Friends/${idUser}`} title="Amigos"></NavLink>
                    <NavLink href={`/UserPage/Learn/${idUser}`} title="Aprendizado"></NavLink>
                    <NavLink href={`/UserPage/Teach/${idUser}`} title="Ensinamentos"></NavLink>
                </Grid>
                {userPosts !== 'nulo' && userPosts.map((post) => <Post key={post.id} post={post} userCreator={user} />)}
            </Box>
        </>
    );
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
