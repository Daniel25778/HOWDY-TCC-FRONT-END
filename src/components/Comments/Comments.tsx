import { Flex, Image, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Comments(){
    return(
        <>
        <Flex>
           <Flex align="start" flexDir="column" p="5%" width="100%" justify="center" borderRadius="20" h="15vh" >
           <Image
                                marginRight={505}
                                borderRadius="100%"
                                w="4rem"
                                src={ '/images/default-images/default-profile-photo.svg'
                                }
                            ></Image>
                            <Flex position={"sticky"}>
                            <p>Jenny Wilson</p>
                            <p>27/02/2022</p>
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
