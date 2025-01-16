import { CiCirclePlus } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    return ( 
        <div className="h-[65px] border-b-2 flex items-center justify-between">
            <div className="flex flex-col cursor-pointer select-none">
                <div className="font-bold text-xl" onClick={()=>{navigate('/')}}>
                    <span className="text-red-primary">SEARCH</span>
                    <span className="text-blue-primary">TRỌ</span>
                </div>
                <div>
                    <p className="text-[10px] font-semibold">Kênh thông tin phòng trọ cho sinh viên</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-white">
                <p className="text-black">Xin chào Bắc!</p>
                <button className="bg-blue-primary py-1 px-2 rounded" onClick={()=>{navigate('/login')}}>Đăng nhập</button>
                <button className="bg-blue-primary py-1 px-2 rounded" onClick={()=>{navigate('/register')}}>Đăng Ký</button>
                <button className="flex items-center bg-red-primary py-1 px-2 rounded">
                    <span>Đăng tin mới</span>
                    <span className="mt-1">
                        <CiCirclePlus/>
                    </span>
                </button>
            </div>
        </div>
     );
}

export default Header;