import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header/Header";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";
import { getUserLogged } from '../../../functions/getUserLogged';
import { api as apiFunction } from '../../../services/api';


interface PostUserPageProps {
    idUser: string;
}


export default function TeachPage(props: PostUserPageProps) {

    const { idUser } = props;
    const api = apiFunction();
    const [userLogged, setUserLogged] = useState<any>(null);

    useEffect(() => {
        getUserLogged(api).then((res) => {
            setUserLogged(res);
        });
    }, []);
    // const router = useRouter();
    // if (router.isFallback) {
    //   return (
    //       <>
          
    //           <Loading></Loading>

    //       </>
    //   );
    // }
    return(
        <>
            <Head>
                <title>HOWDY - USER PAGE</title>
            </Head>
                <Header user={userLogged} />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage user={props.idUser}></UserDataPage>
            </Box>
        </>
    )
}            