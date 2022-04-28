import { Box, Icon, IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsPersonDash, BsPersonPlus } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { IconPageUserButton } from './IconPageUserButton';
import { api as apiFunction } from '../../services/api';

interface FriendshipButtonProps {
    idUser: number;
    stateButton: string;
    stateFlexButton: string;
    idUserFriend: any;
}



export function FriendshipButton({ idUser, stateButton,stateFlexButton,idUserFriend }: FriendshipButtonProps) {

    const router = useRouter();
    const api = apiFunction();

    function handleDeleteFriendship(){
        api.delete(`friendships/${idUserFriend}`).then(response => {
            console.log(response);
        });
    }
    
    function handleAcceptFriendship(){
        api.put(`friendships/accept/${idUserFriend}`).then(response => {
            console.log(response);
        });
    }

    
  
        // useEffect(() => {
        //     if(!router.isFallback) {
        //         api.delete(`friendships/${idUserFriend}`).then(response => {
        //             console.log(response);
        //         });    
        //     }
            
        // } , [router.isFallback]);
        
        // if (router.isFallback) {
        //     return (
        //         <Loading />
        //     )
        //   }
    

    return (
        <>
            { stateButton == 'userIsNotFriend' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainGreenTransparent"
                    color="howdyColors.mainGreen"
                    onclick={handleAcceptFriendship}
                    icon={<Icon opacity="2" as={BsPersonPlus} fontWeight="black" />}
                />
            ) : stateButton == 'areFriends' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    icon={<Icon opacity="2" as={BsPersonDash} fontWeight="black" />}
                    onclick={handleDeleteFriendship}
                />
            ) : stateButton == 'sendFriendShipRequest' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    icon={<Icon opacity="2" as={MdOutlinePersonAddDisabled} fontWeight="black" />}
                />
            ) : (
                <Box w="80px" ml="10%">
                    <IconButton
                        display={stateFlexButton}
                        h="80px"
                        w="80px"
                        mt="5vw"
                        borderRadius="100%"
                        variant="unstyled"
                        aria-label="Open navigation"
                        pt="10px"
                        fontSize="40px"
                        bg="howdyColors.mainGreenTransparent"
                        color="howdyColors.mainGreen"
                        icon={<Icon opacity="2" as={BiCheck} fontWeight="black" />}
                    />
                    <IconButton
                        display={stateFlexButton}
                        h="80px"
                        w="80px"
                        mt="20px"
                        borderRadius="100%"
                        variant="unstyled"
                        aria-label="Open navigation"
                        pt="10px"
                        fontSize="40px"
                        bg="howdyColors.mainRedTransparent"
                        color="howdyColors.mainRed"
                        icon={<Icon opacity="2" as={BsPersonDash} fontWeight="black" />}
                    />
                </Box>
            )}
        </>
    );
}
