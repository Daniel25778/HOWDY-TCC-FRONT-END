
import { Center, Flex } from '@chakra-ui/react';
import { Image, Spacer } from '@chakra-ui/react';
import { ChakraProvider, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { FormLogin } from '../components/Form/FormLogin';
import { Divider } from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import { FormCadastro } from '../components/Form/FormCadastro';


export default function PageCadastro(props: any){
    return(
        <>
            <Flex height="100%" width="35%" bg="howdyColors.mainBlue"  justify="center" align="center" flexDir="column" mr={40}>
                <Flex width="80%" align="center" height="80%"  flexDir="column">
                    <Image
                        mt="10%"
                        width={500}
                        maxWidth={500}
                        objectFit="cover"
                        bg="howdyColors.mainGreens"
                        src="/images/howdy-images/logo/logo-howdy-row.svg"
                        alt="howdy logo"
                        mb="15%"
                    />
                   
                    <Flex  mb="20%" ml={0} align="center">
                        <Heading 
                        fontSize={50}
                        color="howdyColors.mainWhite">Onde mais de 
                            <Heading 
                            letterSpacing={2} 
                            fontSize={80} 
                            color='howdyColors.mainGreenLight'>100 BILHÕES
                            </Heading>
                            <Heading  fontSize={50}>
                                Já se cadastraram
                            </Heading>
                        </Heading>
                    </Flex>
                    


                    <Flex align="center" ml={0}>
                        <Heading 
                        fontSize={30}
                        color="howdyColors.mainWhite">Junte-se a nós, e alcançe seus objetivos
                        </Heading>
                    </Flex>
                    
                </Flex>
               
            </Flex>
            <Center  width="50%" height="100%">
                <FormCadastro></FormCadastro>
            </Center>
        </> 
    );
}