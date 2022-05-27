import { Box, Text, Grid, Flex, Image, Heading, Center, Table, Thead, Tr, Th, Tbody, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../../components/Header/Header';
import { NavLink } from '../../components/NavLink/Header/NavLink';
import UserDataPage from '../../components/UserDataPage/UserDataPage';
import { BiTargetLock } from 'react-icons/bi';
import ProfilePhotoAndPatent from '../../components/ProfilePhotoAndPatent/ProfilePhotoAndPatent';
import { useEffect, useState } from 'react';
import { api as apiFunction } from '../../services/api';
import { useRouter } from 'next/router';
import { getUserLogged } from '../../functions/getUserLogged';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Loading from '../../components/Loading/Loading';
import ResultSearchPeople from '../../components/ResultSearch/ResultSearchPeople';
import { Activity } from '../../components/Activity/Activity';
import { ResultActivity } from '../../components/Activity/ResultActivity';

interface SearchPageProps {
    userSearch?: string;
}

export default function SearchPage({ userSearch }: SearchPageProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const api = apiFunction();

    const [search, setSearch] = useState<any>('nulo');
    const [searchActivities, setSearchActivities] = useState<any>('nulo');

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar resultado de pesquisa atraves do nome do usuario

            api.get(`users/getByName/${userSearch}`).then((response) => {
                if (response.data?.error) setSearch([]);
                else if (response.data) setSearch(response.data);
            });

            //Pegar resultado de pesquisa atraves do nome da atividade

            api.get(`activities/name/${userSearch}`).then((response) => {
                if (response.data?.error) setSearchActivities([]);
                else if (response.data) setSearchActivities(response.data);
            });
        }
    }, [router.isFallback]);

    if (router.isFallback) {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>HOWDY - Resultados de {userSearch}</title>
            </Head>
            <Header user={userLogged} />
            <Flex
                flexDir="column"
                alignItems="center"
                pt="15rem"
                as="main"
                px="100px"
                bg="red"
                bgImg="/images/background.png"
            >
                {console.log(searchActivities)}
                <Center fontWeight="bold" fontSize="2.5rem" color="howdyColors.mainBlack" flexDir="column" w="100%">
                    <Heading fontSize="2.5rem">Resultados da pesquisa:</Heading>
                    <Text display="flex">
                        " <Text color="howdyColors.mainBlue">{userSearch}</Text> "
                    </Text>
                </Center>
                <Table mt="10" minW="800px" w="70%" bg="howdyColors.mainWhite">
                    <Thead>
                        <Tr>
                            <Th pt="30px" textTransform="capitalize" color="howdyColors.mainBlack" fontSize="2.3rem">
                                Pessoas
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {search !== 'nulo' &&
                            search.map((search) => <ResultSearchPeople key={search.id} ResultSearchPeople={search} />)}
                    </Tbody>
                </Table>

                <Table mt="10" minW="800px" w="70%" bg="howdyColors.mainWhite">
                    <Thead>
                        <Tr>
                            <Th pt="30px" textTransform="capitalize" color="howdyColors.mainBlack" fontSize="2.3rem">
                                Atividades
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Flex flexDir="column">
                            {searchActivities !== 'nulo' &&
                                searchActivities.map((search) => (
                                    <ResultActivity key={search.id} user={search} ResultActivities={search} />
                            ))}
                        </Flex>
                        
                    </Tbody>
                </Table>
            </Flex>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { userSearch } = params;

    return {
        props: { userSearch },
    };
};
