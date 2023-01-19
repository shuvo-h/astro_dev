import React, { useEffect, useState } from 'react';
import "./userProfile.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getUserPosts } from '../../lensQueries/getUserPosts';
import { getUserProfile } from '../../lensQueries/getUserProfile';
import Loader from '../Loaders/Loader';
import { AiOutlineInbox,AiOutlineComment,AiOutlineSwap } from 'react-icons/ai';
import { IconContext } from "react-icons";
import Layout from '../common/Layout';

const UserProfile = () => {
    const {handle}= useParams();
    const navigate = useNavigate();
    const [profile,setProfile] = useState({});
    const [postList,setPostList] = useState([]);
    const [isProfileLoading,setIsProfileLoading] = useState(true);
    console.log(profile);
    useEffect(()=>{
        const fetchPost = async() =>{
            setIsProfileLoading(true);
            const userRes = await getUserProfile(handle);
            setProfile(userRes);

            const postRes = await getUserPosts(userRes.id);
            setPostList(postRes.data?.publications?.items??[]);

            setIsProfileLoading(false);
        }
        if (handle) {
            fetchPost();
        }
    },[handle])

    const detailsHandler = (post_id) =>{
        navigate(`/post/${post_id}`);
    }

    return (
        <Layout>
            <div>
                {
                    isProfileLoading
                    ? <div style={{margin:"1rem auto",display:"grid", justifyItems:"center"}}><Loader /></div>
                    : <div className='profile_wrapper'>
                        <div>
                            <div className='follow'>
                                <img  className='profile_img' src={profile?.picture?.original?.url} alt="img" />
                                <p className='link_regular'>@{profile.name}</p>
                                <div className='follow_parts'>
                                    <div>
                                        <p>{profile.stats.totalFollowers}</p>
                                        <p className='follow_title'>Followers</p>
                                    </div>
                                    <div>
                                        <p>{profile.stats.totalFollowing}</p>
                                        <p className='follow_title'>Following</p>
                                    </div>
                                </div>
                            </div>
                            <div className='follow'>
                                <p>Lens Publication</p>
                                <p className='follow_title'>Collected Posts</p>
                            </div>
                        </div>
                        <div className='profile_posts'>
                            {
                                postList.map(post =><div className='profile_post' key={post.id}  onClick={()=>detailsHandler(post.id)}>
                                    <img className='publication_img' src={`https://ipfs.io/ipfs/${post.metadata?.media[0]?.original?.url?.substring(7)}`} alt="" />
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
                                </div>)
                            }
                        </div>
                        {/* <img  src={`https://ipfs.io/ipfs/${profile.picture.original.url.substring(7)}`} alt="" /> */}
                        {/* <Link to={`/user/${post.profile.handle}`}>profile</Link> */}
                    </div>
                }
            </div>
        </Layout>
    );
};

export default UserProfile;