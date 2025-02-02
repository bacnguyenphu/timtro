import { IoMdClose } from "react-icons/io";
import { BsBorderAll } from "react-icons/bs";
import { PiBuildingApartmentLight, PiStorefrontLight } from "react-icons/pi";
import { BsHouses } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams,useSearchParams } from "react-router-dom";
import _ from 'lodash'

function ModalFilterSearch({ setShowModalFilterSearch }) {

    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState([])
    const [area, setArea] = useState([])
    const navigate = useNavigate()

    const [filterType, setFilter] = useState({
        category: undefined,
        area: undefined,
        price: undefined
    })

    const params = useParams()
    const [searchParams] = useSearchParams();

    const priceQuery = searchParams.get("price") 
    const areaQuery = searchParams.get("area") 

    const Getcategories = useSelector((state) => state.category.categories)
    const Getprice = useSelector(state => state.price.price)
    const Getarea = useSelector(state => state.area.area)

    useEffect(() => {
        const icons = [<BsBorderAll />, <PiBuildingApartmentLight size={'1.25rem'} />,
        <PiStorefrontLight size={'1.25rem'} />, <BsHouses size={'1.25rem'} />,
        <IoHomeOutline size={'1.25rem'} />]

        if (Array.isArray(Getcategories)) {
            const tempCategories = [
                {
                    code: undefined,
                    value: "Tất cả",
                    isSelected: _.isEmpty(params) ? true: false ,
                    icon: <BsBorderAll />,
                },
            ];

            Getcategories.forEach((cate, index) => {
                let temp = {
                    code: cate?.code,
                    value: cate?.value,
                    isSelected: false,
                    icon: icons[index + 1] || null, // Sử dụng icon nếu tồn tại
                };

                if(params?.category===cate?.code){
                    temp.isSelected = true
                }

                tempCategories.push(temp);
            });

            setCategories(tempCategories);
        }

        if (Array.isArray(Getprice)) {
            const tempPrice = [
                {
                    code: undefined,
                    value: "Tất cả",
                    isSelected: (!priceQuery || priceQuery==='undefined') ? true : false,
                },
            ];

            Getprice.forEach((cate, index) => {
                let temp = {
                    code: cate?.code,
                    value: cate?.value,
                    isSelected: false,
                };

                if(priceQuery===cate?.code){
                    temp.isSelected = true
                }

                tempPrice.push(temp);
            });

            setPrice(tempPrice);
        }

        if (Array.isArray(Getarea)) {
            const tempArea = [
                {
                    code: undefined,
                    value: "Tất cả",
                    isSelected: (!areaQuery || areaQuery==='undefined') ? true : false,
                },
            ];

            Getarea.forEach((cate, index) => {
                let temp = {
                    code: cate?.code,
                    value: cate?.value,
                    isSelected: false,
                };

                if(areaQuery===cate?.code){
                    temp.isSelected = true
                }

                tempArea.push(temp);
            });

            setArea(tempArea);
        }

    }, [Getcategories, Getprice, Getarea]);

    const handleSelected = (index, type) => {

        let tempArr = []
        if (type === 'CATEGORY') {
            tempArr = [...categories]
        }

        if (type === 'PRICE') {
            tempArr = [...price]
        }

        if (type === 'AREA') {
            tempArr = [...area]
        }

        tempArr.forEach(item => {
            if (item.isSelected === true) {
                item.isSelected = false
            }
        })

        tempArr[index].isSelected = true

        if (type === 'CATEGORY') {
            setCategories(tempArr)
            setFilter({ ...filterType, category: tempArr[index].code })
        }

        if (type === 'PRICE') {
            setPrice(tempArr)
            setFilter({ ...filterType, price: tempArr[index].code })
        }

        if (type === 'AREA') {
            setArea(tempArr)
            setFilter({ ...filterType, area: tempArr[index].code })
        }
    }

    const handleClickApply = () => {
        if (!filterType.category) {
            if(!filterType.price&&!filterType.area){
                return
            }
            navigate(`?price=${filterType.price}&area=${filterType.area}`)
            setShowModalFilterSearch(false)
        }
        else{
            if(!filterType.price&&!filterType.area){
                navigate(`/filter/${filterType.category}`)
                setShowModalFilterSearch(false)
                return
            }
            navigate(`/filter/${filterType.category}?price=${filterType.price}&area=${filterType.area}`)
            setShowModalFilterSearch(false)
        }
    }

    return (
        <div className="fixed z-20 bg-opacity-65 bg-black left-0 top-0 right-0 bottom-0"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowModalFilterSearch(false)
                }
            }}
        >
            <div className="w-[600px] bg-white rounded-xl mx-auto mt-10 px-5">
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl">Bộ lọc</p>
                    <span className="" onClick={() => { setShowModalFilterSearch(false) }}><IoMdClose size={'1.5rem'} /></span>
                </div>
                <div className="mt-5 h-[470px] overflow-y-auto">
                    <div>
                        <p>Danh mục cho thuê</p>
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {categories && categories.length > 0 &&
                                categories.map((category, index) => {
                                    return (
                                        <div key={`cate-${category?.code}`}
                                            className={`flex flex-col gap-1 justify-center items-center border rounded-xl px-3 py-2 cursor-pointer relative overflow-hidden ${category?.isSelected ? 'border-red-primary' : ''}`}
                                            onClick={() => { handleSelected(index, 'CATEGORY') }}
                                        >
                                            <span>
                                                {category.icon}
                                            </span>
                                            <p className="font-light text-sm">{category.value}</p>
                                            {category?.isSelected && <span className="triangle-label absolute top-0 right-0"></span>
                                            }
                                            {category?.isSelected &&
                                                <span className="absolute top-0 right-0">
                                                    <IoCheckmark color="white" size={'0.95rem'} />
                                                </span>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="mt-10">
                        <p>Khoảng giá</p>
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {price && price.length > 0 &&
                                price.map((pri, index) => {
                                    return (
                                        <div key={`cate-${pri?.code}`}
                                            className={`flex flex-col gap-1 justify-center items-center border rounded-xl px-3 py-2 cursor-pointer relative overflow-hidden ${pri?.isSelected ? 'border-red-primary' : ''}`}
                                            onClick={() => { handleSelected(index, 'PRICE') }}
                                        >
                                            <p className="font-light text-sm">{pri.value}</p>
                                            {pri?.isSelected && <span className="triangle-label absolute top-0 right-0"></span>
                                            }
                                            {pri?.isSelected &&
                                                <span className="absolute top-0 right-0">
                                                    <IoCheckmark color="white" size={'0.95rem'} />
                                                </span>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="mt-10">
                        <p>Khoảng diện tích</p>
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {area && area.length > 0 &&
                                area.map((pri, index) => {
                                    return (
                                        <div key={`cate-${pri?.code}`}
                                            className={`flex flex-col gap-1 justify-center items-center border rounded-xl px-3 py-2 cursor-pointer relative overflow-hidden ${pri?.isSelected ? 'border-red-primary' : ''}`}
                                            onClick={() => { handleSelected(index, 'AREA') }}
                                        >
                                            <p className="font-light text-sm">{pri.value}</p>
                                            {pri?.isSelected && <span className="triangle-label absolute top-0 right-0"></span>
                                            }
                                            {pri?.isSelected &&
                                                <span className="absolute top-0 right-0">
                                                    <IoCheckmark color="white" size={'0.95rem'} />
                                                </span>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

                <div className="footer py-4">
                    <button className="text-center py-3 rounded-full w-full text-white bg-red-primary"
                        onClick={() => { handleClickApply() }}
                    >
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalFilterSearch;