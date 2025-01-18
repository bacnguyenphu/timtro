import List from "./List";
import { useEffect, useState } from "react";
import { getPostByPaginate } from "../services/apiPost";
import { useSearchParams } from "react-router-dom";

function HomePage() {

    const [posts, setPosts] = useState([])
    const[totalPages,setTotalPages] = useState(0)
    const[currentPage,setCurrentPage] = useState(1)
    const limit = 8

    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchPosts()
    }, [currentPage,searchParams.get("price")])

    const fetchPosts = async () => {
        const res = await getPostByPaginate(currentPage,limit,undefined,searchParams.get("price"))
        if (res.err === 0) {
            setPosts(res.posts) 
            setTotalPages(res.totalPages)
        }
    }

    return ( 
        <div>
            <div className="header">
                <h2 className = "text-2xl font-semibold">
                    Kênh thông tin Phòng trọ uy tín số 3 Việt Nam
                </h2>
                <p className = "text-sm mt-2">
                    Tin chuẩn số 3 không ai số 2 - uy tín đỉnh nóc, kịch trần, bay phấp phới. Cho thuê trọ giá rẻ phù hợp
                    với sinh viên, nhà nguyên căn cho gia đình, thuê mặt bằng để khinh doanh, chung cư cho ai có điều kiện. 
                </p>
            </div>
            <div>
                <List posts ={posts} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
     );
}

export default HomePage;