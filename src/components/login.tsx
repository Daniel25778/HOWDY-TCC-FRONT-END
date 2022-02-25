
import { Button, Flex, } from '@chakra-ui/react';
import {  GrGoogle } from 'react-icons/gr';
import {
    ChakraProvider,
    Container,
    Stack,
    Heading,
    Text,
  } from '@chakra-ui/react'
  import {themes} from '../styles/theme'



import {actionLoginGoogle} from '../pages/api/actionLogWithGoogle';
export  function Login(props:any) {
return(

    <Flex 
        w="100vw" 
        h="100vh" 
        align="center" 
        justify="center">
    <Flex
        as="form" 
        width="100%" 
        maxWidth={360} 
        bg="#F2F2F2" 
        align="center" 
        justify="center" 
        borderRadius={8} 
        flexDir="column">

        <Button 

            onClick={actionLoginGoogle} 
            marginTop="6" 
            bg='howdyColors.colorGoogle' 
            color="howdyColors.mainWhite"
            leftIcon={<GrGoogle  color="howdyColors.mainWhite"/>} >
            <Text>GOOGLE</Text>  
            </Button>
       
    </Flex>
       
    </Flex>
     )
}