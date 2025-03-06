import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { useEffect, useState } from "react";
import { getPostsLiked } from "../services/apiPost";
import Post from "./Post";
import ReactPaginate from "react-paginate";
import { onChangCurrentPage } from "../redux/currentPageSlice";
import { scrollToTop } from "../utils/sctrolltop";

function PostLiked() {

    const postIsLiked = useSelector(state => state.postsIsLiked.postIsLiked)
    const currentPage = useSelector(state => state.currentPage.currentPage)

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    
    let temp = []

    if (postIsLiked && postIsLiked.length > 0) {
        temp = _.cloneDeep(postIsLiked)
    }

    const listId = temp.map(item => {
        return item.id_post
    })

    useEffect(() => {
        if (listId.length > 0) {
            scrollToTop()
            fetchPosts()
        }
    }, [currentPage])

    const fetchPosts = async () => {
        const res = await getPostsLiked(JSON.stringify(listId),currentPage,7)
        if (res.err === 0) {
            setPosts(res.data)
            setTotalPages(res.totalPages)
        }
    }
    const handlePageClick = (event) => {
        dispatch(onChangCurrentPage(event.selected + 1))
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Bài viết đã lưu</h2>
            <div>
                {posts.length===0?
                <p>Không có bài đã lưu</p>
                :
                <div className="flex flex-col gap-3 mt-4">
                    {posts.map(post=>{
                        return(
                            <div key={post.id}>
                                <Post post={post}/>
                            </div>
                        )
                    })}
                </div>    
            }
            </div>
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
    );
}

export default PostLiked;