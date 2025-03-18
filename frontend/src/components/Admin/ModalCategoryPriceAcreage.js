import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { genderCode } from "../../utils/genderCode";
import { createCategory, deleteCategory, updateCategory } from "../../services/apiCategory";
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";
import { handleGetCategory } from "../../redux/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { iditify, isNumber, identifyArea } from "../../utils/identify";
import { createPrice, deletePrice, updatePrice } from "../../services/apiPrice";
import { handleGetPrice } from "../../redux/priceSlice";
import { createArea, deleteArea, updateArea } from "../../services/apiArea";
import { handleGetArea } from "../../redux/areaSlice";

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

    const handleClickAdd = async () => {
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

        if (type === 'price') {
            if (payload.min === '') {
                toast.info("Vui lòng không để trống min !")
                setPayload({ ...payload, value: '' })
                return
            }
            if ((!payload.max || payload.max === '') ? (!isNumber(+payload.min)) : (!isNumber(+payload.min) || !isNumber(+payload.max) || (+payload.min > +payload.max))) {
                toast.info("Dữ liệu không hợp lệ !")
                setPayload({ ...payload, value: '' })
                return
            }
            setPayload({ ...payload, value: iditify(payload.min, payload.max) })
            const data = { ...payload, value: iditify(payload.min, payload.max) }
            const res = await createPrice(data)
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            else {
                await dispatch(handleGetPrice())
                toast.success(res.mess)
                setIsShowModal(false)
            }

        }

        if (type === 'acreage') {
            if (payload.min === '') {
                toast.info("Vui lòng không để trống min !")
                setPayload({ ...payload, value: '' })
                return
            }
            if ((!payload.max || payload.max === '') ? (!isNumber(+payload.min)) : (!isNumber(+payload.min) || !isNumber(+payload.max) || (+payload.min > +payload.max))) {
                toast.info("Dữ liệu không hợp lệ !")
                setPayload({ ...payload, value: '' })
                return
            }
            setPayload({ ...payload, value: identifyArea(payload.min, payload.max) })
            let data = { ...payload, value: identifyArea(payload.min, payload.max) }
            const res = await createArea(data)
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            else {
                await dispatch(handleGetArea())
                toast.success(res.mess)
                setIsShowModal(false)
            }

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

        if (type === "price") {
            const res = await deletePrice(param.get("code"))
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            toast.success(res.mess)
            await dispatch(handleGetPrice())
            setIsShowModal(false)
        }

        if (type === "acreage") {
            const res = await deleteArea(param.get("code"))
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            toast.success(res.mess)
            await dispatch(handleGetArea())
            setIsShowModal(false)
        }
    }

    const handleClickUpdate = async () => {
        if (type === 'category') {
            const res = await updateCategory(payload)
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            toast.success(res.mess)
            await dispatch(handleGetCategory())
            setIsShowModal(false)
        }

        if (type === "price") {
            if (payload.min === '') {
                toast.info("Vui lòng không để trống min !")
                setPayload({ ...payload, value: '' })
                return
            }
            if ((!payload.max || payload.max === '') ? (!isNumber(+payload.min)) : (!isNumber(+payload.min) || !isNumber(+payload.max) || (+payload.min > +payload.max))) {
                toast.info("Dữ liệu không hợp lệ !")
                setPayload({ ...payload, value: '' })
                return
            }
            setPayload({ ...payload, value: iditify(payload.min, payload.max) })
            const data = { ...payload, value: iditify(payload.min, payload.max) }
            const res = await updatePrice(data)
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            else {
                await dispatch(handleGetPrice())
                toast.success(res.mess)
                setIsShowModal(false)
            }
        }

        if (type === "acreage") {
            if (payload.min === '') {
                toast.info("Vui lòng không để trống min !")
                setPayload({ ...payload, value: '' })
                return
            }
            if ((!payload.max || payload.max === '') ? (!isNumber(+payload.min)) : (!isNumber(+payload.min) || !isNumber(+payload.max) || (+payload.min > +payload.max))) {
                toast.info("Dữ liệu không hợp lệ !")
                setPayload({ ...payload, value: '' })
                return
            }
            setPayload({ ...payload, value: identifyArea(payload.min, payload.max) })
            let data = { ...payload, value: identifyArea(payload.min, payload.max) }
            const res = await updateArea(data)
            if (res.err !== 0) {
                toast.error(res.mess)
                return
            }
            else {
                await dispatch(handleGetArea())
                toast.success(res.mess)
                setIsShowModal(false)
            }
        }
    }

    useEffect(() => {
        if (isUpdate) {
            if (type === "category") {
                let temp = categories.find(item => item.code === param.get("code"))
                setPayload({ ...temp })
            }

            if (type === "price") {
                let temp = price.find(item => item.code === param.get("code"))
                setPayload({ ...temp })
            }

            if (type === "acreage") {
                let temp = area.find(item => item.code === param.get("code"))
                setPayload({ ...temp })
            }
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
                {type === 'price' && (isAdd || isUpdate) &&
                    <div className="py-4 flex flex-col gap-4">
                        <div className="flex gap-5">
                            <div className="flex flex-col w-1/2">
                                <label>Từ</label>
                                <input className="outline-none p-1 border rounded" value={payload.min}
                                    onChange={(e) => {
                                        setPayload((prev) => ({ ...prev, min: e.target.value }))
                                    }} />
                                <small className="text-gray-500">Ít nhất là 0 đồng</small>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label>Đến</label>
                                <input className="outline-none p-1 border rounded" value={payload.max}
                                    onChange={(e) => {
                                        setPayload((prev) => ({ ...prev, max: e.target.value }))
                                    }} />
                                <small className="text-gray-500">Không có giới hạn thì để trống</small>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label>Chi tiết</label>
                            <input className="outline-none p-1 border w-2/3 rounded" value={payload.value} disabled
                                onChange={(e) => {
                                    setPayload((prev) => ({ ...prev, value: e.target.value }))
                                }} />
                        </div>
                    </div>
                }
                {type === 'price' && isDelete &&
                    <p>Bạn có muốn xoá khoảng giá này ?</p>
                }

                {type === 'acreage' && (isAdd || isUpdate) &&
                    <div className="py-4 flex flex-col gap-4">
                        <div className="flex gap-5">
                            <div className="flex flex-col w-1/2">
                                <label>Từ</label>
                                <input className="outline-none p-1 border rounded" value={payload.min}
                                    onChange={(e) => {
                                        setPayload((prev) => ({ ...prev, min: e.target.value }))
                                    }} />
                                <small className="text-gray-500">Ít nhất là 0 m2</small>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label>Đến</label>
                                <input className="outline-none p-1 border rounded" value={payload.max}
                                    onChange={(e) => {
                                        setPayload((prev) => ({ ...prev, max: e.target.value }))
                                    }} />
                                <small className="text-gray-500">Không có giới hạn thì để trống</small>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label>Chi tiết</label>
                            <input className="outline-none p-1 border w-2/3 rounded" value={payload.value} disabled
                                onChange={(e) => {
                                    setPayload((prev) => ({ ...prev, value: e.target.value }))
                                }} />
                        </div>
                    </div>
                }
                {type === 'acreage' && isDelete &&
                    <p>Bạn có muốn xoá khoảng diện tích này ?</p>
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