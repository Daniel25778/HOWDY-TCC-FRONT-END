import { Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';


interface MessageProps {
    message:any
}
export default function Message({message}: MessageProps) {

    return (
        <>
            <Flex justifyContent="center" mb="7%" bgColor="howdyColors.mainBlue" borderRadius="100px">
                <Text fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                    {message.textContent}
                </Text>
            </Flex>
        </>
    );
}
