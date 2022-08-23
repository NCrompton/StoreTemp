import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type {NextPage} from 'next'
import { ReactElement, ReactNode } from 'react'

export function reportWebVitals(metric: any){
  console.log(metric)
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log(pageProps)
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
