import { getPostsByIDUser } from "../../services/apiPost";
import HeaderTitle from "./HeaderTitle";
import { useEffect, useState } from 'react'
import imageDefault from '../../assets/images/imageDefault.svg'
import ReactPaginate from 'react-paginate';

import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
moment.locale('vi');

function ManagePost() {

    const navs = [
        {
            title: "Tất cả",
            id: "tatca"
        },

    ]

    const location = useLocation()
    const navigate = useNavigate()

    const user = useSelector(state => state.authenUser)
    const idUser = user.id
    const limit = 10
    const [isShowModal, setIsShowModal] = useState(false)
    const [isDeletePost, setIsDeletePost] = useState(false)

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const fetchPosts = async () => {
        const res = await getPostsByIDUser(currentPage, limit, idUser)
        // console.log('check rers>>>', res);

        if (res.err === 0) {
            setPosts(res.posts)
            setTotalPages(res.totalPages)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    };

    const handleClickBtnDelete = (idPost) => {
        setIsShowModal(true)
        setIsDeletePost(true)

        const currentParams = new URLSearchParams(location.search);
        currentParams.set("id", idPost); // Thêm hoặc cập nhật param        
        navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
    }

    const handleClickBtnUpdate = (idPost)=>{
        setIsShowModal(true)
        setIsDeletePost(false)
        const currentParams = new URLSearchParams(location.search);
        currentParams.set("id", idPost); // Thêm hoặc cập nhật param        
        navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
    }

    // console.log('check post>>', posts);


    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Danh sách tin đăng'} navs={navs} />
            </div>
            <div className="pt-28">
                <div className="flex flex-col">
                    <div className="sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-8">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[28.56%]">
                                                Tiêu đề
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[14.28%]">
                                                Ảnh đại diện
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[14.28%]">
                                                Giá
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[14.28%]">
                                                Ngày đăng
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[14.28%]">
                                                Tùy chọn
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.length > 0 &&
                                            posts.map((post, index) => {
                                                return (
                                                    <tr key={`tr-${post.id}`} className="bg-gray-100 border-b">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{(currentPage - 1) * limit + index + 1}</td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal line-clamp-2 overflow-hidden max-h-[4em]">
                                                            {post.title}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="h-10 w-14 rounded-md overflow-hidden">
                                                                <img className="size-full object-cover object-center"
                                                                    src={JSON.parse(post.images.images)[0] || imageDefault} />
                                                            </div>
                                                        </td>
                                                        <td className="text-sm text-green-600 font-medium px-6 py-4 whitespace-nowrap">
                                                            {post.attribute.price}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {moment(post?.createdAt).fromNow()}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex gap-3">
                                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                                onClick={()=>{handleClickBtnUpdate(post.id)}}
                                                                >
                                                                    Sửa
                                                                </button>

                                                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                    onClick={() => { handleClickBtnDelete(post.id) }}
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

            <div className="peage">
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
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
            {isShowModal && <Modal setIsShowModal={setIsShowModal} isDeletePost={isDeletePost}
                fetchPosts={fetchPosts}
            />}
        </div>
    );
}

export default ManagePost;