import { Button, Flex, Grid, Icon, IconButton, Image, InputGroup, InputLeftElement, Link, SimpleGrid, Text, useToast } from "@chakra-ui/react";
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
import { GiPadlock } from "react-icons/gi";

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

    const [userLogged, setUserLogged] = useState<any>(null);

    const { idActivity } = props;
    const [activityContent, setActivityContent] = useState<any>(null);
   

    const router = useRouter();

    const api = apiFunction();



    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((userLogged) => {
                userLogged && setUserLogged(userLogged);
            });

            api.get(`/activities/content/${idActivity}`).then(response => {
                const responseData = response.data;
                setActivityContent(responseData);
            }
            ).catch(err => console.log(err))
        }
    }, [router.isFallback])

    if (router.isFallback) {
        return <Loading />;
    }

    console.log(activityContent?.theoricalContentBlocks[0]);

    function handleAccessToQuestions() {
       router.push(`/QuestionsActivityPage/${idActivity}`);
    }

    return (
        <>
            <Head>
                <title>HOWDY - REALIZAÇÃO DA ATIVIDADE</title>
            </Head>
           
            <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={'center'} align="center" padding="2%">
            
                <Flex w="50%" bg="white" align="center"  borderRadius={8} flexDir="column">
                    <Flex w="100%" p="2%" justifyContent={'flex-end'} >
                        <Text
                            alignSelf={'flex-end'}
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                        >
                            {activityContent?.activityData?.activityTitle}
                        </Text>
                    </Flex>
                    <Flex flexDir="column" w="100%" p="10%">
                        {activityContent?.theoricalContentBlocks.length > 0 &&
                                activityContent?.theoricalContentBlocks.map((theoricalContentBlocks) => (
                                <Flex mb="15%" flexDir="column" w="100%">
                                    <Text
                                        color="howdyColors.mainBlack"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'xx-large']}
                                        mb="2%"
                                    >
                                        {theoricalContentBlocks.title}
                                    </Text>
                                    <Image
                                        w='100%'
                                        objectFit="cover"
                                        maxHeight={'10%'}
                                        src={theoricalContentBlocks.afterTitleImage}
                                    >
                                    </Image>
                                    <Link fontSize={['sm', 'md', 'xx-large']} href={theoricalContentBlocks.afterTitleOriginalImageLink} color="howdyColors.mainBlack" opacity="60%">Fonte: {theoricalContentBlocks.afterTitleOriginalImageLink} </Link>
                                    <Text mt="5%" fontSize={['sm', 'md', 'x-large']} color="howdyColors.mainBlack" >{theoricalContentBlocks.text}</Text>
                                </Flex>
                        ))}

                        <Flex justifyContent="flex-end" w="100%">
                            <Button
                                w="30%"
                                _hover={{ bg: '#B9C2FD' }}
                                color="howdyColors.mainBlue"
                                type="submit"
                                onClick={handleAccessToQuestions}
                            >
                            QUERO PRATICAR
                            </Button>
                        </Flex>
                        
                    </Flex>
                    
                    
                </Flex>
            </Flex>
            {/* <Footer /> */}
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { idActivity } = params;

    return {
        props: { idActivity },
    };
};
