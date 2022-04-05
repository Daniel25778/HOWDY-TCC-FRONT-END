import { Header } from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../../functions/getUserLogged";
import Loading from "../../components/Loading/Loading";
import { Button, Flex, Input, InputGroup, Stack } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
interface PostsProps {
    idUser?: string;
}

export default function Posts(props:PostsProps){

    const [userLogged, setUserLogged] = useState<any>(null);
    const router = useRouter();

    const { idUser } = props;

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');

    const [userPosts, setUserPosts] = useState<any>('nulo');
    

    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar usuario atraves do id

            api.get(`users/${idUser}`).then(response => {
                response.data && setUser(response.data[0]);
            });

            //Pegar postagens do usuario atraves do id

            api.get(`posts/user/${idUser}`).then(response => {
                response.data && setUserPosts(response.data[0]);
            })


        }
    } , [router.isFallback]);
    
    if (router.isFallback) {
        return (
            <Loading />
        )
      }


    return (
        <> 

            

            <Header user={userLogged}></Header>

           
            <Flex h="30vh">
            <Post user={user}userPosts={userPosts}></Post>
            </Flex>

        <Flex
            align="center" flexDir="column" p="5%" width="100%" justify="center" borderRadius="20" h="10vh" bgColor={"gray.200"} w="40%">
            <Stack spacing={3}>
                <Input width={400} variant="filled" marginBottom="60px" placeholder='Write in English about whatever you want!' borderRadius="100" h="5vh"></Input>
            </Stack>
            <Button bgColor='howdyColors.mainBlue' textColor={'howdyColors.mainWhite'} left="150">Postar</Button>

        </Flex>
        
        </>
    )
}