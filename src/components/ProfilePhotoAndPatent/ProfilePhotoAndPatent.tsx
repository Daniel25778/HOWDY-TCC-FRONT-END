import { Center, Flex, Image, propNames, Text } from '@chakra-ui/react';
import Router from 'next/router';

interface ProfilePhotoAndPatentProps {
    size: string;
    whiteBorder?: boolean;
    user?: any;
    sizePatent?: string;
}

export default function ProfilePhotoAndPatent({ sizePatent,user, size, whiteBorder = false }: ProfilePhotoAndPatentProps) {
    function handleAccessToProfile(){
        Router.push(`/UserPage/Post/${user.idUser}`)
    }
    return (
        <Center position="relative" borderRadius="100%" w={size} h={size} bg="white">
            <Image
                w={whiteBorder ? '95%' : '100%'}
                h={whiteBorder ? '95%' : '100%'}
                borderRadius="100%"
                objectFit="cover"
                src={ user?.profilePhoto
                    ? user.profilePhoto
                    : '/images/default-images/default-profile-photo.svg'}
                onClick={handleAccessToProfile}
                _hover={{cursor: 'pointer'}}    
            />

            <Flex role="group" position="absolute" bottom="0" right="0">
            {user?.patent && <Image cursor="pointer" zIndex="1" w={sizePatent} src={`/images/howdy-images/class/${user.patent}.svg`} />}
                <Text
                    px="15px"
                    py="2px"
                    w="100px"
                    fontWeight="black"
                    color="white"
                    bg={`howdyColors.${user?.patent}`}
                    borderRadius="100px 100px 100px 0px"
                    position="absolute"
                    bottom=".5vw"
                    zIndex="-1"
                    left="0"
                    transition="left 1s, z-index .5s"
                    fontSize={['2xl', 'md', 'sm']}
                    wordBreak="keep-all"
                    textAlign="right"
                    _groupHover={{
                        left: '5vw',
                        zIndex: '0',
                    }}
                >
                    {user?.patent?.substring(0, 1).toUpperCase() + user?.patent?.substring(1)}
                </Text>
            </Flex>
        </Center>
    );
}
