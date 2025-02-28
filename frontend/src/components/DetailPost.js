import { useParams } from "react-router-dom";
import { getPostByID } from "../services/apiPost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";

function DetailPost() {

    const param = useParams()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const [previewImgs, setPreviewImgs] = useState([])


    const fetchPostByID = async () => {
        const res = await getPostByID(param?.idPost)
        console.log('check res>>>', res);
        if (res.err == 0) {
            setPreviewImgs([...JSON.parse(res.post.images.images)])
        }
    }

    useEffect(() => {
        if (param?.idPost) {
            fetchPostByID()
        }
    }, [])

    return (
        <div className="">
            <div className="border border-red-800 w-[95%]">
                <Slider {...settings}>
                    {previewImgs.length > 0 &&
                        previewImgs.map((img,index) => {
                            return (
                                <div key={`img-${index}`} className="h-[200px]">
                                    <img className="object-cover object-center size-full" src={img}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>

    );
}

export default DetailPost;