import { useSelector } from "react-redux";
import ItemSideBar from "./ItemSideBar";

function SideBar() {

    const categories = useSelector(state=>state.category.categories)

    return ( 
        <div className="flex flex-col gap-4">
            <ItemSideBar title={"Xem theo khoảng giá"}/>
            <ItemSideBar title={"Xem theo danh mục"}/>
            <ItemSideBar title={"Xem theo diện tích"}/>
        </div>
     );
}

export default SideBar;