import HeaderTitle from "./HeaderTitle";
import { FcPlus } from "react-icons/fc";

function ManageAccout() {
    return (
        <div className="bg-white h-full">
            <div className="fixed w-full">
                <HeaderTitle title={'Quản lý tài khoản'} />
            </div>
            <div className="pt-28">
                <div className="w-[700px] mx-auto flex flex-col gap-5">
                    <div className="flex  justify-between">
                        <label>Số điện thoại: </label>
                        <div className="flex flex-col w-[500px]">
                            <input className="p-1 border rounded" disabled />
                            <small className="cursor-pointer text-blue-500">Đổi số điện thoại</small>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label>Tên hiển thị: </label>
                        <div className=" w-[500px]">
                            <input className="p-1 border rounded w-full" disabled />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label>Zalo: </label>
                        <div className=" w-[500px]">
                            <input className="p-1 border rounded w-full" disabled />
                        </div>
                    </div>
                    <div className="flex  justify-between">
                        <label>Mật khẩu: </label>
                        <div className=" w-[500px]">
                            <small className="cursor-pointer text-blue-500">Đổi mật khẩu</small>
                        </div>
                    </div>
                    <div className="flex mt-10  justify-between">
                        <label>Ảnh đại diện: </label>
                        <div className=" w-[500px]">
                            <div className="size-[110px] rounded-full overflow-hidden">
                                <img className=" object-cover object-center size-full" src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/306780386_629544108539861_3898604938191859013_n.png?stp=cp0_dst-png_s40x40&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=pk3iM1tL4AIQ7kNvgHpFEw5&_nc_oc=AdjXPkqkwMUhGvj_xVIbF63fv93Z9bHwARu6-CdZ6-fq0UhlQMbFWfigHkRBO9BYzQE&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=AKVcZDJHP_YPJfZFIccweRA&oh=00_AYBlcwjSzXkm2JPD-c9q5IU7kLYZ02iGIc3wMrAXgQ8Pww&oe=67C13B21"/>
                            </div>
                            <div className="mt-4 w-max border-2 rounded">
                                <label className=" p-1 flex gap-2 items-center" htmlFor="avt">
                                    <span>Tải ảnh lên</span>
                                    <span><FcPlus size={'1.5rem'}/></span>
                                </label>
                                <input id="avt" type="file" hidden/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageAccout;