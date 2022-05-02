import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function(){
    return (
        <Flex flexDir="column" w="100%">
            <Flex justifyContent="center" p="3%" bgColor="howdyColors.mainBlue" width="100%">
                <Image
                    w="25%"
                    src="/images/howdy-images/logo/logo-white-howdyStore.svg"
                ></Image>
            </Flex>
            <Flex flexDir="column" p="5%" width="100%" >
                <Flex justifyContent="center" width="100%">
                    <Text fontWeight="medium" fontSize ={['sm', 'xx-large', '7xl']}>Compre agora e melhore sua experiência !</Text>
                </Flex>
                <Flex justifyContent="center" width="100%" >

                    <Flex h="100%" w="25%" justifyContent="center" alignItems="center" p="3%" flexDir="column">
                        <Text mb="35%" color="howdyColors.mainBlue"fontWeight="medium" fontSize ={['sm', 'xx-large', '5xl']}>150</Text>
                        <Image
                         w="50%"
                         mb="20%"
                         src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                        >
                        </Image>
                        <Heading mb="15%" fontWeight="medium" fontSize ={['sm', 'x-large', '7xl']}>R$9,90</Heading>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize ={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex h="100%" w="25%" justifyContent="center" alignItems="center" p="3%" flexDir="column">
                        <Text mb="35%" color="howdyColors.mainBlue"fontWeight="medium" fontSize ={['sm', 'xx-large', '5xl']}>450</Text>
                        <Image
                         w="100%"
                         mb="20%"
                         src="/images/howdy-images/howdy-coin/howdyCoin3coins.svg"
                        >
                        </Image>
                        <Heading mb="15%" fontWeight="medium" fontSize ={['sm', 'x-large', '6xl']}>R$ 24,90</Heading>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize ={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex h="100%" w="25%" justifyContent="center" alignItems="center" p="3%" flexDir="column">
                        <Text mb="35%" color="howdyColors.mainBlue"fontWeight="medium" fontSize ={['sm', 'xx-large', '5xl']}>650</Text>
                        <Image
                         w="65%"
                         mb="20%"
                         src="/images/howdy-images/howdy-coin/howdyCoin6coins.svg"
                         objectFit="cover"
                        >
                        </Image>
                        <Heading mb="15%" fontWeight="medium" fontSize ={['sm', 'x-large', '6xl']}>R$ 30,90</Heading>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize ={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex h="0%" w="25%"  justifyContent="center" alignItems="center" p="3%" flexDir="column">
                        <Text mb="35%" color="howdyColors.mainBlue"fontWeight="medium" fontSize ={['sm', 'xx-large', '5xl']}>1000</Text>
                        <Image
                         w="55%"
                         mb="20%"
                         src="/images/howdy-images/howdy-coin/howdyCoinChest.svg"
                        >
                        </Image>
                        <Heading mb="15%" fontWeight="medium" fontSize ={['sm', 'x-large', '6xl']}>R$ 44,90</Heading>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize ={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                </Flex>
            </Flex>
        </Flex>
    )
}