import { Link as ChakraLink, LinkProps as ChakraLinkProps, Box, Button,Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps extends ChakraLinkProps {
    href: string;
    title: string;
}

export function NavLink({ href, title }: NavLinkProps) {
    const { asPath } = useRouter();
    let isActive = false;
    if (href && asPath === href) {
        isActive = true;
    }

    if (!href && asPath.startsWith(String(href))) {
        isActive = true;
    }

    return (
        <Link href={href}>
            <ChakraLink
                _hover={{ color: 'howdyColors.mainBlue' }}
                h="100%"
                w="7vw"
                borderRadius="15%"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                cursor={'pointer'}
                fontWeight="semibold"
                fontSize={['sm', 'xl', 'xx-large']}
                opacity={'70%'}
                color={isActive ? 'howdyColors.mainBlue' : 'howdyColors.mainBlack'}
                bg={isActive ? 'howdyColors.dividerTransparent' : 'none'}
            >
               <Button bgColor="howdyColors.mainBlue" color="howdyColors.mainWhite" borderRadius="15">
                        <Text color="howdyColors.mainWhite" fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                            Postagens
                        </Text>
               </Button> 
            </ChakraLink>
        </Link>
    );
}
