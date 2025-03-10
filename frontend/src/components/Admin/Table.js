import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useSelector } from "react-redux";
import ModalCategoryPriceAcreage from "./ModalCategoryPriceAcreage";

function Table({ type }) {

    const [items, setItems] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const categories = useSelector(state => state.category.categories)
    const price = useSelector(state => state.price.price)
    const area = useSelector(state => state.area.area)

    const handleClickBtnUpdate = () => { }

    const handleClickBtnDelete = () => { }

    useEffect(() => {
        if (type === 'category') {
            setItems(categories)
        }
        if (type === 'price') {
            setItems(price)
        }
        if (type === 'acreage') {
            setItems(area)
        }
    }, [])

    console.log('check items: ', items);


    return (
        <div className="pt-28">
            <button className="flex justify-between items-center gap-2 py-1 px-2 rounded border ml-10 bg-white"
                onClick={() => { setIsShowModal(true) }}
            >
                <span><FcPlus /></span>
                <span>Thêm</span>
            </button>
            <div className="flex flex-col">
                <div className="sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Tiêu đề
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Tùy chọn
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length > 0 &&
                                        items.map((item, index) => {
                                            return (
                                                <tr key={`tr-${item.code}`} className="bg-gray-100 border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                    <td className="text-base text-gray-900 font-medium px-6 py-4 whitespace-normal line-clamp-2 overflow-hidden max-h-[4em]">
                                                        {item.value}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <div className="flex gap-3">
                                                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                                onClick={() => { handleClickBtnUpdate(item.id) }}
                                                            >
                                                                Sửa
                                                            </button>

                                                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                onClick={() => { handleClickBtnDelete(item.id) }}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isShowModal && <ModalCategoryPriceAcreage setIsShowModal={setIsShowModal} type={type} />}
        </div>
    );
}

export default Table;