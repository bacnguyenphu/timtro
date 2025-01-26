import { MdStar } from "react-icons/md";
import imgContact from '../assets/images/contact-us-pana-orange.svg'
import { FaHeadset } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

function Footer() {
    return (
        <div className="flex flex-col gap-7">
            <div className="py-5 px-4 rounded-xl shadow-[0px_4px_10px_-2px_rgba(0,_0,_0,_0.4)] bg-white">
                <div className="">
                    <h3 className="text-xl font-semibold text-center">
                        Tại sao lại chọn SearchTro?
                    </h3>
                    <p className="text-center font-light text-sm mt-5">
                        Chúng tôi biết bạn có rất nhiều lựa chọn,
                        nhưng SearchTro tự hào là trang web đứng top google về các từ khóa:
                        cho thuê phòng trọ, nhà trọ, thuê nhà nguyên căn, cho thuê căn hộ, cho thuê mặt bằng...
                        Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn,
                        tiết kiệm chi phí hơn
                    </p>
                </div>

                <div className="flex items-center gap-5 justify-center mt-5">
                    <div className="shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] flex flex-col items-center justify-center border-t border-t-gray-200 rounded-md text-center w-[270px] h-[68px]">
                        <span className="font-semibold">130.000+</span>
                        <p className="font-light">Chủ nhà & Môi giới</p>
                    </div>
                    <div className="shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] flex flex-col items-center justify-center border-t border-t-gray-200 rounded-md text-center w-[270px] h-[68px]">
                        <span className="font-semibold">200.000+</span>
                        <p className="font-light">Tin đăng</p>
                    </div>
                    <div className="shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] flex flex-col items-center justify-center border-t border-t-gray-200 rounded-md text-center w-[270px] h-[68px]">
                        <span className="font-semibold">1.000+</span>
                        <p className="font-light">Tin đăng/ngày</p>
                    </div>
                    <div className="shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] flex flex-col items-center justify-center border-t border-t-gray-200 rounded-md text-center w-[270px] h-[68px]">
                        <span className="font-semibold">3.000.000+</span>
                        <p className="font-light">Lượt xem/tháng</p>
                    </div>

                </div>

                <div className="mt-10">
                    <h3 className="text-lg font-semibold text-center">
                        Chi phí thấp, hiệu quả tối đa
                    </h3>
                    <div className="flex justify-center items-center mt-5">
                        <span className=""><MdStar color="#FFD454" /></span>
                        <span className=""><MdStar color="#FFD454" /></span>
                        <span className=""><MdStar color="#FFD454" /></span>
                        <span className=""><MdStar color="#FFD454" /></span>
                        <span className=""><MdStar color="#FFD454" /></span>
                    </div>
                    <p className="text-center font-light text-sm mt-4">
                        Trước khi biết website searchTro, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website searchTro, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài

                        Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)
                    </p>
                </div>
            </div>
            <div className="py-5 px-7 rounded-xl shadow-[0px_4px_10px_-2px_rgba(0,_0,_0,_0.4)] bg-white flex gap-5">
                <div className="w-1/2">
                    <img className="object-cover object-center size-full" src={imgContact} alt={''} />
                </div>

                <div className="w-1/2 px-5">
                    <span className="flex justify-center items-center mt-10">
                        <FaHeadset size={'2rem'} />
                    </span>
                    <h2 className="text-3xl text-center mt-4">Hỗ trợ chủ nhà đăng tin</h2>
                    <p className=" text-xl text-center font-light mt-5">Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số điện thoại bên dưới:</p>
                    <button className="flex items-center rounded-md bg-red-primary text-white justify-center w-full py-2 gap-3 mt-10">
                        <span className="">
                            <FaPhoneAlt size={'1.5rem'}/>
                        </span>
                        <span className="text-2xl">
                            0865351909
                        </span>
                    </button>
                    <button className="flex items-center rounded-md bg-blue-primary text-white justify-center w-full py-2 gap-3 mt-4">
                        <span className="">
                            <SiZalo size={'2rem'}/>
                        </span>
                        <span className="text-2xl">
                            0865351909
                        </span>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Footer;