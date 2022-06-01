import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Grid,
	Heading,
	Icon,
	IconButton,
	Image,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import Loading from "../components/Loading/Loading";
import { useRouter } from "next/router";

import { getUserLogged } from "../functions/getUserLogged";
import React, { useEffect, useState } from "react";
import { api as apiFunction } from "../services/api";
import { SiVerizon } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";

export default function () {
	const [howdyCoinsWanted, setHowdyCoinsWanted] = useState<number>(0);
	const [monthSubscription, setMonthSubscription] = useState<number>(0);
	const api = apiFunction();
	const toast = useToast();
	const [userLogged, setUserLogged] = useState<any>(null);
	const router = useRouter();
	if (router.isFallback) {
		return <Loading />;
	}

	function handleAddSubscription(monthSubscription) {

		onClose();

		api
			.put(`subscription/add/${monthSubscription}`)
			.then((response) => {
				toast({
					title: "COMPRA REALIZADA COM SUCESSO",
					status: "success",
					isClosable: true,
					position: "top",
				});
			})
			.catch((error) => {
				console.log(
					`You need at least ${howdyCoinsWanted} howdy coins to get this assignature`
				);
				console.log(error.response.data.error);
				switch (error.response.data.error) {
					case `You need at least ${howdyCoinsWanted} howdy coins to get this assignature`:
						toast({
							title: "VOCÊ NÃO POSSUI HOWDY COINS SUFICIENTES PARA ESTA ASSINATURA",
							status: "error",
							isClosable: true,
							position: "top",
						});
						break;

					default:
						toast({
							title: "OCORREU UM ERRO NA COMPRA",
							status: "error",
							isClosable: true,
							position: "top",
						});
						break;
				}
			});
	}
	//RESGATANDO IDTOKEN DO USUÁRIO LOGADO
	const cookies = parseCookies();
	const idToken = cookies["firebaseAccount"];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	return (
		<Flex flexDir='column' w='100%'>
			<Flex
				justifyContent='center'
				p='3%'
				bgColor='howdyColors.mainBlue'
				width='100%'
			>
				<Image
					w='25%'
					src='/images/howdy-images/logo/logo-white-howdyStore.svg'
				></Image>
			</Flex>
			<Flex flexDir='column' width='100%'>
				<Flex justifyContent='center' width='100%'>
					<Text fontWeight='medium' fontSize={["sm", "xx-large", "7xl"]}>
						Compre agora e melhore sua experiência !
					</Text>
				</Flex>
				<Flex justifyContent='center' width='100%'>
					<Flex
						as='form'
						action='http://10.107.144.8:3333/buyHowdyCoin'
						method='POST'
						h='100%'
						w='26%'
						justifyContent='center'
						alignItems='center'
						p='3%'
						flexDir='column'
					>
						<Text
							mb='35%'
							color='howdyColors.mainBlue'
							fontWeight='medium'
							fontSize={["sm", "xx-large", "5xl"]}
						>
							150
						</Text>
						<Image
							w='45%'
							mb='20%'
							src='/images/howdy-images/howdy-coin/Howdy coin.svg'
						></Image>
						<Heading
							mb='15%'
							fontWeight='medium'
							fontSize={["sm", "x-large", "7xl"]}
						>
							R$9,90
						</Heading>
						<input type='hidden' name='redirect' value='true' />
						<input type='hidden' name='howdyCoinsQuantity' value='150' />
						<input type='hidden' name='idToken' value={idToken} />
						<script
							src='https://checkout.stripe.com/checkout.js'
							className='stripe-button'
							data-key='pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF'
							data-amount='990'
							data-currency='BRL'
							data-name='150 Howdy Coins'
							data-description='Utilizada para comprar atividades, e adquirir sua assinatura mensal!'
							data-image='/favicon.ico'
							data-locale='auto'
						></script>
						<script>
							document.getElementsByClassName('stripe-button-el')[0].style.display
							= 'none'
						</script>

						<Button
							_hover={{ bg: "#B9C2FD" }}
							width='100%'
							bg='#CBD2FF'
							color='howdyColors.mainBlue'
							type='submit'
							fontSize={["sm", "large", "x-large"]}
						>
							COMPRAR
						</Button>
					</Flex>

					<Flex
						as='form'
						action='http://10.107.144.8:3333/buyHowdyCoin'
						method='POST'
						h='100%'
						w='25%'
						justifyContent='center'
						alignItems='center'
						p='3%'
						flexDir='column'
					>
						<Text
							mb='35%'
							color='howdyColors.mainBlue'
							fontWeight='medium'
							fontSize={["sm", "xx-large", "5xl"]}
						>
							450
						</Text>
						<Image
							w='100%'
							mb='20%'
							src='/images/howdy-images/howdy-coin/howdyCoin3coins.svg'
						></Image>
						<Heading
							mb='15%'
							fontWeight='medium'
							fontSize={["sm", "x-large", "6xl"]}
						>
							R$ 24,90
						</Heading>
						<input type='hidden' name='redirect' value='true' />
						<input type='hidden' name='howdyCoinsQuantity' value='450' />
						<input type='hidden' name='idToken' value={idToken} />
						<script
							src='https://checkout.stripe.com/checkout.js'
							className='stripe-button'
							data-key='pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF'
							data-amount='2490'
							data-currency='BRL'
							data-name='450 Howdy Coins'
							data-description='Utilizada para comprar atividades, e adquirir sua assinatura mensal!'
							data-image='/favicon.ico'
							data-locale='auto'
						></script>
						<script>
							document.getElementsByClassName('stripe-button-el')[0].style.display
							= 'none'
						</script>
						<Button
							_hover={{ bg: "#B9C2FD" }}
							width='100%'
							bg='#CBD2FF'
							color='howdyColors.mainBlue'
							type='submit'
							fontSize={["sm", "large", "x-large"]}
						>
							COMPRAR
						</Button>
					</Flex>

					<Flex
						as='form'
						action='http://10.107.144.8:3333/buyHowdyCoin'
						method='POST'
						h='100%'
						w='25%'
						justifyContent='center'
						alignItems='center'
						p='3%'
						flexDir='column'
					>
						<Text
							mb='35%'
							color='howdyColors.mainBlue'
							fontWeight='medium'
							fontSize={["sm", "xx-large", "5xl"]}
						>
							650
						</Text>
						<Image
							w='65%'
							mb='20%'
							src='/images/howdy-images/howdy-coin/howdyCoin6coins.svg'
							objectFit='cover'
						></Image>
						<Heading
							mb='15%'
							fontWeight='medium'
							fontSize={["sm", "x-large", "6xl"]}
						>
							R$ 30,90
						</Heading>
						<input type='hidden' name='redirect' value='true' />
						<input type='hidden' name='howdyCoinsQuantity' value='650' />
						<input type='hidden' name='idToken' value={idToken} />
						<script
							src='https://checkout.stripe.com/checkout.js'
							className='stripe-button'
							data-key='pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF'
							data-amount='3090'
							data-currency='BRL'
							data-name='650 Howdy Coins'
							data-description='Utilizada para comprar atividades, e adquirir sua assinatura mensal!'
							data-image='/favicon.ico'
							data-locale='auto'
						></script>
						<script>
							document.getElementsByClassName('stripe-button-el')[0].style.display
							= 'none'
						</script>
						<Button
							_hover={{ bg: "#B9C2FD" }}
							width='100%'
							bg='#CBD2FF'
							color='howdyColors.mainBlue'
							type='submit'
							fontSize={["sm", "large", "x-large"]}
						>
							COMPRAR
						</Button>
					</Flex>

					<Flex
						as='form'
						action='http://10.107.144.8:3333/buyHowdyCoin'
						method='POST'
						h='0%'
						w='25%'
						justifyContent='center'
						alignItems='center'
						p='3%'
						flexDir='column'
					>
						<Text
							mb='35%'
							color='howdyColors.mainBlue'
							fontWeight='medium'
							fontSize={["sm", "xx-large", "5xl"]}
						>
							1000
						</Text>
						<Image
							w='55%'
							mb='20%'
							src='/images/howdy-images/howdy-coin/howdyCoinChest.svg'
						></Image>
						<Heading
							mb='15%'
							fontWeight='medium'
							fontSize={["sm", "x-large", "6xl"]}
						>
							R$ 44,90
						</Heading>
						<input type='hidden' name='redirect' value='true' />
						<input type='hidden' name='howdyCoinsQuantity' value='1000' />
						<input type='hidden' name='idToken' value={idToken} />
						<script
							src='https://checkout.stripe.com/checkout.js'
							className='stripe-button'
							data-key='pk_test_51KoCAOJqzk2oN85Uv9mQWrHTy28bqpqnWCqWqIULYCSxH3YvPQp5qQZQpXqJZEBlwPdDtE6XCXMN8S0WKbnDDkbN00gJlG99YF'
							data-amount='4490'
							data-currency='BRL'
							data-name='1000 Howdy Coins'
							data-description='Utilizada para comprar atividades, e adquirir sua assinatura mensal!'
							data-image='/favicon.ico'
							data-locale='auto'
						></script>
						<script>
							document.getElementsByClassName('stripe-button-el')[0].style.display
							= 'none'
						</script>
						<Button
							_hover={{ bg: "#B9C2FD" }}
							width='100%'
							bg='#CBD2FF'
							color='howdyColors.mainBlue'
							type='submit'
							fontSize={["sm", "large", "x-large"]}
						>
							COMPRAR
						</Button>
					</Flex>
				</Flex>

				<Flex
					py='2%'
					flexDir='column'
					bgColor='howdyColors.mainBlack'
					w='100%'
					justify='center'
					align='center'
				>
					<Text
						color='howdyColors.mainWhite'
						fontWeight='medium'
						fontSize={["medium", "2xl"]}
					>
						Adquira a assinatura “PRO” e desbloqueie
					</Text>
					<Text
						mb='5%'
						fontWeight='medium'
						fontSize={["medium", "2xl"]}
						color='howdyColors.mainBlue'
					>
						INCRÍVEIS FUNCIONALIDADES !
					</Text>

					<Flex h={1200} w='100%'>
						<Flex align='center' flexDir='column' w='50%'>
							<Image
								w='100%'
								h='40%'
								src='/images/howdy-images/subscription/free-subs.svg'
							></Image>
							<Text
								mb='5%'
								color='howdyColors.mainBlue'
								fontWeight='medium'
								fontSize={["medium", "2xl"]}
							>
								FREE
							</Text>
							<Grid templateColumns='repeat(1, 7fr)' gap={6}>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										REALIZAR UMA PUBLICAÇÃO POR DIA
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										COMENTAR AS PUBLICAÇÕES
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										CURTIR AS PUBLICAÇÕES
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										ADICIONAR AMIGOS
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										NIVÉL FACIO,MEDIO DESBLOQUEADO
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										GRAFICO DE DESEMPENHO
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										PARTICIPAÇÃO DO RANKINGS
									</Text>
								</Flex>
							</Grid>
						</Flex>

						<Flex align='center' flexDir='column' w='50%'>
							<Image
								w='100%'
								h='40%'
								src='/images/howdy-images/subscription/pro-subs.svg'
							></Image>
							<Text
								mb='5%'
								color='howdyColors.master'
								fontWeight='medium'
								fontSize={["medium", "2xl"]}
							>
								PRO SUBS
							</Text>
							<Grid templateColumns='repeat(1, 8fr)' gap={6}>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										CHAT COM SEUS AMIGOS
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										PATENTES PERSONALIZADAS
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										PERSONALIZAR FOTO DE FUNDO
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										POSTAGENS ILIMITADAS
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										NIVEL AVANÇADO DESBLOQUEADO
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										COMENTAR AS PUBLICAÇOES
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										CURTIR AS PUBLICAÇOES
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										ADICIONAR AMIGOS
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										GRAFICO DE DESEMPENHO
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										CURTIR AS PUBLICAÇOES
									</Text>
								</Flex>
								<Flex align='center' gap='7%'>
									<SiVerizon color='#29B995'></SiVerizon>
									<Text
										color='howdyColors.mainWhite'
										fontWeight='medium'
										fontSize={["medium"]}
									>
										PARTICIPAÇÃO NOS RANKINGS
									</Text>
								</Flex>
							</Grid>
						</Flex>
					</Flex>

					<Flex gap='7%' w='100%' justifyContent={"center"}>
						<Flex
							width='10%'
							borderRadius='5px'
							bg='howdyColors.mainYellow'
							align='center'
						>
							<Button
								width='80%'
								h='5rem'
								variant='unstyled'
								aria-label='Open navigation'
								fontSize='2rem'
								bg='#4F3172'
								borderRadius='5px 0px 0px 0px'
								color='white'
								onClick={() => {
									setHowdyCoinsWanted(200);
									setMonthSubscription(1)
									onOpen();
								}}
							>
								<Text
									wordBreak='break-word'
									color='howdyColors.mainWhite'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									+1 MÊS
								</Text>
							</Button>

							<Flex gap='4' width='100%' align='center' justifyContent='center'>
								<Image
									height='4rem'
									src='/images/howdy-images/howdy-coin/Howdy coin.svg'
									alt='howdy coin'
								></Image>

								<Text
									color='howdyColors.brownHowdyCoin'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									200
								</Text>
							</Flex>
						</Flex>

						<Flex
							width='10%'
							borderRadius='5px'
							bg='howdyColors.mainYellow'
							align='center'
						>
							<Button
								width='80%'
								h='5rem'
								variant='unstyled'
								aria-label='Open navigation'
								fontSize='2rem'
								bg='#4F3172'
								borderRadius='5px 0px 0px 0px'
								color='white'
								onClick={() => {
									setHowdyCoinsWanted(550);
									setMonthSubscription(3)
									onOpen();
								}}
							>
								<Text
									wordBreak='break-word'
									color='howdyColors.mainWhite'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									+3 MÊS
								</Text>
							</Button>

							<Flex gap='4' width='100%' align='center' justifyContent='center'>
								<Image
									height='4rem'
									src='/images/howdy-images/howdy-coin/Howdy coin.svg'
									alt='howdy coin'
								></Image>

								<Text
									color='howdyColors.brownHowdyCoin'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									550
								</Text>
							</Flex>
						</Flex>

						<Flex
							width='10%'
							borderRadius='5px'
							bg='howdyColors.mainYellow'
							align='center'
						>
							<Button
								width='80%'
								h='5rem'
								variant='unstyled'
								aria-label='Open navigation'
								fontSize='2rem'
								bg='#4F3172'
								borderRadius='5px 0px 0px 0px'
								color='white'
								onClick={() => {
									setHowdyCoinsWanted(2000);
									setMonthSubscription(12)
									onOpen();
								}}
							>
								<Text
									wordBreak='break-word'
									color='howdyColors.mainWhite'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									+12 MÊS
								</Text>
							</Button>

							<AlertDialog
								isOpen={isOpen}
								leastDestructiveRef={cancelRef}
								onClose={onClose}
							>
								<AlertDialogOverlay>
									<AlertDialogContent>
										<AlertDialogHeader fontSize='lg' fontWeight='bold'>
											Confirmação de compra 
										</AlertDialogHeader>

										<AlertDialogBody>
											Você tem certeza que deseja comprar a assinatura?
										</AlertDialogBody>

										<AlertDialogFooter>
											<Button ref={cancelRef} onClick={onClose}>
												NÃO
											</Button>
											<Button
												colorScheme='green'
												onClick={() =>
													handleAddSubscription(monthSubscription)
												}
												ml={3}
											>
												SIM
											</Button>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialogOverlay>
							</AlertDialog>

							<Flex gap='4' width='100%' align='center' justifyContent='center'>
								<Image
									height='4rem'
									src='/images/howdy-images/howdy-coin/Howdy coin.svg'
									alt='howdy coin'
								></Image>

								<Text
									color='howdyColors.brownHowdyCoin'
									fontWeight='medium'
									fontSize={["sm", "large", "x-large"]}
								>
									2000
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
