import { useEffect, useState } from "react";
import { getPostByPaginate } from "../services/apiPost";
import moment from 'moment';
import imageDefault from '../assets/images/imageDefault.svg'
import 'moment/locale/vi';
moment.locale('vi');

function NewPosts() {

    const [newPosts, setNewPosts] = useState([])
    let lenghtNewPosts = newPosts.length

    const fetchNewPost = async () => {
        const res = await await getPostByPaginate(1, 10, undefined, undefined, undefined, true)
        if (res && res.err === 0) {
            setNewPosts(res.posts)
        }
    }

    useEffect(() => {
        fetchNewPost()
    }, [])

    console.log('check newPosts>>>', newPosts);


    return (
        <div className="bg-white rounded-lg pt-5 px-3">
            <h3 className="font-semibold">Tin mới đăng</h3>
            {newPosts && newPosts.length > 0 &&
                newPosts.map((post, index) => {
                    return (
                        <div className={`item-newPost flex h-[110px] py-3 gap-x-2 ${index + 1 === lenghtNewPosts ? '' : ' border-b'}`}>
                            <div className="w-1/3 rounded-md overflow-hidden">
                                <img className="object-cover object-center size-full"
                                    alt={''}
                                    src={JSON.parse(post?.images?.images)[1] || imageDefault}
                                />
                            </div>
                            <div className="w-2/3">
                                <p className="text-blue-600 line-clamp-2">{post?.title}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-green-600 font-semibold text-nowrap text-sm">{post?.attribute?.price}</span>
                                    <span className="text-[12px] font-normal text-gray-400">{moment(post?.createdAt).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default NewPosts;