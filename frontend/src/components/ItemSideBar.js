import { FaAngleRight } from "react-icons/fa6";

function ItemSideBar({title}) {
    return ( 
        <div className="bg-white rounded-lg py-5 px-3">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                <div className="flex text-sm items-center gap-1 cursor-pointer hover:text-red-primary">
                    <span><FaAngleRight color="E41B23"/></span>
                    <p>Từ 1- 2 triệu</p>
                </div>
                <div className="flex text-sm items-center gap-1">
                    <span><FaAngleRight color="E41B23"/></span>
                    <p>Từ 1- 2 triệu</p>
                </div>
                <div className="flex text-sm items-center gap-1">
                    <span><FaAngleRight color="E41B23"/></span>
                    <p>Từ 1- 2 triệu</p>
                </div>
            </div>
        </div>
     );
}

export default ItemSideBar;