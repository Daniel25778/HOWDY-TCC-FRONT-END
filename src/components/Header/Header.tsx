import {
    Box,
    Button,
    Center,
    Flex,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useToast,
} from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FiSearch } from 'react-icons/fi';
import { FaRegBell } from 'react-icons/fa';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';
import { NavLink } from '../NavLink/Header/NavLink';
import Router, { useRouter } from 'next/router';
import { logOut } from '../../functions/logOut';
import { useEffect, useState } from 'react';
import { api as apiFunction } from '../../services/api';
import socket from '../../services/sockeio';
import Notification from '../Notification/Notifiction';


interface Notification {
    idNotification: number;
    notificationText: string;
    wasRead: boolean;
    createdAt: string;
    idNotificationType: number;
    idUserSender: number;
    idUserReceiver: number;
    type: string;
    userSenderName: string;
    userSenderProfilePhoto: string;
}
interface HeaderProps {
    user?: any;
}

export function Header({ user }: HeaderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [dysplayBoxNotification, setDysplayBoxNotification] = useState<string>('none');
    const [isNotificationBlockOpen, setIsNotificationBlockOpen] = useState<boolean>(false);

    let api = apiFunction();

    const toast = useToast();
    const router = useRouter();

    //Requisição para pegar as notificações
    useEffect(() => {
        api.get('/notifications')
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {});
    }, []);

    socket.on('receivedNotification', (notification) => {
        console.log("ffff",notifications);
        setNotifications([...notifications, notification]);
    });

    function handleOpenNotificationsBox() {
        setDysplayBoxNotification('flex');
        setIsNotificationBlockOpen(true)
        api.put('/notifications/read')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {});
    }

    function handleRedirectUserConfig() {
        Router.push('/PageUserConfig');
    }

    function handleRedirectToHowdyStore() {
        Router.push('/StorePage');
    }

    function handleRedirectProfile() {
        Router.push(`/UserPage/Post/${user.idUser}`);
    }

    function handleCloseNotifications() {
        setIsNotificationBlockOpen(false)
        setDysplayBoxNotification("none");
        const notificationsRead:Notification[] = [...notifications].map((notification) => {
            notification.wasRead = true;
            return notification;
        })
        setNotifications(notificationsRead);
    }

    function handleRedirectLandingPage() {
        Router.push('/');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        //@ts-ignore
        const value = document.getElementById('search-input')?.value;
        Router.push(`/SearchPage/${value}`);
    };
    return (
        <Flex
            position="fixed"
            zIndex="10"
            as="header"
            top="0"
            left="0"
            w="100%"
            justify="center"
            h="7rem"
            bg="howdyColors.mainBlue"
        >
            <Flex position="relative" top="0" left="0" w="100%" pl="15%" pr="7%" h="5rem" align="center">
                <Flex width="100%" align="center" px="10" justify="space-between">
                    <Flex>
                        <Flex as="form" onSubmit={handleSearch}>
                            <Box marginRight="5">
                                <Button type="submit" variant={'ghost'}>
                                    <FiSearch size={30} color="#F2F2F2" />
                                </Button>
                            </Box>
                            <InputGroup width="35vw" variant="filled">
                                <Input
                                    bg="howdyColors.main"
                                    name="search"
                                    placeholder="Descubra pessoas ou atividades..."
                                    type="text"
                                    focusBorderColor="howdyColors.mainWhite"
                                    borderRadius="0px 100px 100px 0px"
                                    id="search-input"
                                    variant={'filled'}
                                />
                            </InputGroup>
                        </Flex>
                    </Flex>

                    <Flex ml={5} align="center" width="45%" height="70">
                        <Flex gap="5" borderRadius="60px" bg="howdyColors.mainYellow" align="center">
                            <Image
                                height="2.5rem"
                                src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                                alt="howdy coin"
                            ></Image>
                            <Text fontWeight="semibold" color="howdyColors.brownHowdyCoin">
                                {user?.howdyCoin}
                            </Text>
                            <IconButton
                                variant="unstyled"
                                aria-label="Open navigation"
                                fontSize="2rem"
                                bg="howdyColors.brownHowdyCoin"
                                borderRadius="0px 15px 15px 0px"
                                color="white"
                                onClick={handleRedirectToHowdyStore}
                                icon={<Icon opacity="2" as={IoMdAdd} fontWeight="black" />}
                            />
                        </Flex>

                        <Flex ml="10%" w="45%" height="100%" align="center">
                            <Image
                                borderRadius="100%"
                                h="3rem"
                                w="3rem"
                                objectFit="cover"
                                src={
                                    user?.profilePhoto
                                        ? user.profilePhoto
                                        : '/images/default-images/default-profile-photo.svg'
                                }
                                alt="howdy coin"
                            ></Image>
                            <Text
                                ml="10px"
                                w="200px"
                                fontSize={['sm', '', 'medium', 'x-large']}
                                color="howdyColors.mainWhite"
                            >
                                {user?.userName}
                                <Menu>
                                    <MenuButton
                                        bg="howdyColors.mainBlue"
                                        fontSize="20px"
                                        pl="8px"
                                        w="20px"
                                        as={Button}
                                        rightIcon={<IoMdArrowDropdown />}
                                    />
                                    <MenuList color="howdyColors.mainBlack">
                                        <MenuItem onClick={handleRedirectProfile}>Perfil</MenuItem>
                                        <MenuItem onClick={handleRedirectUserConfig}>Configurações de perfil</MenuItem>
                                        <MenuItem onClick={logOut}>Sair</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Text>
                        </Flex>
                        <Box w="10px" position="relative">
                                {isNotificationBlockOpen ? (
                                   <IconButton
                                        position="relative"
                                        borderRadius="100%"
                                        aria-label="Open navigation"
                                        bg="howdyColors.mainWhite"
                                        color="howdyColors.mainBlack"
                                        fontWeight="black"
                                        onClick={handleCloseNotifications}
                                        fontSize="1.5rem"
                                        transform="rotate(-15deg)"
                                        icon={<Icon opacity="60%" as={FaRegBell} />
                                }
                                />) : (
                                    <IconButton
                                        position="relative"
                                        borderRadius="100%"
                                        aria-label="Open navigation"
                                        bg="howdyColors.mainWhite"
                                        color="howdyColors.mainBlack"
                                        fontWeight="black"
                                        onClick={handleOpenNotificationsBox}
                                        fontSize="1.5rem"
                                        transform="rotate(-15deg)"
                                        icon={<Icon opacity="60%" as={FaRegBell} />
                                    }
                                    
                                />)}
                        
                            {notifications.filter((notification)=> notification.wasRead == false).length > 0 && 
                               ( <Center
                                    color="howdyColors.mainWhite"
                                    position="absolute"
                                    top="-.5rem"
                                    right="-.8vw"
                                    w="30px"
                                    h="20px"
                                    borderRadius="35%"
                                    bg="howdyColors.mainRed"
                                    fontSize="1rem"
                                >
                                {notifications.filter((notification)=> notification.wasRead == false).length}
                                </Center>
                               )}
    
                            
                        </Box>
                    </Flex>
                </Flex>

                <Flex
                    position="absolute"
                    bottom="-5rem"
                    w="70%"
                    h="5rem"
                    bg="gray.100"
                    borderRadius="10px"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                    paddingX={20}
                    justify="space-between"
                >
                    <Image
                        my="auto"
                        height="3rem"
                        src="/images/howdy-images/logo/logo-blue-howdy-row.svg"
                        alt="howdy logo"
                        onClick={handleRedirectLandingPage}
                        cursor={"pointer"}
                    >

                    </Image>

                    <Center w="50%" justifyContent={'space-between'}>
                        <NavLink href="/Ranking/RankingPageWeekly" title="Ranking" />
                        <NavLink href="/Posts" title="Postagens" />
                        <NavLink href="/PublicActivities" title="Aprenda" />
                    </Center>
                </Flex>
                <Flex
                    position="absolute"
                    top="5rem"
                    display={dysplayBoxNotification}
                    w="30%"
                    flexDir="column"
                    p="2%"
                    bg="gray.100"
                    borderRadius="10px"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                    {notifications.length > 0 &&
                        notifications?.map((notification) => (
                           <Notification notification={notification}/>
                        ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
