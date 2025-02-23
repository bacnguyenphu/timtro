import { FcOldTimeCamera } from "react-icons/fc";
import { CiTrash } from "react-icons/ci";
import { memo } from "react";

function Images({ images, setImages,imagesPreview,setImagesPreview }) {

    const handleUploadImages = (e) => {
        const files = e.target.files
        setImages([...images,...files])
        for (const file of files) {
            setImagesPreview(images => [...images, URL.createObjectURL(file)])
        }
    }

    const handleRemoveImg =(index)=>{
        setImagesPreview((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="w-[780px] bg-white rounded-md px-5 shadow-[0px_8px_10px_-2px_rgba(0,_0,_0,_0.4)] pb-5 mt-5">
            <h2 className="font-semibold text-xl py-5">Hình ảnh</h2>
            <div>
                <label className="border-dashed border-2 border-sky-500 rounded-md h-[142px] w-full flex flex-col items-center justify-center"
                    htmlFor="uploadImages"
                >
                    <span><FcOldTimeCamera size={'3rem'} /></span>
                    <span className="font-light">Tải ảnh từ thiết bị</span>
                </label>
                <input id="uploadImages" hidden type="file" multiple onChange={handleUploadImages} />
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
                {imagesPreview.length > 0 &&
                    imagesPreview.map((image, index) => {
                        return(
                            <div key={`imageMnU--${index}`} className="w-[172px] h-[125px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md overflow-hidden">
                                <div className="w-full h-[100px]">
                                    <img className="object-cover object-center size-full" src={image} alt={''}/>
                                </div>
                                <div className="flex items-center justify-center h-[25px] cursor-pointer"
                                onClick={()=>handleRemoveImg(index)}
                                >
                                    <span><CiTrash color="#e41b23"/></span>
                                    <span className="text-red-primary text-xs">Xoá</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default memo(Images);