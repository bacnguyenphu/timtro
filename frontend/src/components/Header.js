import { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineFilter } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import ModalFilterSearch from "./ModalFilterSearch";
import UserAccount from "./UserAccount";

import { LOGIN, POST_LIKED, REGISTER, USER_POST_NEW } from "../utils/paths";

function Header() {
    const navigate = useNavigate()
    const userAuthen = useSelector(state => state.authenUser)
    const postIsLiked = useSelector(state => state.postsIsLiked.postIsLiked)
    const [showModalFilterSearch, setShowModalFilterSearch] = useState(false)

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
                    onClick={() => { setShowModalFilterSearch(true) }}
                >
                    <span className="mt-1"><HiOutlineFilter size={'1.25rem'} /></span>
                    <p>Tìm kiếm theo bộ lọc</p>
                </div>
            </div>

            <div className="flex items-center gap-4 text-white">
                {!userAuthen?.isAuthenticate &&
                    <button className="bg-blue-primary py-1 px-2 rounded" onClick={() => { navigate(LOGIN) }}>Đăng nhập</button>
                }
                {!userAuthen?.isAuthenticate &&
                    <button className="bg-blue-primary py-1 px-2 rounded" onClick={() => { navigate(REGISTER) }}>Đăng Ký</button>
                }
                {userAuthen?.isAuthenticate &&
                    <div className="relative cursor-pointer"
                    onClick={()=>{navigate(POST_LIKED)}}
                    >
                        <span><FaRegHeart color="black" size={'1.25rem'}/></span>
                        <span className="bg-red-primary text-white text-[9px] px-1 rounded absolute -top-2 -left-1">{postIsLiked?.length}</span>
                    </div>
                }
                {userAuthen?.isAuthenticate &&
                    <p className="text-black"><UserAccount /></p>
                }
                {userAuthen?.isAuthenticate &&
                    <button className="flex items-center bg-red-primary py-1 px-2 rounded gap-2"
                        onClick={() => { navigate(USER_POST_NEW) }}
                    >
                        <span className="mt-1">
                            <FaRegPenToSquare />
                        </span>
                        <span>Đăng tin mới</span>
                    </button>
                }
            </div>
            {showModalFilterSearch && <ModalFilterSearch setShowModalFilterSearch={setShowModalFilterSearch} />}
        </div>
    );
}

export default Header;