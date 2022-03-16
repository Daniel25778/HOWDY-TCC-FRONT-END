import { Box, Icon, IconButton } from '@chakra-ui/react';
import { BiCheck } from 'react-icons/bi';
import { BsPersonDash, BsPersonPlus } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { IconPageUserButton } from './IconPageUserButton';

interface FriendshipButtonProps {
    idUser: number;
}

export function FriendshipButton({ idUser }: FriendshipButtonProps) {
    return (
        <>
            {true ? (
                <IconPageUserButton
                    bg="howdyColors.mainGreenTransparent"
                    color="howdyColors.mainGreen"
                    icon={<Icon opacity="2" as={BsPersonPlus} fontWeight="black" />}
                />
            ) : true ? (
                <IconPageUserButton
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    icon={<Icon opacity="2" as={BsPersonDash} fontWeight="black" />}
                />
            ) : true ? (
                <IconPageUserButton
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    icon={<Icon opacity="2" as={MdOutlinePersonAddDisabled} fontWeight="black" />}
                />
            ) : (
                <Box w="80px" ml="10%">
                    <IconButton
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
