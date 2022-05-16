import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api as apiFunction } from '../../services/api';

interface QuestionProps {
    formattedQuestion: any;
    idActivity: string;
}

export default function Question({ formattedQuestion, idActivity }: QuestionProps) {
    const router = useRouter();
    let api = apiFunction();
    const [alternatives, setAlternatives] = useState<any>([]);
    function handleGetAnswer(idAlternative: any) {
        setAlternatives([idAlternative, ...alternatives]);
        console.log(alternatives);
    }

    function handleSubmit() {
        api.post(`questions/correction/${idActivity}`, {
            selectedIdAlternatives: alternatives,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Flex flexDir="column" mb="5%" w="100%">
                <Text mb="5%" color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'xx-large']}>
                    {formattedQuestion.statement}
                </Text>
                {formattedQuestion.alternatives.length > 0 &&
                    formattedQuestion.alternatives.map((alternatives) => (
                        <Flex
                            w="100%"
                            borderRadius="10px"
                            borderWidth={1}
                            borderStyle={'solid'}
                            borderColor="howdyColors.mainBlack"
                        >
                            <Flex
                                cursor={'pointer'}
                                onClick={() => {
                                    handleGetAnswer(alternatives.idAlternative);
                                }}
                                borderRadius="10px"
                                border={'ActiveBorder'}
                                px="5%"
                                py="2%"
                                bgColor="howdyColors.mainWhite"
                                w="100%"
                            >
                                <Text
                                    mb="2%"
                                    color="howdyColors.mainBlack"
                                    fontWeight={'bold'}
                                    fontSize={['sm', 'md', 'xx-large']}
                                >
                                    {alternatives.textContent}
                                </Text>
                                <Text onClick={handleSubmit}>CLIQU-ME</Text>
                            </Flex>
                        </Flex>
                    ))}
            </Flex>
        </>
    );
}
