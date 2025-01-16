import ItemSideBar from "./ItemSideBar";

function SideBar() {
    return ( 
        <div className="flex flex-col gap-4">
            <ItemSideBar title={"Xem theo khoảng giá"}/>
            <ItemSideBar title={"Xem theo danh mục"}/>
            <ItemSideBar title={"Xem theo diện tích"}/>
        </div>
     );
}

export default SideBar;