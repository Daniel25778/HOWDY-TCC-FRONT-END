import { Header } from '../components/Header/Header';
import Post from '../components/Post/Post';
import { useRouter } from 'next/router';
import { api as apiFunction } from '../services/api';
import { useEffect, useRef, useState } from 'react';
import { getUserLogged } from '../functions/getUserLogged';
import Loading from '../components/Loading/Loading';
import { Box, Button, Flex, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, List, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { BsCamera, BsPeople } from 'react-icons/bs';
import Head from 'next/head';

import ListFriends from '../components/Friends/ListFriends';

import { parseCookies } from 'nookies';

import socket from '../services/sockeio';
import Message from '../components/Message/Message';
import { AiFillStar, AiOutlineSend } from 'react-icons/ai';
import { log } from 'console';
import { FaHeart, FaRegStar } from 'react-icons/fa';
import  IoCloseSharp, { IoMdClose }  from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { VscChromeClose } from 'react-icons/vsc';
import CreatePost from '../components/CreatePost/CreatePost';

interface PostsProps {
    idUser: string;
}

interface Message {
    idMessage: number;
    textContent: string;
    createdAt: string;
    readAt: string;
    idUserSender: number;
    idUserReceiver: number;
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
    const [dysplayBoxChat, setDysplayBoxChat] = useState<string>('none');
    const [friendForChat, setFriendForChat] = useState<any>(null);
    const [isChatBlockOpen, setIsChatBlockOpen] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    

    const [messages, setMessages] = useState<Message[]>([]);

    socket.on('receivedMessage', (message) => {
        setMessages([...messages, message]);
    });

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
    

    

    function handleOpenChatBox(selectedFriend) {

        console.log(userLogged)
        //@ts-ignore
        if(userLogged.isPro) {
            setFriendForChat(selectedFriend)
            setDysplayBoxChat('flex');
            setIsChatBlockOpen(true)
            console.log(selectedFriend);
    
            api.get(`messages/${selectedFriend.idUser}`)
            .then((response) => {
                setMessages(response.data);
    
                console.log("MESSAGE")
                console.log(response.data)
                console.log(messages)
            })
            .catch((err) => console.log(err));
        }else{
            onOpen()
        } 
    }

    function handleSendMessage(friend){
        const cookies = parseCookies();
        //@ts-ignore
        const valueTypedByUser = document.getElementById('sendMessage-input')?.value;

        
        var messageObject: any = {
            idUserReceiver: friend.idUser,
            message: valueTypedByUser,
            idToken: cookies['firebaseAccount'],
        };

        socket.emit('sendMessage', messageObject);
        
    }

    function handleCloseChat() {
        setIsChatBlockOpen(false)
        setDysplayBoxChat("none");
    }

    function handleAccessStore() {
        router.push('/StorePage');
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
                        <Text fontWeight="bold" marginBottom={5} fontSize={['x-small', 'medium', 'x-large']}>
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
                            leftIcon={<AiFillStar color="#FFD700" size="2.6rem"/>}
                            paddingBottom="1rem"
                            justifyContent="space-around"
                            marginStart="1rem"
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
                            leftIcon={<FaHeart color="#FA383E" size="2rem"/>}
                            paddingBottom="1rem"
                            justifyContent="space-around"
                            marginStart="1rem"
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

                <Modal  isCentered  isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay bgColor="#3030303" />
                    <ModalContent bgColor="howdyColors.mainBlack" alignItems="center">
                        <ModalHeader >
                        <Image
                            width={100}
                            objectFit="cover"
                            
                            src="/images/illustrations/Vector.svg"
                            alt="howdy logo"
                        />
                        </ModalHeader>
                        <ModalCloseButton />
                        {/* @ts-ignore */}
                        <ModalBody  justifyContent="center" align="center">
                            <Text color="howdyColors.mainWhite" mb="5%" fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']} >Apenas quem é PRO pode acessar!</Text>
                            <Text  color="howdyColors.mainWhite" fontSize={['sm', 'medium', 'large']} >Desbloqueie esta função adquirindo a assinatura!</Text>
                        </ModalBody>

                        <ModalFooter gap="5%">
                            <Button onClick={handleAccessStore} color="howdyColors.mainGreen" bgColor='howdyColors.mainGreenTransparent' >DESBLOQUEAR</Button>
                            <Button bgColor="howdyColors.mainRedTransparent" onClick={onClose} mr={3} >
                                <VscChromeClose color="#FA383E"/>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Flex width="70%" align="center" flexDir="column">
                    
                    <Flex justifyContent="center" align="center" width="100%">
                        <CreatePost/>
                    </Flex>

                    {/* we are young */}

                    <Flex  width="100%" flexDir="column">
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

                <Flex bottom="0" right="20%" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" flexDir="column" borderRadius="50px"  p="1.5%"  w="21%" bgColor="howdyColors.mainWhite" position="fixed" display={dysplayBoxChat}>
                    <Flex justifyContent="flex-end" width="100%"> 
                        <Button
                        
                            onClick={handleCloseChat}
                            >
                            {<IoMdClose  size="2rem" />}
                        </Button>
                    </Flex>
                    
                    <Flex gap="5%" align="center" w="50%">
                        <Image 
                            borderRadius="100%"
                            h="4rem"
                            w="4rem"
                            objectFit="cover" src={friendForChat?.profilePhoto}>
                        </Image>
                        <Text fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']}>{friendForChat?.userName}</Text>
                    </Flex>
                    <Box bg="howdyColors.divider" h="1px" w="100%" mb="10" mt="5" />
                    <Flex  w="100%" >
                        <Flex align={'flex-end'} w="100%" flexDir="column">
                            {
                                messages.length > 0 && messages.map((message) => 
                                    
                                    <Message userLogged={userLogged} message={message} />
                                    
                            )}
                        </Flex>
                    </Flex>
                    

                    <Flex justifyContent='space-between' width="100%">
                        <InputGroup  width="90%" variant="filled">
                            <Input
                                px="2%"
                                borderColor="howdyColors.mainBlack"
                                name="search"
                                placeholder="Digite aqui..."
                                type="text"
                                focusBorderColor="howdyColors.mainWhite"
                                borderRadius="100px 100px 100px 100px"
                                id="sendMessage-input"
                                
                                variant={'outline'}
                            >
                            </Input>

                        </InputGroup>

                        <IconButton
                            variant="unstyled"
                            aria-label="Open navigation"
                            fontSize="2rem"
                            onClick={() => handleSendMessage(friendForChat)}
                            borderRadius="0px 15px 15px 0px"
                            color="howdyColors.mainBlue"
                            icon={<Icon opacity="2" as={AiOutlineSend} fontWeight="black" />}
                        />
                    </Flex>       
                </Flex>

                <Flex flexDir="column" p="1%"  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"  h="70%" width="15%">
                    <Flex alignItems="center" width="50%" h="20%" justify="center">
                        <Text fontWeight="medium" fontSize={['sm', 'medium', 'xx-large']}>
                            Amigos{' '}
                        </Text>
                        <BsPeople size="40%" />
                    </Flex> 
                    
                    {friendsList.length > 0 &&
                        friendsList.map((friend) => (
                            <ListFriends
                                onClick={() => handleOpenChatBox(friend)}
                                key={friend.idUser}
                                friendName={friend.userName}
                                friendProfilePhoto={friend.profilePhoto}
                            />
                        ))}
                </Flex>
            </Flex>
        </>
    );
}
