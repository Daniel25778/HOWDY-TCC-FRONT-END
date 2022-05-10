import { Flex, Icon, IconButton, Image, Text,useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdTranslate } from 'react-icons/md';
import { formatDateCreatedAt} from '../../functions/formatDateCreatedAt';
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';


interface MessageProps {
    message:any
    userLogged:any
}



export default function Message({message, userLogged}: MessageProps) {

    const toast = useToast();

    const api = apiFunction();
    const router = useRouter();

    function handleTranslate() {

        const nativeLanguageTranslatorName = userLogged.nativeLanguageTranslatorName;
       
        if (!router.isFallback) {
            api.post(`traductions`, {
                toLanguage: nativeLanguageTranslatorName,
                texts: [message.textContent]// arrumar aqui
            })
                .then((response: any) => {
                    toast({
                        title: 'TRADUÇÃO REALIZADA COM SUCESSO!',
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });

               
                }).catch((error: any) => {
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
        }
    }
    
     
    const createdAtDate = formatDateCreatedAt(message.createdAt)

    return (
        <>
            {message.idUserSender == userLogged.idUser ? (
                <Flex  align={'flex-end'} flexDir="column"  w="60%">
                    <Flex p="3%" bgColor="howdyColors.mainBlue" width="100%" borderRadius="50px 35px 0px 50px">
                        <Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                            {message.textContent}
                        </Text>
                    </Flex>
                    <Flex mb="2%" width="55%" gap="2%" align="center" justifyContent='center' >
                       
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="howdyColors.mainBlack"
                            borderRadius="15"
                            icon={
                                <Icon
                                    opacity="2"
                                    as={MdTranslate}
                                    onClick={handleTranslate}
                                    color="howdyColors.mainWhite"
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                         <Text>{createdAtDate}</Text> 
                    </Flex>
                    
                </Flex>
            ) : (
                <Flex align={'flex-start'} flexDir="column"  w="100%">
                    <Flex p="3%"   bgColor="howdyColors.mainBlack" width="50%" borderRadius="0px 50px 50px 35px">
                        <Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                            {message.textContent}
                        </Text>
                    </Flex>
                    <Flex mb="2%" width="35%" gap="2%" align="center" justifyContent='center' >
                       
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="howdyColors.mainBlue"
                            borderRadius="15"
                            icon={
                                <Icon
                                    opacity="2"
                                    as={MdTranslate}
                                    color="howdyColors.mainWhite"
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                         <Text>{createdAtDate}</Text> 
                    </Flex>
                </Flex>
            )
        }
            
            
        </>
    );
}
