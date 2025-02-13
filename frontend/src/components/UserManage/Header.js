import { GoHome } from "react-icons/go";
import UserAccount from "../UserAccount";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate()


    return ( 
        <div className="bg-[#003B95] flex items-center justify-between p-3 w-full">
            <div className="cursor-pointer" onClick={()=>{navigate('/')}}>
                <span><GoHome size={'2rem'} color="white"/></span>
            </div>
            <div className="text-white">
                <UserAccount/>
            </div>
        </div>
     );
}

export default Header;