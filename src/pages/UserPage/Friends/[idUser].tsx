import { Box, Text, Grid, Flex, Image, Icon, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { BiTargetLock } from 'react-icons/bi';
import { Header } from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import { NavLink } from '../../../components/NavLink/UserPage/NavLink';
import ProfilePhotoAndPatent from '../../../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent';
import UserDataPage from '../../../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Friends from '../../../components/Friends/Friends';

interface FriendPageProps {
    idUser: string;
}

export default function FriendsPage(props: FriendPageProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    console.log(idUser);
    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [userFriends, setUserFriends] = useState<any>('nulo');

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then((response) => {
                response.data && setUser(response.data[0]);
            });

            //Pegar amigos do usuario atraves do id

            api.get(`friendships/getAllSomeoneFriends/${idUser}`).then((response) => {
                console.log(response.data);
                if (response.data?.error) setUserFriends([]);
                else if (response.data) setUserFriends(response.data);
                console.log(response.data);
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
            <Box pt="7rem" as="main" px="100px" bgImg="/images/background.png">
                <UserDataPage user={user} />
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href={`/UserPage/Post/${idUser}`} title="Postagens"></NavLink>
                    <NavLink href={`/UserPage/Friends/${idUser}`} title="Amigos"></NavLink>
                    <NavLink href={`/UserPage/Learn/${idUser}`} title="Aprendizado"></NavLink>
                    <NavLink href={`/UserPage/Teach/${idUser}`} title="Ensinamentos"></NavLink>
                </Grid>
                <Flex width="100%" mt="5%" flexDir="column">
                    <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'xx-large', 'xxx-large']}>
                        Total : {userFriends.length} amigo{userFriends.length > 1 ? 's' : ''}
                    </Text>
                    <SimpleGrid mt="4%" justifyItems="center" spacing={20} templateColumns="repeat(3, 1fr)">
                        {userFriends !== 'nulo' &&
                            userFriends.map((friend) => (
                                <Friends
                                    key={friend.id}
                                    userFriends={friend}
                                    friendName={friend.userName}
                                    friendTotalXp={friend.totalXp}
                                    friendTargetLanguage={friend.targetLanguageName}
                                />
                            ))}
                    </SimpleGrid>
                </Flex>
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
