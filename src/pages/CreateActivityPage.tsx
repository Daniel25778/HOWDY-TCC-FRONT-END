import { Box, Button, Flex, Grid, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, Link, Select, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Header } from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import { getUserLogged } from "../functions/getUserLogged";
import { api as apiFunction } from '../services/api';
import { FcCheckmark } from "react-icons/fc";
import Footer from "../components/Footer/Footer";
import ProfilePhotoAndPatent from "../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent";
import { IoMdAdd } from "react-icons/io";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineFile, AiOutlinePlus } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsCheckCircle, BsCheckLg } from "react-icons/bs";

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

    const [activityContent, setActivityContent] = useState<any>(null);
    const [topicsLearn, setTopicsLearn] = useState<string[]>([]);
    
    const [theoreticalContent,  setTheoreticalContent] = useState<string[]>([]);
    const [questionContent,  setQuestionContent] = useState<string[]>([]);
   

    const router = useRouter();

    const api = apiFunction();



    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((userLogged) => {
                userLogged && setUserLogged(userLogged);
            });

            // api.get(`/activities/content/${idActivity}`).then(response => {
            //     const responseData = response.data;
            //     setActivityContent(responseData);
            // }
            // ).catch(err => console.log(err))
        }
    }, [router.isFallback])

    if (router.isFallback) {
        return <Loading />;
    }

    function handleDeleteTopicLearn(idTopic: number) {
        let newTopicsLearn = [...topicsLearn];
        newTopicsLearn.splice(newTopicsLearn.indexOf(idTopic.toString()), 1);
        setTopicsLearn(newTopicsLearn);
    }

    function handleDeleteTheoreticalContent(idTheoreticalContent: number) {
        let newTheoreticalContent = [...theoreticalContent];
        newTheoreticalContent.splice(newTheoreticalContent.indexOf(idTheoreticalContent.toString()), 1);
        setTheoreticalContent(newTheoreticalContent);
    }

    console.log(activityContent?.theoricalContentBlocks[0]);
    
    return (
        <>
            <Head>
                <title>HOWDY - REALIZAÇÃO DA ATIVIDADE</title>
            </Head>
           
            <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={'center'} align="center" padding="2%">
                <Flex w="50%" bg="white"   borderRadius={8} flexDir="column">
                    <Flex w="100%" p="2%" justifyContent={'flex-end'} >
                        <Text
                            alignSelf={'flex-end'}
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                        >
                            Criação da atividades
                        </Text>
                    </Flex>
                    <Flex flexDir="column" w="100%" px="10%">
                        <Flex mb="5%" flexDir="column" w="100%">
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'bold'}
                                fontSize={['sm', 'md', 'xx-large']}
                                mb="5%"
                            >
                                Dados de Apresentação
                            </Text>
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                               * Nome do ensinamento
                            </Text>
                            <Input
                            fontWeight="medium"
                            name="passwordConfirm"
                            placeholder="Nome do ensinamento"
                            variant="filled"
                            type="text"
                            mb="5%"
                            />
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                               Subtítulo da atividade
                            </Text>
                            <Input
                            fontWeight="medium"
                            name="passwordConfirm"
                            placeholder="Subtítulo da atividade"
                            variant="filled"
                            type="text"
                            mb="5%"
                            />

                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                              * Dificuldade
                            </Text>

                            <Select
                                placeholder="Selecione uma dificuldade"
                                variant="filled"
                                iconColor="howdyColors.mainBlue"
                                mb="5%"
                            >
                                <option>
                                </option>
                            </Select>

                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                              * Preço (Até 150 Howdy Coins)
                            </Text>

                            <Flex  mb="5%" width="30%" borderRadius="60px" align="center">
                                <Image
                                    height="2.5rem"
                                    borderRadius="10px 0px 0px 10px"
                                    bgColor="howdyColors.mainYellow"
                                    src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                                    alt="howdy coin"
                                ></Image>
                                <Input
                                    borderRadius="0px 10px 10px 0px"
                                    fontWeight="medium"
                                    name="passwordConfirm"
                                    placeholder="Digite o preço desejado"
                                    variant="filled"
                                    type="text"
                                    />
                            </Flex>

                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                              * Descrição da atividade
                            </Text>
                            <Input
                                fontWeight="medium"
                                name="passwordConfirm"
                                placeholder="Descrição da atividade"
                                variant="filled"
                                type="text"
                                />
                        </Flex>

                        <Box bg="howdyColors.divider" h="1px" w="100%"  mb="30" />

                        <Flex flexDir="column" px="5%" w="100%">
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                            >
                              * Tópicos que serão ensinados
                            </Text>
                            {topicsLearn  && topicsLearn.map((topic, index) => (
                                <Flex mb="1%" w="100%">
                                <Input
                                    fontWeight="medium"
                                    name="passwordConfirm"
                                    placeholder="Tópicos que serão ensinados"
                                    variant="filled"
                                    type="text"
                                />
                                <IconButton
                                    variant="unstyled"
                                    aria-label="Open navigation"
                                    fontSize="30px"
                                    color="howdyColors.mainRed"
                                    onClick={() => {handleDeleteTopicLearn(index)}}
                                    icon={<Icon opacity="2" as={FaRegTrashAlt} fontWeight="black" />}
                                />
                                </Flex>
                            ))}
                            
                            <Flex gap="1%" alignItems="center" >
                                <IconButton
                                    variant="unstyled"
                                    aria-label="Open navigation"
                                    fontSize="30px"
                                    color="howdyColors.mainWhite"
                                    bgColor={'howdyColors.mainBlue'}
                                    borderRadius="10px 0px 0px 10px"
                                    onClick={() => setTopicsLearn([...topicsLearn, ''])}
                                    icon={<Icon opacity="2" as={AiOutlinePlus} fontWeight="black" />}
                                />
                                <Text
                                    color="howdyColors.mainBlack"
                                    fontWeight={'medium'}
                                    fontSize={['sm', 'md', 'large']}
                                >
                                    {topicsLearn.length}/6
                                </Text>

                            </Flex>
                            
                        </Flex>

                        <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="3" />
                        
                        <Flex flexDir="column"  p="5%">
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                                >
                                * Requisitos mínimos
                                </Text>
                                <Input
                                    fontWeight="medium"
                                    name="passwordConfirm"
                                    placeholder="Requisitos mínimos"
                                    variant="filled"
                                    type="text"
                                />
                        </Flex>
                        
                    </Flex>

                    <Flex flexDir="column" w="100%" px="10%">
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                            mb="5%"
                        >
                            Blocos de conteúdo teórico
                        </Text>
                        {theoreticalContent  && theoreticalContent.map((theoreticalContent, index) => (
                            <Flex flexDir="column" px="10%" w="100%">
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                                >
                                * Titulo 
                            </Text>
                            <Input
                                fontWeight="medium"
                                name="passwordConfirm"
                                placeholder="Titulo"
                                variant="filled"
                                type="text"
                                mb="5%"
                            />
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                                >
                                * Imagem representativa
                            </Text>
                            <Flex w="100%">
                                <Image
                                    borderRadius="10"
                                    src="/images/Tests/backgroundImage.png">
                                </Image>
                            </Flex>
                            <Input
                                fontWeight="medium"
                                name="passwordConfirm"
                                borderRadius="0px 0px 10px 10px"
                                placeholder="Digite aqui a fonte da imagem"
                                variant="filled"
                                type="text"
                                mb="5%"
                            />
                             <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                                >
                                * Conteúdo escrito
                            </Text>
                            <Input
                                fontWeight="medium"
                                name="passwordConfirm"
                                placeholder="Conteúdo escrito"
                                variant="filled"
                                type="text"
                                mb="5%"
                            />
                            <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'medium'}
                                fontSize={['sm', 'md', 'large']}
                                mb="2%"
                                >
                                * Imagem seguinte do Texto
                            </Text>
                            <Flex w="100%">
                                <Image
                                    borderRadius="10"
                                    src="/images/Tests/backgroundImage.png">
                                </Image>
                            </Flex>
                            <Flex>
                                <IconButton
                                    variant="unstyled"
                                    aria-label="Open navigation"
                                    fontSize="30px"
                                    color="howdyColors.mainRed"
                                    onClick={() => {handleDeleteTheoreticalContent(index)}}
                                    icon={<Icon opacity="2" as={FaRegTrashAlt} fontWeight="black" />}
                                />
                            </Flex>
                            
                            <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="3" />
                        </Flex>
                        ))}
                        
                        
                        <Flex mx="10%" gap="1%" mb="5%" alignItems="center" >
                                <IconButton
                                    variant="unstyled"
                                    aria-label="Open navigation"
                                    fontSize="30px"
                                    color="howdyColors.mainWhite"
                                    bgColor={'howdyColors.mainBlue'}
                                    borderRadius="10px 0px 0px 10px"
                                    onClick={() => setTheoreticalContent([...theoreticalContent, ''])}
                                    icon={<Icon opacity="2" as={AiOutlinePlus} fontWeight="black" />}
                                />
                                <Text
                                    color="howdyColors.mainBlack"
                                    fontWeight={'medium'}
                                    fontSize={['sm', 'md', 'large']}
                                >
                                    {theoreticalContent.length}/3
                                </Text>
                        </Flex>
                    </Flex>

                    <Flex flexDir="column" w="100%" px="10%">

                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                            mb="5%"
                        >
                            Questões
                        </Text>
                        
                        
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'medium'}
                            fontSize={['sm', 'md', 'large']}
                            mb="2%"
                            >
                            * Enunciado
                        </Text>
                        <Input
                            fontWeight="medium"
                            name="passwordConfirm"
                            placeholder="Enunciado"
                            variant="filled"
                            type="text"
                            mb="5%"
                        />

                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'medium'}
                            fontSize={['sm', 'md', 'large']}
                            mb="2%"
                            >
                            * Alternativa 1
                        </Text>
                        <Flex mb="3%" justifyContent='center' width='100%'>
                            <Input
                                fontWeight="medium"
                                name="passwordConfirm"
                                placeholder="Alternativa"
                                variant="filled"
                                type="text"
                                mb="5%"
                            />
                            <IconButton
                                
                                variant="unstyled"
                                aria-label="Open navigation"
                                fontSize="40px"
                                color="howdyColors.mainWhite"
                                borderRadius="20px"
                                // onClick={() => {handleDeleteTheoreticalContent(index)}}
                                icon={<Icon borderRadius="20px" opacity="2" bgColor="#0FA958" as={BsCheckCircle} fontWeight="black" />}
                            />
                             <IconButton
                                variant="unstyled"
                                aria-label="Open navigation"
                                fontSize="30px"
                                color="howdyColors.mainRed"
                                // onClick={() => {handleDeleteTheoreticalContent(index)}}
                                icon={<Icon opacity="2" as={FaRegTrashAlt} fontWeight="black" />}
                            />
                        </Flex>
                        
                    </Flex>

                    <Flex mx="10%" gap="1%" mb="5%" alignItems="center" >
                        <IconButton
                            variant="unstyled"
                            aria-label="Open navigation"
                            fontSize="30px"
                            color="howdyColors.mainWhite"
                            bgColor={'howdyColors.mainBlue'}
                            borderRadius="10px 0px 0px 10px"
                            onClick={() => setQuestionContent([...questionContent, ''])}
                            icon={<Icon opacity="2" as={AiOutlinePlus} fontWeight="black" />}
                        />
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'medium'}
                            fontSize={['sm', 'md', 'large']}
                        >
                            {questionContent.length}/10
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Footer /> */}
        </>
    )
}
