import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import { FormLogin } from '../components/Form/FormLogin';
import { Flex, Text,Image, Heading, Button, Grid, SimpleGrid, Box, ScaleFade} from '@chakra-ui/react';
import PageCadastro from './register/[isLogged]';
import { HeaderNotLogged } from '../components/Header/HeaderNotLogged';
import { useSpring, animated as a } from 'react-spring'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "../styles/swiper.module.scss";
import { SiVerizon} from 'react-icons/si';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Router from 'next/router';


// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Scrollbar, A11y, Autoplay } from 'swiper';
import { CategoryIcon } from '../components/CategoryIcon/CategoryIcon';
import { SliderContent } from '../components/SliderContent/SliderContent';
import { WeeklyChart } from '../components/Chart/WeeklyChart';
import { MonthlyChart } from '../components/Chart/MonthlyChart';
import Loading from '../components/Loading/Loading';
import { useEffect, useRef, useState } from 'react';
import { api as apiFunction } from '../services/api';
import { useRouter } from 'next/router';
import Footer from '../components/Footer/Footer';
import { useInViewport } from 'react-in-viewport';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Scrollbar, A11y, Autoplay]);

interface HomeProps {
    user?: any;
}



export default function Home(props) {
    const router = useRouter();


    const api = apiFunction();
    const [registerChart, setRegisterChart] = useState<any>(null);
   
    const [userCadaster, setUserCadaster] = useState<any>(null);
    
    useEffect(() => {
            api?.get(`users/historic`).then(response => {
                setRegisterChart(response.data.chartData);
            });

            api?.get(`users/total`).then(response => {
                setUserCadaster(response.data.totalUsers);
            });
    } , []);

const monthlyXpSeries = [
    {
        name: 'monthlyXpSeries',
        data: registerChart

    }];

    const ref = useRef(null);

    const {inViewport} = useInViewport(
        ref,
        { rootMargin: '-15% 0px' },
        {disconnectOnLeave: false},
        {}
    )

    function handleAccessStore() {
        Router.push('/StorePage');
    }
    
    return (
        <>
            <HeaderNotLogged/>
            <Flex
            w="100%"
            flexDir="column"
            align="center"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
            >
                <Flex flexDir="column" py="1%" px="15%" mt="15.2%"  width="100%">
                    <Flex>
                        <Flex py="9%" w="50%"  flexDir="column">
                            <Text fontWeight="medium">Howdy!</Text>
                            <Heading fontSize="3xl" wordBreak="break-word">Aprenda e ensine</Heading>
                            <Heading fontSize="4xl" wordBreak="break-word">idiomas interagindo!</Heading>
                            <Heading>Come on, baby!</Heading>
                            <Text mt="4%" w="65%">Acesse exercícios e interações com pessoas do mundo inteiro que carregam o mesmo objetivo.</Text>
                            <Button onClick={handleAccessStore} mt="4%" color="howdyColors.mainGreen" bgColor="howdyColors.mainGreenTransparent" borderRadius="25" w="40%" >Subscribe now</Button>
                        </Flex>
                        <Flex w="50%">
                            <Image 
                            w="100%"
                            h="70%"
                            src="\images\illustrations\manLandingPage.svg"
                            ></Image>
                        </Flex>
                    </Flex>
                    <ScaleFade initialScale={0.9}  in={inViewport} whileHover={{scale: 1.1}}>
                    <Flex ref={ref}>

                       
                            <Swiper
                                slidesPerView={1}
                                cssMode={true}
                                navigation={true}
                                pagination={true}
                                autoplay={{
                                    delay: 4000,
                                }}
                                className={styles.swiper}
                                mousewheel={true}
                                keyboard={true}
                            >
                                <SwiperSlide >
                                    <SliderContent image='peopleSliderLandingPage.svg' title='Aprenda e ensine' description='Ensine sua lingua nativa e aprenda outros idiomas' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SliderContent image='peopleSliderLandingPage.svg' title='Plataforma gamificada' description='Aprender e ensinar se tornou mais divertido' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SliderContent image='peopleSliderLandingPage.svg' title='Compartilhe o seu progresso' description='Poste e interaja com varias pessoas'/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SliderContent image='peopleSliderLandingPage.svg' title='Ranking semanal' description='Fique no topo ganhando o maximo de Xp possivel'/>
                                </SwiperSlide>
                            </Swiper>
                        
                        
                    </Flex>
                    </ScaleFade>
                </Flex>
                <Flex py="2%" flexDir="column" bgColor="howdyColors.mainBlack" w="100%" justify="center" align="center">
                    <Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium', '2xl']} >
                        Adquira a assinatura “PRO” e desbloqueie 
                    </Text>
                    <Text mb="5%" fontWeight="medium" fontSize={['medium', '2xl']} color="howdyColors.mainBlue">
                        INCRÍVEIS FUNCIONALIDADES !
                    </Text>

                    <Flex h={1200} w="100%" >
                        <Flex align="center"  flexDir="column" w="50%">
                            
                            <Image
                                w="100%"
                                h="40%"
                                src="/images/howdy-images/subscription/free-subs.svg">
                            </Image>
                            <Text mb="5%"  color="howdyColors.mainBlue" fontWeight="medium" fontSize={['medium', '2xl']} >
                                FREE
                            </Text>
                            <Grid templateColumns="repeat(1, 7fr)" gap={6}>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>REALIZAR UMA PUBLICAÇÃO POR DIA</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>COMENTAR AS PUBLICAÇÕES</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>CURTIR AS PUBLICAÇÕES</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>ADICIONAR AMIGOS</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>NIVÉL FACIO,MEDIO DESBLOQUEADO</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>GRAFICO DE DESEMPENHO</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>PARTICIPAÇÃO DO RANKINGS</Text></Flex>
                            </Grid>
                        </Flex> 

                        <Flex  align="center" flexDir="column" w="50%">
                            <Image
                                w="100%"
                                h="40%"
                                src="/images/howdy-images/subscription/pro-subs.svg">
                            </Image>
                            <Text mb="5%" color="howdyColors.master" fontWeight="medium" fontSize={['medium', '2xl']} >
                                PRO SUBS
                            </Text>
                            <Grid templateColumns="repeat(1, 8fr)" gap={6}>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>CHAT COM SEUS AMIGOS</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>PATENTES PERSONALIZADAS</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>PERSONALIZAR FOTO DE FUNDO</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>POSTAGENS ILIMITADAS</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>NIVEL AVANÇADO DESBLOQUEADO</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>COMENTAR AS PUBLICAÇOES</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>CURTIR AS PUBLICAÇOES</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>ADICIONAR AMIGOS</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>GRAFICO DE DESEMPENHO</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>CURTIR AS PUBLICAÇOES</Text></Flex>
                                <Flex align="center" gap="7%"><SiVerizon color="#29B995"></SiVerizon><Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['medium']}>PARTICIPAÇÃO NOS RANKINGS</Text></Flex>
                            </Grid>
                        </Flex>
                    </Flex>
                   
                </Flex>    
                <Flex flexDir="column" w="100%" justify="center" align="center">
                    <Text mt="5%" mb="4%" fontWeight="medium" fontSize={['medium', '4xl']} color="howdyColors.mainBlack">
                            Estamos Juntos nessa jornada!
                    </Text>
                </Flex>
                <Flex  w="80%" align={'center'} justify={'space-between'}>
                    <SimpleGrid  alignContent="center" justifyContent={'center'} flex="1" gap="5%" minChildWidth="100px">
                        {registerChart && 
                        <MonthlyChart title="DESEMPENHO MENSAL" series={monthlyXpSeries} />
                        }
                        <Flex justify="center" gap={10} flexDir={'column'} w="70%">
                            <Heading>Somos mais de {userCadaster - 1} sonhador{
                                userCadaster == 1 ? 'es' : ''
                            } .</Heading>
                            <Text fontSize={['sm', 'medium', 'xx-large']}>O mundo afora requer que tenhamos cada vez mais conhecimentos sobre outras línguas. Não vá sozinho!</Text>
                        </Flex>
                    </SimpleGrid>
                </Flex>
                <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
                <Footer/>
            </Flex>
        </>
           
    );
}
