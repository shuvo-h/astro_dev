import React, { useEffect, useState } from 'react';
import "./postDetails.css";
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../lensQueries/getPost';
import { getPostComments } from '../../lensQueries/getPostComments';
import Layout from '../common/Layout';
import Loader from '../Loaders/Loader';
import { AiOutlineInbox,AiOutlineComment,AiOutlineSwap } from 'react-icons/ai';
import { IconContext } from "react-icons";
import Comment from './Comment';

const PostDetails = () => {
    const {id}= useParams();
    const [post,setPost] = useState({});
    const [comments,setComments] = useState([]);
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
            const commentRes = await getPostComments(id);
            setComments(commentRes.data?.publications?.items??[]);
        }
        fetchPost();
    },[id])
    console.log(post,comments);

    return (
        <Layout>
            <section>
                {
                    isPostLoading
                    ? <div style={{margin:"3rem auto",display:"grid", justifyItems:"center"}}><Loader /></div>
                    : <div className='post_details'>
                        <div>
                            <div>
                                <img className='post_img' src={`https://ipfs.io/ipfs/${post.metadata?.media[0]?.original?.url?.substring(7)}`} alt="" />
                                <div className='post_stats'>
                                    <p className='post_stat'>
                                        <IconContext.Provider value={{size:18 ,color: "white", className: "global-class-name" }}>
                                            <AiOutlineInbox />
                                        </IconContext.Provider>
                                        <span>{post.stats.totalAmountOfCollects}</span>
                                    </p>
                                    <p className='post_stat'>
                                        <IconContext.Provider value={{size:18 ,color: "white", className: "global-class-name" }}>
                                            <AiOutlineComment />
                                        </IconContext.Provider>
                                        <span>{post.stats.totalAmountOfComments}</span>
                                    </p>
                                    <p className='post_stat'>
                                        <IconContext.Provider value={{size:18 ,color: "white", className: "global-class-name" }}>
                                            <AiOutlineSwap />
                                        </IconContext.Provider>
                                        <span>{post.stats.totalAmountOfMirrors}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='post_info'>
                            <Link className='profile_url' to={`/user/${post.profile.handle}`}>
                                <>
                                <img  src={post.profile.picture?.original?.url} alt="" />
                                    @{post.profile.handle}
                                </>
                            </Link>
                            <p>{post.metadata?.description}</p>
                            <h3>Comments</h3>
                            <div className='comments_wrapper'>
                                {
                                    comments.length > 0
                                    ?   <div className='comments'>
                                            {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
                                            <p>It is all, nothing more 🤐</p>
                                        </div>
                                    : <p style={{textAlign:"center"}}>No Comment Found!</p>
                                }
                                
                            </div>
                        </div>
                            
                    </div>
                }
            </section>
        </Layout>
    );
};

export default PostDetails;