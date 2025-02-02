import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { HiOutlineFilter } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import ModalFilterSearch from "./ModalFilterSearch";

function Header() {
    const navigate = useNavigate()
    const userAuthen = useSelector(state => state.authenUser)
    const[showModalFilterSearch,setShowModalFilterSearch] = useState(false)

    return (
        <div className="h-[65px] border-b-2 flex items-center justify-between">
            <div className="flex items-center gap-20">
                <div className="flex flex-col cursor-pointer select-none">
                    <div className="font-bold text-xl" onClick={() => { navigate('/') }}>
                        <span className="text-red-primary">SEARCH</span>
                        <span className="text-blue-primary">TRỌ</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold">Kênh thông tin phòng trọ cho sinh viên</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-2 rounded-full border py-2 px-3 text-sm cursor-pointer"
                onClick={()=>{setShowModalFilterSearch(true)}}
                >
                    <span className="mt-1"><HiOutlineFilter size={'1.25rem'}/></span>
                    <p>Tìm kiếm theo bộ lọc</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-white">
                {userAuthen?.isAuthenticate &&
                    <p className="text-black">Xin chào {userAuthen?.name}!</p>
                }
                {!userAuthen?.isAuthenticate &&
                    <button className="bg-blue-primary py-1 px-2 rounded" onClick={() => { navigate('/login') }}>Đăng nhập</button>
                }
                {!userAuthen?.isAuthenticate &&
                    <button className="bg-blue-primary py-1 px-2 rounded" onClick={() => { navigate('/register') }}>Đăng Ký</button>
                }
                {userAuthen?.isAuthenticate &&
                    <button className="flex items-center bg-red-primary py-1 px-2 rounded">
                        <span>Đăng tin mới</span>
                        <span className="mt-1">
                            <CiCirclePlus />
                        </span>
                    </button>
                }
            </div>
            {showModalFilterSearch&& <ModalFilterSearch setShowModalFilterSearch ={setShowModalFilterSearch}/>}
        </div>
    );
}

export default Header;