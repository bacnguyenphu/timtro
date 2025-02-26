import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function ModalPhoneAndPassword({ setIsShowModal, isChangePhone, info, setInfo, setIsChangePass }) {

    const [phone, setPhone] = useState('')
    const [passwordCurrent, setPasswordCurrent] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [validate, setValidate] = useState({
        phone: '',
        passwordCurrent: '',
        passwordNew: '',
        passwordConfirm: ""
    })

    const handleClickBtnOK = () => {
        if (isChangePhone) {
            if (phone === "") {
                setValidate({ ...validate, phone: "Bạn chưa nhập số điện thoại" })
                return
            }
            setInfo({ ...info, phone: phone })
        }
        else {
            if (passwordCurrent === "") {
                setValidate({ ...validate, passwordCurrent: "Bạn chưa nhập mật khẩu hiện tại !" })
                return
            }
            if (passwordNew === "") {
                setValidate({ ...validate, passwordNew: "Bạn chưa nhập mật khẩu mới !" })
                return
            }
            if (passwordConfirm === "") {
                setValidate({ ...validate, passwordConfirm: "Bạn chưa nhập xác nhập mật khẩu mới !" })
                return
            }
            if (passwordNew !== passwordConfirm) {
                setValidate({ ...validate, passwordConfirm: "Mật khẩu không trùng khớp !" })
                return
            }
            setInfo({ ...info, passwordCurrent: passwordCurrent, passwordNew: passwordNew })
            setIsChangePass(true)
        }
        setIsShowModal(false)
    }

    return (
        <div className="fixed z-20 bg-opacity-65 bg-black left-0 top-0 right-0 bottom-0"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsShowModal(false)
                }
            }}
        >
            <div className="min-h-9 bg-white rounded-xl mx-auto mt-10 px-5 w-[600px]">
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl font-semibold">{isChangePhone ? "Đổi số điện thoại" : "Đổi mật khẩu"}</p>
                    <span className="cursor-pointer" onClick={() => { setIsShowModal(false) }}><IoMdClose size={'1.5rem'} /></span>
                </div>

                {isChangePhone ?
                    <div className="py-4 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label>Số điện thoại hiện tại</label>
                            <input className="p-1 border rounded outline-none w-full" disabled value={info.phone} />
                        </div>
                        <div className="flex flex-col">
                            <label>Số điện thoại mới</label>
                            <input className="p-1 border rounded outline-none w-full" value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    setValidate({ ...validate, phone: '' })
                                }}
                            />
                            {validate.phone !== "" && <small className="text-red-primary italic">{validate.phone}</small>}
                        </div>
                    </div>
                    :
                    <div className="py-4 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label>Mật khẩu hiện tại</label>
                            <input className="p-1 border rounded outline-none w-full" value={passwordCurrent} type="password"
                                onChange={(e) => { setPasswordCurrent(e.target.value) }}
                            />
                            {validate.passwordCurrent !== "" && <small className="text-red-primary italic">{validate.passwordCurrent}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label>Mật khẩu mới</label>
                            <input className="p-1 border rounded outline-none w-full" value={passwordNew} type="password"
                                onChange={(e) => { setPasswordNew(e.target.value) }}
                            />
                            {validate.passwordNew !== "" && <small className="text-red-primary italic">{validate.passwordNew}</small>}
                        </div>
                        <div className="flex flex-col">
                            <label>Xác nhận mật khẩu mới</label>
                            <input className="p-1 border rounded outline-none w-full" value={passwordConfirm} type="password"
                                onChange={(e) => { setPasswordConfirm(e.target.value) }}
                            />
                            {validate.passwordConfirm !== "" && <small className="text-red-primary italic">{validate.passwordConfirm}</small>}
                        </div>
                    </div>
                }

                <div className="flex justify-end gap-5">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => { handleClickBtnOK() }}
                    >
                        OK
                    </button>
                    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => { setIsShowModal(false) }}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalPhoneAndPassword;