import { SportsRugbySharp } from "@mui/icons-material"
import { AppBar, Box, Button, Link as MuiLink, Toolbar, Typography } from "@mui/material"
import { Launch as ExternalIcon, AccountBalanceWallet as WalletIcon } from "@mui/icons-material"
import Link from 'next/link'
import { useContext, useEffect, useState } from "react"
import { deleteSession, getSession, getAccount } from "../hooks/useAccounts"
import { GlobalContext } from "../utils/GlobalContextProvider"
import { useRouter } from "next/router"
import Sidebar from "../components/Sidebar"

const appTopBar = 64
const sideBarWidth = 260

export default function OverallLayout({ children }) {

    const { isLoggedIn, setIsLoggedIn, setUser, user } = useContext(GlobalContext)
    const router = useRouter()

    const login = () => {}

    const logout = () => {
        deleteSession()
        setIsLoggedIn(false)
        setUser({
            name: "",
            email: ""
        })
        router.push('/')
    }

    const handleAuth = async () => {
        const session = await getSession()
        if(session){
            setIsLoggedIn(true)
            const userInfo = await getAccount()
            setUser({
                name: userInfo.name,
                email: userInfo.email,
                userId: userInfo.$id
            })
            console.log(userInfo)
        }else{
            console.log("User not Logged In")
            router.push('/')
        }
    }

    useEffect(() => {
        if(!isLoggedIn){
            handleAuth()
        }
    }, [isLoggedIn])
    
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                minWidth: '100vw',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {
                (router.pathname !== "/" && router.pathname !== '/auth/login' && router.pathname !== '/auth/register')
                 && <Sidebar width={sideBarWidth} />
            }
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(60px)',
                    zIndex: 0,
                }}  
             />
             <AppBar color="transparent" sx={{boxShadow: 'none'}}>
                <Toolbar sx={{justifyContent: 'flex-end', height: appTopBar}}>
                    <Box display='flex' gap={2} alignItems='center' mr={2}>
                        <Typography variant="body2" fontWeight='bold'>
                            <Link href="/">
                                Home
                            </Link>
                        </Typography>
                        {
                            user && (
                                <>
                                    <InfoItem
                                        label='Address'
                                        value={
                                            <MuiLink
                                                target="_blank"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 1, 
                                                    textDecoration: 'underline',
                                                    color: ({palette}) => palette.info.main,
                                                }}
                                                // href={}
                                            >
                                                {"User"}
                                                <ExternalIcon fontSize='inherit' />
                                            </MuiLink>
                                        }
                                    />
                                </>
                            )
                        }
                        {
                            user.name && (
                                <Link href="/dashboard">
                                    <InfoItem label='Name' value={user.name} />
                                </Link>
                            )
                        }
                        {
                            !isLoggedIn && (
                                <Button variant='gradient' onClick={login}>
                                    <Link href="/auth/login">
                                        Log In <WalletIcon sx={{ml: 0.5}} />
                                    </Link>
                                </Button>
                            )
                        }
                        {
                            isLoggedIn && (
                                <Button variant='gradient' onClick={logout}>
                                    Log Out <WalletIcon sx={{ml: 1}} />
                                </Button>
                            )
                        }
                    </Box>
                </Toolbar>
             </AppBar>
             <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    zIndex: 1,
                    px: 1,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1',
                    backdropFilter: 'blur(60px)',
                    pt: `${appTopBar}px`
                }}
             >
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        overflow: 'auto',
                        pb: 3,
                        pt: 1
                    }}
                >
                    {children}
                </Box>
             </Box>
        </Box>
    )
}

function InfoItem({label, value, ...rest}) {
    return (
        <Box sx={{display: 'flex', gap: 1, ...(rest.sx && rest.sx)}}>
            <Typography variant="body2" fontWeight='bold'>
                {label}:
            </Typography>
            <Typography variant="body2">
                {value}
            </Typography>
        </Box>
    )
}