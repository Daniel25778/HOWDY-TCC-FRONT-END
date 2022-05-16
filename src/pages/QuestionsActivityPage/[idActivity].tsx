import {
    Button,
    Flex,
    Grid,
    Icon,
    IconButton,
    Image,
    InputGroup,
    InputLeftElement,
    Link,
    SimpleGrid,
    Text,
    useToast,
} from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Header } from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { getUserLogged } from '../../functions/getUserLogged';
import { api as apiFunction } from '../../services/api';
import { FcCheckmark } from 'react-icons/fc';
import Footer from '../../components/Footer/Footer';
import ProfilePhotoAndPatent from '../../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent';
import { IoMdAdd } from 'react-icons/io';
import { BiTargetLock } from 'react-icons/bi';
import { AiOutlineFile } from 'react-icons/ai';
import { GiPadlock } from 'react-icons/gi';
import Question from '../../components/Question/Question';

interface QuestionsPageProps {
    idActivity: string;
}

export default function ActivityBreakdown(props: QuestionsPageProps) {
    const { idActivity } = props;
    const [questionsContent, setQuestionsContent] = useState<any>(null);

    const router = useRouter();

    const api = apiFunction();

    useEffect(() => {
        if (!router.isFallback) {
            api.get(`questions/${idActivity}`)
                .then((response) => {
                    const responseData = response.data;
                    setQuestionsContent(responseData);
                })
                .catch((err) => console.log(err));
        }
    }, [router.isFallback]);

    if (router.isFallback) {
        return <Loading />;
    }

    function handleAccessToQuestions() {
        router.push(`/QuestionsActivityPage/${idActivity}`);
    }
    console.log(questionsContent?.formattedQuestions[0].alternatives);

    return (
        <>
            <Head>
                <title>HOWDY - REALIZAÇÃO DA ATIVIDADE</title>
            </Head>

            <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={'center'} align="center" padding="2%">
                <Flex w="50%" bg="white" align="center" borderRadius={8} flexDir="column">
                    <Flex w="100%" p="2%" justifyContent={'flex-end'}>
                        <Text
                            alignSelf={'flex-end'}
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                        >
                            {questionsContent?.activityData.activityTitle}
                        </Text>
                    </Flex>
                    <Flex flexDir="column" w="100%" p="10%">
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                            mb="2%"
                        >
                            Questoes
                        </Text>
                        <Image
                            w="100%"
                            objectFit="cover"
                            maxHeight={'10%'}
                            mb="7%"
                            src={questionsContent?.activityData.activityCoverPhoto}
                        ></Image>
                        {questionsContent?.formattedQuestions.length > 0 &&
                            questionsContent?.formattedQuestions.map((formattedQuestion) => (
                                <Question idActivity={idActivity} formattedQuestion={formattedQuestion}></Question>
                            ))}

                        <Flex justifyContent="flex-end" w="100%">
                            <Button
                                w="30%"
                                _hover={{ bg: '#B9C2FD' }}
                                color="howdyColors.mainBlue"
                                type="submit"
                                // onClick={handleFinishedActivity}
                            >
                                FINALIZAR
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Footer /> */}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { idActivity } = params;

    return {
        props: { idActivity },
    };
};
