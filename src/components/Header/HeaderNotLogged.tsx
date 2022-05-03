import { useColorMode } from '@chakra-ui/core';
import {
    Box,
    Button,
    Center,
    color,
    Flex,
    Icon,
    IconButton,
    Image,
    Input,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FiSearch } from 'react-icons/fi';
import { FaRegBell, FaSignInAlt } from 'react-icons/fa';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';
import { NavLink } from '../NavLink/Header/NavLink';
import Router from 'next/router';
import { api as apiFunction } from '../../services/api';
import { setCookie } from 'nookies';
import nookies, { destroyCookie } from 'nookies';
import { BiLogOut } from 'react-icons/bi';
import { VscSignIn } from 'react-icons/vsc';
import { logOut } from '../../functions/logOut';

interface HeaderProps {
    user?: any;
}
export function HeaderNotLogged({ user }: HeaderProps) {
    const handleSubmit = () => {
        Router.push('/LoginPage');
    }
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
            <Flex position="relative" top="0" left="0" w="100%" pl="15%" pr="15%" h="5rem" align="center">
                <Flex width="100%" align="center" px="10" justify="space-between">
                    <Flex mr="auto">
                        <Box marginRight="5">
                            <FiSearch size={30} color="#F2F2F2" />
                        </Box>

                        <Input
                            bg="howdyColors.main"
                            focusBorderColor="howdyColors.mainWhite"
                            placeholder="Descubra pessoas ou atividades..."
                            borderRadius="0px 100px 100px 0px"
                            width="35vw"
                        ></Input>
                    </Flex>
                    <Flex align="center" width="10%" justify="space-between">
                        <Text color="howdyColors.mainWhite">Logar</Text>
                        <IconButton
                            onClick={handleSubmit}
                                variant="unstyled"
                                aria-label="Open navigation"
                                fontSize="2rem"
                                color="#f2f2f2"
                                icon={<Icon opacity="2" as={VscSignIn} fontWeight="black" />}
                            />
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
                </Flex>
            </Flex>
        </Flex>
    );
}
