import { useSelector } from "react-redux"
import { memo } from "react";

function OverView({setCateCode}) {

    const categories = useSelector(state => state.category.categories)

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] pb-5 mt-5">
            <h2 className="font-semibold text-xl py-5">Thông tin mô tả</h2>
            <div className="w-[45%] flex flex-col">
                <label htmlFor="category">Loại chuyên mục:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <select className="border p-1 rounded mt-1" name="category" id="category">
                    <option selected value='' data-path=''>--Chon loại chuyên mục--</option>
                    {categories && categories.length > 0 &&
                        categories.map(item => {
                            return (
                                <option key={`option-${item.code}`} value={item.code}>
                                    {item.value}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="w-full flex flex-col mt-5">
                <label htmlFor="category">Tiêu đề:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <input className="border rounded p-2" maxLength={100} />
                <small className="text-gray-400">(Tối thiểu 30 ký tự, tối đa 100 ký tự)</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Nội dung mô tả:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <textarea className="h-60 border rounded p-2" maxLength={5000}></textarea>
                <small className="text-gray-400">(Tối thiểu 50 ký tự, tối đa 5000 ký tự)</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Giá cho thuê:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <div className="border rounded w-[60%] flex">
                    <input className="rounded p-2 outline-none border w-4/6" />
                    <span className="w-2/6 flex items-center justify-center">đồng/tháng</span>
                </div>
                <small className="text-gray-400">Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Diện tích:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <div className="border rounded w-[60%] flex">
                    <input className="rounded p-2 outline-none border w-4/6" maxLength={10} />
                    <span className="w-2/6 flex items-center justify-center">m&sup2;
                    </span>
                </div>
            </div>
        </div>
    );
}

export default memo(OverView);