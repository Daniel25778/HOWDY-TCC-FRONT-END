import { AppProps } from 'next/app';
import { themes } from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NextNProgress color="#5EF2CD" startPosition={0.3} stopDelayMs={200} height={5} />
            <ChakraProvider resetCSS theme={themes}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}

export default MyApp;
