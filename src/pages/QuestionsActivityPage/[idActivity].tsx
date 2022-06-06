import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { api as apiFunction } from '../../services/api';
import { IoMdTrophy } from 'react-icons/io';
import Question from '../../components/Question/Question';
import { VscChromeClose } from 'react-icons/vsc';
import { FiShare } from 'react-icons/fi';
import CreatePost from '../../components/CreatePost/CreatePost';
import { BsFillShareFill } from 'react-icons/bs';
import StarRatings from 'react-star-ratings';

interface QuestionsPageProps {
    idActivity: string;
}

export default function ActivityBreakdown(props: QuestionsPageProps) {
    const { idActivity } = props;
    const [questionsContent, setQuestionsContent] = useState<any>(null);
    const [wasMade, setWasRead] = useState<boolean>(false);
    const [buttonAvaliation, setButtonAvaliation] = useState<string>('none');
    const [buttonConcluded, setButtonConcluded] = useState<string>('flex');
    const [correctAlternatives, setCorrectAlternatives] = useState<any>(null);
    const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([]);
    

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenShareModal, onOpen: onOpenShareModal , onClose: onCloseShareModal } = useDisclosure()
    const { isOpen: isOpenAvaliationModal, onOpen: onOpenAvaliationModal , onClose: onCloseAvaliationModal } = useDisclosure()
    const [modalShareDisplay, setModalShareDisplay] = useState<any>();

    const [rating, setRating] = useState<number>(5);

    const api = apiFunction();

    const toast = useToast();

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

    function handleEvaluateActivity() {
        api.post(`evaluations/${idActivity}`, {
            stars: rating,
        }).then((response: any) => {
            router.push(`/Posts`);
            toast({
                title: 'AVALIAÇÃO ENVIADA COM SUCESSO!',
                status: 'success',
                isClosable: true,
                position: 'top',
            });

        
        }).catch((error: any) => {
            toast({
                title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        });
    }

    function handleDisplayNoneButton(){
        onOpen()
        setButtonConcluded("none")
        setButtonAvaliation("flex")
    }

      
    

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
                        {/* @ts-ignore */}
                        <ModalBody  justifyContent="center" align="center">
                            <Text color="howdyColors.mainBlack" mb="5%" fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']} >Lição concluida!</Text>
                            <Text  color="howdyColors.mainBlack" fontSize={['sm', 'medium', 'large']} >Você já está pronto para compartilhar sua experiência em sua rede social! Vamos lá?</Text>
                        </ModalBody>

                        <ModalFooter display="flex" justifyContent='center' gap="5%">
                            <Button onClick={onOpenShareModal} color="howdyColors.mainBlue" bgColor='#B9C2FD' gap="4%" > <FiShare size="2rem"  color="#6A7DFF"/> COMPARTILHAR</Button>
                            <Button bgColor="howdyColors.mainRedTransparent" onClick={onClose} mr={3} >
                                <VscChromeClose color="#FA383E"/>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>

            <Modal  isCentered size={"6xl"} isOpen={isOpenShareModal} onClose={onCloseShareModal}>
                    <ModalOverlay bgColor="#3030303" />
                    <ModalContent w="100%"  bgColor="howdyColors.mainWhite" >
                        <ModalHeader justifyContent='center'  display="flex">
                            <BsFillShareFill size="10rem" color="#6A7DFF"/>
                        </ModalHeader>
                        <ModalCloseButton />
                        {/* @ts-ignore */}
                        <ModalBody flexDir="column" display="flex" align="center"  w="100%">
                            <Text color="howdyColors.mainBlack" mb="3%" fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']} >Compartilhe com o mundo as suas conquistas!</Text>
                            <CreatePost setModalShareDisplay={setModalShareDisplay}/>
                        </ModalBody>
                    </ModalContent>
            </Modal>

            <Modal  isCentered size={"md"} isOpen={isOpenAvaliationModal} onClose={onCloseAvaliationModal}>
                    <ModalOverlay bgColor="#3030303" />
                    <ModalContent w="100%"  bgColor="white" >
                        <ModalHeader justifyContent='center'  display="flex">
                            <IoMdTrophy size="5rem" color="#6A7DFF"/>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody flexDir="column" display="flex" alignItems="center"  w="100%">
                            <Text color="howdyColors.mainBlack" mb="3%" fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']} >Avalie a atividade!</Text>
                            <Text mb="5%" color="howdyColors.mainBlack" fontSize={['sm', 'medium', 'large']} >Indique uma nota para este aprendizado!</Text>
                            <StarRatings
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="#FFD700"
                                starHoverColor="#FFD700"
                                rating={rating}
                                changeRating={(newRating) => setRating(newRating)}
                            />
                            <Button
                                mt="5%"
                                display={buttonAvaliation}
                                w="30%"
                                _hover={{ bg: '#B9C2FD' }}
                                color="howdyColors.mainBlue"
                                type="submit"
                                onClick={handleEvaluateActivity}
                            >
                                AVALIAR
                            </Button>
                        </ModalBody>
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
                                    display={buttonConcluded}
                                    onClick={handleDisplayNoneButton}
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
                            <Button
                                display={buttonAvaliation}
                                w="30%"
                                _hover={{ bg: '#B9C2FD' }}
                                color="howdyColors.mainBlue"
                                type="submit"
                                onClick={onOpenAvaliationModal}
                            >
                                AVALIAR
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
