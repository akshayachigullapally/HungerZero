import { ThemeProvider } from "@mui/material"
import Head from "next/head"
import CssBaseline from "@mui/material/CssBaseline"
import theme from '../utils/theme'
import '../styles/globals.css'
import OverallLayout from "../layouts/OverallLayout"
import { GlobalContextProvider } from "../utils/GlobalContextProvider"

function MyApp({Component, pageProps}) {
    return (
        <GlobalContextProvider>
            <Head>
                <title>HungerZero</title>
                <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
                />
                <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                // href="/favicon-32x32.png"
                />
                <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                // href="/favicon-16x16.png"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <OverallLayout>
                    <CssBaseline />
                    <Component {...pageProps} />
                </OverallLayout>
            </ThemeProvider>
        </GlobalContextProvider>
    )
}

export default MyApp