type UserContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    userDetails: IUser | null;
    setUserDetails: (user: IUser | null) => void;
    userDetailsLoading: boolean;
    setUserDetailsLoading: (val: boolean) => void;
}