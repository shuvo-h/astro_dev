import React from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { AiOutlineInbox,AiOutlineComment,AiOutlineSwap } from 'react-icons/ai';
import { IconContext } from "react-icons";

const PublicationCard = ({publication, elRef}) => {
    const navigate = useNavigate();

    const detailsHandler = (post_id) =>{
        navigate(`/post/${post_id}`);
    }
    console.log(publication);
    return (
        <div className='publication_card' ref={elRef} onClick={()=>detailsHandler(publication.id)}>
            <img className='publication_img' src={`https://ipfs.io/ipfs/${publication.metadata?.media[0]?.original?.url?.substring(7)}`} alt="" />
            <div className='card_info'>
                <div>
                    <p className='user_handle'>@{publication.profile.handle}</p>
                    <p>Created At: {publication.createdAt?.split("T")[0]}</p>
                    <p className='card_stat'>
                        <IconContext.Provider value={{size:15 ,color: "white", className: "global-class-name" }}>
                            <AiOutlineInbox />
                        </IconContext.Provider>
                        <span>{publication.stats.totalAmountOfCollects}</span>
                    </p>
                    <p className='card_stat'>
                        <IconContext.Provider value={{size:15 ,color: "white", className: "global-class-name" }}>
                            <AiOutlineComment />
                        </IconContext.Provider>
                        <span>{publication.stats.totalAmountOfComments}</span>
                    </p>
                    <p className='card_stat'>
                        <IconContext.Provider value={{size:15 ,color: "white", className: "global-class-name" }}>
                            <AiOutlineSwap />
                        </IconContext.Provider>
                        <span>{publication.stats.totalAmountOfMirrors}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;


