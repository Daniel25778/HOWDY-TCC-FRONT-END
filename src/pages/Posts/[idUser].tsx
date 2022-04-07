import { Header } from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../../functions/getUserLogged";
import Loading from "../../components/Loading/Loading";
import { Button, Flex, Image, Input, InputGroup, List, Menu, MenuButton, Stack, Text } from "@chakra-ui/react";
import { FaBook, FaRegStar } from "react-icons/fa";
import { MdOutlineCategory, MdOutlineSportsHandball } from "react-icons/md";
import { IoIosFitness, IoMdArrowDropdown, IoMdBook } from "react-icons/io";
import { AiFillStar, AiOutlineGlobal, AiOutlineTag } from "react-icons/ai";
import { BsCamera, BsHeartFill } from "react-icons/bs";
import { GiTransparentSlime } from "react-icons/gi";
import { Scrollbar } from "swiper";
interface PostsProps {
    idUser?: string;
}

export default function Posts(props:PostsProps){

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [userPosts, setUserPosts] = useState<any>('nulo');
    

    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then(response => {
                response.data && setUser(response.data[0]);
            });

            //Pegar postagens do usuario atraves do id

            api.get(`posts/user/${idUser}`).then(response => {
                response.data && setUserPosts(response.data[0]);
            })


        }
    } , [router.isFallback]);
    
    if (router.isFallback) {
        return (
            <Loading />
        )
      }


    return (
        <> 

            

            <Header user={userLogged}></Header>

            <Flex align="flex-start" marginInlineStart={85} marginBlockStart={245} flexDir={"column"} h="20%" w="6%" gap="5">
       		
            <List size="100%">
            <Text fontWeight="bold" marginBottom={5} >Categorias</Text>
            
                 <Button marginBottom={5} w="100%" bgColor={"white"} textColor="#303135" fontWeight="medium" leftIcon={<AiFillStar color="#FFD700" size="1.5rem"/>} justifyContent="space-between" textAlign="start">Amigos</Button>
        
                 <Button marginBottom={5} w="100%" bgColor={"white"} color="#303135" fontWeight="medium" leftIcon={<FaBook color="#FF7628" size="1.5rem"/>} justifyContent="space-between" textAlign="start">Dúvidas</Button>

                 <Button marginBottom={5} w="100%" bgColor={"white"} color="#303135" fontWeight="medium" leftIcon={<BsHeartFill color="#FA383E" size="1.5rem"/>} justifyContent="space-between"  textAlign="start">Popular</Button>

                 <Button marginBottom={5} w="100%" bgColor={"white"} color="#303135" fontWeight="medium" leftIcon={<MdOutlineSportsHandball color="#0AD2AE" size="1.5rem"/>} justifyContent="space-between"  textAlign="start">Esportes</Button>
            
            
               
            </List>
            
        </Flex>


           
           

        <Flex align="center" flexDir="column" p="5%" width="100%" justify="center" borderRadius="20" h="15vh" marginTop={-299} marginX="950" bgColor={"gray.200"} w="25%" >
        <Image
                                marginRight={505}
                                marginBottom={-10}
                                marginY="-50"
                                marginTop={15}
                                borderRadius="100%"
                                h="4rem"
                                w="4rem"
                                objectFit="cover"
                                src={
                                    user?.profilePhoto
                                        ? user.profilePhoto
                                        : '/images/default-images/default-profile-photo.svg'
                                }
                                alt="howdy coin"
                            ></Image>
            <Stack spacing={3}>
                <Input width={480} variant="filled" marginInlineStart="90" marginBottom="60px" placeholder='Write in English about whatever you want!' borderRadius="100" h="4vh"></Input>
            </Stack>
            
            
            <Flex flexDir={"row"} gap="3">
            <Menu size="100%" colorScheme={"gray"}>
            <MenuButton>
                <Button  w="110%"  fontWeight="medium" leftIcon={<MdOutlineCategory color="#29B995" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>*Categoria</Button>
            </MenuButton>

            <MenuButton>
                <Button  w="95%"  fontWeight="medium" leftIcon={<AiOutlineGlobal color="#A06BD4" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>*Visibilidade</Button>
            </MenuButton>

            <MenuButton>
            <Button w="80%" fontWeight="medium" leftIcon={<BsCamera color="#2EC4F3" size="1.5rem"/>} justifyContent="space-between" px="5" rightIcon={<IoMdArrowDropdown/>} textAlign="start"></Button>
            </MenuButton>
           

            </Menu>
            <Button bgColor='howdyColors.mainBlue' textColor={'howdyColors.mainWhite'} w="100%">Postar</Button>
            </Flex>


        </Flex>

        <Flex h="25vh" marginTop={11} marginInlineStart="222">
            <Post user={user}userPosts={userPosts}></Post>
            </Flex>
        
        </>
    )
}