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
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    useDisclosure,
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
import { VscChromeClose } from 'react-icons/vsc';
import { FiShare } from 'react-icons/fi';

interface QuestionsPageProps {
    idActivity: string;
}

export default function ActivityBreakdown(props: QuestionsPageProps) {
    const { idActivity } = props;
    const [questionsContent, setQuestionsContent] = useState<any>(null);
    const [wasMade, setWasRead] = useState<boolean>(false);
    const [correctAlternatives, setCorrectAlternatives] = useState<any>(null);
    const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([]);

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const api = apiFunction();

    useEffect(() => {
        if (!router.isFallback) {
            api.get(`questions/${idActivity}`)
                .then((response) => {
                    const responseData = response.data;
                    setQuestionsContent(responseData);
                    setSelectedAlternatives(responseData.map(() => 0));
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

    function handleFinishedActivity() {
        setWasRead(true);
        api.post(`questions/correction/${idActivity}`, {
            selectedIdAlternatives: selectedAlternatives,
        })
        .then((response) => {
            setCorrectAlternatives(response.data);
            console.log(response.data);
        })
        .catch((err) => console.log(err));
            
    }

    console.log(questionsContent?.formattedQuestions[0].alternatives);

    return (
        <>
            <Head>
                <title>HOWDY - REALIZAÇÃO DA ATIVIDADE</title>
            </Head>

            <Modal isCentered  isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay bgColor="#3030303" />
                    <ModalContent   bgColor="howdyColors.mainWhite" >
                        <ModalHeader justifyContent='center'  display="flex">
                            <img width="50%" src="/images/default-images/check.gif" alt="Check gif" />
                        </ModalHeader>
                        <ModalCloseButton />
                        
                        <ModalBody  justifyContent="center" align="center">
                            <Text color="howdyColors.mainBlack" mb="5%" fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']} >Lição concluida!</Text>
                            <Text  color="howdyColors.mainBlack" fontSize={['sm', 'medium', 'large']} >Você já está pronto para compartilhar sua experiência em sua rede social! Vamos lá?</Text>
                        </ModalBody>

                        <ModalFooter display="flex" justifyContent='center' gap="5%">
                            <Button  color="howdyColors.mainBlue" bgColor='#B9C2FD' gap="4%" > <FiShare size="2rem"  color="#6A7DFF"/> COMPARTILHAR</Button>
                            <Button bgColor="howdyColors.mainRedTransparent" onClick={onClose} mr={3} >
                                <VscChromeClose color="#FA383E"/>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

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
                            Questões
                        </Text>
                        <Image
                            w="100%"
                            objectFit="cover"
                            maxHeight={'10%'}
                            mb="7%"
                            src={questionsContent?.activityData.activityCoverPhoto}
                        ></Image>
                        {questionsContent?.formattedQuestions.length > 0 &&
                            questionsContent?.formattedQuestions?.map((formattedQuestion, indexQuestion) => (
                                <Question wasMade={wasMade} responseResult={correctAlternatives} indexQuestion={indexQuestion} idActivity={idActivity} selectedAlternatives={selectedAlternatives} setSelectedAlternatives={setSelectedAlternatives} formattedQuestion={formattedQuestion}/>
                            ))}

                        <Flex justifyContent="flex-end" w="100%">
                            {wasMade  ? (
                                <Button
                                    w="30%"
                                    _hover={{ bg: '#B9C2FD' }}
                                    color="howdyColors.mainBlue"
                                    type="submit"
                                   
                                    onClick={onOpen}
                                >
                                    CONCLUIR
                                </Button>) : (
                                    <Button
                                    w="30%"
                                    _hover={{ bg: '#B9C2FD' }}
                                    color="howdyColors.mainBlue"
                                    type="submit"
                                    onClick={handleFinishedActivity}
                                >
                                    FINALIZAR
                                </Button>
                                )
                            }
                            
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
