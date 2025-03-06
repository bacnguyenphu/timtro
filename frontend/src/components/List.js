import { useDispatch, useSelector } from "react-redux";
import { onChangCurrentPage } from "../redux/currentPageSlice";

import ReactPaginate from 'react-paginate';
import moment from 'moment';
import 'moment/locale/vi';
import Post from "./Post";
moment.locale('vi');


function List({ posts, totalPages = 10, isBtnDefault, setIsBtnDefault,
    isBtnNewPost, setIsBtnNewPost }) {

    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage.currentPage)

    const handlePageClick = (event) => {
        dispatch(onChangCurrentPage(event.selected + 1))
    };

    const handleClickBtnDefault = () => {
        setIsBtnDefault(true)
        setIsBtnNewPost(false)
    }

    const handleClickBtnNewPost = () => {
        setIsBtnDefault(false)
        setIsBtnNewPost(true)
    }

    return (
        <div className="rounded-lg px-2 py-3 mt-10">
            <div className="">
                <h2 className="font-semibold">
                    Danh sách tin đăng
                </h2>
                <div className="flex gap-5 mt-4 items-center">
                    <p>Sắp xếp: </p>
                    <button className={`px-3 py-2 ${isBtnDefault ? 'bg-gray-200' : ''} rounded-md`}
                        onClick={() => { handleClickBtnDefault() }}
                    >
                        Mặc định
                    </button>
                    <button className={`px-3 py-2 ${isBtnNewPost ? 'bg-gray-200' : ''} rounded-md`}
                        onClick={() => { handleClickBtnNewPost() }}
                    >
                        Mới nhất
                    </button>
                </div>
            </div>
            <hr className="my-4 border border-red-primary" />
            <div className="list-items flex flex-col gap-3">

                {posts && posts.length > 0 &&
                    posts.map((post => {
                        return (
                            <div key={post?.id}>
                                <Post post={post} />
                            </div>
                        )
                    }))
                }
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

export default List;