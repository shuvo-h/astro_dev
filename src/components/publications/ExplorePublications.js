import React, { useCallback, useRef, useState } from 'react';
import useExplorePublications from '../../hooks/useExplorePublications';
import PublicationCard from './PublicationCard';

const sortingList = ['LATEST','TOP_COMMENTED','TOP_COLLECTED','TOP_MIRRORED']

export default function ExplorePublications(props){

    const observerRef = useRef();
    const [currentCursor,setCurrentCursor] = useState("{\"timestamp\":1,\"offset\":0}");
    const [sorting,setSorting] = useState(sortingList[0]);
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
        setSorting(sorter);
        // clean the previous publications 
        setPublications([]);
    }

    return (
        <div>
            <div>
                {
                    sortingList.map(sorter => <button onClick={()=>handleSorting(sorter)} key={sorter}>{sorter}</button>)
                }
            </div>
            <section style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)"}}>
                {
                    publications.map((publication,idx) => {
                        if (publications.length === idx +1) {
                            return <PublicationCard elRef={lastBookRef} publication={publication} key={publication.id} />
                        }else{
                            return <PublicationCard publication={publication} key={publication.id} />
                        }
                    })
                }
                {
                    isLoading && <h5>Loading........</h5>
                }
                <h2>Length: {publications.length}</h2>
            </section>
        </div>
    );
}