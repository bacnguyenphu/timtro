import { useEffect, useState, memo, useRef } from "react";
import { getDictricsByProvincesPl, getProvincesAllPl, getWardsByDictricsPl } from "../../services/apiPublicProvincesVN";

function Address({ payload, setPayload }) {

    const refAddress = useRef()

    const [provincesList, setProvincesList] = useState([])
    const [ward, setWard] = useState({
        name: '',
        code: null,
        path_with_type: ''
    })

    const [address, setAddress] = useState({
        detail: '',
        path_with_type: ''
    })
    const [province, setProvince] = useState({
        name: '',
        code: null,
        path_with_type: ''
    })
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState({
        name: '',
        code: null,
        path_with_type: ''
    })
    const [wards, setWards] = useState([])

    useEffect(() => {
        const fetchAddress = async () => {
            const res = await getProvincesAllPl()
            setProvincesList(res.data)
        }
        fetchAddress()
    }, [])

    useEffect(() => {
        if (province?.code !== '' && province.code !== null) {
            const fetchDictrics = async () => {
                const res = await getDictricsByProvincesPl(province.code)
                setDistricts(res.data)
            }
            fetchDictrics()
        }

    }, [province])

    useEffect(() => {
        if (district?.code !== '' && district.code !== null) {
            const fetchWards = async () => {
                const res = await getWardsByDictricsPl(district.code)
                setWards(res.data)
            }
            fetchWards()
        }

    }, [district])

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] mt-5">
            <h2 className="font-semibold text-xl py-5">Khu vực</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-5 pb-5">
                <div className="w-[45%] flex flex-col">
                    <label htmlFor="provinces">Tỉnh/Thành Phố:
                        <span className="text-red-primary"> (*)</span>
                    </label>
                    <select className="border p-1 rounded mt-1" name="provinces" id="provinces"
                        onChange={(e) => {
                            setProvince({
                                name: e.target.options[e.target.selectedIndex].text,
                                code: e.target.value,
                                path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path')
                            })
                            setAddress({ ...address, path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path') })
                        }}
                    >
                        <option selected value='' data-path=''>--Chọn Tỉnh/Thành Phố--</option>
                        {provincesList.length > 0 &&
                            provincesList.map(item => {
                                return (
                                    <option key={`option-${item.code}`} value={item.code} data-path={item.name_with_type}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>

                <div className="w-[45%] flex flex-col">
                    <label htmlFor="dictrics">Quận/Huyện:
                        <span className="text-red-primary"> (*)</span>
                    </label>
                    <select className="border p-1 rounded mt-1" name="dictrics" id="dictrics"
                        onChange={(e) => {
                            setDistrict({
                                name: e.target.options[e.target.selectedIndex].text,
                                code: e.target.value,
                                path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path')
                            })
                            setAddress({ ...address, path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path') })
                        }}
                    >
                        <option selected value="">--Chọn Quận/Huyện--</option>
                        {districts.length > 0 &&
                            districts.map(item => {
                                return (
                                    <option key={`option-${item.code}`} value={item.code} data-path={item.path_with_type}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="w-[45%] flex flex-col">
                    <label htmlFor="ward">Phường/Xã:</label>
                    <select className="border p-1 rounded mt-1" name="ward" id="ward"
                        onChange={(e) => {
                            setWard({
                                name: e.target.options[e.target.selectedIndex].text,
                                code: e.target.value,
                                path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path')
                            })
                            setAddress({ ...address, path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path') })
                            setPayload({ ...payload, wardCode: e.target.value })
                        }}
                    >
                        <option selected value="">--Chọn Phường/Xã--</option>
                        {wards.length > 0 &&
                            wards.map(item => {
                                return (
                                    <option key={`option-${item.code}`} value={item.code} data-path={item.path_with_type}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="w-[45%] flex flex-col">
                    <label htmlFor="provinces">Chi tiết:</label>
                    <input className="border p-1 rounded"
                        onBlur={(e) => {
                            // setAddress(address=>({ ...address, detail: `${e.target.value}` }))
                            setAddress({ ...address, detail: `${e.target.value}` })
                            setPayload(payload => ({ ...payload, address: `${e.target.value}${e.target.value === '' ? '' : ', '}${address.path_with_type}` }))
                        }}
                    />
                </div>

                <div className="w-[92%] flex flex-col">
                    <label htmlFor="provinces">Địa chỉ:</label>

                    <input ref={refAddress} className="border p-1 rounded"
                        value={payload.address}
                        disabled
                    />
                </div>
            </div>

        </div>
    );
}

export default memo(Address);