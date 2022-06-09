import { Header } from '../components/Header/Header';
import Post from '../components/Post/Post';
import { useRouter } from 'next/router';
import { api as apiFunction } from '../services/api';
import { useEffect, useState } from 'react';
import { getUserLogged } from '../functions/getUserLogged';
import Loading from '../components/Loading/Loading';
import { Button, Center, Flex, Image, Input, List, Menu, MenuButton, Text } from '@chakra-ui/react';
import { MdOutlineCategory } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsCamera, BsPeople } from 'react-icons/bs';
import Head from 'next/head';

import ListFriends from '../components/Friends/ListFriends';
import { UserLogged } from '../interfaces/UserLogged';
import ActivitySelectFilter from '../components/Form/ActivitySelectFilter';
import { ActivityCreate } from '../components/Activity/ActivityCreate';
import { ResultActivity } from '../components/Activity/ResultActivity';
import { Activity } from '../components/Activity/Activity';
import Filter from '../components/Filter/Filter';

interface PostsProps {
    idUser: string;
}

interface Activity {
    userCreator: {
        idUser: number;
        userName: string;
        profilePhoto?: string;
        isPro: boolean;
        totalXp: number;
        patent?: string;
    };
    didIUnlockThisActivity?: string;
    idActivity: number;
    activityCoverPhoto: string;
    activitySubtitle: string;
    activityTitle: string;
    description: string;
    priceHowdyCoin: number;
    idTargetLanguage: number;
    targetLanguageName: string;
    totalRating: number;
    totalStars: number;
    starsRating: number;
    totalQuestion: number;
    totalTheoricalContentBlock: number;
    totalStudent: number;
}

interface selectData {
    value: number | string;
    label: string;
}

export default function PublicActivities(props: PostsProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <Loading />;
    }

    const [userLogged, setUserLogged] = useState<UserLogged>(null);
    const api = apiFunction();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [maxPriceFilter, setMaxPriceFilter] = useState<string>('150'); //150 CORRESPONDE AO PREÇO LIMITE DE UMA ATIVIDADE
    const [idDifficultyFilter, setIdDifficultyFilter] = useState<string>('1'); //1 CORRESPONDE AO NÍVEL BÁSICO
    const [orderByFilter, setOrderByFilter] = useState<string>('rating'); //PRIMEIRAMENTE SERÁ TRAZIDO AS ATIVIDADES COM AS MELHORES AVALIAÇÕES

    //RESGATANDO USUÁRIO LOGADO
    useEffect(() => {
        getUserLogged(api).then((userLogged) => {
            userLogged && setUserLogged(userLogged);
        });
    }, []);

    //TRAZENDO ATIVIDADES PÚBLICAS
    useEffect(() => {
        api.get(`activities?maxPrice=${maxPriceFilter}&idDifficulty=${idDifficultyFilter}&orderBy=${orderByFilter}`)
            .then((response) => {
                setActivities(response.data);
                console.log(response.data);
            })
            .catch((err) => setActivities([]));
    }, [maxPriceFilter, idDifficultyFilter, orderByFilter]);

    const maxPriceFilterList: selectData[] = [
        { value: 150, label: '150 Howdy Coins' },
        { value: 100, label: '100 Howdy Coins' },
        { value: 50, label: '50 Howdy Coins' },
        { value: 10, label: '10 Howdy Coins' },
        { value: 0, label: '0 Howdy Coin' },
    ];
    const difficultyList: selectData[] = [
        { value: 1, label: 'Básico' },
        { value: 2, label: 'Intermediário' },
        { value: 3, label: 'Avançado' },
    ];

    const orderByList: selectData[] = [
        { value: 'rating', label: 'Melhores Avaliações' },
        { value: 'recents', label: 'Mais Novas' },
    ];

    function handleAccessCreateActivity() {
        router.push('/CreateActivityPage');
    }

    return (
        <>
            <Head>
                <title>HOWDY - ATIVIDADES PÚBLICAS</title>
            </Head>

            <Header user={userLogged} />
            <Flex mt="6.5%" justifyContent="center"  width="100%" py="8%">
                <Flex width="20%" p="1%" gap="20">
                    <List size="100%">
                        <Filter setHookDifficulty={setIdDifficultyFilter} setHookMaxPrice={setMaxPriceFilter} setHookOrderBy={setOrderByFilter} orderByList={orderByList} maxPriceFilterList={maxPriceFilterList} difficultyList={difficultyList}  />
                    </List>
                </Flex>

                <Flex width="100%" align="center" flexDir="column">
                    <Flex gap="15%" width="50%" align="center">
                        <Text fontWeight="bold" fontSize={['sm', 'x-large', 'xx-large']}>Atividades</Text>
                        <Button onClick={handleAccessCreateActivity} bgColor="howdyColors.mainBlue" textColor={'howdyColors.mainWhite'} px="5%">
                            ENSINE
                        </Button>
                    </Flex>

                    <Flex justifyContent="center" width="50%" flexDir="column">
                        {activities.length > 0 &&
                            activities.map((activity) => (
                                <ActivityCreate
                                    key={activity.idActivity}
                                    name={activity.userCreator.userName}
                                    description={activity.description}
                                    image={activity.activityCoverPhoto}
                                    rating={activity.starsRating}
                                    userActivitys={activity}
                                    user={activity.userCreator}
                                />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
                
        </>
    );
}
