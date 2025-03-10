import { CiUser } from "react-icons/ci";
import { IoFolderOpenOutline, IoPricetagOutline } from "react-icons/io5";
import { PiSelectionForeground } from "react-icons/pi";
import { TbCategoryMinus } from "react-icons/tb";
import { ADMIN_MANAGE_ACREAGE, ADMIN_MANAGE_CATEGORIES, ADMIN_MANAGE_POSTS, ADMIN_MANAGE_PRICE, ADMIN_MANAGE_USERS, LOGOUT } from "../../utils/paths";
import { useSelector } from "react-redux";
import imageAvatarDefault from '../../assets/images/user.png'
import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function SideBar() {

    const user = useSelector(state => state.authenUser)

    const navs = [
        {
            title: "Quản lí bài đăng",
            icon: <IoFolderOpenOutline size={'1.25rem'} />,
            path: ADMIN_MANAGE_POSTS,
        },
        {
            title: "Quản lí người dùng",
            icon: <CiUser size={'1.25rem'} />,
            path: ADMIN_MANAGE_USERS,
        },
        {
            title: "Quản lí danh mục",
            icon: <TbCategoryMinus size={'1.25rem'} />,
            path: ADMIN_MANAGE_CATEGORIES,
        },
        {
            title: "Quản lí khoảng giá",
            icon: <IoPricetagOutline size={'1.25rem'} />,
            path: ADMIN_MANAGE_PRICE,
        },
        {
            title: "Quản lí diện tích",
            icon: <PiSelectionForeground size={'1.25rem'} />,
            path: ADMIN_MANAGE_ACREAGE,
        },
        {
            title: "Đăng xuất",
            icon: <IoIosLogOut size={'1.25rem'} />,
            path: LOGOUT,
        },
    ]

    return (
        <div className="px-2 py-4 bg-white h-full">
            <div className="flex gap-4 cursor-pointer h-[90px] items-center">
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
            <div>
                <ul className="mt-5">
                    {navs.map((nav, index) => {
                        return (
                            <NavLink to={nav.path}
                                className={({ isActive }) =>
                                    isActive ? "font-bold" : ""
                                }
                                key={`nav-menu-${index}`}
                            >
                                <li className="flex mt-4 gap-2 cursor-pointer items-center">
                                    <span>{nav.icon}</span>
                                    <span>{nav.title}</span>
                                </li>
                            </NavLink>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;