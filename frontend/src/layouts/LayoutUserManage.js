import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components/UserManage";

function LayoutUserManage() {
    return (
        <div className="h-screen flex flex-col">
            <div className="fixed w-full z-50">
                <Header />
            </div>
            <div className="flex flex-grow mt-14">
                <div className="w-1/6 h-full border-r bg-white">
                    <div className="fixed">
                        <SideBar />
                    </div>
                </div>
                <div className=" w-5/6 bg-[#F4F4F4] pb-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutUserManage;