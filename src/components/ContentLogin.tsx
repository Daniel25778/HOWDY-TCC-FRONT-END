import { Button, Flex, Input,InputGroup,InputLeftElement,  } from '@chakra-ui/react';
import {  GrGoogle, GrSecure } from 'react-icons/gr';
import {  MdOutlineMailOutline } from 'react-icons/md';
import {  BsFacebook } from 'react-icons/bs';
import {  GiPadlock } from 'react-icons/gi'
import { Image } from '@chakra-ui/react'
import {
    ChakraProvider,
    Container,
    Stack,
    Heading,
    Text,
  } from '@chakra-ui/react'
  import {themes} from '../styles/theme'

import {actionLoginGoogle} from '../pages/api/actionLogWithGoogle';


export  function ContentLogin(props:any) {
    return(
    
        
        <Flex
           
            height="100%"
            width="40%"   
            bg="howdyColors.mainBlue" 
            align="center" 
            justify="center" 
            flexDir="column"
            marginRight={40}>


            <Flex
              width="100%" 
              height="100%" 
              justify="center"
            >
            <Image src='../public/images/howdy-images/logo/logo-howdy-column.svg' alt='howdy logo' />  
           
             
                
            </Flex>        

        </Flex>
           
      
         )
    }