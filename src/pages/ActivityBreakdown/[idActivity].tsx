import { Flex, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import { getUserLogged } from "../../functions/getUserLogged";
import { api as apiFunction } from '../../services/api';

interface ActivityBreakdownProps {
    idActivity: string;
}

export default function ActivityBreakdown(props: ActivityBreakdownProps) {
    const [userLogged, setUserLogged] = useState<any>(null);
   
    const { idActivity } = props;
    const [activity, setActivity] = useState<any>(null);

    const router = useRouter();
    
    const api = apiFunction();

    //RESGATANDO USUÁRIO LOGADO
    useEffect(() => {
        getUserLogged(api).then((userLogged) => {
            userLogged && setUserLogged(userLogged);
        });
    }, []);

    console.log(idActivity);

    useEffect(() => {
        if (!router.isFallback) {
            api.get(`/activities/${idActivity}`).then(response => {
                var h = response.data;
                setActivity(h);
            }
            ).catch(err => console.log(err))
        }
    },[])
    
  console.log(activity);
   
    return (
        <>
            <Head>
                <title>HOWDY - DETALHAMENTO DA ATIVIDADE</title>
            </Head>


           <Header user={userLogged}/>

           
              <Flex mt="6.5%" justifyContent="center"  width="100%" py="8%">
              <Text  color="howdyColors.mainRed"></Text>
              </Flex>
            
              
                   
               

          

        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idActivity } = params;

    return {
        props: { idActivity },
    };
};
