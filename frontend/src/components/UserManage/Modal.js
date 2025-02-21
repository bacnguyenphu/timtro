import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { deletePostByID } from "../../services/apiPost";
import { toast } from 'react-toastify'
import Address from "./Address";
import { useState } from "react";

function Modal({ setIsShowModal, isDeletePost, fetchPosts }) {

    const location = useLocation()

    const [payload, setPayload] = useState({
        title: '',
        address: '',
        price: '',
        acreage: "",
        categoryCode: '',
        description: '',
        images: '',
        priceCode: '',
        areaCode: '',
        wardCode: ''
    })

    const handleClickBtnDelate = async () => {
        const param = new URLSearchParams(location.search)
        const idPost = param.get('id')
        const res = await deletePostByID(idPost)
        if (res.err === 0) {
            toast.success(res.mess)
            fetchPosts()
        }
        else {
            toast.error(res.error)
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
            <div className={`${isDeletePost ? 'w-[600px]' : 'w-[900px]'} min-h-9 bg-white rounded-xl mx-auto mt-10 px-5`}>
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl font-semibold">{isDeletePost ? "Xóa bài viết" : "Cập nhập bài viết"}</p>
                    <span className="cursor-pointer" onClick={() => { setIsShowModal(false) }}><IoMdClose size={'1.5rem'} /></span>
                </div>
                <div>
                    {isDeletePost ?
                        <p className="text-xl py-5">
                            Bạn có muốn xóa bài này ?
                        </p>
                        :
                        <div className="py-5 flex flex-col items-center h-96">
                            <Address payload={payload} setPayload={setPayload} />
                        </div>
                    }
                </div>
                <div className="flex justify-end gap-5">
                    {isDeletePost ?
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => { handleClickBtnDelate() }}
                        >
                            Xóa
                        </button>
                        :
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Cập nhập
                        </button>
                    }
                    <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => { setIsShowModal(false) }}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;