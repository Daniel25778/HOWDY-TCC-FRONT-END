import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

interface CommentsProps {
    commentary?: any;
}

export default function Comments(props: CommentsProps){
    return(
        <>  
            <Flex mb="3%" w="100%" >
                <Flex p="2%" borderRadius="12" width="100%" bgColor="#fff">
                    <Flex align="center"  width="30%" >
                        <Image borderRadius="100%" width="40%" maxWidth={500}  src={ '/images/default-images/default-profile-photo.svg'}/>
                        <Flex ml="10%" align="center" h="50%" justifyContent="space-between" flexDir="column">
                            <Text fontWeight="medium" fontSize={['sm', 'md', 'md']}>{props.commentary.commenter.userName}</Text>
                            <Text fontSize={['sm', 'md', 'md']}>{props.commentary.postCommentaryCreatedAt}</Text>
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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idUser } = params;

    return {
        props: { idUser },
    };
};
