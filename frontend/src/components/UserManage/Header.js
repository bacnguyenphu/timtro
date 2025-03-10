import { GoHome } from "react-icons/go";
import UserAccount from "../UserAccount";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleGetCategory } from "../../redux/categorySlice";
import { useEffect } from "react";
import { handleGetPrice } from "../../redux/priceSlice";
import { handleGetArea } from "../../redux/areaSlice";

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPriceAndArea = async () => {
            await dispatch(handleGetCategory())
            await dispatch(handleGetPrice())
            await dispatch(handleGetArea())
        }
        fetchPriceAndArea()
    }, [])

    return (
        <div className="bg-[#003B95] flex items-center justify-between p-3 w-full">
            <div className="cursor-pointer" onClick={() => { navigate('/') }}>
                <span><GoHome size={'2rem'} color="white" /></span>
            </div>
            <div className="text-white">
                <UserAccount />
            </div>
        </div>
    );
}

export default Header;