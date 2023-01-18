import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../lensQueries/getUserProfile';

const UserProfile = () => {
    const {handle}= useParams();
    const [profile,setProfile] = useState({});
    const [isProfileLoading,setIsProfileLoading] = useState(true);
    console.log(profile);
    useEffect(()=>{
        const fetchPost = async() =>{
            setIsProfileLoading(true);
            const userRes = await getUserProfile(handle);
            setProfile(userRes);
            setIsProfileLoading(false);
        }
        if (handle) {
            fetchPost();
        }
    },[handle])

    return (
        <div>
            <div>
                {
                    isProfileLoading
                    ? <div>Loading.......</div>
                    : <div>
                        <img  src={`https://ipfs.io/ipfs/${profile.picture.original.url.substring(7)}`} alt="" />
                        {/* <Link to={`/user/${post.profile.handle}`}>profile</Link> */}
                    </div>
                }
            </div>
        </div>
    );
};

export default UserProfile;