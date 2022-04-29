import { Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
interface ChatProps {
    messages: any;
    friendList?: any;
}



export default function Chat(props: ChatProps) {
//     const [friendForChat, setFriendForChat] = useState<any>(null);

//     {props.friendList.length > 0 &&
//     props.friendList.map((friend) => (
//         setFriendForChat(friend),
//         console.log(friendForChat)
//     ))
// }

    return (
        <>
            <Flex bgColor="howdyColors.mainWhite" w="100%">
                <Flex w="100%" gap="5%" align="center" justify="center" >
                    <Image
                        borderRadius="100%"
                        h="4rem"
                        w="4rem"
                        objectFit="cover"
                        // src={
                        //     friendForChat?.profilePhoto
                        //         ?  friendForChat.profilePhoto
                        //         : '/images/default-images/default-profile-photo.svg'
                        // }
                        alt="profilePhoto"
                    ></Image>
                    <Text fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                        {/* {friendForChat.userName} */}
                    </Text>

                </Flex>
            </Flex>
        </>
    );
}
