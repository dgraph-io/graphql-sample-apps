import { gql } from 'apollo-boost';

export const TWEET_LISTS =  (queryString) => {
    return gql`
        query Tweets($first: Int!, $offset: Int!) {
            querySearchTweets(${queryString}, first: $first, offset: $offset) {
                id
                tweetId
                createdAt
                favoriteCount
                retweetCount
                text
            }
        }`
}
