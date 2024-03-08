import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app";
import Head from "next/head";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>tanstack-queryハンズオン</title>
        <meta name="description" content="tanstack-query handson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </>
  )
}
