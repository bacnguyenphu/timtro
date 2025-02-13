import { useSelector } from "react-redux";

function InforContact() {

    const user = useSelector(state => state.authenUser)

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] pb-5 mt-5">
            <h2 className="font-semibold text-xl py-5">Thông tin liên hệ</h2>
            <div className="flex mt-5 gap-8">
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category">Họ tên</label>
                    <input className="border rounded p-2" value={user.name} disabled/>
                </div>
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category">Số điện thoại</label>
                    <input className="border rounded p-2" value={user.phone} disabled/>
                </div>
            </div>
        </div>
    );
}

export default InforContact;