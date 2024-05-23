import { createContext, useState, useEffect } from "react";

import { dummyAdmin, dummyUser } from "./dummy/dummy-users";

export const UserContext = createContext({
    user: null,
    isAdmin: false,
    setUser: () => {},
    logout: () => {}
});

function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(dummyAdmin);
        setLoading(false);
    }, []);

    const logout = () => {
        setUser(null);
    }

    const value = {
        user,
        isAdmin: user?.role === "admin",
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;