import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();
const Authprovider = ({ children }) => {
    const [auth, setauth] = useState({
        user: null,
        token: "",
    });



    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parseData= JSON.parse(data);
            setauth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
    }, []);

    return (
        <Authcontext.Provider value={[auth, setauth]}>
            {children}
        </Authcontext.Provider>
    );
};
const useAuth = () => useContext(Authcontext);
export { useAuth, Authprovider };