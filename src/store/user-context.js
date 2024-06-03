import { createContext, useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { auth, db } from "../firebase";

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
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    const initializeUser = async (user) => {
        console.log('initializing user');
        if (user) {

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {

                const userData = docSnap.data();
                setUser({ id: user.uid, ...userData });

            }

            setLoading(false);
        } else {
            setUser(null);
            setLoading(false);
        }
    }

    const updateUser = (user) => {
        setUser(user);
    }

    const logout = () => {
        signOut(auth);
        setUser(null);
    }

    const value = {
        user,
        isAdmin: user?.role === "admin",
        updateUser,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;