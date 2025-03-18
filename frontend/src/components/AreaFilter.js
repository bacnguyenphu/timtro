import { useEffect, useState } from "react";
import { getDictricsByProvincesPl, getProvincesAllPl } from "../services/apiPublicProvincesVN";

function AreaFilter({setAddress,address}) {

    const [provinces, setProvinces] = useState([])
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

    useEffect(() => {
        const fetchAddress = async () => {
            const res = await getProvincesAllPl()
            setProvinces(res.data)
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

    return (
        <div className="flex gap-5 mt-4">
            <div className="flex flex-col w-1/2">
                <label className="text-sm" htmlFor="provinces">Tỉnh/thành phố</label>
                <select className="border p-1 rounded mt-1" name="provinces" id="provinces"
                    onChange={(e) => {
                        setProvince({
                            name: e.target.options[e.target.selectedIndex].text,
                            code: e.target.value,
                            path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path')
                        })
                        setAddress(e.target.options[e.target.selectedIndex].getAttribute('data-path') )
                    }}
                >
                    <option className="text-sm" selected value='' data-path=''>--Chọn Tỉnh/Thành Phố--</option>
                    {provinces.length > 0 &&
                        provinces.map(item => {
                            return (
                                <option key={`option-${item.code}`} value={item.code} data-path={item.name_with_type}>
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col w-1/2">
                <label className="text-sm" htmlFor="dictrics">Quận/Huyện</label>
                <select className="border p-1 rounded mt-1" name="dictrics" id="dictrics"
                    onChange={(e) => {
                        setDistrict({
                            name: e.target.options[e.target.selectedIndex].text,
                            code: e.target.value,
                            path_with_type: e.target.options[e.target.selectedIndex].getAttribute('data-path')
                        })
                        setAddress(e.target.options[e.target.selectedIndex].getAttribute('data-path') )
                    }}
                >
                    <option className="text-sm" selected value='' data-path=''>--Chọn Quận/Huyện--</option>
                    {districts.length > 0 &&
                        districts.map(item => {
                            return (
                                <option key={`option-${item.code}`} value={item.code} data-path={item.path_with_type}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    );
}

export default AreaFilter;