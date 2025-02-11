import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components/UserManage";

function LayoutUserManage() {
    return ( 
        <div className="bg-[#F4F4F4] h-screen flex flex-col">
            <div className="">
                <Header/>
            </div>
            <div className="flex flex-grow">
                <div className="w-1/6 h-full border-r">
                    <SideBar/>
                </div>
                <div className=" w-5/6">
                    <Outlet/>
                </div>
            </div>
        </div>
     );
}

export default LayoutUserManage;