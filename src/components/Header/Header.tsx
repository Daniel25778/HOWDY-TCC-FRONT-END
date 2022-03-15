import { useColorMode } from '@chakra-ui/core';
import { Box, Button, Center, color, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FiSearch } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';

export function HeaderWeb() {
    return (
        <Flex
            position="fixed"
            zIndex="1"
            as="header"
            top="0"
            left="0"
            w="100%"
            justify="center"
            h="7rem"
            bg="howdyColors.mainBlue"
        >
            <Flex
                position="relative"
                top="0"
                left="0"
                w="70%"
                h="5rem"
                bg="howdyColors.mainRed"
                align="center"
            >
                <Flex  width="100%" align="center" px="10" justify="space-between" >
                    <Flex width="50%" >
                        <Box marginRight="5">
                            <FiSearch size={30} color="#F2F2F2" />
                        </Box>

                        <Input
                        
                            bg="howdyColors.main"
                            focusBorderColor="howdyColors.mainWhite"
                            placeholder="Descubra pessoas ou atividades..."
                            borderRadius="0px 100px 100px 0px"
                            width="100%"
                        ></Input>
                    </Flex>

                    <Flex width="45%" bgColor={'bisque'} justify={'space-between'}>
                        <Flex  gap="5"  borderRadius="60px 40px 40px 60px"  bg="howdyColors.mainYellow"  align="center">
                            <Image
                                height="2.5rem"
                                src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                                alt="howdy coin"
                            ></Image>
                            <Text fontWeight="semibold" color="howdyColors.brownHowdyCoin">200</Text>
                            <Button opacity={"70%"} bgColor="howdyColors.brownHowdyCoin" borderRadius="0px 15px 15px 0px"><IoMdAdd size="1.5rem" color='#ffffff'/></Button>
                        </Flex>

                        <Flex height="100%">

                            <Image borderRadius="100%"  height="3rem" objectFit='cover' src="/images/Tests/profilePhoto.png" alt="howdy coin"></Image>
                            <Text></Text>
                            <Icon></Icon>

                        </Flex>
                    </Flex>

                    
                </Flex>

                <Flex
                    position="absolute"
                    bottom="-5rem"
                    w="100%"
                    h="5rem"
                    bg="gray.100"
                    borderRadius="10px"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                    paddingX={20}
                    justify="space-between"
                    align="center"
                >
                    <Image height="3rem" src="/images/howdy-images/logo/Logo row.svg" alt="howdy logo"></Image>

                    <Center w="50%" justifyContent={'space-between'}>
                        <Text
                            _hover={{ color: 'howdyColors.mainBlue' }}
                            cursor={'pointer'}
                            color="howdyColors.mainBlack"
                            fontWeight="semibold"
                            opacity="70%"
                            fontSize={['sm', 'xl', 'xx-large']}
                        >
                            Ranking
                        </Text>
                        <Text
                            _hover={{ color: 'howdyColors.mainBlue' }}
                            cursor={'pointer'}
                            color="howdyColors.mainBlack"
                            fontWeight="semibold"
                            opacity="70%"
                            fontSize={['sm', 'xl', 'xx-large']}
                        >
                            Postagens
                        </Text>
                        <Text
                            _hover={{ color: 'howdyColors.mainBlue' }}
                            cursor={'pointer'}
                            color="howdyColors.mainBlack"
                            fontWeight="semibold"
                            opacity="70%"
                            fontSize={['sm', 'xl', 'xx-large']}
                        >
                            Aprenda
                        </Text>
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    );
}
