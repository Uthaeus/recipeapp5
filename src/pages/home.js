import { useContext } from "react";

import { UserContext } from "../store/user-context";

export default function Home() {
    const { user, isAdmin } = useContext(UserContext);

    return (
        <div>
            <h1>Home</h1>

            {user && (
                <>
                    <p>Welcome {user.name}</p>
                    <p>You are {isAdmin ? "an admin" : "a user"}</p>
                </>
            )}
        </div>
    );
}