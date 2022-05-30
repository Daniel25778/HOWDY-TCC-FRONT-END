import { Center, Flex } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FormCadastro } from '../../components/Form/FormCadastro';
import { useEffect, useState } from 'react';
import { api as apiFunction } from '../../services/api';

interface PageCadastroProps {
    isLogged: string;
}



export default function PageCadastro(props: PageCadastroProps) {

    const [userCadaster, setUserCadaster] = useState<any>(null);
    const api = apiFunction();
    
    useEffect(() => {
            api?.get(`users/total`).then(response => {
                setUserCadaster(response.data.totalUsers);
            });
    } , []);
    const { isLogged } = props;
    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="space-between"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
        >
            <Center flex="1" height="100%">
                <FormCadastro isLogged={isLogged}></FormCadastro>
            </Center>
            <Flex height="100%" width="35%" bg="howdyColors.mainBlue" justify="center" align="center" flexDir="column">
                <Flex width="80%" align="start" height="80%" flexDir="column">
                    <Image
                        width="80%"
                        maxWidth={500}
                        objectFit="cover"
                        bg="howdyColors.mainGreens"
                        src="/images/howdy-images/logo/logo-white-howdy-row.svg"
                        alt="howdy logo"
                        mb="15%"
                    />

                    <Flex mb="10%" align="center">
                        <Text fontWeight="bold" fontSize={35} color="howdyColors.mainWhite">
                            Onde mais de
                            <Text
                                lineHeight={10}
                                fontWeight="bold"
                                letterSpacing={2}
                                fontSize={50}
                                color="howdyColors.mainGreenLight"
                            >
                                {userCadaster - 1} sonhador{
                                userCadaster > 2 ? 'es' : ''
                            }
                            </Text>
                            <Text fontWeight="bold" fontSize={35}>
                                já se { userCadaster > 2 ? 'cadastraram' : 'cadastrou'}
                            </Text>
                        </Text>
                    </Flex>

                    <Flex align="center">
                        <Text fontSize={25} color="howdyColors.mainWhite">
                            Junte-se a nós, e alcançe seus objetivos
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { isLogged } = params;

    return {
        props: { isLogged },
    };
};
