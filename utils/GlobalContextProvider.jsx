import React, {createContext, useState} from 'react'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        userType: "",
        userId: ""
    })

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <GlobalContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </GlobalContext.Provider>
    )
}