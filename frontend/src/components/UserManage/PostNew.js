import Address from "./Address";
import OverView from "./OverView";
import HeaderTitle from "./HeaderTitle";
import { useState, } from "react";
import Images from "./Images";
import InforContact from "./InforContact";
import { uploadImgCloudinary } from "../../services/apiUploadImgCloudinary";
import { useSelector } from "react-redux";
import _ from 'lodash'
import { toast } from 'react-toastify'

import ClipLoader from "react-spinners/ClipLoader";
import { createNewPost } from "../../services/apiPost";

function PostNew() {

    const user = useSelector(state => state.authenUser)
    const [isLoaded, setIsLoaded] = useState(false)
    const navs = [
        {
            title: "Khu vực",
            id: "khuvuc"
        },
        {
            title: "Thông tin mô tả",
            id: "thongtinmota"
        },
        {
            title: "Hình ảnh",
            id: "hinhanh"
        },
        {
            title: "Thông tin liên hệ",
            id: "thongtinlienhe"
        },
    ]

    const [images, setImages] = useState([]) // imagé này dùng để đẩy lên cloudinary rồi lấy link ảnh
    const[imagesPreview,setImagesPreview] = useState([])

    const [payload, setPayload] = useState({
        title: '',
        address: '',
        price: '',
        acreage: "",
        categoryCode: '',
        description: '',
        idUser: user.id,
        images: '',
        priceCode: '',
        areaCode: '',
        wardCode: ''
    })

    const handleClickSubmit = async () => {
        setIsLoaded(true)

        const res = await createNewPost(await handleGetLinkImgs())
        // console.log('check res>>>', res);
        if(res.err ===0){
            toast.success("Post success!")
        }
        setIsLoaded(false)

    }

    const handleGetLinkImgs = async () => {
        let imgsTemp = []
        for (let i of images) {
            let formData = new FormData()
            formData.append("file", i)
            formData.append("upload_preset", "timtro-zhnwbawr")
            const res = await uploadImgCloudinary(formData)

            if (res.status === 200) {
                imgsTemp = [...imgsTemp, `${res.data.url}`]
            }
        }

        let imgString = JSON.stringify([...imgsTemp])

        let newData = _.cloneDeep(payload)
        newData = { ...newData, images: imgString }
        return newData
    }

    // console.log('check payload>>>>', payload);
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="">
            <div className="fixed w-full">
                <HeaderTitle title={'Đăng tin cho thuê'} navs={navs} scrollToSection={scrollToSection} />
            </div>
            <div className="pt-28 flex flex-col items-center gap-5">
                <div id="khuvuc" className="scroll-mt-96">
                    <Address payload={payload} setPayload={setPayload} />
                </div>
                <div id="thongtinmota" className="scroll-mt-44">
                    <OverView payload={payload} setPayload={setPayload} />
                </div>
                <div id="hinhanh" className="scroll-mt-44">
                    <Images images={images} setImages={setImages} imagesPreview={imagesPreview} setImagesPreview={setImagesPreview} />
                </div>
                <div id="thongtinlienhe" className="scroll-mt-44">
                    <InforContact />
                </div>

            </div>
            <button className="w-[780px] mt-8 flex items-center justify-center bg-red-primary mx-auto py-4 text-white rounded-lg"
                onClick={() => { handleClickSubmit() }}
            >
                {!isLoaded && <span>Hoàn tất</span>}
                {isLoaded && <ClipLoader color="#FFFFFF" />}
            </button>
        </div>
    );
}

export default PostNew;