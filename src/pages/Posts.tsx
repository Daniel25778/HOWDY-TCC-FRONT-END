import { Header } from '../components/Header/Header';
import Post from '../components/Post/Post';
import { useRouter } from 'next/router';
import { api as apiFunction } from '../services/api';
import { useEffect, useRef, useState } from 'react';
import { getUserLogged } from '../functions/getUserLogged';
import Loading from '../components/Loading/Loading';
import { Button, Flex, Image, Input, List, Menu, MenuButton, MenuItem, MenuList, Select, Text,useToast } from '@chakra-ui/react';
import { MdOutlineCategory } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsCamera, BsPeople } from 'react-icons/bs';
import Head from 'next/head';

import ListFriends from '../components/Friends/ListFriends';

interface PostsProps {
    idUser: string;
}

export default function Posts(props: PostsProps) {
    const router = useRouter();
    if (router.isFallback) {
        return <Loading />;
    }

    const [userLogged, setUserLogged] = useState<any>(null);
    const toast = useToast();

    const api = apiFunction();

    const [posts, setPosts] = useState<any>([]);

    const [category, setCategory] = useState<any>('popular');

    const [categoryList, setCategoryList] = useState<any[]>([]);

    const [friendsList, setFriendsList] = useState<any[]>([]);

    const [attachedPostImage, setAttachedPostImage] = useState<boolean>(false);
    const postImageRef = useRef(null);

    useEffect(() => {
        getUserLogged(api).then((userLogged) => {
            if (userLogged) {
                setUserLogged(userLogged);

                //Pegar amigos do usuario atraves do id
                api.get(`friendships/getAllSomeoneFriends/${userLogged.idUser}`).then((response) => {
                    if (response.data?.error) setFriendsList([]);
                    else if (response.data) setFriendsList(response.data);
                });
            }
        });
    }, []);

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar categorias das postagens
            api.get(`postCategories`)
                .then((response) => {
                    setCategoryList(response.data);
                })
                .catch((err) => console.log('err category list'));

            //Pegar postagens atraves da categoria

            api.get(`posts/category/${category}`)
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((err) => console.log(err));
        }
    }, [category, router.isFallback]);

    function uploadImage() {
        setAttachedPostImage(false);

        const file = postImageRef.current.files[0];
        const fileReader = new FileReader();
    
        if (file) {
          fileReader.readAsDataURL(file);
        }
    
        fileReader.onloadend = () => {
            setAttachedPostImage(true);
        }
    }

    function sendPost(e) {
        e.preventDefault();
        const inputDescriptionPost = document.getElementById('descriptionPost-input')?.value;
        const selectCategoryPost = document.getElementById('categoryPost-select')?.value;
        const selectVisibility = document.getElementById('visibility-select')?.value
        console.log(inputDescriptionPost, selectCategoryPost, selectVisibility);
        const formData = new FormData();
        if(postImageRef.current.files.length === 1 && attachedPostImage !== false) 
        
        formData.append("imageContent", postImageRef.current.files[0]);
        formData.append("textContent", inputDescriptionPost);
        console.log(selectCategoryPost)
        switch (selectCategoryPost) {
            case 'Esportes':
                formData.append("idPostCategory", "1");
                break
            case 'Notícias':
                formData.append("idPostCategory", "2");
                break
            case 'Jogos':
                formData.append("idPostCategory", "3"); 
                break
            case 'Filmes':
                formData.append("idPostCategory", "4");
                break
            case 'Moda':
                formData.append("idPostCategory", "5");
                break
            case 'Dúvidas':
                formData.append("idPostCategory", "6"); 
                break
        }
        formData.append("isPublic", selectVisibility);

        api.post(`posts`, formData).then((response) => {
            console.log('res', response);
        }).catch((error) =>{
        switch(error.response.data.error){
            case 'The text is not written according to the language you want to learn':
                toast({
                    title: 'A DESCRIÇÃO DA POSTAGEM DEVE SER ESCRITA NA SUA LÍNGUA DE INTERESSE',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                }); 
            break;
        }
        });
    }
        

    return (
        <>
            <Head>
                <title>HOWDY - POST PAGE</title>
            </Head>

            <Header user={userLogged} />

            <Flex mt="6.5%" justifyContent="center" width="100%" py="8%">
                <Flex width="15%" p="1%" gap="20">
                    <List size="100%">
                        <Text fontWeight="bold" marginBottom={5}  fontSize={['x-small', 'medium', 'x-large']}>
                            Categorias
                        </Text>
                        <Button
                            width="90%"
                            onClick={() => setCategory('myFriends')}
                            marginBottom={5}
                            bgColor={'white'}
                            textColor="#303135"
                            fontWeight="medium"
                            fontSize={['x-small', 'medium', 'x-large']}
                        >
                            Amigos
                        </Button>
                        <Button
                            width="90%"
                            onClick={() => setCategory('popular')}
                            marginBottom={5}
                            bgColor={'white'}
                            color="#303135"
                            fontWeight="medium"
                            fontSize={['x-small', 'medium', 'x-large']}
                        >
                            Popular
                        </Button>
                        {categoryList.length > 0 &&
                            categoryList.map((category) => (
                                <Button
                                    onClick={() => setCategory(category.idPostCategory)}
                                    marginBottom="10%"
                                    bgColor={'white'}
                                    textColor="#303135"
                                    fontWeight="light"
                                    w="100%"
                                >
                                    <Image mr="20%" width="15%" src={category.iconImage} />
                                    <Text fontSize={['x-small', 'medium', 'x-large']}>{category.categoryName}</Text>
                                </Button>
                            ))}
                    </List>
                </Flex>

                <Flex width="70%" align="center" flexDir="column">
                    <Flex
                        boxShadow={'md'}
                        flexDir="column"
                        bgColor="#FFFF"
                        p="1%"
                        width="60%"
                        borderRadius="20"
                        h="12rem"
                    >
                        <Flex mb="5%" align="center" gap="2%" width="100%">
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
                                type="text"
                                fontSize={['x-small', 'medium', 'x-large']}
                                placeholder="Write in English about whatever you want!"
                                borderRadius="100"
                                id='descriptionPost-input'
                            />
                        </Flex>

                        <Flex w="100%" gap="3">
                            <Input
                                type="file"
                                display="none"
                                ref={postImageRef}
                                onChange={uploadImage}
                            />

                            <Select id="categoryPost-select" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} variant='filled' placeholder='Categoria'>
                                    {categoryList.length > 0 &&
                                        categoryList.map((category) => (
                                        <option>{category.categoryName}</option>
                                    ))} 
                            </Select>

                            <Select id="visibility-select" fontWeight="medium" fontSize={['medium', 'large', 'x-large']} variant='filled' placeholder='Visibilidade'>
                                <option value='true'>Público</option>
                                <option value='false'>Privado</option>
                            </Select>
                    
                            <Button
                                onClick={() => {
                                console.log(`Teste`)
                                postImageRef.current.click();
                                }}> 
                                {<BsCamera color="#2EC4F3" size="5rem" />}
                            </Button>

                            <Button fontSize={['medium', 'large', 'x-large']} bgColor="howdyColors.mainBlue" textColor={'howdyColors.mainWhite'} w="100%" onClick={sendPost}>
                                Postar
                            </Button>
                        </Flex>
                    </Flex>

                    {/* we are young */}

                    <Flex width="100%" flexDir="column">
                        {posts.length > 0 &&
                            posts.map((post) => {
                                return (
                                    <Post
                                        userLogged={userLogged}
                                        key={post.id}
                                        post={post}
                                        userCreator={post.userCreator}
                                    />
                                );
                            })}
                    </Flex>
                </Flex>

                <Flex flexDir="column" p="1%" bgColor="#29B995" h="70%" width="15%">
                    <Flex alignItems="center" width="50%" h="20%" justify="center">
                        <Text fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']}>
                            Amigos{' '}
                        </Text>
                        <BsPeople size="40%" />
                    </Flex>
                    {friendsList.length > 0 &&
                        friendsList.map((friend) => (
                            <ListFriends
                                key={friend.id}
                                friendName={friend.userName}
                                friendProfilePhoto={friend.profilePhoto}
                            />
                        ))}
                </Flex>
            </Flex>
        </>
    );
}
