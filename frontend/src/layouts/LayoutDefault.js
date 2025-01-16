import { Outlet } from "react-router";
import { Header, Navigation } from "../components";
import SideBar from "../components/SideBar";

function LayoutDefault() {
    return (
        <div className="bg-[#FDF5ED] min-h-screen">
            <div className=" px-[105px] bg-white">
                <Header />
            </div>
            <div className="bg-white">
                <Navigation />
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[1010px] flex gap-x-3">
                    <div className="w-2/3">
                        <Outlet />
                    </div>
                    <div className="w-1/3">
                        <SideBar/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutDefault;