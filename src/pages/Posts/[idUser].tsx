import { Header } from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../../functions/getUserLogged";
import Loading from "../../components/Loading/Loading";
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
import ListFriends from "../../components/Friends/ListFriends";
interface PostsProps {
    idUser: string;
}

export default function Posts(props:PostsProps){

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    let idPost = 0;

    const { idUser } = props;
   

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [posts, setPosts] = useState<any>('nulo');

    const [category, setCategory] = useState<any>('nulo');

    const [categoryList, setCategoryList] = useState<any>('nulo');

    const [userFriends, setUserFriends] = useState<any>('nulo');

    const [postComments, setPostComments] = useState<any>('nulo');



    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });



            //Pegar categorias das postagens 

            api.get(`postCategories`).then(response => {
                if(response.data?.error) setCategoryList([]);
                else if(response.data) setCategoryList(response.data);
            }).catch(err=> console.log('err aaa'))


           //Pegar amigos do usuario atraves do id

           api.get(`friendships/getAllSomeoneFriends/${idUser}`).then(response => {
                console.log(response.data)
                if(response.data?.error) setUserFriends([]);
                else if(response.data) setUserFriends(response.data);
                console.log(response.data)
            })

            //Pegar usuario atraves do id

            // api.get(`users/${idUser}`).then(response => {
            //     response.data && setUser(response.data[0]);
            // });

            //Pegar postagens atraves da categoria

            api.get(`posts/category/${category}`).then(response => {
                setPosts(response.data);
            }).catch(err => console.log(err))

            //Pegar comentarios atraves do id da postagem
            console.log('posts', posts)
            posts !== 'nulo' && posts.map(post => {
                console.log('before')
                api.get(`posts/commentary/${post.idPost}`).then(response => {
                    console.log('response', response.data)
                setPostComments(response.data);
                }).catch(err => console.log(err))
            })
           
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
                            categoryList !== 'nulo' && categoryList.map(categoryList => (
                                <Button 
                                justifyContent={"space-between"} 
                                width="90%" 
                                onClick={()=>setCategory(categoryList.idPostCategory)}  
                                marginBottom={5}  
                                bgColor={"white"}  
                                textColor="#303135" 
                                fontWeight="medium" >
                                    <Image width="25%" src={categoryList.iconImage}/>
                                    <Text  fontSize ={['sm', 'x-small', 'medium']}>{categoryList.categoryName}</Text>
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
                                posts !== 'nulo' && posts.map(post => {
                                    idPost = post.idPost;
                                    console.log(idPost)
                                    return (
                                    <Post key={post.id} commentary={postComments} userPosts={post} user={post.userCreator} />)
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
                            userFriends !== 'nulo' && userFriends.map(friend => (
                                <ListFriends key={friend.id} friendName={friend.userName} friendProfilePhoto={friend.profilePhoto} />
                            ))
                        }
                </Flex>

                

            </Flex>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idUser } = params;

    return {
        props: { idUser },
    };
};

