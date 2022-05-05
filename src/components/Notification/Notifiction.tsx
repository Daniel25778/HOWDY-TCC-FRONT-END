import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsFillChatSquareTextFill, BsPeople } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

interface notification {
    idNotification: number;
    notificationText: string;
    wasRead: boolean;
    createdAt: string;
    idNotificationType: number;
    idUserSender: number;
    idUserReceiver: number;
    type: string;
    userSenderName: string;
    userSenderProfilePhoto: string;
}

interface NotificationProps {
    notification: notification;
}
export default function Notification({ notification }: NotificationProps) {
    const [dateCreatedAt, setDateCreatedAt] = useState<any>(0);
    

    const createdAtDate = new Date(notification.createdAt)

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
            <Flex w="100%" mb="6%">
                <Flex w="40%" align="center">
                    <Image borderRadius="100%" w="5rem" h="5rem" src={notification.userSenderProfilePhoto}></Image>
                </Flex>
                <Flex  flexDir="column" justifyContent={'center'} w="90%">
                    <Flex flexDir={'column'} w="100%">
                        <Text fontWeight="bold" fontSize={['medium','large', 'xx-large']} color="howdyColors.mainBlack" w="100%">
                            {notification.userSenderName}
                        </Text>
                        <Text fontSize={['sm', '', 'medium', 'x-large']} color="gray.500" w="100%">
                            {notification.notificationText}
                        </Text>
                    </Flex>

                    <Flex align="center" gap="2">
                        {notification.type === 'Friend request pending' ?
                            <Icon
                            opacity="2"
                            as={BsPeople}
                            color={'howdyColors.mainBlue'}
                            fontSize={'xx-large'}
                        />: notification.type === 'Someone texted you' ?
                        <Icon
                            opacity="2"
                            as={BsFillChatSquareTextFill}
                            color={'howdyColors.mainBlue'}
                            fontSize={'xx-large'}
                            />
                            : notification.type === 'Friend Request Accepted' ?
                            <Icon
                            opacity="2"
                            as={BsFillChatSquareTextFill}
                            color={'howdyColors.mainGreen'}
                            fontSize={'xx-large'}
                            />
                            : notification.type === 'Commentary' ?
                            <Icon
                            opacity="2"
                            as={AiOutlineMessage}
                            color={'howdyColors.mainGreen'}
                            fontSize={'xx-large'}
                            />
                            :  notification.type === 'Someone bought your activity' ?
                            <Icon
                            opacity="2"
                            as={MdAttachMoney}
                            color={'howdyColors.mainGreen'}
                            fontSize={'xx-large'}
                            />
                            :  
                            <Icon
                            opacity="2"
                            as={FaRegEdit}
                            color={'howdyColors.mainGreen'}
                            fontSize={'xx-large'}
                            />

                        }
                        <Text color="gray.500" fontSize={['sm', '', 'medium', 'large']}>{dateCreatedAt} min </Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
