import { Link as ChakraLink, LinkProps as ChakraLinkProps, Box, Button,Text,Grid } from '@chakra-ui/react';
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
            <Link prefetch href={href}>
                <ChakraLink w='100%'
                 _hover={{bgColor: '#ffffff33'}}
                 >
                    <Button _hover={{opacity : "80%"}} w="100%" bgColor={isActive ? "howdyColors.mainBlue" : "#E9E9E9"} color="howdyColors.mainWhite" borderRadius="15">
                        <Text color={isActive ? "howdyColors.mainWhite" : "howdyColors.notSelection"} fontWeight={'bold'} fontSize={['sm', 'md', 'x-large']}>
                            {title}
                        </Text>
                    </Button>
                </ChakraLink>
            </Link>
    );
}
