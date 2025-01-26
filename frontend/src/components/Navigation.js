import { NavLink } from "react-router-dom";
import { useEffect } from 'react'
import { HOMEPAGE } from "../utils/paths";
import { useSelector,useDispatch } from "react-redux";
import { handleGetCategory } from "../redux/categorySlice";

function Navigation() {

    const categories = useSelector((state) => state.category.categories)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(handleGetCategory())
    },[])

    const classActive = 'text-red-primary after:absolute after:w-full after:h-[3px] after:bg-red-primary after:left-0 after:bottom-0 after:rounded-sm'

    return (
        <div className="shadow-[rgba(0,0,0,0.2)_0px_5px_4px_0px]">
            <div className="px-[255px]">
                <ul className="flex gap-x-5">
                    <div className="relative">
                        <li className="text-base py-3 hover:text-red-primary">
                            <NavLink
                                to={HOMEPAGE}
                                className={({ isActive }) =>
                                    isActive ? classActive : "text-black"
                                }
                            >
                                Trang chủ
                            </NavLink>
                        </li>
                    </div>

                    {categories && categories.length > 0 &&
                        categories.map(category => {
                            return (
                                <div key={category.code} className="relative">
                                    <li className="text-base py-3 hover:text-red-primary">
                                        <NavLink
                                            to={`/filter/${category.code}`}
                                            className={({ isActive }) =>
                                                isActive ? classActive : "text-black"
                                            }
                                        >
                                            {category.value}
                                        </NavLink>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Navigation;