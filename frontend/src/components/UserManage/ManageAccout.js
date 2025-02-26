import { useState } from "react";
import HeaderTitle from "./HeaderTitle";

import { GiConfirmed } from "react-icons/gi";
import { FcPlus } from "react-icons/fc";
import { useSelector } from "react-redux";
import imageAvatarDefault from '../../assets/images/user.png'
import { fileToBase64 } from "../../utils/convertBase64";
import ModalPhoneAndPassword from "./ModalPhoneAndPassword";
import { handleUpdateUser } from "../../services/apiAuth";

function ManageAccout() {

    const user = useSelector(state => state.authenUser)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isChangePhone, setIsChangePhone] = useState(false)
    const [isChangePass, setIsChangePass] = useState(false)

    const [info, setInfo] = useState({
        id: user.id,
        name: user.name,
        phone: user.phone,
        zalo: user.zalo,
        avatar: user.avatar,
    })

    const handleOnchangeAvt = async (e) => {
        let toBase64 = await fileToBase64(e.target.files[0])
        setInfo({ ...info, avatar: toBase64 })
    }

    const handleClickUpdate = async() => {
        console.log('check info>>>', info);
        const res = await handleUpdateUser(info)
        console.log('check ress>>',res);
        
    }

    const handleShowChangePhone = () => {
        setIsChangePhone(true)
        setIsShowModal(true)
    }

    const handleShowChangPass = () => {
        setIsChangePhone(false)
        setIsShowModal(true)
    }

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
                            <input className="p-1 border rounded" disabled value={info.phone} />
                            <small className="cursor-pointer text-blue-500"
                                onClick={() => { handleShowChangePhone() }}
                            >
                                Đổi số điện thoại
                            </small>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label>Tên hiển thị: </label>
                        <div className=" w-[500px]">
                            <input className="p-1 border rounded w-full" value={info.name}
                                onChange={(e) => { setInfo({ ...info, name: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label>Zalo: </label>
                        <div className=" w-[500px]">
                            <input className="p-1 border rounded w-full" value={info.zalo}
                                onChange={(e) => { setInfo({ ...info, zalo: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="flex  justify-between">
                        <label>Mật khẩu: </label>
                        <div className=" w-[500px] flex items-center gap-4">
                            <small className="cursor-pointer text-blue-500"
                                onClick={() => { handleShowChangPass() }}
                            >
                                Đổi mật khẩu
                            </small>
                            {isChangePass && <span><GiConfirmed size={'1.25rem'} color="green" /></span>}
                        </div>
                    </div>
                    <div className="flex mt-10  justify-between">
                        <label>Ảnh đại diện: </label>
                        <div className=" w-[500px]">
                            <div className="size-[110px] rounded-full overflow-hidden">
                                <img className=" object-cover object-center size-full" alt="Ảnh lỗi" src={info.avatar || imageAvatarDefault} />
                            </div>
                            <div className="mt-4 w-max border-2 rounded">
                                <label className=" p-1 flex gap-2 items-center" htmlFor="avt">
                                    <span>Tải ảnh lên</span>
                                    <span><FcPlus size={'1.5rem'} /></span>
                                </label>
                                <input id="avt" type="file" hidden onChange={(e) => { handleOnchangeAvt(e) }} />
                            </div>
                        </div>
                    </div>
                    <button className="bg-blue-primary text-white font-semibold py-4 rounded-md mt-3"
                        onClick={() => { handleClickUpdate() }}
                    >
                        Cập nhập
                    </button>
                </div>
            </div>
            {isShowModal && <ModalPhoneAndPassword setIsShowModal={setIsShowModal} isChangePhone={isChangePhone} info={info} setInfo={setInfo} setIsChangePass={setIsChangePass} />}
        </div>
    );
}

export default ManageAccout;