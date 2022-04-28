import { IconProps } from '@chakra-ui/core';
import { Box, ComponentWithAs, Icon, IconButton } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsPersonDash, BsPersonPlus } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';

interface FriendshipButtonProps {
    bg: string;
    color: string;
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    display: string;
    onclick?: any;
}

export function IconPageUserButton({ bg, color, icon, display,onclick }: FriendshipButtonProps) {
    return (
        <IconButton
            h="80px"
            w="80px"
            mt="5vw"
            ml="10%"
            borderRadius="100%"
            variant="unstyled"
            aria-label="Open navigation"
            pt="10px"
            fontSize="40px"
            bg={bg}
            color={color}
            icon={icon}
            display={display}
            onClick={onclick}
        />
    );
}
