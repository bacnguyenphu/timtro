import { Outlet } from "react-router";
import { Footer, Header, Navigation } from "../components";
import SideBar from "../components/SideBar";

function LayoutDefault() {
    return (
        <div className="bg-[#FDF5ED] min-h-screen pb-10">
            <div className="fixed w-full top-0 z-50">
                <div className=" px-[105px] bg-white">
                    <Header />
                </div>
                <div className="bg-white">
                    <Navigation />
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[1010px] flex gap-x-5 mt-32">
                    <div className="w-2/3">
                        <Outlet />
                    </div>
                    <div className="w-1/3">
                        <SideBar />
                    </div>
                </div>
            </div>
            <div className="w-[1010px] mx-auto mt-10 rounded-xl">
                <Footer />
            </div>
        </div>
    );
}

export default LayoutDefault;