import {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react";
import {chakra} from "../../theme/chakra";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from "react";

export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                refetchOnMount: true,
            },
            mutations: {
                retry: false,
            },
        },
    }))
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={chakra}>
                <Component {...pageProps} />
            </ChakraProvider>
        </QueryClientProvider>
    )
}
