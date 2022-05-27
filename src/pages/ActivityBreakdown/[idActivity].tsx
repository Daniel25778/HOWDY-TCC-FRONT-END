import { Button, Flex, Grid, Icon, IconButton, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Header } from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import { getUserLogged } from "../../functions/getUserLogged";
import { api as apiFunction } from '../../services/api';
import { FcCheckmark } from "react-icons/fc";
import Footer from "../../components/Footer/Footer";
import ProfilePhotoAndPatent from "../../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent";
import { IoMdAdd } from "react-icons/io";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineFile } from "react-icons/ai";
import Router from 'next/router';

interface ActivityBreakdownProps {
    idActivity: string;
}

interface TeachingTopic{
    idTeachingTopic: number;
    teachingTopicText: string;
}

interface Activity {
    userCreator: {
        idUser: number
        userName: string,
        profilePhoto: string
        isPro: boolean
        totalXp: number
        patent: string
        description: string
    },
    didIUnlockThisActivity: string,
    idActivity: number,
    activityCoverPhoto: string,
    activitySubtitle: string
    activityTitle: string
    description: string
    priceHowdyCoin: number
    idTargetLanguage: number
    targetLanguageName: string
    totalRating: number
    totalStars: number
    starsRating: number
    totalQuestion: number
    totalTheoricalContentBlock: number
    totalStudent: number
    teachingTopicList: TeachingTopic[]
    createdAt: string
    minimumRequirements: string
    difficultyName: string
  
}

export default function ActivityBreakdown(props: ActivityBreakdownProps) {

    const toast = useToast();
    const [userLogged, setUserLogged] = useState<any>(null);
    const [wasBought, setWasBought] = useState<boolean>(false);
    const { idActivity } = props;
    const [activity, setActivity] = useState<Activity>(null);
    const createdAt = new Date(activity?.createdAt).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const router = useRouter();

    const api = apiFunction();



    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((userLogged) => {
                userLogged && setUserLogged(userLogged);
            });
            api.get(`/activities/${idActivity}`).then(response => {
                const responseData = response.data;
                setActivity(responseData[0]);
            }
            ).catch(err => console.log(err))
        }
    }, [router.isFallback])

    if (router.isFallback) {
        return <Loading />;
    }

    console.log(activity);

    function handleBuyActivity() {
        setWasBought(true);
        api.post(`/activities/buy/${idActivity}`).then(response => {
            toast({
                title: 'COMPRA REALIZADA COM SUCESSO!',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            console.log(response.data);
        }
        ).catch(err => console.log(err))
    }

    function handleAccessActivity(){
        Router.push(`/DoActivityPage/${idActivity}`);
    }

    return (
        <>
            <Head>
                <title>HOWDY - DETALHAMENTO DA ATIVIDADE</title>
            </Head>
            <Header user={userLogged} />
            <Flex  flexDir="column" boxShadow="4px 4px 4px rgba(0.25, 0.25, 0.25, 0.25)" mt="13%" ms="60%" p="1px" borderRadius="10px 10px 10px 10px" bgColor="howdyColors.mainWhite" w="20%" position="absolute">
                <Image borderRadius="10px 10px 10px 10px" width="100%"  src={activity?.activityCoverPhoto}/>
                <Flex  justifyContent="center" gap="5%" p="2%" w="100%">
                    <Flex w="25%" gap="5" borderRadius="60px" bg="howdyColors.mainYellow" align="center">
                        <Image
                            height="2.5rem"
                            src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                            alt="howdy coin"
                        ></Image>
                        <Text fontSize={['sm', 'medium', 'x-large']} fontWeight="semibold" color="howdyColors.brownHowdyCoin">
                            {activity?.priceHowdyCoin}
                        </Text>
                        
                    </Flex>
                    <Flex  align="center" >
                        <BiTargetLock color="6A7DFF" size="2rem" />
                        <Text fontSize={['sm', 'medium', 'large']} color="howdyColors.mainBlue" opacity="60%">{activity?.targetLanguageName}</Text>
                    </Flex>

                   
                </Flex>

                <Flex align="center" flexDir="column" w="100%" justifyContent="center">
                    {wasBought  ? (
                                <Button
                                    w="30%"
                                    _hover={{ bg: '#B9C2FD' }}
                                    color="howdyColors.mainBlue"
                                    type="submit"
                                    onClick={handleAccessActivity} 
                                >
                                    ACESSAR
                                </Button>) : (
                                    <Button
                                    w="30%"
                                    bgColor="#6A7DFF33"
                                    _hover={{ bg: '#B9C2FD' }}
                                    color="howdyColors.mainBlue"
                                    type="submit"
                                    onClick={() => handleBuyActivity()}
                                >
                                    COMPRAR
                                </Button>
                                )
                    }
                </Flex>
                <Flex flexDir="column" w="100%" p="3%">
                    <Text mt="5%" mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">Dificuldade</Text>
                    <Flex ml="5%" gap="2%" align="center" >
                        <Text  mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlue">●</Text>
                        <Text  mb="3%"  fontSize={['medium', 'medium', 'large']} color="howdyColors.mainBlack">{activity?.difficultyName}</Text>
                    </Flex>
                    <Text  mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">Esta atividade Inclui:</Text>
                    <Flex ml="5%"  gap="2%" align="center" >
                        <AiOutlineFile  color="#6A7DFF"/>
                        <Text fontSize={['medium', 'medium', 'large']} color="howdyColors.mainBlack">{activity?.totalQuestion} Questões objetivas</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex  flexDir="column" justifyContent="center" width="100%" py="10%">
                
                <Flex mb="4%" flexDir="column" px="25%" py="3%" width="100%" bgColor="howdyColors.mainBlue">

                    <Text w='55%' mb="5%" fontWeight="medium" fontSize={['medium', 'large', 'xx-large']} color="howdyColors.mainWhite" >{activity?.activityTitle}</Text>
                    <Text w='55%' mb="5%" fontSize={['medium', 'medium', 'large']} color="howdyColors.mainWhite">{activity?.activitySubtitle}</Text>
                    <Flex mb="4%" align="center" w="100%">
                        <Text w="5%" fontSize={['medium', 'x-large', 'xx-large']} color="howdyColors.mainYellow">{activity?.totalStars}</Text>
                        <StarRatings
                            starDimension="40px"
                            rating={activity?.starsRating}
                            starRatedColor="#F2D63F"
                            numberOfStars={5}
                            name="rating"
                        />
                    </Flex>
                    <Text fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainWhite">Data de criação: {createdAt}</Text>
                </Flex>

                <Flex flexDir="column" px="25%" w="100%">
                    <Flex flexDir={"column"} borderRadius="10px" p="1%" borderWidth={1} borderStyle={"solid"} borderColor="howdyColors.mainBlack" w="46%">
                        <Text mb="4%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">O que você aprenderá</Text>
                        <Grid w="100%" mb="3%" templateColumns="repeat(2, 1fr)" gap={10} flex={1}>

                            {activity && activity?.teachingTopicList.map((teachingTopic) => (
                                <Flex gap="5%" justifyContent="center" align={"center"}>
                                    <FcCheckmark size="3rem" />
                                    <Text fontSize={['x-small', 'medium', 'large']} color="howdyColors.mainBlack">{teachingTopic.teachingTopicText}</Text>
                                </Flex>
                            ))}
                        </Grid>
                        <Text mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">Requisitos</Text>
                        
                        <Text fontSize={['x-small', 'medium', 'large']} color="howdyColors.mainBlack"> {'>'} {activity?.minimumRequirements} </Text>
                          
                    </Flex>
                    <Text mt="5%" mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">Descrição</Text>
                    <Text w="46%" fontSize={['x-small', 'medium', 'large']} color="howdyColors.mainBlack">{activity?.description}</Text>
                    <Text mt="5%" mb="3%" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} color="howdyColors.mainBlack">Criador da Atividade</Text>
                    <Flex flexDir="column">
                        <Flex gap="5%" align="center">
                            <ProfilePhotoAndPatent size="10rem" user={activity?.userCreator}/>
                            <Text fontWeight="medium" fontSize={['x-small', 'medium', 'xx-large']} color="howdyColors.mainBlack">{activity?.userCreator?.userName}</Text>
                        </Flex>
                        <Text ml="15%" w="32%" fontSize={['x-small', 'medium', 'large']} color="howdyColors.mainBlack">{activity?.userCreator?.description}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { idActivity } = params;

    return {
        props: { idActivity },
    };
};
