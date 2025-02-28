import { useSelector,useDispatch } from "react-redux";
import ItemSideBar from "./ItemSideBar";
import { useEffect } from "react";
import { handleGetPrice } from "../redux/priceSlice";
import { handleGetArea } from "../redux/areaSlice";
import NewPosts from "./NewPosts";
import { useParams } from "react-router-dom";
import Poster from "./Poster";

function SideBar() {

    const dispatch = useDispatch()
    const param = useParams()

    useEffect(()=>{
        fetchPriceAndArea()
    },[])

    const fetchPriceAndArea = async()=>{
        await dispatch(handleGetPrice())
        await dispatch(handleGetArea())
    }

    const categories = useSelector(state=>state.category.categories)
    const price = useSelector(state=>state.price.price)
    const area = useSelector(state=>state.area.area)

    return ( 
        <div className="flex flex-col gap-4">
            {param?.idPost&&<Poster/>}
            <ItemSideBar title={"Xem theo khoảng giá"} content={price}/>
            <ItemSideBar title={"Xem theo danh mục"} content={categories} isCate={true}/>
            <ItemSideBar title={"Xem theo diện tích"} content={area} isArea = {true}/>
            <NewPosts/>
        </div>
     );
}

export default SideBar;