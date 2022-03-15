import { useColorMode } from '@chakra-ui/core';
import { Box, Button, Center, color, Flex, Image, Input, Text } from '@chakra-ui/react';
import '@fontsource/roboto/400.css';
import { FiSearch } from 'react-icons/fi';

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
                //  bg="howdyColors.mainRed"
                align="center"
            >
                <Flex marginLeft="9" width="100%">
                    <Box marginRight="5">
                        <FiSearch size={30} color="#F2F2F2" />
                    </Box>

                    <Input
                        marginRight="45"
                        bg="howdyColors.main"
                        focusBorderColor="howdyColors.mainWhite"
                        placeholder="Descubra pessoas ou atividades..."
                        borderRadius="0px 100px 100px 0px"
                        width="43%"
                    ></Input>
                    <Flex bg="#F2F2F2" width="10%">
                        <Image
                            height="4rem"
                            src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                            alt="howdy coin"
                        ></Image>
                        <Text></Text>
                        <Button></Button>
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
