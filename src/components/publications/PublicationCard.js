import React from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

const PublicationCard = ({publication, elRef}) => {
    const navigate = useNavigate();
    
    const detailsHandler = (post_id) =>{
        navigate(`/post/${post_id}`);
    }
    // console.log(publication.id);
    return (
        <div ref={elRef} onClick={()=>detailsHandler(publication.id)}>
            <h5>{publication.metadata.name}</h5>
            <img width={200} src={`https://ipfs.io/ipfs/${publication.metadata?.media[0]?.original?.url?.substring(7)}`} alt="" />
            <output>{publication.id}</output>

        </div>
    );
};

export default PublicationCard;


