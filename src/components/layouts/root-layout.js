import { Outlet } from "react-router";

import MainNavigation from "../navigation/main-navigation";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <MainNavigation />

            <div className="root-layout-body">
                <Outlet />
            </div>
        </div>
    )
}