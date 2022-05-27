import { Box, Center, Flex, Icon, Text, Tr } from "@chakra-ui/react";
import { BiTargetLock } from "react-icons/bi";
import ProfilePhotoAndPatent from "../ProfilePhotoAndPatent/ProfilePhotoAndPatent";


interface ResultSearchPeopleProps {
    ResultSearchPeople?: any;
}
//eae

export default function ResultSearchPeople(props: ResultSearchPeopleProps) {
    
     return (
        <>
            <Tr>
            <Box mt="70px" pl="50px">
                <Flex>
                    <ProfilePhotoAndPatent sizePatent="110%" user={props.ResultSearchPeople} size="8rem" /> 
                    <Box ml="30px">
                    
                        <Text color="howdyColors.mainBlack" fontSize="1.5rem" fontWeight="500">
                            {props.ResultSearchPeople.userName}
                        </Text>
                        <Flex mt="2rem">
                            <Center>
                                <Icon
                                    as={BiTargetLock}
                                    color="howdyColors.mainBlue"
                                    w="30px"
                                    h="30px"
                                />
                                <Text
                                    ml="5"
                                    fontWeight="thin"
                                    fontSize="xl"
                                    color="howdyColors.mainBlue"
                                >
                                {props.ResultSearchPeople.nativeLanguageName}
                                </Text>
                            </Center>
                            <Center ml="10">
                                <Icon
                                    as={BiTargetLock}
                                    color="howdyColors.mainBlue"
                                    w="30px"
                                    h="30px"
                                />
                                <Text
                                    ml="5"
                                    fontWeight="thin"
                                    fontSize="xl"
                                    color="howdyColors.mainBlue"
                                >
                                 {props.ResultSearchPeople.targetLanguageName}
                                </Text>
                            </Center>
                        </Flex>
                    </Box>
                </Flex>
                <Box mt="15px" h="1px" w="70%" borderRadius="50px" bg="howdyColors.divider"></Box>
            </Box>
            </Tr>
        </>
     )



}

