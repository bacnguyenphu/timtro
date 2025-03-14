import { useNavigate } from "react-router-dom";
import { blobToBase64 } from "../utils/convertBase64";

import { MdStar } from "react-icons/md";
import { LuDot } from "react-icons/lu";

import imageDefault from '../assets/images/imageDefault.svg'
import imageAvatarDefault from '../assets/images/user.png'

import { FaHeart, FaPhoneAlt, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likeAndDislikePostByUser } from "../services/apiPost";
import { handleGetPostLikeOfUser } from "../redux/postIsLikedSlice";
import { IoIosCamera } from "react-icons/io";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

function Post({ post }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const postIsLiked = useSelector(state => state.postsIsLiked.postIsLiked)
    const user = useSelector(state => state.authenUser)

    const handleClickLikeAndDislikePostByUser = async (idPost) => {
        const res = await likeAndDislikePostByUser(idPost, user.id)
        if (res.err === 0) {
            await dispatch(handleGetPostLikeOfUser(user.id))
        }
    }

    return (
        <>
            <div key={post.id} className="item flex flex-col h-[475px] bg-white rounded-lg p-4"
            >
                <div className="images h-1/2 flex gap-1 overflow-hidden rounded-lg relative cursor-pointer"
                    onClick={() => { navigate(`/filter/${post.categoryCode}/${post.id}`) }}
                >
                    <div className="w-[60%]">
                        <img className=" object-cover object-center size-full"
                            alt={''}
                            src={JSON.parse(post?.images?.images)[0] || imageDefault}
                        />
                    </div>
                    <div className="w-[40%] flex flex-col gap-1">
                        <div className="h-1/2">
                            <img className=" object-cover object-center size-full"
                                alt={''}
                                src={JSON.parse(post?.images?.images)[1] || imageDefault}
                            />
                        </div>
                        <div className="h-1/2 flex gap-1">
                            <div className="w-1/2">
                                <img className=" object-cover object-center size-full" alt={''}
                                    src={JSON.parse(post?.images?.images)[2] || imageDefault}
                                />
                            </div>
                            <div className="w-1/2">
                                <img className=" object-cover object-center size-full"
                                    alt={''} src={JSON.parse(post?.images?.images)[3] || imageDefault}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex text-white text-sm bottom-1 bg-black bg-opacity-50 px-1 left-1 rounded">
                        <span>
                            <IoIosCamera color="white" size={'1.25rem'} />
                        </span>
                        <span>{JSON.parse(post?.images?.images)?.length}</span>
                    </div>
                </div>
                <div className="content h-1/2 cursor-default">
                    <div className="text-red-primary font-semibold text-[17px] mt-4 flex cursor-pointer"
                        onClick={() => { navigate(`/filter/${post.categoryCode}/${post.id}`) }}
                    >
                        <div className="flex pt-1">
                            <span className=""><MdStar color="#FFD454" /></span>
                            <span className=""><MdStar color="#FFD454" /></span>
                            <span className=""><MdStar color="#FFD454" /></span>
                            <span className=""><MdStar color="#FFD454" /></span>
                            <span className=""><MdStar color="#FFD454" /></span>
                        </div>
                        <p className="float-start">{post?.title}</p>
                    </div>

                    <div className="flex gap-3 items-center text-sm mt-4">
                        <span className="text-green-600 font-semibold text-nowrap">{post?.attribute?.price}</span>
                        <span><LuDot /></span>
                        <span>{post?.attribute?.acreage}</span>
                        <span><LuDot /></span>
                        <span className="truncate">{`${post?.address.split(',')[post?.address.split(',').length - 2]}, ${post?.address.split(',')[post?.address.split(',').length - 1]}`}</span>
                    </div>

                    <p className="text-sm font-normal text-gray-400 line-clamp-2 mt-4">
                        {post?.description}
                    </p>

                    <div className="flex justify-between mt-4 items-center">
                        <div className="flex gap-2 items-center">
                            <div className="size-11 border p-1 rounded-full overflow-hidden cursor-pointer">
                                <img
                                    className="object-cover object-center size-full rounded-full"
                                    alt="Ảnh lỗi" src={post?.user?.avatar !== null ? blobToBase64(post?.user?.avatar) : post?.user?.avatar || imageAvatarDefault}
                                    onError={(e) => {
                                        e.target.onerror = null; // Ngăn lặp vô hạn
                                        e.target.src = imageAvatarDefault; // Đổi sang ảnh mặc định
                                    }}
                                />
                            </div>
                            <div>
                                <p className="cursor-pointer">{post?.user?.name}</p>
                                <p className="text-[12px] font-normal text-gray-400">{moment(post?.createdAt).fromNow()}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button className="bg-green-600 text-white rounded-lg flex gap-2 items-center px-3 py-2 text-sm ">
                                <span>
                                    <FaPhoneAlt color="white" />
                                </span>
                                <span>{post?.user?.phone}</span>
                            </button>
                            <span className="cursor-pointer"
                                onClick={() => { handleClickLikeAndDislikePostByUser(post?.id) }}
                            >
                                {postIsLiked && postIsLiked.some(item => item.id_post === post?.id) ? <FaHeart size={'1.25rem'} color="E41B23" /> : <FaRegHeart size={'1.25rem'} />}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;