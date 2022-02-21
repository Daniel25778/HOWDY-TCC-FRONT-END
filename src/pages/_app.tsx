import { AppProps } from 'next/app'
import { themes } from '../styles/theme'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider resetCSS theme={themes}>
          <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
