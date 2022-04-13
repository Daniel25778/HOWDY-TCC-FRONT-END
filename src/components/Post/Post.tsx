import { Button, Flex, Icon, IconButton, Image, Input, InputGroup, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { MdTranslate } from "react-icons/md";
import { isUndefined } from "util";
import Router from 'next/router';
import { GetStaticPaths, GetStaticProps } from "next";
import Comments from "../Comments/Comments";

interface PostProps {
    user?: any;
    userPosts?: any;
    commentary?: any;
}

export default function Post(props: PostProps){
    const createdAt = new Date(props.userPosts?.createdAt).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const [havePosts, setHavePosts] = useState<any>([]);
    const [display, setDisplay] = useState<any>("none");
    const [colorIconMessage, setColorIconMessage] = useState<any>("howdyColors.mainBlue");
    const [colorBoxMessage, setColorBoxMessage] = useState<any>("#fff");


    useEffect(() => {
        setHavePosts(props.userPosts == undefined);
    })
   
    
    function handleAccessToProfile(){
        Router.push(`/UserPage/Post/${props.userPosts.userCreator.idUser}`)
    }

    function handleAccessComments(){
       
       setDisplay("flex")
       setColorIconMessage("howdyColors.mainWhite");
       setColorBoxMessage("howdyColors.mainBlue");
       console.log(display)
    }
    

    return(
        <>
            { 
            havePosts ?
                <Flex align="center" flexDir="column" p="5%" width="100%" justify="center">
                    <Flex borderRadius="15" w="80%" h="10vh" justify="center" align="center">
                        <Text color="howdyColors.mainBlack"
                        fontWeight={'bold'}
                        fontSize={['sm', 'xx-large', 'xx-large']}
                        >
                            Ops...Não foi possivel encontrar postagens para exibir
                        </Text>
                        
                    </Flex>
                    <Image
                        width={500}
                        maxWidth={500}
                        objectFit="cover"
                        marginBottom={8}
                        src="/images/illustrations/notHavePosts.png">
                    </Image>
                </Flex>
                :
                <Flex  width="100%" align={'center'} mt="5%" flexDir="column">
                <Flex mb="1%" gap="3%" width="40%">
                    <Flex>
                        <Image 
                            borderRadius="100%"
                            height="5rem"
                            objectFit="cover"
                            src={props.user.profilePhoto}
                            alt="profilePhoto"
                            _hover={{cursor: 'pointer'}}
                            onClick={handleAccessToProfile}
                        ></Image>
                    </Flex>
                    <Flex>
                        <Flex flexDir="column">
                            <Flex align="center" gap="1%">
                                <Text 
                                    color="howdyColors.mainBlack"
                                    fontWeight={'bold'}
                                    fontSize={['sm', 'md', 'x-large']}
                                >
                                    {props.user.userName}
                                </Text>
                                <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                    {' '}
                                    ● {createdAt}
                                </Text>
                            </Flex>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                               {props.userPosts.textContent}
                            </Text>
                            <IconButton 
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={
                                    <Icon 
                                        opacity="2"
                                        as={MdTranslate}
                                        color="howdyColors.mainWhite"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mb="1%">
                    <Image
                        borderRadius="50"
                        height="25rem"
                        w="50rem"
                     
                        src={props.userPosts.imageContent}
                        alt="f"
                    ></Image>
                </Flex>
                <Flex justify="space-between" align="center" width="20%">
                    <Flex align="center" h="100%" borderRadius="100px 100px 0px 0px" bgColor={colorBoxMessage} justifyContent="center" gap="10%" w="40%">
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="#ffffff00"
                            borderRadius="15"
                            onClick ={() => {handleAccessComments()}}
                            _hover={{cursor: 'pointer'}}
                            icon={
                                <Icon
                                    opacity="2"
                                    as={AiOutlineMessage}
                                    color={colorIconMessage}
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                        <Text  color={colorIconMessage} fontSize={['sm', 'md', 'md']}>
                            {props.userPosts.totalComments}
                        </Text>
                    </Flex>

                    <Flex gap="10%" w="20%" align="center">
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="#ffffff33"
                            borderRadius="15"
                            icon={
                                <Icon
                                    opacity="2"
                                    as={AiOutlineHeart}
                                    color="howdyColors.mainBlue"
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                        <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                            1 mil
                        </Text>
                    </Flex>
                </Flex>
                {console.log(props.commentary)}
                <Flex p="1%" flexDir="column" borderRadius="12" bgColor="howdyColors.mainBlue" display={display} justifyContent="center" width="50%">
                    {
                        props.commentary !== 'nulo' && props.commentary?.map(commentary => ( 
                            <Comments key={commentary.id} commentary={commentary}></Comments> 
                        ))
                    } 
                    <Flex gap="2%" align="center" w="100%">
                        <Image borderRadius="100%" width="10%" maxWidth={500}  src={ '/images/default-images/default-profile-photo.svg'}/>
                        <InputGroup h="60%" width="70%" variant="unstyled">
                            <Input
                                fontSize={['sm', 'md', 'x-large']}
                                px="2%"
                                bg="howdyColors.main"
                                name="search"
                                placeholder="Comente também em (Inglês)"
                                type="text"
                                focusBorderColor="howdyColors.mainWhite"
                                borderRadius="100px"
                                id='search-input'
                            />
                        </InputGroup>
                        <Button bgColor='#fff3' textColor={'howdyColors.mainWhite'} w="20%">Postar</Button>
                    </Flex>
                    
                </Flex>
            </Flex>
            }
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
    const { idUser } = params;

    return {
        props: { idUser },
    };
};