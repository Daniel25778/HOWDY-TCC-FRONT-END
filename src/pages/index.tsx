import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { FormLogin } from '../components/Form/FormLogin';
import { PageLogin } from './PageLogin';
import { Flex } from '@chakra-ui/react';
import PageCadastro from './register/[isLogged]';
import { HeaderWeb } from '../components/Header/Header';

export default function Home() {
    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
        >
            {/* <HeaderWeb></HeaderWeb> */}

            <PageLogin></PageLogin> 
        </Flex>
    );
}
