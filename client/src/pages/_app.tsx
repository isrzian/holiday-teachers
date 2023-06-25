import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
