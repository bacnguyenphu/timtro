import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { genderCode } from "../../utils/genderCode";
import { createCategory, deleteCategory, updateCategory } from "../../services/apiCategory";
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";
import { handleGetCategory } from "../../redux/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";

function ModalCategoryPriceAcreage({ setIsShowModal, type, isAdd, isDelete, isUpdate, categories, price, area }) {

    const [payload, setPayload] = useState({
        code: '',
        value: '',
        header: '',
        subheader: '',
        min: 0,
        max: null
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const param = new URLSearchParams(location.search)

    let title = ''
    if (type === 'category') {
        if (isAdd) {
            title = 'Thêm danh mục'
        }
        if (isDelete) {
            title = 'Xoá danh mục'
        }
        if (isUpdate) {
            title = 'Cập nhập danh mục'
        }
    }
    else if (type === 'price') {
        if (isAdd) {
            title = 'Thêm khoảng giá'
        }
        if (isDelete) {
            title = 'Xoá khoảng giá'
        }
        if (isUpdate) {
            title = 'Cập nhập khoảng giá'
        }
    }
    else {
        if (isAdd) {
            title = 'Thêm diện tích'
        }
        if (isDelete) {
            title = 'Xoá diện tích'
        }
        if (isUpdate) {
            title = 'Cập nhập khoảng giá'
        }
    }

    const handleClickAdd = () => {
        if (type === 'category') {
            setPayload(async (prev) => {
                let temp = { ...prev, code: genderCode(prev.value) }
                const res = await createCategory(temp)
                if (res.err !== 0) {
                    toast.error(res.mess)
                }
                else {
                    toast.success(res.mess)
                    await dispatch(handleGetCategory())
                    setIsShowModal(false)
                }
                return temp
            })
        }

    }

    const handleClickDelete = async () => {
        if (type === 'category') {
            const res = await deleteCategory(param.get("code"))
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            toast.success(res.mess)
            await dispatch(handleGetCategory())
            setIsShowModal(false)
        }
    }

    const handleClickUpdate = async () => {
        if (type === 'category'){
            const res = await updateCategory(payload)
            if(res.err!==0){
                toast.error(res.mess)
                return
            }
            toast.success(res.mess)
            await dispatch(handleGetCategory())
            setIsShowModal(false)
        }
    }

    console.log('check payload: ',payload);
    

    useEffect(() => {
        if (isUpdate) {
            let tempCate = categories.find(cate => cate.code === param.get("code"))
            setPayload({ ...tempCate })
        }
    }, [param.get("code")])

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
                    <p className="text-2xl font-semibold">{title}</p>
                    <span className="cursor-pointer" onClick={() => {
                        setIsShowModal(false)
                        navigate(location.pathname)
                    }}>
                        <IoMdClose size={'1.5rem'} />
                    </span>
                </div>
                {type === 'category' && (isAdd || isUpdate) &&
                    <div className="py-4 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label>Tên danh mục</label>
                            <input className="outline-none p-1 w-1/2 border rounded" value={payload.value}
                                onChange={(e) => {
                                    setPayload((prev) => ({ ...prev, value: e.target.value }))
                                }} />
                        </div>
                        <div className="flex flex-col">
                            <label>Tiêu đề</label>
                            <input className="outline-none p-1 w-3/4 border rounded" value={payload.header}
                                onChange={(e) => {
                                    setPayload((prev) => ({ ...prev, header: e.target.value }))
                                }} />
                        </div>
                        <div className="flex flex-col">
                            <label>Chi tiết</label>
                            <textarea className="outline-none p-1 border rounded h-[90px]" value={payload.subheader}
                                onChange={(e) => {
                                    setPayload((prev) => ({ ...prev, subheader: e.target.value }))
                                }} />
                        </div>
                    </div>
                }
                {type === 'category' && isDelete &&
                    <p>Bạn có muốn xoá danh mục này ?</p>
                }

                <div className="flex justify-end">
                    {isAdd &&
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                            onClick={() => { handleClickAdd() }}
                        >
                            Thêm
                        </button>
                    }

                    {isUpdate &&
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                            onClick={() => { handleClickUpdate() }}
                        >
                            Cập nhập
                        </button>
                    }

                    {isDelete &&
                        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                            onClick={() => { handleClickDelete() }}
                        >
                            Xoá
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

export default ModalCategoryPriceAcreage;