import { Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
interface MessageProps {
    message:any
    userLogged:any
}
export default function Message({message, userLogged}: MessageProps) {
    const [dateCreatedAt, setDateCreatedAt] = useState<any>(0);
    

    const createdAtDate = new Date(message.createdAt)

    const currentDate = new Date()

    const dataFormatted = currentDate.getTime() - createdAtDate.getTime()
 
    const dataFormattedSecond = dataFormatted / 1000
    const dataFormattedSecondString = dataFormattedSecond.toString()
    const dataFormattedSecondFirstCharacter = dataFormattedSecondString[0]

    const dataFormattedMinute = dataFormattedSecond / 60
    const dataFormattedMinuteString = dataFormattedMinute.toString()
    const dataFormattedMinuteFirstCharacter = dataFormattedMinuteString[0]

    const dataFormattedHour = dataFormattedMinute / 60
    const dataFormattedHourString = dataFormattedHour.toString()
    const dataFormattedHourFirstCharacter = dataFormattedHourString[0]

    useEffect(() => {
        setDateCreatedAt(dataFormattedMinuteFirstCharacter)
    } , [dateCreatedAt])
    return (
        <>
            {message.idUserSender == userLogged.idUser ? (
                <Flex  justifyContent={'flex-end'} w="100%">
                    <Flex justifyContent="center"  mb="7%" bgColor="howdyColors.mainBlue" width="50%" borderRadius="100px">
                        <Text fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                            {message.textContent}
                        </Text>
                        
                    </Flex>
                    <Text>{dateCreatedAt} min</Text>
                </Flex>
            ) : (
                <Flex justifyContent={'flex-start'} w="100%">
                    <Flex justifyContent="center"  mb="7%" bgColor="howdyColors.mainBlack" width="50%" borderRadius="100px">
                        <Text color="howdyColors.mainWhite" fontWeight="medium" fontSize={['sm', 'medium', 'x-large']}>
                            {message.textContent}
                        </Text>
                    </Flex>
                </Flex>
            )
        }
            
            
        </>
    );
}
