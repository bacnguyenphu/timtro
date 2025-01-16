import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { login } from '../redux/authSlice';
import { useDispatch } from 'react-redux'

function Login() {

    const navigate = useNavigate()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const handleClickLogin = async() => {
        const payload = {phone,password}
        dispatch(login(payload))
    }

    return (
        <div className="w-[570px] bg-white mx-auto mt-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-10">
            <div className="flex">
                <div className="w-1/2 text-center cursor-pointer pb-4 text-2xl font-semibold border-b-2 border-red-primary">Đăng nhập</div>
                <div className="w-1/2 text-center cursor-pointer pb-4 text-2xl font-light border-b-2" onClick={() => { navigate('/register') }}>Tạo tài khoản</div>
            </div>

            <div className="flex flex-col mt-10 gap-5">
                <div className="relative">
                    <input
                        type="text"
                        id="username"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none  border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        onChange={(e) => { setPhone(e.target.value) }}
                        value={phone}
                    />
                    <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tên đăng nhập</label>
                </div>
                <div className="relative">
                    <input
                        type="password"
                        id="password"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none  border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mật khẩu</label>
                </div>
            </div>

            <div className="mt-7">
                <button className="bg-red-primary text-white text-center rounded-lg w-full py-2 text-xl"
                    onClick={() => { handleClickLogin() }}
                >
                    Đăng nhập
                </button>
            </div>

            <p className="italic text-blue-500 text-xs cursor-pointer mt-3">Bạn quên mật khẩu?</p>
        </div>
    );
}

export default Login;