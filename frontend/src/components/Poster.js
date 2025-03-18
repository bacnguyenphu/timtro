import imageAvatarDefault from '../assets/images/user.png'
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { blobToBase64 } from '../utils/convertBase64';
import { useSelector } from 'react-redux';

function Poster() {

    const poster = useSelector(state => state.poster)

    return (
        <div className="bg-white rounded-lg py-5 px-3 flex flex-col items-center justify-center">
            <div className="size-16 rounded-full overflow-hidden">
                <img
                    className="object-cover object-center size-full rounded-full"
                    alt="Ảnh lỗi" src={poster?.avatar !== null ? blobToBase64(poster?.avatar) : poster?.avatar || imageAvatarDefault}
                    onError={(e) => {
                        e.target.onerror = null; // Ngăn lặp vô hạn
                        e.target.src = imageAvatarDefault; // Đổi sang ảnh mặc định
                    }}
                />
            </div>
            <div className='py-4'>
                <p className='text-gray-300 text-sm'>Đăng 3 ngày trước</p>
                <h3 className='font-semibold text-center'>{poster?.name}</h3>
            </div>
            <div className='w-full'>
                <button className="bg-green-600 text-white rounded-lg flex gap-2 items-center px-3 py-2 w-full flex items-center justify-center">
                    <span>
                        <FaPhoneAlt color="white" />
                    </span>
                    <span>{poster?.phone}</span>
                </button>
                <button className="flex items-center rounded-md bg-blue-primary text-white justify-center w-full py-2 gap-3 mt-4">
                    <span className="">
                        <SiZalo size={'1.5rem'} />
                    </span>
                    <span>
                        {poster?.zalo}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Poster;