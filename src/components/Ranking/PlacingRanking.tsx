import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BiTargetLock } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";

interface PlacingRankingProps {
    ranking: any
}

export default function PlacingRanking({ranking}: PlacingRankingProps) {

    return (
        <>

            <Flex w="100%" mb="5%" >
                <Flex align="center"  w="23%">
                    <Text ml="5%" fontWeight="bold" fontSize={['medium', 'x-large', 'xxx-large']} color="howdyColors.mainBlack">{ranking.positionRanking}˚</Text>
                </Flex>
                <Flex align="center"  w="22%">
                    <Flex
                        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                        w="70%"
                        alignItems="center"
                        justifyContent="center"
                        bgColor="#D7DBF5"
                        borderRadius="10"
                        p="2"
                        color="howdyColors.mainBlue"
                        fontWeight={'bold'}
                        fontSize={['sm', 'md', 'xx-large']}
                    >
                       <Text fontWeight="bold" fontSize={['medium', 'large', 'xx-large']}>{ranking.totalXp}</Text>
                    </Flex>
                </Flex>
                <Flex  w="35%">
                    <Flex w="50%">
                        <Image  borderRadius="100%" width="80%" maxWidth={500} src={ranking.profilePhoto}/>
                    </Flex>

                    <Flex py="10%" justify="space-between" flexDir="column" w="50%">
                        <Text fontWeight="bold" fontSize={['medium', 'large', 'xx-large']}>{ranking.userName}</Text>
                        <Flex gap="4%" >
                            <Icon as={BiTargetLock} color="howdyColors.mainBlue" fontSize="xx-large" />
                            <Text fontSize={['medium', 'large', 'large']} color="howdyColors.mainBlue">{ranking.targetLanguageName}</Text>
                            <Icon as={FaBaby} color="howdyColors.mainBlue" fontSize="xx-large" />
                            <Text fontSize={['medium', 'large', 'large']} color="howdyColors.mainBlue">{ranking.nativeLanguageName}</Text>
                        </Flex>
                    </Flex>
                   
                </Flex>
            </Flex>

        </>
    )

}