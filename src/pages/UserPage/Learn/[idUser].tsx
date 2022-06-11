import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Activity } from '../../../components/Activity/Activity';
import { Header } from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import { NavLink } from '../../../components/NavLink/UserPage/NavLink';
import UserDataPage from '../../../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

interface LearnPageProps {
    idUser: string;
}

export default function LearnPage(props: LearnPageProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [unlockedAndCompletedActivities, setUnlockedAndCompletedActivities] = useState<any>(null);

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then((response) => {
                response.data && setUser(response.data[0]);
            });

            //Pegar atividades desbloqueadas do usuario atraves do id

            api.get(`activities/unlocked/${idUser}`).then((response) => {
                if (response.data?.error == null) {
                    setUnlockedAndCompletedActivities(response.data);
                  
                }
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
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                {/* @ts-ignore */}
                <UserDataPage user={user} />
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <NavLink href={`/UserPage/Post/${idUser}`} title="Postagens" />
                    <NavLink href={`/UserPage/Friends/${idUser}`} title="Amigos" />
                    <NavLink href={`/UserPage/Learn/${idUser}`} title="Aprendizado" />
                    <NavLink href={`/UserPage/Teach/${idUser}`} title="Ensinamentos" />
                </Grid>
                <Text
                    mt="5%"
                    color="howdyColors.mainBlack"
                    fontWeight={'bold'}
                    fontSize={['sm', 'xx-large', 'xxx-large']}
                >
                    Atividades desbloqueadas:
                </Text>
                <Flex gap={10} align="center" width="100%" mt="1%" flexDir="column">
                    {unlockedAndCompletedActivities?.unlockedActivities &&
                        unlockedAndCompletedActivities?.unlockedActivities?.map((unlockedActivity) => (
                            <Activity
                                key={unlockedActivity?.idActivity}
                                userUnlockedActivities={unlockedActivity}
                                user={unlockedActivity?.userCreator}
                            />
                        ))}

                    <Box bg="howdyColors.divider" h="1px" w="50%" mt="30" />
                </Flex>
                <Text
                    mt="5%"
                    color="howdyColors.mainBlack"
                    fontWeight={'bold'}
                    fontSize={['sm', 'xx-large', 'xxx-large']}
                >
                    Atividades concluídas:
                </Text>
                <Flex gap={10} align="center" width="100%" mt="1%" flexDir="column">
                    {unlockedAndCompletedActivities?.completedActivities &&
                        unlockedAndCompletedActivities?.completedActivities?.map((completedActivity) => (
                            <Activity
                                key={completedActivity?.idActivity}
                                userUnlockedActivities={completedActivity}
                                user={completedActivity?.userCreator}
                            />
                        ))}

                    <Box bg="howdyColors.divider" h="1px" w="50%" mt="30" />
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
