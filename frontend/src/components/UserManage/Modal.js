import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { deletePostByID, getPostByID } from "../../services/apiPost";
import { toast } from 'react-toastify'
import Address from "./Address";
import { useState, useEffect } from "react";
import OverView from "./OverView";
import Images from "./Images";

function Modal({ setIsShowModal, isDeletePost, fetchPosts }) {

    const location = useLocation()
    const param = new URLSearchParams(location.search)
    const idPost = param.get('id')

    const identifyPriceCodeAreaCode = (value, type) => {
        if (type === "PRICE") {
            if (+value / 1000000.0 < 1) {
                return "OPTN"
            }
            else if (+value / 1000000.0 >= 1 && +value / 1000000.0 < 2) {
                return "1PTN"
            }
            else if (+value / 1000000.0 >= 2 && +value / 1000000.0 < 3) {
                return "2PTN"
            }
            else if (+value / 1000000.0 >= 3 && +value / 1000000.0 < 5) {
                return "3PTN"
            }
            else if (+value / 1000000.0 >= 5 && +value / 1000000.0 < 7) {
                return "5PTN"
            }
            else if (+value / 1000000.0 >= 7 && +value / 1000000.0 < 10) {
                return "7P0O"
            }
            else if (+value / 1000000.0 >= 10 && +value / 1000000.0 < 15) {
                return "1U1O"
            }
            else {
                return "EP5O"
            }
        }
        if (type === "ACREAGE") {
            if (+value < 20) {
                return "OPTN"
            }
            else if (+value >= 20 && +value < 30) {
                return "2H-N"
            }
            else if (+value >= 30 && +value < 50) {
                return "3H-N"
            }
            else if (+value >= 50 && +value < 70) {
                return "5H-N"
            }
            else if (+value >= 70 && +value < 90) {
                return "7H-N"
            }
            else {
                return "EO9G"
            }
        }
    }

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
        wardCode: '',
        idPost
    })

    const [images1, setImages1] = useState([]) // imagé này dùng để đẩy lên cloudinary rồi lấy link ảnh
    const [imagesPreview, setImagesPreview] = useState([])

    console.log('check images>>>', images1);


    useEffect(() => {
        const fetchGetPostByID = async () => {
            const res = await getPostByID(idPost)
            // console.log('check res>>>', res);
            if (res.err === 0) {
                setImages1(JSON.parse(res.post.images.images))
                setPayload({
                    ...payload,
                    title: res.post.title,
                    address: res.post.address,
                    price: res.post.priceNumber,
                    acreage: res.post.areaNumber,
                    categoryCode: res.post.categoryCode,
                    description: res.post.description,
                    images: res.post.images.images,
                    wardCode: res.post.wardCode,
                    areaCode: identifyPriceCodeAreaCode(res.post.priceNumber, "PRICE"),
                    priceCode: identifyPriceCodeAreaCode(res.post.areaNumber, "ACREAGE")
                })
                setImagesPreview(JSON.parse(res.post.images.images))
            }
        }
        if (!isDeletePost) {
            fetchGetPostByID()
        }
    }, [idPost])



    const handleClickBtnDelate = async () => {
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

    const handleClickBtnUpdate = async () => {
        console.log('check payload>>>', {...payload,images:JSON.stringify([...images1])});

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
                        <div className="py-5 flex flex-col items-center gap-5 h-[500px] overflow-y-auto">
                            <OverView payload={payload} setPayload={setPayload} />
                            <Address payload={payload} setPayload={setPayload} />
                            <Images images={images1} setImages={setImages1} imagesPreview={imagesPreview} setImagesPreview={setImagesPreview} />
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
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => { handleClickBtnUpdate() }}
                        >
                            Cập nhập
                        </button>
                    }
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

export default Modal;