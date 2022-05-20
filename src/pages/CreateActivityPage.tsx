import { Box, Button, Flex, Grid, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, Link, Select, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
    teachingTopicText: string;
}

interface TheoricalContentBlock{
    title?: string;
    displayOrder?: number;
    text?: string;
    afterTextOriginalImageLink?: string;
    linkDaImagemTextoOriginal?: string;
    afterTitleOriginalImageLink?: string;
    linkDaImagemTítuloOriginal?: string;
}

interface Alternatives{
    textContent: string;
    isCorrect?: boolean;
    idAlternative: number;
}

interface Question{
    statement: string;
    alternatives: Alternatives[];
}

interface ActivityJsonData {
    activityTitle: string
    activitySubtitle: string
    description: string
    priceHowdyCoin: number
    minimumRequirements: string
    idDifficulty: number
    theoricalContentBlocks: TheoricalContentBlock[]
    teachingTopics: TeachingTopic[]
    questions: Question[]
}

interface ActivityImages {
    activityCoverPhoto?: any,
    afterTextImage1?: any,
    afterTitleImages?: any,
}


export default function ActivityBreakdown(props: ActivityBreakdownProps) {

    const [userLogged, setUserLogged] = useState<any>(null);

    const [activityContent, setActivityContent] = useState<any>(null);
    const [difficulties, setDifficulties] = useState<any>(null);
    const [isAlternativeCorrect, setIsAlternativeCorrect] = useState<boolean>(false);
    const [attachedPostImage, setAttachedPostImage] = useState<boolean>(false);
    
    const [topicsLearn, setTopicsLearn] = useState<TeachingTopic[]>([]);
    
    const [theoreticalContent,  setTheoreticalContent] = useState<TheoricalContentBlock[]>([]);
    const [questionContent,  setQuestionContent] = useState<Question[]>([]);
    const [alternativeContent,  setAlternativeContent] = useState<Alternatives[]>([]);
    const router = useRouter();

    const api = apiFunction();

    const theoricalBlockImageRef = useRef(null);

    
    useEffect(() => {

        api.get(`/difficulties`).then(response => {
            const responseData = response.data;
            setDifficulties(responseData);
        }
        ).catch(err => console.log(err))

    } , [router.isFallback]);

    function uploadImage() {
        setAttachedPostImage(false);

        const file = theoricalBlockImageRef.current.files[0];
        const fileReader = new FileReader();

        if (file) {
            fileReader.readAsDataURL(file);
        }

        fileReader.onloadend = () => {
            setAttachedPostImage(true);
        };
    }


    function sendActivity(){
                const formData = new FormData();
                //@ts-ignore
                const nameTeaching = document.getElementById('nameTeaching')?.value;
                //@ts-ignore
                const subtitle = document.getElementById('subtitle')?.value;
                //@ts-ignore
                const optionDifficulty = document.getElementById('optionDifficulty')?.value;
                //@ts-ignore
                const priceActivity = document.getElementById('priceActivity')?.value;
                //@ts-ignore
                const descriptionActivity = document.getElementById('descriptionActivity')?.value;
                //@ts-ignore
                const topicsTeaching = document.getElementById('topicsTeaching')?.value;

                console.log(topicsTeaching);
                //@ts-ignore
                const minimumRequirements = document.getElementById('minimumRequirements')?.value;

               
                const jsonData : ActivityJsonData = {
                    activityTitle: nameTeaching,
                    activitySubtitle: subtitle,
                    description: descriptionActivity,
                    priceHowdyCoin: parseInt(priceActivity),
                    minimumRequirements: minimumRequirements,
                    idDifficulty: parseInt(optionDifficulty),
                    theoricalContentBlocks: theoreticalContent,
                    teachingTopics: topicsLearn,
                    questions: questionContent,
                }

                if (theoricalBlockImageRef.current.files.length === 1 && attachedPostImage !== false)
                    formData.append('afterTitleImages', theoricalBlockImageRef.current.files[0]);

                const jsonDataFormatted = JSON.stringify(jsonData);
                formData.append('jsonData', jsonDataFormatted);

                console.log(jsonDataFormatted);
    
                api.post(`/activities`, formData).then(response => {
                    const responseData = response.data;
                    console.log("ffffffffff" + responseData);
                }
                ).catch(err => console.log(err))
        }
    
        if (router.isFallback) {
            return <Loading />;
        }
    
    

    function handleDeleteTopicLearn(idTopic: number) {
        let newTopicsLearn = [...topicsLearn];
        //@ts-ignore
        newTopicsLearn.splice(newTopicsLearn.indexOf(idTopic.toString()), 1);
        setTopicsLearn(newTopicsLearn);
    }

    function handleDeleteTheoreticalContent(idTheoreticalContent: number) {
        let newTheoreticalContent = [...theoreticalContent];
        //@ts-ignore
        newTheoreticalContent.splice(newTheoreticalContent.indexOf(idTheoreticalContent.toString()), 1);
        setTheoreticalContent(newTheoreticalContent);
    }

    function handleDeleteQuestionContent(idQuestionContent: number) {
        let newQuestionContent = [...questionContent];
        //@ts-ignore
        newQuestionContent.splice(newQuestionContent.indexOf(idQuestionContent.toString()), 1);
        setQuestionContent(newQuestionContent);
    }

    function handleDeleteAlternativeContent(idAlternativeContent: number) {
        let newAlternativeContent = [...alternativeContent];
        //@ts-ignore
        newAlternativeContent.splice(newAlternativeContent.indexOf(idAlternativeContent.toString()), 1);
        setAlternativeContent(newAlternativeContent);
    }

    console.log(activityContent?.theoricalContentBlocks[0]);
    
    return (
        <>
            <Head>
                <title>HOWDY - REALIZAÇÃO DA ATIVIDADE</title>
            </Head>

            <Input type="file" display="none" ref={theoricalBlockImageRef} onChange={uploadImage} />
           
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
                            id="nameTeaching"
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
                            id="subtitle"
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
                                id="optionDifficulty"
                                iconColor="howdyColors.mainBlue"
                                mb="5%"
                            >

                            {difficulties?.map((difficulty) => (
                                <option  >{difficulty.difficultyName}</option>
                            ))}
                                
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
                                    id="priceActivity"
                                    type="number"
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
                                id="descriptionActivity"
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
                                    id="topicsTeaching"
                                    onChange={(e) =>{
                                            let topicsLearnModified = [...topicsLearn]
                                            //@ts-ignore
                                            topicsLearnModified[index] = e.target.value
                                            setTopicsLearn(topicsLearnModified)
                                        }
                                    }
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
                                    onClick={() => setTopicsLearn([...topicsLearn, {
                                        teachingTopicText: ""}
                                    ])}
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
                                    onChange={(e) =>{
                                        let requirementsModified = [...topicsLearn]
                                        //@ts-ignore
                                        requirementsModified[index] = e.target.value
                                        setTopicsLearn(requirementsModified)
                                        }
                                    }
                                    id="minimumRequirements"
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
                                onChange={(e) =>setTheoreticalContent([{ 
                                    title:  e.target.value,
                                }])}
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
                                    cursor={'pointer'}
                                    borderRadius="10"
                                    onClick={() => {
                                        console.log(`Teste`);
                                        theoricalBlockImageRef.current.click();
                                    }}
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
                                    onClick={() => setTheoreticalContent([...theoreticalContent, {
                                        title: "",
                                        displayOrder: 0,
                                        text: "",
                                        afterTextOriginalImageLink: "",
                                        linkDaImagemTextoOriginal: "",
                                        afterTitleOriginalImageLink: "",
                                        linkDaImagemTítuloOriginal: ""
                                    }])}
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

                        {questionContent && questionContent.map((questions, index) => (
                            <Flex flexDir="column">
                                <Flex gap="4%">
                                    <Text
                                        color="howdyColors.mainBlue"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'x-large']}
                                        mb="5%"
                                    >
                                        Questão {index + 1}
                                    </Text>
                                    <IconButton
                                        variant="unstyled"
                                        aria-label="Open navigation"
                                        fontSize="30px"
                                        color="howdyColors.mainRed"
                                        onClick={() => {handleDeleteQuestionContent(index)}}
                                        icon={<Icon opacity="2" as={FaRegTrashAlt} fontWeight="black" />}
                                    />
                                </Flex>
                                   
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

                                {alternativeContent && alternativeContent.map((alternative, index) => (

                                    <Flex flexDir="column" w="100%">
                                        <Text
                                            color="howdyColors.mainBlack"
                                            fontWeight={'medium'}
                                            fontSize={['sm', 'md', 'large']}
                                            mb="2%"
                                            >
                                            * Alternativa {index + 1}
                                        </Text>
                                        <Flex mb="3%" justifyContent='center' width='100%'>
                                            <Input
                                                fontWeight="medium"
                                                name="passwordConfirm"
                                                placeholder="Alternativa"
                                                variant="filled"
                                                onChange={(e) =>setAlternativeContent([{ 
                                                    textContent: e.target.value
                                                }])}
                                                type="text"
                                                mb="3%"
                                            />
                                            {isAlternativeCorrect && alternativeContent.idAlternative === selectedAlternatives[indexQuestion] ? (
                                                <IconButton
                                                    variant="unstyled"
                                                    aria-label="Open navigation"
                                                    fontSize="40px"
                                                    color="howdyColors.mainWhite"
                                                    borderRadius="20px"
                                                    onClick={() => setIsAlternativeCorrect(false)}
                                                    icon={<Icon borderRadius="20px" opacity="2" bgColor="#0FA958" as={BsCheckCircle} fontWeight="black" />}
                                                />
                                            
                                                ): (
                                                    <IconButton
                                                        variant="unstyled"
                                                        aria-label="Open navigation"
                                                        fontSize="40px"
                                                        color="howdyColors.mainWhite"
                                                        borderRadius="20px"
                                                        onClick={() => setIsAlternativeCorrect(true)}
                                                        icon={<Icon borderRadius="20px" opacity="2" bgColor="#939393" as={BsCheckCircle} fontWeight="black" />}
                                                    />
                                                )
                                            }
                                            
                                            <IconButton
                                                variant="unstyled"
                                                aria-label="Open navigation"
                                                fontSize="30px"
                                                color="howdyColors.mainRed"
                                                onClick={() => {handleDeleteAlternativeContent(index)}}
                                                icon={<Icon opacity="2" as={FaRegTrashAlt} fontWeight="black" />}
                                            />
                                        </Flex>
                                    </Flex>
                                ))}

                            <Flex mb="3%"  gap="1%"  alignItems="center" >
                                <IconButton
                                    variant="unstyled"
                                    aria-label="Open navigation"
                                    fontSize="30px"
                                    color="howdyColors.mainWhite"
                                    bgColor={'howdyColors.mainBlue'}
                                    borderRadius="10px 0px 0px 10px"
                                    onClick={() => setAlternativeContent([...alternativeContent, {
                                        textContent: "",
                                        isCorrect: null,
                                        idAlternative: 0
                                    }])}
                                    icon={<Icon opacity="2" as={AiOutlinePlus} fontWeight="black" />}
                                />
                                <Text
                                    color="howdyColors.mainBlack"
                                    fontWeight={'medium'}
                                    fontSize={['sm', 'md', 'large']}
                                >
                                    {alternativeContent.length}/6
                                </Text>
                            </Flex>

                            <Box bg="howdyColors.divider" h="1px" w="100%"  mb="30" />

                            </Flex>
                        ))}
                        
                    </Flex>

                    <Flex mx="10%" gap="1%" mb="5%" alignItems="center" >
                        <IconButton
                            variant="unstyled"
                            aria-label="Open navigation"
                            fontSize="30px"
                            color="howdyColors.mainWhite"
                            bgColor={'howdyColors.mainBlue'}
                            borderRadius="10px 0px 0px 10px"
                            onClick={() => setQuestionContent([...questionContent, {
                                statement: "",
                                alternatives: [{
                                    textContent: "",
                                    isCorrect: null,
                                    idAlternative: 0
                                }]
                            }])}
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
                    <Flex px='10%' py='5%' w="100%" justifyContent="flex-end">
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            w="20%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            onClick={sendActivity}
                        >
                            <Text>CONCLUIR</Text>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Footer /> */}
        </>
    )
}
