import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../lensQueries/getPost';

const PostDetails = () => {
    const {id}= useParams();
    const [post,setPost] = useState({});
    const [isPostLoading,setIsPostLoading] = useState(true);

    useEffect(()=>{
        const fetchPost = async() =>{
            if (!id) {
                return
            }
            setIsPostLoading(true);
            const postRes = await getPost(id);
            if (postRes.loading === false) {
                setIsPostLoading(false);
            }
            setPost(postRes.data?.publication);
        }
        fetchPost();
    },[id])
    console.log(post.profile);

    return (
        <div>
            <div>
                {
                    isPostLoading
                    ? <div>Loading.......</div>
                    : <div>
                        <img  src={`https://ipfs.io/ipfs/${post.metadata?.media[0]?.original?.url?.substring(7)}`} alt="" />
                        <Link to={`/user/${post.profile.handle}`}>profile</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default PostDetails;