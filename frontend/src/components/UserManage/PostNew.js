import Address from "./Address";
import OverView from "./OverView";
import HeaderTitle from "./HeaderTitle";
import { useState } from "react";
import Images from "./Images";
import InforContact from "./InforContact";

function PostNew() {

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

    const [images,setImages] = useState([])

    return (
        <div className="">
            <div className="fixed w-full">
                <HeaderTitle title={'Đăng tin cho thuê'} navs={navs} />
            </div>
            <div className="pt-28 flex flex-col items-center gap-5">
                <Address/>
                <OverView/>
                <Images images={images} setImages={setImages}/>
                <InforContact/>
            </div>
            <button className="w-[780px] mt-8 flex items-center justify-center bg-red-primary mx-auto py-4 text-white rounded-lg">Hoàn tất</button>
        </div>
    );
}

export default PostNew;