import { useSelector } from "react-redux";

function OverView() {

    const categories = useSelector(state=>state.category.categories)
    console.log('check staet>>>',categories);
    

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)]">
            <h2 className="font-semibold text-xl py-5">Thông tin mô tả</h2>
        </div>
    );
}

export default OverView;