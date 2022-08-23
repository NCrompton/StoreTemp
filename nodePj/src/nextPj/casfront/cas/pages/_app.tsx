import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import Layout from '../components/layout'
import { MantineProvider, ColorSchemeProvider, ColorScheme, Global } from '@mantine/core'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{
          colorScheme,
          colors: {
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#282f36',
              '#212529',
              '#0c0d21',
              '#01010a',
            ],
            light:[
              '#eeeeee',
            ]
          }
        }} withGlobalStyles withNormalizeCSS>
        <Global 
          styles={(theme) => ({
            body:{
              backgroundColor:colorScheme==='dark'? theme.colors.dark[6]: theme.colors.light[0]
            }
          })}/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>

)}

export default MyApp
