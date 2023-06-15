import { ThemeProvider } from "@mui/material"
import Head from "next/head"
import CssBaseline from "@mui/material/CssBaseline"
import theme from '../utils/theme'
import '../styles/globals.css'
import OverallLayout from "../layouts/OverallLayout"
import { GlobalContextProvider } from "../utils/GlobalContextProvider"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({Component, pageProps}) {
    return (
        <GlobalContextProvider>
            <Head>
                <title>HungerZero</title>
                <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/logo.png"
                />
                <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/logo.png"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <OverallLayout>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <ToastContainer />
                </OverallLayout>
            </ThemeProvider>
        </GlobalContextProvider>
    )
}

export default MyApp