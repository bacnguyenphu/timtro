import { useEffect, useState } from "react";
import HeaderTitle from "./HeaderTitle";
import { getProvincesAllPl } from "../../services/apiPublicProvincesVN";

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

    const [provincesList, setProvincesList] = useState([])
    const [provinces, setProvinces] = useState(null)

    useEffect(() => {
        fetchAddress()
    }, [])

    const fetchAddress = async () => {
        const res = await getProvincesAllPl()
        console.log('check res>>>', res.data);
        setProvincesList(res.data.data.data)
    }

    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Đăng tin cho thuê'} navs={navs} />
            </div>
            <div className="pt-28 flex flex-col items-center">
                <div className="w-[780px] bg-white rounded-md px-5">
                    <h2 className="font-semibold text-xl py-5">Khu vực</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-5 pb-5">
                        <div className="w-[45%] flex flex-col">
                            <label for="provinces">Tỉnh/Thành Phố:</label>
                            <select className="border p-1 rounded mt-1" name="provinces" id="provinces">
                                <option selected value="">--Chọn Tỉnh/Thành Phố--</option>
                                {provincesList.length > 0 &&
                                    provincesList.map(item => {
                                        return (
                                            <option key={`option-${item.code}`} value={item.code}>{item.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                        <div className="w-[45%] flex flex-col">
                            <label for="provinces">Quận/Huyện:</label>
                            <select className="border p-1 rounded mt-1" name="provinces" id="provinces">
                                <option selected value="volvo">--Chọn Quận/Huyện--</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                        <div className="w-[45%] flex flex-col">
                            <label for="provinces">Phường/Xã:</label>
                            <select className="border p-1 rounded mt-1" name="provinces" id="provinces">
                                <option selected value="volvo">--Chọn Phường/Xã--</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                        <div className="w-[45%] flex flex-col">
                            <label for="provinces">Chi tiết:</label>
                            <input className="border p-1 rounded" />
                        </div>

                        <div className="w-[92%] flex flex-col">
                            <label for="provinces">Địa chỉ:</label>
                            <input className="border p-1 rounded" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostNew;