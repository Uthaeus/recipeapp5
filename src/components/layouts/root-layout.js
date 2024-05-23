import { Outlet } from "react-router";

import MainNavigation from "../navigation/main-navigation";
import MainSidebar from "../sidebar/main-sidebar";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <MainNavigation />

            <div className="root-layout-body">
                <Outlet />

                <MainSidebar />
            </div>
        </div>
    )
}