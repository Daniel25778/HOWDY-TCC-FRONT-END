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
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
interface PostsProps {
    idUser: string;
}

export default function Posts(props:PostsProps){

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;
    console.log(idUser);

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [posts, setPosts] = useState<any>('nulo');

    const [category, setCategory] = useState<any>('nulo');

    const [categoryList, setCategoryList] = useState<any>('nulo');



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

            console.log(categoryList)
           

            //Pegar usuario atraves do id

            // api.get(`users/${idUser}`).then(response => {
            //     response.data && setUser(response.data[0]);
            // });

            //Pegar postagens atraves da categoria

            api.get(`posts/category/${category}`).then(response => {
                if(response.status === undefined) return setPosts([]);
                if(response.data?.error) setPosts([]);
                else if(response.data) setPosts(response.data);
                
            }).catch(err => {
                if (err.response.status === 404) {
                    setPosts([]);
                }
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

            <Header user={userLogged}></Header>

            <Flex align="flex-start" marginInlineStart={85} marginBlockStart={245} flexDir={"column"} h="20%" w="6%" gap="5">
       		
            <List size="100%">
            <Text fontWeight="bold" marginBottom={5} >Categorias</Text>
                 {
                     categoryList !== 'nulo' && categoryList.map(categoryList => (
                        <Button onClick={()=>setCategory(categoryList.idPostCategory)}  marginBottom={5} w="100%" bgColor={"white"}  textColor="#303135" fontWeight="medium"  justifyContent="space-between" textAlign="start"><Image src={categoryList.iconImage}></Image>{categoryList.categoryName}</Button>
                    ))
                }
                
                 <Button onClick={()=>setCategory("myFriends")}  marginBottom={5} w="100%" bgColor={"white"} textColor="#303135" fontWeight="medium" justifyContent="space-between" textAlign="start">Amigos</Button>
        
                 <Button onClick={()=>setCategory("popular")} marginBottom={5} w="100%" bgColor={"white"} color="#303135" fontWeight="medium"  justifyContent="space-between"  textAlign="start">Popular</Button>

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

        <Flex  flexDir="column" h="25vh" marginTop={11} marginInlineStart="222">
                {
                    posts !== 'nulo' && posts.map(post => (
                        <Post key={post.id} userPosts={post} user={post.userCreator} />
                        
                    ))
                }
               {console.log(posts) }
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

