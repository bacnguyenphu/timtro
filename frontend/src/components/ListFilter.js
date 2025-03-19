import List from "./List";
import { useEffect, useState } from "react";
import { getPostByPaginate } from "../services/apiPost";
import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { scrollToTop } from "../utils/sctrolltop";

function ListFilter() {

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const currentPage = useSelector(state => state.currentPage.currentPage)
    const location = useLocation()

    const limit = 8

    const [isBtnDefault, setIsBtnDefault] = useState(true)
    const [isBtnNewPost, setIsBtnNewPost] = useState(false)

    const categories = useSelector((state) => state.category.categories)
    const price = useSelector(state => state.price.price)
    const area = useSelector(state => state.area.area)
    const address = location.state

    console.log('check address: ', address);


    const param = useParams()

    const [searchParams] = useSearchParams();

    const headerCategory = categories.filter(cate => cate.code === param.category)
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
        scrollToTop()
    }, [currentPage, param.category, searchParams.get("price"), searchParams.get("area"), isBtnNewPost, address])

    // Hàm này mình gọi post được filter, các giá trị được truyền vào hàm getPostByPaginate nếu rỗng thì không lọc
    const fetchPosts = async () => {
        const res = await getPostByPaginate(currentPage, limit, param.category, searchParams.get("price") === 'undefined' ? undefined : searchParams.get("price"), searchParams.get("area") === 'undefined' ? undefined : searchParams.get("area"), isBtnNewPost ? true : undefined, !address ? undefined : address)
        if (res.err === 0) {
            setPosts(res.posts)
            setTotalPages(res.totalPages)
        }
    }

    return (
        <div>
            {param?.idPost ?
                <div>
                    <Outlet />
                </div>
                :
                <div>
                    <div className="header">
                        <h2 className="text-2xl font-semibold">
                            {headerCategory[0]?.header} {headerPrice.length > 0 ? `, ${headerPrice[0].value}` : ''} {headerArea.length > 0 ? `, ${headerArea[0].value}` : ''} {address?`, khu vực ${address}`:''}
                        </h2>
                        <p className="text-sm mt-2">
                            {headerCategory[0]?.subheader}
                        </p>
                    </div>
                    <div>
                        <List posts={posts} totalPages={totalPages}
                            isBtnDefault={isBtnDefault} setIsBtnDefault={setIsBtnDefault}
                            isBtnNewPost={isBtnNewPost} setIsBtnNewPost={setIsBtnNewPost}
                        />
                    </div>
                    {posts && posts.length === 0 &&
                        <div>Không có kết quả</div>
                    }
                </div>
            }
        </div>
    );
}

export default ListFilter;