import { Header } from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { useEffect, useState } from "react";
import { getUserLogged } from "../../functions/getUserLogged";
import Loading from "../../components/Loading/Loading";
interface PostsProps {
    idUser?: string;
}

export default function Posts(props:PostsProps){

    const { idUser } = props;
    const router = useRouter();
    const [userLogged, setUserLogged] = useState<any>(null);

    const api = apiFunction();

    const [user, setUser] = useState<any>('nulo');
    

    useEffect(() => {
        if(!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });
                api.get(`users/${idUser}`).then(response => {
                    response.data && setUser(response.data[0]);
                });

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
            <Post user={user}></Post>
            <Post user={user}></Post>
            <Post user={user}></Post>
        
        </>
    )
}