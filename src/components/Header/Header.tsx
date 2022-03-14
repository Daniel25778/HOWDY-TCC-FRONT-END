import { useColorMode } from "@chakra-ui/core";
import { Button, Center, color, Flex, Image, Text } from "@chakra-ui/react";
import '@fontsource/roboto/400.css';


export function HeaderWeb () {

    return(
    <>
     <Flex 
        position={"relative"}
        as="header" 
        w="100%"
        maxWidth={3000}
        align={"center"}
        h={150}
        justify="center"
        bg="howdyColors.mainBlue"
        flexDir="column"
        >

        <Text>HELLO</Text>    

        <Flex
            position={"absolute"}
            w="60%"
            h="20"
            bg={"gray.100"}
            borderRadius={10}
            boxShadow='lg'
            paddingX={20}
            justify={"space-between"}
        >

        <Image 
            width={200}
            maxWidth={400}
            src="/images/howdy-images/logo/Logo row.svg"
            alt="howdy logo">
        </Image>

        <Center w="50%" justifyContent={"space-between"}>
            <Text _hover={{color: "howdyColors.mainBlue" }} cursor={"pointer"} color="howdyColors.mainBlack" fontSize={20}>Ranking</Text>
            <Text _hover={{color: "howdyColors.mainBlue" }} cursor={"pointer"} color="howdyColors.mainBlack" fontSize={20}>Postagens</Text>
            <Text _hover={{color: "howdyColors.mainBlue" }} cursor={"pointer"} color="howdyColors.mainBlack" fontSize={20}>Aprenda</Text>
        </Center>
           

        </Flex>
     </Flex>

    </>

    );

}
