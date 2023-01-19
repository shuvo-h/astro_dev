import React, { useCallback, useRef, useState } from 'react';
import "./explorePublication.css";
import useExplorePublications from '../../hooks/useExplorePublications';
import PublicationCard from './PublicationCard';
import Layout from '../common/Layout';
import Loader from '../Loaders/Loader';

const sortingList = [
    {
        name:"Latest",
        sort_txt:"LATEST"
    },
    {
        name:"Top Commented",
        sort_txt:"TOP_COMMENTED"
    },
    {
        name:"Top Collected",
        sort_txt:"TOP_COLLECTED"
    },
    {
        name:"Top Mirrored",
        sort_txt:"TOP_MIRRORED"
    },
]

export default function ExplorePublications(props){

    const observerRef = useRef();
    const [currentCursor,setCurrentCursor] = useState("{\"timestamp\":1,\"offset\":0}");
    const [sorting,setSorting] = useState(sortingList[0].sort_txt);
    const {isLoading,error,publications,setPublications,isMoreData,nextPageOffset} = useExplorePublications(currentCursor,sorting);
    console.log({isLoading,error,publications,isMoreData});

    const lastBookRef = useCallback((nodeEl)=>{
        if (isLoading) {
            return;
        }
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new IntersectionObserver(entries =>{
            if (entries[0].isIntersecting && isMoreData) {
                console.log("Visiable");
                setCurrentCursor(nextPageOffset);
            }
        })
        if (nodeEl) {
            observerRef.current.observe(nodeEl);
        }
        console.log(nodeEl);
    },[isLoading,isMoreData]);

    const handleSorting = (sorter) =>{
        if (sorter !== sorting) {
            setSorting(sorter);
            // clean the previous publications 
            setPublications([]);
        }
    }

    return (
        <Layout>
            <div className='publication_container'>
                <p className='publication_heading'><span className='first_step'>The LensAI frens has shared</span> beautiful artworks!</p>
                <div className='sort_btns'>
                    {
                        sortingList.map(sorter => <button className={`sort_btn ${sorting === sorter.sort_txt?"sort_btn_focus":""}`} onClick={()=>handleSorting(sorter.sort_txt)} key={sorter.name}>{sorter.name}</button>)
                    }
                </div>
                <section className='publication_cards'>
                    {
                        publications.map((publication,idx) => {
                            if (publications.length === idx +1) {
                                return <PublicationCard elRef={lastBookRef} publication={publication} key={publication.id} />
                            }else{
                                return <PublicationCard publication={publication} key={publication.id} />
                            }
                        })
                    }
                </section>
                <div>
                    {
                        isLoading && <div style={{margin:"1rem auto",display:"grid", justifyItems:"center"}}><Loader /></div>
                    }
                </div>
            </div>
        </Layout>
    );
}