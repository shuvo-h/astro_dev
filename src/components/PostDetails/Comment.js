import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({comment}) => {
    
    return (
        <div className='comment'>
            <div>
                <img  className='comment_img' src={`https://ipfs.io/ipfs/${comment.profile?.picture?.original?.url?.substring(7)}`} alt="img" />
            </div>
            <div>
                <Link className='link_regular' to={`/user/${comment.profile.handle}`}>@{comment.profile.handle}</Link>
                <p style={{margin:"2px 0"}}>{comment.metadata?.description}</p>
            </div>
        </div>
    );
};

export default Comment;