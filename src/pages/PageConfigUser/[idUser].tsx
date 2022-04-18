import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import UserDataPage from "../../components/UserDataPage/UserDataPage";
import { getUserLogged } from "../../functions/getUserLogged";

export default function PageUserConfig() {
  return (
    <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={"center"} align="center" padding="2%">
        
         <Flex
            as="form"
            w="50%"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column">

           <Text>Configurações</Text>   

            <Image
                  filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                  objectFit="cover"
                  w="100%"
                  maxH="10vw"
                  src={
                  '/images/Tests/backgroundImage.png'}
              />

            <Flex justify={"center"} align="center" position={"relative"} flexDir={"column"} bottom="4vw" >  
              
                    <Image
                      w="20%"
                      h="40%"
                      borderRadius="100%"
                      objectFit="cover"
                      src={ 
                          '../images/Tests/profilePhoto.png'}
                      _hover={{cursor: 'pointer'}}    
                  />
            </Flex>  
          </Flex>
    </Flex>
  );
}