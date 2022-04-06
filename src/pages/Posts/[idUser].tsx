import { Header } from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../../functions/getUserLogged";
import Loading from "../../components/Loading/Loading";
import { Button, Flex, Image, Input, InputGroup, Menu, MenuButton, Stack } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import { GiTransparentSlime } from "react-icons/gi";
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

           
           

        <Flex align="center" flexDir="column" p="5%" width="100%" justify="center" borderRadius="20" h="15vh" marginTop={233} marginX="950" bgColor={"gray.200"} w="25%" >
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
            <Button bgColor='howdyColors.mainBlue' textColor={'howdyColors.mainWhite'} w="101%">Postar</Button>
            </Flex>


        </Flex>

        <Flex h="25vh" marginTop={33} marginInlineStart="222">
            <Post user={user}userPosts={userPosts}></Post>
            </Flex>
        
        </>
    )
}