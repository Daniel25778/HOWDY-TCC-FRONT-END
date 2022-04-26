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
} from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FiSearch } from 'react-icons/fi';
import { FaRegBell } from 'react-icons/fa';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';
import { NavLink } from '../NavLink/Header/NavLink';
import Router from 'next/router';
import { logOut } from '../../functions/logOut';

interface HeaderProps {
    user?: any;
}

export function Header({ user }: HeaderProps) {
    function handleRedirectUserConfig() {
        Router.push('/PageUserConfig');
    }

    function handleRedirectProfile() {
        Router.push(`/UserPage/Post/${user.idUser}`);
    }

    const handleSearch = (e) => {
        e.preventDefault();
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
                <Flex  width="100%" align="center" px="10" justify="space-between">
                    <Flex >
                        <Flex  as="form" onSubmit={handleSearch}>
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
                            <IconButton
                                position="relative"
                                borderRadius="100%"
                                aria-label="Open navigation"
                                bg="howdyColors.mainWhite"
                                color="howdyColors.mainBlack"
                                fontWeight="black"
                                fontSize="1.5rem"
                                transform="rotate(-15deg)"
                                icon={<Icon opacity="60%" as={FaRegBell} />}
                            />

                            <Center
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
                                +9
                            </Center>
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
                    ></Image>

                    <Center w="50%" justifyContent={'space-between'}>
                        <NavLink href="/RankingPage" title="Ranking" />
                        <NavLink href="/Posts" title="Postagens" />
                        <NavLink href="/PublicActivities" title="Aprenda" />
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    );
}
