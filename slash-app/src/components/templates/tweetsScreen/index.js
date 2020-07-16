import React, { useEffect, useState} from "react";
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

import { TweetFilters, TweetResults } from "../../organisms";
import { TWEET_LISTS, USER_LISTS } from '../../../graphql/queries';
import { 
  ORDER_BY_CREATED_AT_ASC, 
  ORDER_BY_CREATED_AT_DESC, 
  ORDER_BY_FAVORITE_COUNT_ASC,
  ORDER_BY_FAVORITE_COUNT_DESC,
  FILTER_BY_SCREEN_NAME
} from '../../../graphql/filterStrings';

import { LoaderIcon } from '../../svg';

import { LEAST_LIKES, OLDEST, LATEST } from '../../../constants';

import "./tweetsScreen.css";

const first = 8

const TweetsScreen = () => {
  const [tweetData, setTweetData] = useState([]);
  const [offset, setoffset] = useState(0);
  const [filterString, setFilterString] = useState(ORDER_BY_CREATED_AT_DESC);
  const [getMoreData, setGetMoreData] = useState(true);
  const [dataEnd, setDataEnd] = useState(false);

  const [getData, { loading, error, data }] = useLazyQuery(TWEET_LISTS(filterString));
  const { data: authors } = useQuery(USER_LISTS());

  /****************************UseEffects******************************** */

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if(getMoreData && !dataEnd) {
      getData({ variables: { first, offset }})
    } 
  }, [getMoreData, dataEnd ])

  useEffect(() => {   
    setGetMoreData(false)

    if(data && !data.querySearchTweets.length)
      setDataEnd(true);

    if(data && data.querySearchTweets.length) {
      setoffset(offset + first)
      setTweetData([...tweetData, ...data.querySearchTweets])
    }
  
  }, [data])

  const onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
        setGetMoreData(true)
    }
  }

  /****************************Filters Functions*************************************** */

  const applyFilter = (order) => {
    if(order !== filterString) {
      setFilterString(order);
      setoffset(0); setTweetData([]); setDataEnd(false); setGetMoreData(true)
    }
  }

  const dateFilter = (selectedItem) => {
    const order = selectedItem.key === OLDEST ? ORDER_BY_CREATED_AT_ASC: ORDER_BY_CREATED_AT_DESC
    applyFilter(order);
  }

  const popularityFilter = (selectedItem) => {
    const order = selectedItem.key === LEAST_LIKES ? ORDER_BY_FAVORITE_COUNT_ASC: ORDER_BY_FAVORITE_COUNT_DESC
    applyFilter(order);
  }

  const authorFilter = (selectedItem) => {
    const filter = selectedItem.key === LATEST ? ORDER_BY_CREATED_AT_DESC : FILTER_BY_SCREEN_NAME(selectedItem.key)
    applyFilter(filter);
  }

  if (error) return <p>{`Error: - ${error.message}`} </p>;

  /*********************************** Data Render*******************************/
  return (
    <div className="tweetsContainer">
      <div className="tweetFilter">
        <TweetFilters 
          dateFilter={dateFilter} 
          popularityFilter={popularityFilter}
          authors={authors ? authors.queryUser : []}
          authorFilter={authorFilter}
        />
      </div>
      <TweetResults tweetData={tweetData} />
      {loading && !dataEnd ? <div className="loading"><LoaderIcon /><br /><br /></div> : ''}
    </div>
  );
};

export default TweetsScreen;