import { useSelector } from "react-redux";
import List from "./List";
import _ from 'lodash'
import { useEffect, useState } from "react";
import { getPostsLiked } from "../services/apiPost";

function PostLiked() {

    const postIsLiked = useSelector(state => state.postsIsLiked.postIsLiked)
    const [posts, setPosts] = useState([])
    let temp = []

    if (postIsLiked && postIsLiked.length > 0) {
        temp = _.cloneDeep(postIsLiked)
    }

    const listId = temp.map(item => {
        return item.id_post
    })

    useEffect(() => {
        if (listId.length>0) {
            fetchPosts()
        }
    }, [listId])

    const fetchPosts = async () => {
        const res = await getPostsLiked(JSON.stringify(listId))
        console.log('check res>>', res);

    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Bài viết đã lưu</h2>
            <div>
                {/* <List posts={posts} totalPages={totalPages}
                    isBtnDefault={isBtnDefault} setIsBtnDefault={setIsBtnDefault}
                    isBtnNewPost={isBtnNewPost} setIsBtnNewPost={setIsBtnNewPost}
                /> */}
            </div>
        </div>
    );
}

export default PostLiked;