import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FormLogin } from '../components/Form/FormLogin';
import { Flex, Text,Image} from '@chakra-ui/react';
import PageCadastro from './register/[isLogged]';
import { Header } from '../components/Header/Header';


export default function Home() {
    return (
        <>
            <Header/>
            <Flex
            w="100%"
            flexDir="column"
            align="center"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
            >
                <Text>Hello</Text>
                <Flex>
                    <Flex>
                        <Text>Howdy!</Text>
                        <Text>Aprenda e ensine idiomas <Text>Interagindo</Text></Text>
                    </Flex>
                    <Flex>
                        <Image src="../../"></Image>
                    </Flex>
                </Flex>
            </Flex>
        </>
           
    );
}
