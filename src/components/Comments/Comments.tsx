import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

interface CommentaryProps {
    commentary?: any;
}

export default function Commentary(props: CommentaryProps){
    console.log(props.commentary.commenter.profilePhoto);
    const createdAt = new Date(props.commentary?.postCommentaryCreatedAt).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return(
        <>  
            <Flex mb="3%" w="100%" >
                <Flex p="2%" borderRadius="12" width="100%" bgColor="#fff">
                    <Flex align="center"  width="50%" >
                        <Image borderRadius="100%" width="40%" maxWidth={500}  src={props.commentary.commenter.profilePhoto}/>
                        <Flex ml="10%" align="center" h="50%" justifyContent="space-between" flexDir="column">
                            <Text fontWeight="medium" fontSize={['sm', 'md', 'md']}>{props.commentary.commenter.userName}</Text>
                            <Text fontSize={['sm', 'md', 'md']}>{createdAt}</Text>
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