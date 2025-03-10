import { IoMdClose } from "react-icons/io";

function ModalCategoryPriceAcreage({ setIsShowModal, type }) {

    let title = ''
    if (type === 'category') {
        title = 'Thêm danh mục'
    }
    else if (type === 'price') {
        title = 'Thêm khoảng giá'
    }
    else{
         title='Thêm diện tích'
    }

    return (
        <div className="fixed z-20 bg-opacity-65 bg-black left-0 top-0 right-0 bottom-0"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsShowModal(false)
                }
            }}
        >
            <div className="min-h-9 bg-white rounded-xl mx-auto mt-10 px-5 w-[600px]">
                <div className="header flex items-center justify-between py-5 border-b">
                    <p className="text-2xl font-semibold">{title}</p>
                    <span className="cursor-pointer" onClick={() => {
                        setIsShowModal(false)
                    }}>
                        <IoMdClose size={'1.5rem'} />
                    </span>
                </div>
            </div>

        </div>
    );
}

export default ModalCategoryPriceAcreage;