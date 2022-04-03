import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import { FormLogin } from '../components/Form/FormLogin';
import { Flex, Text,Image, Heading, Button} from '@chakra-ui/react';
import PageCadastro from './register/[isLogged]';
import { HeaderNotLogged } from '../components/Header/HeaderNotLogged';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "../styles/swiper.module.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Router from 'next/router';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Scrollbar, A11y, Autoplay } from 'swiper';
import { CategoryIcon } from '../components/CategoryIcon/CategoryIcon';
import { SliderContent } from '../components/SliderContent/SliderContent';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Scrollbar, A11y, Autoplay]);


export default function Home() {
   
    return (
        <>
            <HeaderNotLogged/>
            <Flex
            w="100%"
            flexDir="column"
            align="center"
            bgGradient="linear(to-t, howdyColors.mainWhite, #F2F2F2,howdyColors.mainWhite)"
            >
                <Flex flexDir="column" py="8%" px="15%" mt="8.2%"  width="100%">
                    <Flex>
                        <Flex py="9%" w="50%"  flexDir="column">
                            <Text fontWeight="medium">Howdy!</Text>
                            <Heading fontSize="3xl" wordBreak="break-word">Aprenda e ensine</Heading>
                            <Heading fontSize="4xl" wordBreak="break-word">idiomas interagindo!</Heading>
                            <Heading>Come on, baby!</Heading>
                            <Text mt="4%" w="65%">Acesse exercícios e interações com pessoas do mundo inteiro que carregam o mesmo objetivo.</Text>
                            <Button mt="4%" color="howdyColors.mainGreen" bgColor="howdyColors.mainGreenTransparent" borderRadius="25" w="40%" >Subscribe now</Button>
                        </Flex>
                        <Flex w="50%">
                            <Image 
                            w="100%"
                            h="70%"
                            src="\images\illustrations\manLandingPage.svg"
                            ></Image>
                        </Flex>
                    </Flex>
                    <Flex>
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
                            <SwiperSlide>
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
                </Flex>
                <Flex bgColor="howdyColors.mainBlack" w="100%" justify="center" align="center">
                    <Flex justify="center" w="100%">
                        <Image
                        src="/images/howdy-images/subscription/free-subs.svg">
                        </Image>
                    </Flex> 

                    <Flex justify="center" w="100%">
                        <Image
                        src="/images/howdy-images/subscription/pro-subs.svg">
                        </Image>
                    </Flex> 
                </Flex>
            </Flex>
        </>
           
    );
}
