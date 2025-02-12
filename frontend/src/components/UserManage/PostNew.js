import Address from "./Address";
import OverView from "./OverView";
import HeaderTitle from "./HeaderTitle";
import { useState } from "react";

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

    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Đăng tin cho thuê'} navs={navs} />
            </div>
            <div className="pt-28 flex flex-col items-center gap-5">
                <Address/>
                <OverView/>
            </div>
        </div>
    );
}

export default PostNew;