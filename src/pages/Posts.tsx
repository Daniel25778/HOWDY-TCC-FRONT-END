import { Header } from "../components/Header/Header";
import Post from "../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../functions/getUserLogged";
import Loading from "../components/Loading/Loading";
import { Box, Button, Flex, Image, Input, InputGroup, List, Menu, MenuButton, Stack, Text } from "@chakra-ui/react";
import { FaBook, FaRegStar } from "react-icons/fa";
import { MdOutlineCategory, MdOutlineSportsHandball } from "react-icons/md";
import { IoIosFitness, IoMdArrowDropdown, IoMdBook } from "react-icons/io";
import { AiFillStar, AiOutlineGlobal, AiOutlineTag } from "react-icons/ai";
import { BsCamera, BsHeartFill, BsPeople } from "react-icons/bs";
import { GiTransparentSlime } from "react-icons/gi";
import { Scrollbar } from "swiper";
import Head from "next/head";

import { GetStaticPaths, GetStaticProps } from "next";
import ListFriends from "../components/Friends/ListFriends";

interface PostsProps {
    idUser: string;
}

export default function Posts(props:PostsProps){

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter(); 
   

    const api = apiFunction();
    
    const [posts, setPosts] = useState<any>([]);

    const [category, setCategory] = useState<any>('popular');

    const [categoryList, setCategoryList] = useState<any[]>([]);

    const [friendsList, setFriendsList] = useState<any[]>([]);

    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);

                //Pegar amigos do usuario atraves do id
                api.get(`friendships/getAllSomeoneFriends/${res.idUser}`).then(response => {
                    if(response.data?.error) setFriendsList([]);
                    else if(response.data) setFriendsList(response.data);
                })
            });

            //Pegar categorias das postagens
            api.get(`postCategories`).then(response => {
                setCategoryList(response.data);
            }).catch(err=> console.log('err category list'))

            //Pegar postagens atraves da categoria

            api.get(`posts/category/${category}`).then(response => {
                setPosts(response.data);
            }).catch(err => console.log(err))
           
        }
    } , [category, router.isFallback]);
    
    if (router.isFallback) {
        return (
            <Loading />
        )
      }
    return (
        <> 

            <Head>
                <title>HOWDY - POST PAGE</title>
            </Head>

            <Header user={userLogged}/>

            <Flex mt="6.5%" justifyContent="center" width="100%" py="8%">

                <Flex width="8%" p="1%" gap="20">
                
                    <List size="100%">
                        <Text fontWeight="bold" marginBottom={5} fontSize ={['sm', 'x-small', 'medium']} >Categorias</Text>
                        <Button 
                            width="90%" 
                            onClick={()=>setCategory("myFriends")}  
                            marginBottom={5} 
                            bgColor={"white"} 
                            textColor="#303135" 
                            fontWeight="medium" 
                            fontSize ={['sm', 'x-small', 'medium']}>
                                Amigos
                        </Button>
                        <Button  
                            width="90%" 
                            onClick={()=>setCategory("popular")}
                            marginBottom={5}  
                            bgColor={"white"} 
                            color="#303135" 
                            fontWeight="medium"
                            fontSize ={['sm', 'x-small', 'medium']} >
                                Popular
                         </Button>
                        {
                            categoryList.length > 0 && categoryList.map(category => (
                                <Button 
                                justifyContent={"space-between"} 
                                width="90%" 
                                onClick={()=>setCategory(category.idPostCategory)}
                                marginBottom={5}  
                                bgColor={"white"}  
                                textColor="#303135" 
                                fontWeight="medium" >
                                    <Image width="25%" src={category.iconImage}/>
                                    <Text  fontSize ={['sm', 'x-small', 'medium']}>{category.categoryName}</Text>
                                </Button>
                            ))
                        }
                            
                    </List>
            
                </Flex>

                <Flex width="70%"  align="center" flexDir="column">
                    <Flex boxShadow={"md"} flexDir="column" bgColor="#FFFF" p="1%" width="40%" borderRadius="20" h="12rem"  >
                        <Flex mb="5%" align="center" gap="2%"  width="100%">
                            <Image
                                borderRadius="100%"
                                h="4rem"
                                w="4rem"
                                objectFit="cover"
                                src={
                                    userLogged?.profilePhoto
                                        ? userLogged?.profilePhoto
                                        : '/images/default-images/default-profile-photo.svg'
                                }
                                alt="profilePhoto"
                            ></Image>
                            <Input 
                                width="100%" 
                                variant="filled" 
                                placeholder='Write in English about whatever you want!' 
                                borderRadius="100" />
                        </Flex>
                    
                        <Flex  flexDir={"row"} gap="3">
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

                    <Flex width="100%" flexDir="column">
                            {
                                posts.length > 0 && posts.map(post => {
                                    return (
                                    <Post userLogged={userLogged} key={post.id} post={post} userCreator={post.userCreator} />)
                                })
                            }
                    </Flex>
                </Flex>

                <Flex flexDir="column" p="1%" bgColor="#29B995" h="70%" width="15%">
                    <Flex alignItems="center" width="50%" h="20%" justify="center">
                        <Text fontWeight="medium" fontSize ={['sm', 'medium', 'xx-large']}>Amigos </Text>
                        <BsPeople size="40%"/>
                        
                    </Flex>
                    {
                            friendsList.length > 0 && friendsList.map(friend => (
                                <ListFriends key={friend.id} friendName={friend.userName} friendProfilePhoto={friend.profilePhoto} />
                            ))
                        }
                </Flex>

                

            </Flex>
        </>
    )
}
