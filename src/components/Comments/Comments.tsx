import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Dispatch, SetStateAction } from "react";

interface CommentaryProps {
    commentary?: any;
}

export default function Commentary(props: CommentaryProps){
    const createdAt = new Date(props.commentary?.postCommentaryCreatedAt).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'short',
    });

    return(
        <>  
            <Flex mb="3%" w="100%" >
                <Flex p="2%" borderRadius="12" width="100%" bgColor="#fff">
                    <Flex align="center"  width="55%" >
                        <Image borderRadius="100%" width="40%" maxWidth={500}  src={props.commentary.commenter?.profilePhoto}/>
                        <Flex ml="10%" w="" align="center" h="50%" justifyContent="space-between" flexDir="column">
                            <Text fontWeight="medium" fontSize={['sm', 'smaller', 'md']}>{props.commentary.commenter.userName}</Text>
                            <Text fontSize={['sm', 'smaller', 'md']}>{createdAt}</Text>
                        </Flex>
                    </Flex>

                    <Box mr="7" ml="7" bg="howdyColors.divider" h="100%" w="1px"  />

                     <Flex w="90%" align="center" justifyContent="center">
                         <Text fontSize={['sm', 'md', 'large']}>{props.commentary.textCommentary}</Text>
                     </Flex>
                </Flex>
            </Flex>
            
        </>
    );
}