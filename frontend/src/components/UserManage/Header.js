import { GoHome } from "react-icons/go";
import UserAccount from "../UserAccount";

function Header() {
    return ( 
        <div className="bg-[#003B95] flex items-center justify-between p-3">
            <div className="cursor-pointer">
                <span><GoHome size={'2rem'} color="white"/></span>
            </div>
            <div className="text-white">
                <UserAccount/>
            </div>
        </div>
     );
}

export default Header;