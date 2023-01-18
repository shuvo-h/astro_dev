import React, { useEffect, useState } from 'react';
import { explorePublications } from '../lensQueries/explorePublications';

const useExplorePublications = (pageCursor,sortCriteria) => {
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [publications,setPublications] = useState([]);
    const [isMoreData,setIsMoreData] = useState(false);
    const [nextPageOffset,setNextPageOffset] = useState("{\"timestamp\":1,\"offset\":0}");

    useEffect(()=>{
        setIsLoading(true);
        setError("");
        const fetchPublications = async () => {
            try{
                const request = {
                    sortCriteria: sortCriteria??"LATEST", //You can filter by TOP_COMMENTED | TOP_COLLECTED | TOP_MIRRORED | LATEST
                    noRandomize:true,
                    sources:["5bba5781-78b5-4927-8d2f-122742817583"],
                    publicationTypes: ["POST"],
                    cursor: pageCursor ?? "{\"timestamp\":1,\"offset\":0}", 
                    limit:24
                  }
                const {data} = await explorePublications(request) // To get next result replace the cursor with the value of response.pageInfo.next 
                if (data?.explorePublications?.items instanceof Array) {
                    setPublications(pre=>[...new Set([...pre,...data.explorePublications.items])])
                }
                if (data?.explorePublications?.pageInfo?.next) {
                    setIsMoreData(true);
                    setNextPageOffset(data?.explorePublications?.pageInfo?.next);
                }else{
                    setIsMoreData(false);
                }
                setIsLoading(false);
            }catch(err){
                console.log(err)
                setIsLoading(false);
                setError(err)
            }
        }
        fetchPublications();
    },[pageCursor,sortCriteria])

    return {isLoading,error,publications,isMoreData,nextPageOffset,setPublications};
};

export default useExplorePublications;