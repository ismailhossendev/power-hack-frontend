import React, { createContext, useEffect } from 'react';
import { isJwtExpired } from 'jwt-check-expiration';
import { useState } from 'react';
export const mainContext = createContext()
const MainContext = ({ children }) => {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [reFresh, setReFresh] = React.useState(false)
    const [row, setRow] = React.useState(null)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const accessToken = localStorage.getItem('powerToken')
        if (accessToken) {
            const isExpired = isJwtExpired(accessToken);
            if (isExpired) {
                localStorage.removeItem('powerToken')
                setUser(null)
                setLoading(false)
            }
            else {
                const decodedToken = JSON.parse(atob(accessToken.split('.')[1]))
                setUser(decodedToken)
                setLoading(false)
            }
        }
        else {
            setUser(null)
            setLoading(false)
        }

    }, [reFresh])



    const value = { user, setUser, loading, setLoading, reFresh, setReFresh, row, setRow, total, setTotal }
    return (
        <mainContext.Provider value={value}>
            {children}
        </mainContext.Provider>
    );
};

export default MainContext;