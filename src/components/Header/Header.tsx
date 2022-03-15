import { useColorMode } from '@chakra-ui/core';
import { Button, Center, color, Flex, Image, Text } from '@chakra-ui/react';
import '@fontsource/roboto/400.css';

export function HeaderWeb() {
    return (
        <>
            <Flex
                position="fixed"
                as="header"
                top="0"
                left="0"
                w="100%"
                justify="center"
                h="5rem"
                bg="howdyColors.mainBlue"
            >
                <Flex>

                    <Flex
                        position="absolute"
                        bottom="-3rem"
                        w="60%"
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
                                fontSize={["sm",  "xl", "xx-large"]}
                            >
                                Ranking
                            </Text>
                            <Text
                                _hover={{ color: 'howdyColors.mainBlue' }}
                                cursor={'pointer'}
                                color="howdyColors.mainBlack"
                                fontWeight="semibold"
                                opacity="70%"
                                fontSize={["sm",  "xl", "xx-large"]}
                            >
                                Postagens
                            </Text>
                            <Text
                                _hover={{ color: 'howdyColors.mainBlue' }}
                                cursor={'pointer'}
                                color="howdyColors.mainBlack"
                                fontWeight="semibold"
                                opacity="70%"
                                fontSize={["sm",  "xl", "xx-large"]}
                            >
                                Aprenda
                            </Text>
                        </Center>
                    </Flex> 
                </Flex>
            </Flex>
        </>
    );
}
