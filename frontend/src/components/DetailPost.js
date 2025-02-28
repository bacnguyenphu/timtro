import { useParams } from "react-router-dom";
import { getPostByID } from "../services/apiPost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { RxRulerSquare } from "react-icons/rx";
import { CiTimer } from "react-icons/ci";
import imageDefault from '../assets/images/imageDefault.svg'

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

function DetailPost() {

    const param = useParams()
    const [post,setPost] = useState({})
    console.log('check post: ',post);
    

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div className="absolute top-[45%] left-[95%] z-20 cursor-pointer border p-2 rounded-full bg-black bg-opacity-40"
                onClick={onClick}
            >
                <span><GrNext size={'2rem'} color="white" /></span>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div className="absolute top-[45%] translate-x-[-30%] z-20 cursor-pointer border p-2 rounded-full bg-black bg-opacity-40"
                onClick={onClick}
            >
                <span><GrPrevious size={'2rem'} color="white" /></span>
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    const [previewImgs, setPreviewImgs] = useState([])


    const fetchPostByID = async () => {
        const res = await getPostByID(param?.idPost)
        console.log('check res>>>', res);
        if (res.err == 0) {
            setPreviewImgs([...JSON.parse(res.post?.images?.images)]||[imageDefault])
            setPost(res.post)
        }
    }

    useEffect(() => {
        if (param?.idPost) {
            fetchPostByID()
        }
    }, [])

    return (
        <div className="">
            <div className=" w-full">
                <Slider {...settings}>
                    {previewImgs.length > 0 &&
                        previewImgs.map((img, index) => {
                            return (
                                <div key={`img-${index}`} className="h-[276px]">
                                    <img className="object-cover object-center size-full" src={img} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div className="mt-10 bg-white rounded-lg flex flex-col px-3">
                    <p className="text-red-primary font-semibold mt-4 flex cursor-pointer float-start text-2xl">{post.title}</p>
                    <div className="flex items-center my-4">
                        <span><CiLocationOn size={'1.25rem'} color="blue"/></span>
                        <p>Địa chỉ: {post?.address}</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex items-center gap-2">
                            <span><IoPricetagsOutline /></span>
                            <span className="font-bold text-green-600">{post?.attribute?.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span><RxRulerSquare /></span>
                            <span className="text-gray-400">{post?.attribute?.acreage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span><CiTimer /></span>
                            <span className="text-gray-400">{moment(post?.createdAt).fromNow()}</span>
                        </div>
                    </div>
            </div>
        </div>

    );
}

export default DetailPost;