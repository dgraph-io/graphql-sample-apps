import React, {useState} from 'react';
import { Dropdown } from "../../molecules";

import './tweetFilters.css';

import { Text } from '../../atoms';

import { LEAST_LIKES, MOST_LIKES, OLDEST, LATEST } from '../../../constants';


const TweetFilters = ({ dateFilter, popularityFilter, authors, authorFilter }) => {
  const [showMoreRow, setShowMoreRow] = useState(false)

  let authorItems = authors.map((author) => ({key: author.screen_name, value: author.name}))
  authorItems.unshift({key: LATEST, value: 'Authors'})

  const dateItems = [
    {key: LATEST, value: "Date"}, 
    {key: LATEST, value: "Latest"}, 
    {key: OLDEST, value: "Oldest"}
  ]
  const popularityItems = [
    {key: MOST_LIKES, value: "Popularity"},
    {key: MOST_LIKES, value: "Most Likes"},
    {key: LEAST_LIKES, value: "Least Likes"},
  ]
  const dummyData_3 = [
    {key: "key", value: "Location"},
    {key: "key", value: "Item One"},
    {key: "key", value: "Item Two"},
  ]

  function filterTextMsg(text) {
    return <div className="cursor" onClick={() => {setShowMoreRow(!showMoreRow)}}>
        <br /><Text text={text} fontColor="black" fontSize="small" fontWeight="medium" />
      </div>
  }

  const onDateSelected = (selectedItem) => {
    dateFilter(selectedItem)
  }

  const onPopularitySelected = (selectedItem) => {
    popularityFilter(selectedItem)
  }

  const onAuthorSelected = (selectedItem) => {
    authorFilter(selectedItem)
  }

  return (
  <>
    <div className="filterContainer">
      <Dropdown items={authorItems} onClick={onAuthorSelected} />
      <Dropdown items={dateItems} onClick={onDateSelected} />
      <Dropdown items={popularityItems} onClick={onPopularitySelected} />
      {/* <Dropdown items={dummyData_3} onClick={()=> {}} /> */}
    </div>

    <div className="filterContainerMobile">
      <div className="filterRowOne">
        <Dropdown items={authorItems} onClick={onAuthorSelected} />
        <Dropdown items={dateItems} onClick={onDateSelected} />
      </div>
      {showMoreRow? 
      <div className="filterRowTwo">
        <Dropdown items={popularityItems} onClick={onPopularitySelected} />
        {/* <Dropdown items={dummyData_3} onClick={()=> {}} /> */}
      </div> : filterTextMsg("More filters")
      
      }
      {showMoreRow ?filterTextMsg("Less filters"): null}
    </div>
  </>
  );
}

export default TweetFilters;