import List from "./List";
import { useEffect, useState } from "react";
import { getPostByPaginate } from "../services/apiPost";
import { useLocation, useParams , useSearchParams  } from "react-router-dom";

function ListFilter() {

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 8

    const param = useParams()
    const [searchParams] = useSearchParams();


    useEffect(() => {
        fetchPosts()
    }, [currentPage, param.category,searchParams.get("price")])

    console.log(searchParams.get("price"));
    


    // Hàm này mình gọi post được filter, các giá trị được truyền vào hàm getPostByPaginate nếu rỗng thì không lọc
    const fetchPosts = async () => {
        const res = await getPostByPaginate(currentPage, limit, param.category,searchParams.get("price"))
        if (res.err === 0) {
            setPosts(res.posts)
            setTotalPages(res.totalPages)
        }
    }

    return (
        <div>
            <div className="header">
                <h2 className="text-2xl font-semibold">
                    Kênh thông tin Phòng trọ uy tín số 3 Việt Nam
                </h2>
                <p className="text-sm mt-2">
                    Tin chuẩn số 3 không ai số 2 - uy tín đỉnh nóc, kịch trần, bay phấp phới. Cho thuê trọ giá rẻ phù hợp
                    với sinh viên, nhà nguyên căn cho gia đình, thuê mặt bằng để khinh doanh, chung cư cho ai có điều kiện.
                </p>
            </div>
            <div>
                <List posts={posts} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            {posts&&posts.length===0&&
            <div>Không có kết quả</div>
            }
        </div>
    );
}

export default ListFilter;