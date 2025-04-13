import { ChakraProvider, Container } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Container maxW="container.xl" py={8}>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp; 