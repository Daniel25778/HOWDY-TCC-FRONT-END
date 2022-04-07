import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiTargetLock } from "react-icons/bi";
import ProfilePhotoAndPatent from "../ProfilePhotoAndPatent/ProfilePhotoAndPatent";

interface FriendsProps {
    userFriends?: number;
    friendName?: string;
    friendTargetLanguage?: string;
    friendTotalXp?: string;
}

export default function Friends(props: FriendsProps){

    const [haveFriends, setHaveFriends] = useState<any>([]);

    useEffect(() => {
        setHaveFriends(props.userFriends == undefined);  
    })
     
   //
    return(
        <>
             {
             haveFriends ?
             
                <Flex align="center" flexDir="column" p="5%" width="100%" justify="center">
                    <Flex borderRadius="15" w="80%" h="10vh" justify="center" align="center">
                        <Text color="howdyColors.mainBlack"
                        fontWeight={'bold'}
                        fontSize={['sm', 'xx-large', 'xx-large']}
                        >
                            Ops...Não foi possivel encontrar amigos para exibir
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
                <Flex>
                    <ProfilePhotoAndPatent size="15rem" user={props.userFriends}></ProfilePhotoAndPatent>
                    <Flex justify="center" ml="30px" flexDir={'column'} gap="8%">
                        <Text fontSize={['sm', 'md', 'x-large']} fontWeight="bold">
                            {props.friendName}
                        </Text>
                        <Text fontSize={['sm', 'md', 'medium']}>{props.friendTotalXp} XP</Text>
                        <Flex>
                            <Icon as={BiTargetLock} color="howdyColors.mainBlue" fontSize="x-large" />
                            <Text color="howdyColors.mainBlue">{props.friendTargetLanguage}</Text>
                        </Flex>
                    </Flex>
                </Flex>
               
            }
        
        </>
    )
}