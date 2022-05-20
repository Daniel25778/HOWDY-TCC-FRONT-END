import { Button, Flex, Heading, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiTargetLock } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import StarRatings from "react-star-ratings";
import ProfilePhotoAndPatent from "../ProfilePhotoAndPatent/ProfilePhotoAndPatent";
import { useRouter } from 'next/router';

interface ActivityProps {
    name?: string;
    description?: string;
    image?: string;
    rating?: number;
    userUnlockedActivitys?: any;
    user?: any;

}

export function Activity({userUnlockedActivitys,user}: ActivityProps) {
    const createdAt = new Date(userUnlockedActivitys.createdAt).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'short',
    });

    const router = useRouter();


    const [haveActivitys, setHaveActivitys] = useState<any>([]);

    useEffect(() => {
        setHaveActivitys(userUnlockedActivitys === undefined);
    })

    console.log(userUnlockedActivitys);

    function handleAccessActivity() {
        router.push(`/DoActivityPage/${userUnlockedActivitys.idActivity}`);
    }

    return(
        <>

        {
        haveActivitys ?
            <Flex align="center" flexDir="column" p="5%" width="100%" justify="center">
                <Flex borderRadius="16" w="80%" h="10vh" justify="center" align="center">
                    <Text color="howdyColors.mainBlack"
                    fontWeight={'bold'}
                    fontSize ={['sm', 'xx-large', 'xx-large']}
                    >
                        Ops...Não foi possivel encontrar atividades para exibir
                    </Text>
                    
                </Flex>
                <Image
                    width={500}
                    maxWidth={500}
                    objectFit="cover"
                    marginBottom={8}
                    src="/images/illustrations/notHavePosts.png">
                </Image>
            </Flex>
            :
           <Flex borderRadius="20px"  width="50%" mt="5%"  flexDir="column" bgColor="howdyColors.mainWhite">

                <Flex mb="2%" width="100%">
                    <Flex width="70%" gap="3%" align="center">
                        <ProfilePhotoAndPatent user={user} size='9rem'></ProfilePhotoAndPatent>
                        <Heading>{userUnlockedActivitys.userCreator.userName}</Heading>
                        <Text color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'xx-large']}>● {createdAt}</Text>
                    </Flex>
                  
                   <Flex>
                        <Flex width="50%" gap="5%" ml="6%" justify={'center'} align={'center'}>
                            <Icon w="40%" height="40%" color="howdyColors.mainBlue" fontSize="larger">
                                <BiTargetLock />
                            </Icon>
                            <Text fontSize={['sm', 'md', 'xx-large']} color="howdyColors.mainBlack" opacity="60%">{userUnlockedActivitys.targetLanguageName}</Text>
                        </Flex>
                    </Flex>
                </Flex>


                <Flex>

                    <Flex width="50%" bgColor="howdyColors.mainGreen">
                        <Image
                        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                        objectFit="cover"
                        w="100%"
                        h="26rem"
                        src={userUnlockedActivitys.activityCoverPhoto}
                        >

                        </Image>
                    </Flex>

                    <Flex  gap="7%" flexDir="column" p="2%"  width="50%" bgColor="howdyColors.mainBlue">
                        <Heading color="howdyColors.mainWhite">{userUnlockedActivitys.activityTitle}</Heading>
                        <Text color="howdyColors.mainWhite">
                            {userUnlockedActivitys.activityTitle}
                        </Text>
                        
                        <Flex width="20%" gap="5" borderRadius="60px" bg="howdyColors.mainYellow" align="center">
                            <Image
                                height="2.5rem"
                                src="/images/howdy-images/howdy-coin/Howdy coin.svg"
                                alt="howdy coin"
                            ></Image>
                            <Text fontWeight="semibold" color="howdyColors.brownHowdyCoin">
                            {userUnlockedActivitys.priceHowdyCoin}
                            </Text>
                        </Flex>
                        <Flex width="90%" flexDir="column" align="center" justify="center">
                            <StarRatings starDimension="40px"  rating={userUnlockedActivitys.totalRating} starRatedColor="#F2D63F" numberOfStars={userUnlockedActivitys.totalStars} name="rating" />
                            <Button
                                _hover={{ bg: '#B9C2FD' }}
                                width={300}
                                h="70px"
                                maxWidth={300}
                                marginTop="6"
                                bg="#CBD2FF"
                                color="howdyColors.mainWhite"
                                type="submit"
                                borderRadius="50px"
                                onClick={handleAccessActivity}
                            >
                                <Text fontSize={['sm', 'md', 'xx-large']} >ACESSAR</Text>
                            </Button>
                        </Flex>
                       
                    </Flex>

                </Flex>

           </Flex>
    }

        </>
    )
}