import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { api as apiFunction } from '../../services/api';


interface ResponseResult {
    numberOfHits: number,
    correctAlternativesSelected: [],
    correctAlternatives: [
        {
            idAlternative: number,
            isCorrect: boolean
        },
        {
            idAlternative: number,
            isCorrect: boolean
        },
        {
            idAlternative: number,
            isCorrect: boolean
        }
    ],
    xpPerHit: number,
    totalXpGained: number
}

interface QuestionProps {
    formattedQuestion: any;
    idActivity: string;
    selectedAlternatives: number[];
    setSelectedAlternatives: Dispatch<SetStateAction<number[]>>;
    indexQuestion: number;
    responseResult: ResponseResult;
    wasMade: boolean;
}

export default function Question({ formattedQuestion,selectedAlternatives, responseResult,wasMade, indexQuestion, setSelectedAlternatives}: QuestionProps) {
    const router = useRouter();
    let api = apiFunction();
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    function handleSelectAlternative(idAlternative: number) {
        if(!wasMade) {
            let newSelectedAlternatives = [...selectedAlternatives];
            newSelectedAlternatives[indexQuestion] = idAlternative;
            setSelectedAlternatives(newSelectedAlternatives);
            console.log(selectedAlternatives)
        }
    }
console.log(responseResult)
    return (
        <>
            <Flex flexDir="column" mb="5%" w="100%">
                <Text mb="5%" color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'xx-large']}>
                {`${indexQuestion + 1})  ${formattedQuestion.statement}`}
                </Text>
                {formattedQuestion.alternatives.length > 0 &&
                    formattedQuestion.alternatives.map((alternative) => (
                        <Flex
                            w="100%"
                            borderRadius="10px"
                            borderWidth={1}
                            borderStyle={'solid'}
                            position="relative"
                            borderColor="howdyColors.mainBlack"
                        >
                            { wasMade && alternative.idAlternative == responseResult?.correctAlternatives[indexQuestion].idAlternative && selectedAlternatives[indexQuestion] == responseResult?.correctAlternatives[indexQuestion].idAlternative ?
                                <Flex right="100%" top="30%" position="absolute" w="6%" flexDir="column">
                                    <Text
                                        color="howdyColors.mainBlue"
                                        fontWeight={'bold'}
                                        fontSize={['sm', 'md', 'large']}
                                        >
                                            + {responseResult.totalXpGained}XP
                                    </Text>
                                </Flex>
                                : ""
                            }
                            <Flex
                                cursor={'pointer'}
                                onClick={() => {
                                    handleSelectAlternative(alternative.idAlternative);
                                }}
                                borderRadius="10px"
                                border={'ActiveBorder'}
                                px="5%"
                                py="2%"
                                bgColor={ 
                                    alternative.idAlternative === selectedAlternatives[indexQuestion] && !wasMade ? "#B9C2FD" : 
                                    wasMade && alternative.idAlternative == responseResult?.correctAlternatives[indexQuestion].idAlternative  ? "howdyColors.mainGreenTransparent" :
                                    wasMade && alternative.idAlternative != responseResult?.correctAlternatives[indexQuestion].idAlternative && alternative.idAlternative === selectedAlternatives[indexQuestion] ? "howdyColors.mainRedTransparent" : 
                                    "howdyColors.mainWhite" }
                                w="100%"
                            >
                                <Text
                                    mb="2%"
                                    color="howdyColors.mainBlack"
                                    fontWeight={'bold'}
                                    fontSize={['sm', 'md', 'xx-large']}
                                >
                                    {alternative.textContent}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
            </Flex>
        </>
    );
}
