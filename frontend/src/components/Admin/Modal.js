import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteUser, resetPassUser } from "../../services/apiUser";
import { toast } from "react-toastify";

function Modal({ setIsShowModal, isDelete, fetchUsers }) {

    const [isLoad, setIsLoad] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const param = new URLSearchParams(location.search)
    const idUser = param.get('id')

    console.log(idUser);


    const handleClickBtnDelete = async() => {
        const res = await deleteUser(idUser)
        if(res.err!==0){
            toast.error(res.mess)
            setIsLoad(false)
            return
        }
        toast.success(res.mess)
        setIsShowModal(false)
        await fetchUsers()
    }

    const handleClickReset = async() => {
        const res = await resetPassUser(idUser)
        if(res.err!==0){
            toast.error(res.mess)
            setIsLoad(false)
            return
        }
        toast.success(res.mess)
        setIsShowModal(false)
    }

    return (
        <div className="fixed z-20 bg-opacity-65 bg-black left-0 top-0 right-0 bottom-0"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsShowModal(false)
                    navigate(location.pathname)
                }
            }}
        >
            <div className="min-h-9 bg-white rounded-xl mx-auto mt-10 px-5 w-[600px]">
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl font-semibold">{isDelete ? "Xóa tài khoản" : "Reset password"}</p>
                    <span className="cursor-pointer" onClick={() => {
                        setIsShowModal(false)
                        navigate(location.pathname)
                    }}>
                        <IoMdClose size={'1.5rem'} />
                    </span>
                </div>
                <div>
                    {isDelete ?
                        <p className="text-lg py-5">
                            Bạn có muốn xóa tài khoản này ?
                        </p>
                        :
                        <p className="text-lg py-5">
                            Bạn có muốn reset mật khẩu của tài khoản này về 123456 ?
                        </p>
                    }
                </div>
                <div className="flex justify-end gap-5">
                    {isDelete ?
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => { handleClickBtnDelete() }}
                        >
                            Xóa
                        </button>
                        :
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => { handleClickReset() }}
                        >
                            {!isLoad && <span>Reset</span>}
                            {isLoad && <ClipLoader color="#FFFFFF" />}
                        </button>
                    }
                    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => {
                            setIsShowModal(false)
                            navigate(location.pathname)
                        }}
                    >
                        Đóng
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Modal;