import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User"
import { useNavigate } from "react-router";

type UserContextType = {
   user: UserProfile;
   token: string;
   registerUser: (email: string, username: string, password: string) => void;
   loginUser: (username: string, password: string) => void;
   logout: () => void;
   isLoggedIn: () => boolean;
};

type Props = {children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if(user && token){
            setUser(JSON.parse(user))
            setToken(token)
        }

        setIsReady(true);
    }, []);

    
}