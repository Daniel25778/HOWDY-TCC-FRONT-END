import { Box, Image, Text } from '@chakra-ui/react';

interface CategoryIconProps {
    srcImage?: string;
    categoryName?: string;
    isWideVersion?: boolean;
}

export function CategoryIcon({ srcImage, categoryName, isWideVersion }: CategoryIconProps) {
    return (
        <>
            {isWideVersion ? (
                <Box minW="200px" flex="1">
                    <Image h={20} mx="auto" src={srcImage} />
                    <Text fontSize="2xl" mx="auto" textAlign="center" fontWeight="600">
                        {categoryName}
                    </Text>
                </Box>
            ) : (
                <Text
                    minW="130px"
                    fontSize="xl"
                    mx="auto"
                    textAlign="start"
                    fontWeight="500"
                    listStylePosition="inside"
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <Text as="span" fontSize="3xl" color="yellow.700">
                        •
                    </Text>{' '}
                    {categoryName}
                </Text>
            )}
        </>
    );
}
