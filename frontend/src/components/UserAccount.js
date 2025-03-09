import { useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";

import { USER_MANAGE_POSTS, USER_PROFILE, LOGOUT, ADMIN_MANAGE_POSTS } from "../utils/paths";

import imageAvatarDefault from '../assets/images/user.png'


import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserAccount() {

    const [showModal, setShowModal] = useState(false)
    const modalUser = useRef()
    const navigate = useNavigate()
    const user = useSelector(state => state.authenUser)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalUser.current && !modalUser.current.contains(event.target)) {
                setShowModal(false); // Ẩn div khi click ra ngoài
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const navs = [
        {
            title: "Quản lý tin đăng",
            icon: <IoFolderOpenOutline size={'1.5rem'} />,
            path: USER_MANAGE_POSTS
        },
        {
            title: "Quản lý tài khoản",
            icon: <CiUser size={'1.5rem'} />,
            path: USER_PROFILE
        },
        {
            title: "Đăng xuất",
            icon: <IoIosLogOut size={'1.5rem'} />,
            path: LOGOUT
        },
    ]

    return (
        <div ref={modalUser} className="mr-2 relative">
            <div className="flex items-center gap-1 cursor-pointer"
                onClick={() => { setShowModal(!showModal) }}
            >
                <div className="size-10 border p-1 rounded-full overflow-hidden cursor-pointer">
                    <img
                        className="object-cover object-center size-full rounded-full"
                        alt="Ảnh lỗi" src={user.avatar || imageAvatarDefault}
                        onError={(e) => {
                            e.target.onerror = null; // Ngăn lặp vô hạn
                            e.target.src = imageAvatarDefault; // Đổi sang ảnh mặc định
                        }}
                    />
                </div>
                <span className="text-sm">{user.name}</span>
                <span><FaCaretDown /></span>
            </div>
            {showModal &&
                <div className="w-[250px] rounded-xl absolute right-0 bg-white border shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] z-[100] p-5 text-black">
                    <div className="flex gap-4 cursor-pointer"
                    onClick={()=>{navigate(USER_PROFILE)}}
                    >
                        <div className="size-14 border p-1 rounded-full overflow-hidden cursor-pointer">
                            <img
                                className="object-cover object-center size-full rounded-full"
                                alt="Ảnh lỗi" src={user.avatar || imageAvatarDefault}
                                onError={(e) => {
                                    e.target.onerror = null; // Ngăn lặp vô hạn
                                    e.target.src = imageAvatarDefault; // Đổi sang ảnh mặc định
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-lg">{user.name}</span>
                            <span className="text-sm font-normal">{user.phone}</span>
                        </div>
                    </div>

                    <ul className="mt-5">
                        {navs.map((nav, index) => {
                            return (
                                <Link to={nav.path} key={`nav-menu-${index}`}>
                                    <li className="flex mt-3 gap-2 cursor-pointer">
                                        <span>{nav.icon}</span>
                                        <span>{nav.title}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                    {user&&user.role==='R2'&&
                    <div className="flex mt-3 gap-2 cursor-pointer items-center"
                    onClick={()=>{navigate(ADMIN_MANAGE_POSTS)}}
                    >
                        <span><GrUserAdmin/></span>
                        <span>Quản trị viên</span>
                    </div>
                    }
                </div>
            }
        </div>

    );
}

export default UserAccount;