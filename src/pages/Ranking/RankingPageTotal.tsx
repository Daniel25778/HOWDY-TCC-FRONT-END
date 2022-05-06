import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api as apiFunction } from '../../services/api';
import { Header } from "../../components/Header/Header";
import { getUserLogged } from "../../functions/getUserLogged";
import { UserLogged } from '../../interfaces/UserLogged';
import { NavLink } from "../../components/NavLink/Header/NavLink";
import { FiSearch } from "react-icons/fi";
import PlacingRanking from "../../components/Ranking/PlacingRanking";
import Head from "next/head";

export default function RankingPage() {

    const api = apiFunction();

    const [userLogged, setUserLogged] = useState<UserLogged>(null);
    const [rankingTotal, setRankingTotal] = useState<[]>([]);
    const [valueInputSearchRanking, setValueInputSearchRanking] = useState<string>('');

    useEffect(() => {
        getUserLogged(api).then((userLogged) => {
            if (userLogged) {
                setUserLogged(userLogged);
            }
            api.get(`/ranking/Total/?nameFilter=${valueInputSearchRanking}`).then((response) => {
                setRankingTotal(response.data);
            }).catch((err) => {
                console.log(err);
            })
        });
    }, [valueInputSearchRanking]);


    return (
        <>
            <Head>
                <title>HOWDY - RANKING</title>
            </Head>
            <Header user={userLogged} />
            <Flex flexDir="column" p="15%" align="center" justifyContent="center" w="100%">
                <Flex mb="5%" justify="space-between" w="60%">
                    <NavLink href={"/Ranking/RankingPageWeekly"} title={"Semanal"}></NavLink>
                    <NavLink href={"/Ranking/RankingPageMonthly"} title={"Mensal"}></NavLink>
                    <NavLink href={"/Ranking/RankingPageTotal"} title={"Total"}></NavLink>
                </Flex>
                <Text mb="5%" fontWeight="bold" fontSize={['medium', 'x-large', 'xxx-large']} color="howdyColors.mainBlack" >Ranking de ganho de XP semanal.</Text>
                <InputGroup mb="5%" width="35vw" variant="filled">
                    <InputLeftElement
                        px="1%"
                        pointerEvents='none'
                        children={<FiSearch size="5rem" color='#6A7DFF' />}
                    />
                    <Input
                        px="2%"
                        borderColor="howdyColors.mainBlue"
                        name="search"
                        placeholder="Descubra onde você está no ranking!"
                        type="text"
                        focusBorderColor="howdyColors.mainWhite"
                        borderRadius="100px 100px 100px 100px"
                        id="search-input"
                        onChange={(e) =>setValueInputSearchRanking(e.target.value)}
                        variant={'outline'}
                    >
                    </Input>

                </InputGroup>

                <Flex flexDir="column" p="5%" w="100%" bgColor="howdyColors.mainWhite">
                    <Flex w="55%" justifyContent="space-between">
                        <Text fontWeight="bold" fontSize={['medium', 'x-large', 'xxx-large']} color="howdyColors.mainBlack">Posição</Text>
                        <Text fontWeight="bold" fontSize={['medium', 'x-large', 'xxx-large']} color="howdyColors.mainBlack">XP</Text>
                        <Text fontWeight="bold" fontSize={['medium', 'x-large', 'xxx-large']} color="howdyColors.mainBlack">Usuário</Text>
                    </Flex>
                    <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
                    {
                        rankingTotal.length > 0 && rankingTotal?.map(ranking => (
                            <PlacingRanking ranking={ranking}/>  
                        ))
                    }
                    
                </Flex>
            </Flex>


        </>
    )
}
