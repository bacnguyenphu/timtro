import List from "./List";
import { useEffect, useState } from "react";
import { getPostByPaginate } from "../services/apiPost";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 8
    const [searchParams] = useSearchParams();

    const [isBtnDefault, setIsBtnDefault] = useState(true)
    const [isBtnNewPost, setIsBtnNewPost] = useState(false)

    const price = useSelector(state => state.price.price)
    const area = useSelector(state => state.area.area)


    let headerPrice = []
    if (searchParams.get("price")) {
        headerPrice = price.filter(pri => pri.code === searchParams.get("price"))
    }

    let headerArea = []
    if (searchParams.get("area")) {
        headerArea = area.filter(are => are.code === searchParams.get("area"))
    }

    useEffect(() => {
        fetchPosts()
    }, [currentPage, searchParams.get("price"), searchParams.get("area"), isBtnNewPost])

    const fetchPosts = async () => {
        const res = await getPostByPaginate(currentPage, limit, undefined, searchParams.get("price") === 'undefined' ? undefined : searchParams.get("price"), searchParams.get("area") === 'undefined' ? undefined : searchParams.get("area"), isBtnNewPost ? true : undefined)
        if (res.err === 0) {
            setPosts(res.posts)
            setTotalPages(res.totalPages)
        }
    }

    return (
        <div>
            <div className="header">
                <h2 className="text-2xl font-semibold">
                    {`Kênh thông tin Phòng trọ uy tín số 3 Việt Nam`} {headerPrice.length > 0 ? `, ${headerPrice[0].value}` : ''} {headerArea.length > 0 ? `, ${headerArea[0].value}` : ''}
                </h2>
                <p className="text-sm mt-2">
                    Tin chuẩn số 3 không ai số 2 - uy tín đỉnh nóc, kịch trần, bay phấp phới. Cho thuê trọ giá rẻ phù hợp
                    với sinh viên, nhà nguyên căn cho gia đình, thuê mặt bằng để khinh doanh, chung cư cho ai có điều kiện.
                </p>
            </div>
            <div>
                <List posts={posts} totalPages={totalPages}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    isBtnDefault={isBtnDefault} setIsBtnDefault={setIsBtnDefault}
                    isBtnNewPost={isBtnNewPost} setIsBtnNewPost={setIsBtnNewPost}
                />
            </div>
            {posts && posts.length === 0 &&
                <div>Không có kết quả</div>
            }
        </div>
    );
}

export default HomePage;