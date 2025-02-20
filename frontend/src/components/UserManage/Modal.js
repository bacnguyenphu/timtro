import { IoMdClose } from "react-icons/io";

function Modal({ setIsShowModal, isDeletePost }) {
    return (
        <div className="fixed z-20 bg-opacity-65 bg-black left-0 top-0 right-0 bottom-0"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsShowModal(false)
                }
            }}
        >
            <div className="w-[600px] min-h-9 bg-white rounded-xl mx-auto mt-10 px-5">
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl">Bộ lọc</p>
                    <span className="" onClick={() => { setIsShowModal(false) }}><IoMdClose size={'1.5rem'} /></span>
                </div>
            </div>
        </div>
    );
}

export default Modal;