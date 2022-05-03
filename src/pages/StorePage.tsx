import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import Loading from '../components/Loading/Loading';
import { useRouter } from 'next/router';

import { getUserLogged } from '../functions/getUserLogged';
import { useEffect, useState } from 'react';
import { api as apiFunction } from '../services/api';

export default function () {
    const api = apiFunction();
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();
    if (router.isFallback) {
        return <Loading />;
    }

    function handleAddSubscription() {
        api.put(`subscription/add/12`).then((response) => {
            console.log(response);
        }); 
    }
    //RESGATANDO IDTOKEN DO USUÁRIO LOGADO
    const cookies = parseCookies();
    const idToken = cookies['firebaseAccount'];
    return (
        <Flex flexDir="column" w="100%">
            <Flex justifyContent="center" p="3%" bgColor="howdyColors.mainBlue" width="100%">
                <Image w="25%" src="/images/howdy-images/logo/logo-white-howdyStore.svg"></Image>
            </Flex>
            <Flex flexDir="column" p="5%" width="100%">
                <Flex justifyContent="center" width="100%">
                    <Text fontWeight="medium" fontSize={['sm', 'xx-large', '7xl']}>
                        Compre agora e melhore sua experiência !
                    </Text>
                </Flex>
                <Flex justifyContent="center" width="100%">
                    <Flex
                        as="form"
                        action="http://localhost:3333/buyHowdyCoin"
                        method="POST"
                        h="100%"
                        w="26%"
                        justifyContent="center"
                        alignItems="center"
                        p="3%"
                        flexDir="column"
                    >
                        <Text
                            mb="35%"
                            color="howdyColors.mainBlue"
                            fontWeight="medium"
                            fontSize={['sm', 'xx-large', '5xl']}
                        >
                            150
                        </Text>
                        <Image w="50%" mb="20%" src="/images/howdy-images/howdy-coin/Howdy coin.svg"></Image>
                        <Heading mb="15%" fontWeight="medium" fontSize={['sm', 'x-large', '7xl']}>
                            R$9,90
                        </Heading>
                        <input type="hidden" name="redirect" value="true" />
                        <input type="hidden" name="howdyCoinsQuantity" value="150" />
                        <input type="hidden" name="idToken" value={idToken} />
                        <script
                            src="https://checkout.stripe.com/checkout.js"
                            className="stripe-button"
                            data-key="pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF"
                            data-amount="990"
                            data-currency="BRL"
                            data-name="150 Howdy Coins"
                            data-description="Utilizada para comprar atividades, e adquirir sua assinatura mensal!"
                            data-image="/favicon.ico"
                            data-locale="auto"
                        ></script>
                        <script>document.getElementsByClassName('stripe-button-el')[0].style.display = 'none'</script>

                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex
                        as="form"
                        action="http://localhost:3333/buyHowdyCoin"
                        method="POST"
                        h="100%"
                        w="25%"
                        justifyContent="center"
                        alignItems="center"
                        p="3%"
                        flexDir="column"
                    >
                        <Text
                            mb="35%"
                            color="howdyColors.mainBlue"
                            fontWeight="medium"
                            fontSize={['sm', 'xx-large', '5xl']}
                        >
                            450
                        </Text>
                        <Image w="100%" mb="20%" src="/images/howdy-images/howdy-coin/howdyCoin3coins.svg"></Image>
                        <Heading mb="15%" fontWeight="medium" fontSize={['sm', 'x-large', '6xl']}>
                            R$ 24,90
                        </Heading>
                        <input type="hidden" name="redirect" value="true" />
                        <input type="hidden" name="howdyCoinsQuantity" value="450" />
                        <input type="hidden" name="idToken" value={idToken} />
                        <script
                            src="https://checkout.stripe.com/checkout.js"
                            className="stripe-button"
                            data-key="pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF"
                            data-amount="2490"
                            data-currency="BRL"
                            data-name="450 Howdy Coins"
                            data-description="Utilizada para comprar atividades, e adquirir sua assinatura mensal!"
                            data-image="/favicon.ico"
                            data-locale="auto"
                        ></script>
                        <script>document.getElementsByClassName('stripe-button-el')[0].style.display = 'none'</script>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex
                        as="form"
                        action="http://localhost:3333/buyHowdyCoin"
                        method="POST"
                        h="100%"
                        w="25%"
                        justifyContent="center"
                        alignItems="center"
                        p="3%"
                        flexDir="column"
                    >
                        <Text
                            mb="35%"
                            color="howdyColors.mainBlue"
                            fontWeight="medium"
                            fontSize={['sm', 'xx-large', '5xl']}
                        >
                            650
                        </Text>
                        <Image
                            w="65%"
                            mb="20%"
                            src="/images/howdy-images/howdy-coin/howdyCoin6coins.svg"
                            objectFit="cover"
                        ></Image>
                        <Heading mb="15%" fontWeight="medium" fontSize={['sm', 'x-large', '6xl']}>
                            R$ 30,90
                        </Heading>
                        <input type="hidden" name="redirect" value="true" />
                        <input type="hidden" name="howdyCoinsQuantity" value="650" />
                        <input type="hidden" name="idToken" value={idToken} />
                        <script
                            src="https://checkout.stripe.com/checkout.js"
                            className="stripe-button"
                            data-key="pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF"
                            data-amount="3090"
                            data-currency="BRL"
                            data-name="650 Howdy Coins"
                            data-description="Utilizada para comprar atividades, e adquirir sua assinatura mensal!"
                            data-image="/favicon.ico"
                            data-locale="auto"
                        ></script>
                        <script>document.getElementsByClassName('stripe-button-el')[0].style.display = 'none'</script>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>

                    <Flex
                        as="form"
                        action="http://localhost:3333/buyHowdyCoin"
                        method="POST"
                        h="0%"
                        w="25%"
                        justifyContent="center"
                        alignItems="center"
                        p="3%"
                        flexDir="column"
                    >
                        <Text
                            mb="35%"
                            color="howdyColors.mainBlue"
                            fontWeight="medium"
                            fontSize={['sm', 'xx-large', '5xl']}
                        >
                            1000
                        </Text>
                        <Image w="55%" mb="20%" src="/images/howdy-images/howdy-coin/howdyCoinChest.svg"></Image>
                        <Heading mb="15%" fontWeight="medium" fontSize={['sm', 'x-large', '6xl']}>
                            R$ 44,90
                        </Heading>
                        <input type="hidden" name="redirect" value="true" />
                        <input type="hidden" name="howdyCoinsQuantity" value="1000" />
                        <input type="hidden" name="idToken" value={idToken} />
                        <script
                            src="https://checkout.stripe.com/checkout.js"
                            className="stripe-button"
                            data-key="pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF"
                            data-amount="4490"
                            data-currency="BRL"
                            data-name="1000 Howdy Coins"
                            data-description="Utilizada para comprar atividades, e adquirir sua assinatura mensal!"
                            data-image="/favicon.ico"
                            data-locale="auto"
                        ></script>
                        <script>document.getElementsByClassName('stripe-button-el')[0].style.display = 'none'</script>
                        <Button
                            _hover={{ bg: '#B9C2FD' }}
                            width="100%"
                            bg="#CBD2FF"
                            color="howdyColors.mainBlue"
                            type="submit"
                            fontSize={['sm', 'large', 'x-large']}
                        >
                            COMPRAR
                        </Button>
                    </Flex>
                </Flex>
                <Flex justifyContent={'center'}>
                    <Image></Image>
                    <Button onClick={handleAddSubscription}>ADQUIRA A "PRO" ASSIGN</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
