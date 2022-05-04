import { Flex, Icon, Image, Text } from '@chakra-ui/react';

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
    console.log(notification);
    return (
        <>
            <Flex w="100%">
                <Flex align="center">
                    <Image borderRadius="100%" w="60%" h="60%" src={notification.userSenderProfilePhoto}></Image>
                </Flex>
                <Flex bgColor="#f2f" flexDir="column" justifyContent={'center'} w="70%">
                    <Flex flexDir={'column'} w="100%">
                        <Text  fontSize={['large','large', 'xx-large']} color="howdyColors.mainWhite" w="100%">
                            {notification.userSenderName}
                        </Text>
                        <Text fontSize={['sm', '', 'medium', 'x-large']} color="howdyColors.mainWhite" w="100%">
                            {notification.notificationText}
                        </Text>
                    </Flex>

                    <Flex>
                        <Icon></Icon>
                        <Text></Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
