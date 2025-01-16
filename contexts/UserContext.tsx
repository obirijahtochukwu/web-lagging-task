'use client';
import { UserService } from "@/services/userService";
import { AppConstants } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userDetails: null,
    setUserDetails: () => {},
    userDetailsLoading: false,
    setUserDetailsLoading: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({
    children
}: {
    children: React.ReactNode,
}) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [ userDetails, setUserDetails ] = useState<IUser | null>(null);
    const [ userDetailsLoading, setUserDetailsLoading ] = useState<boolean>(false);

    const userService = new UserService();

    useEffect(() => {
        const savedToken = AppConstants.getSavedToken();

        if (!savedToken) {
            setIsLoggedIn(false);
            setUserDetailsLoading(false)
            return;
        }
        
        if (userDetails) return setUserDetailsLoading(false);
        
        setUserDetailsLoading(true);
        
        userService.getUserDetail(savedToken).then(res => {
            setUserDetails(res);
            setUserDetailsLoading(false);
            setIsLoggedIn(true);
        }).catch(() => {
            setUserDetailsLoading(false);
            setUserDetails(null);
        });
        
    }, [isLoggedIn, userDetails])

    return <>
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userDetails,
            setUserDetails,
            userDetailsLoading,
            setUserDetailsLoading,
        }}>
            {children}
        </UserContext.Provider>
    </>
}

export default UserContextProvider;