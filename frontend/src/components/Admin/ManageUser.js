import { useEffect, useState } from "react";
import { HeaderTitle } from "../UserManage";
import imageAvatarDefault from '../../assets/images/user.png'
import moment from 'moment';
import 'moment/locale/vi';
import { getUsers } from "../../services/apiUser";
import { blobToBase64 } from "../../utils/convertBase64";
import ReactPaginate from "react-paginate";
moment.locale('vi');

function ManageUser() {

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const limit = 10


    const handleClickBtnDelete = () => { }

    const handleClickBtnUpdate = () => {

    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers(currentPage, limit)
            if (res.err === 0) {
                setUsers(res.data)
                setTotalPages(res.totalPages)
            }
        }
        fetchUsers()
    }, [currentPage])

    console.log('check users: ', users);


    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Danh sách người dùng'} />
            </div>
            <div className="pt-28">
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
                                                Tên
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Ảnh đại diện
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Số điện thoại
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Zalo
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Tùy chọn
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 &&
                                            users.map((user, index) => {
                                                return (
                                                    <tr key={`tr-${user.id}`} className="bg-gray-100 border-b">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{(currentPage - 1) * limit + index + 1}</td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal line-clamp-2 overflow-hidden max-h-[4em]">
                                                            {user?.name}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="size-12 rounded-full overflow-hidden">
                                                                <img className="size-full object-cover object-center"
                                                                    src={user.avatar !== null ? blobToBase64(user?.avatar) : imageAvatarDefault} />
                                                            </div>
                                                        </td>
                                                        <td className="text-sm text-green-600 font-medium px-6 py-4 whitespace-nowrap">
                                                            {user?.phone}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user?.zalo}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex gap-3">
                                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                                    onClick={() => { handleClickBtnUpdate(user.id) }}
                                                                >
                                                                    Sửa
                                                                </button>

                                                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                    onClick={() => { handleClickBtnDelete(user.id) }}
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
            </div>
            <div>
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    forcePage={currentPage - 1} // cái này giúp hiển thị page theo state react
                    // initialPage={0}
                    nextLabel=">"
                    previousLabel="<"
                    previousLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-primary"
                    nextLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-primary"
                    breakLabel="..."
                    pageClassName="mx-1"
                    pageLinkClassName="block px-3 py-2 overflow-hidden border border-gray-300 rounded hover:bg-blue-primary"
                    previousClassName="mx-1"
                    nextClassName="mx-1"
                    breakClassName="mx-1"
                    breakLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-primary"
                    containerClassName=" flex flex-wrap justify-center mt-4 items-center"
                    activeClassName="bg-blue-primary overflow-hidden text-white"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default ManageUser;