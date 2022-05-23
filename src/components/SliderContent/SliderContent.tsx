import { Flex, Heading, Link as ChakraLink, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface SliderContentProps {
    title: string;
    description: string;
    image: string;
}

export function SliderContent(props: SliderContentProps) {
    return (
        <Link href="/UserPage/Post/1" passHref>
            <ChakraLink
                display="flex"
                borderRadius="25px"
                backgroundImage={`/images/illustrations/${props.image}`}
                alignItems="center"
                justifyContent="center"
                h={[600, 600]}
                backgroundSize="cover"
                flexDir="column"
                color="white.800"
            >
                <Heading color="howdyColors.mainWhite" mb={5} fontSize={['3xl', '5xl']} fontWeight={700}>
                    {props.title}
                </Heading>
                <Text color="howdyColors.mainWhite" fontSize={['medium', '2xl']} fontWeight={700}>
                    {props.description}
                </Text>
            </ChakraLink>
        </Link>
    );
}