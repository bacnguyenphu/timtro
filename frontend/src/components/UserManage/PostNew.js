import Address from "./Address";
import OverView from "./OverView";
import HeaderTitle from "./HeaderTitle";
import { useState,  } from "react";
import Images from "./Images";
import InforContact from "./InforContact";
import { uploadImgCloudinary } from "../../services/apiUploadImgCloudinary";
import { useSelector } from "react-redux";

import ClipLoader from "react-spinners/ClipLoader";

function PostNew() {

    const user = useSelector(state => state.authenUser)
    const[isLoaded,setIsLoaded] = useState(false)
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

    const [ward, setWard] = useState({
        name: '',
        code: null,
        path_with_type: ''
    })

    const [address, setAddress] = useState({
        detail: '',
        path_with_type: ''
    })
    const[categoryCode,setCategoryCode]  = useState()
    const [images, setImages] = useState([]) // imagé này dùng để đẩy lên cloudinary rồi lấy link ảnh

    const [payload, setPayload] = useState({
        title: '',
        address: '',
        price: '',
        acrage: "",
        categoryCode: '',
        decription: '',
        idUser: user.id,
        images: '',
        priceCode: '',
        areaCode: '',

    })

    const handleClickSubmit = async () => {
        setIsLoaded(true)
        await handleGetLinkImgs()
        console.log('check payload>>>', payload);
        setIsLoaded(false)

    }

    const handleGetLinkImgs = async () => {
        let imgsTemp = []
        let formData = new FormData()
        for (let i of images) {
            formData.append("file", i)
            formData.append("upload_preset", "timtro-zhnwbawr")
            const res = await uploadImgCloudinary(formData)

            if (res.status === 200) {
                console.log('check url>>>', res.data.url);
                imgsTemp = [...imgsTemp, `${res.data.url}`]

            }
        }
        setPayload(payload => ({ ...payload, images: [...imgsTemp] }))

    }

    return (
        <div className="">
            <div className="fixed w-full">
                <HeaderTitle title={'Đăng tin cho thuê'} navs={navs} />
            </div>
            <div className="pt-28 flex flex-col items-center gap-5">
                <Address ward={ward} setWard={setWard} address={address} setAddress={setAddress} />
                <OverView />
                <Images images={images} setImages={setImages} />
                <InforContact />
            </div>
            <button className="w-[780px] mt-8 flex items-center justify-center bg-red-primary mx-auto py-4 text-white rounded-lg"
                onClick={() => { handleClickSubmit() }}
            >
                {!isLoaded&&<span>Hoàn tất</span>}
                {isLoaded&&<ClipLoader color="#FFFFFF"/>}
            </button>
        </div>
    );
}

export default PostNew;