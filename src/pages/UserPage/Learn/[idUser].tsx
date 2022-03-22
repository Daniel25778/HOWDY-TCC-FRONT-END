import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../../../components/Header/Header";
import UserDataPage from "../../../components/UserDataPage/UserDataPage";

export default function LearnPage(){
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
                <Header />
            <Box pt="7rem" as="main" px="100px" bg="red" bgImg="/images/background.png">
                <UserDataPage></UserDataPage>
            </Box>
        </>
    )
}            