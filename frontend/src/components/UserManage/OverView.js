import { useSelector } from "react-redux"

function OverView({ payload, setPayload }) {

    const categories = useSelector(state => state.category.categories)

    const handleOnchangePriceAndAcreage = (e, type) => {
        if (type === "PRICE") {
            setPayload({ ...payload, price: e.target.value, priceCode: identifyPriceCodeAreaCode(e.target.value, "PRICE") })

        }
        if (type === "ACREAGE") {
            setPayload({ ...payload, acreage: e.target.value, areaCode: identifyPriceCodeAreaCode(e.target.value, "ACREAGE") })

        }
    }

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

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] pb-5 mt-5">
            <h2 className="font-semibold text-xl py-5">Thông tin mô tả</h2>
            <div className="w-[45%] flex flex-col">
                <label htmlFor="category">Loại chuyên mục:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <select className="border p-1 rounded mt-1" name="category" id="category"
                    onChange={(e) => { setPayload({ ...payload, categoryCode: e.target.value }) }}
                >
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
                <input className="border rounded p-2" maxLength={100}
                    value={payload.title}
                    onChange={(e) => { setPayload({ ...payload, title: e.target.value }) }}
                />
                <small className="text-gray-400">(Tối thiểu 30 ký tự, tối đa 100 ký tự)</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Nội dung mô tả:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <textarea className="h-60 border rounded p-2" maxLength={5000}
                    value={payload.description}
                    onChange={(e) => { setPayload({ ...payload, description: e.target.value }) }}
                />
                <small className="text-gray-400">(Tối thiểu 50 ký tự, tối đa 5000 ký tự)</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Giá cho thuê:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <div className="border rounded w-[60%] flex">
                    <input className="rounded p-2 outline-none border w-4/6"
                        value={payload.price}
                        onChange={e => handleOnchangePriceAndAcreage(e, "PRICE")}
                    />
                    <span className="w-2/6 flex items-center justify-center">đồng/tháng</span>
                </div>
                <small className="text-gray-400">Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</small>
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="category">Diện tích:
                    <span className="text-red-primary"> (*)</span>
                </label>
                <div className="border rounded w-[60%] flex">
                    <input className="rounded p-2 outline-none border w-4/6" maxLength={10}
                        value={payload.acreage}
                        onChange={e => handleOnchangePriceAndAcreage(e, "ACREAGE")}
                    />
                    <span className="w-2/6 flex items-center justify-center">m&sup2;
                    </span>
                </div>
            </div>
        </div>
    );
}

export default OverView;