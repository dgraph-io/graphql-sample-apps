## Twitter App

`schema.graphql` contains schema for the twitter app.

The schema contains the following relationships:

hashtag -> tweets -> user -> followers(remote endpoint)

user -> tweets

tweets -> user

## sample query for deep nester graph

```
query{
  querySearchTweets{
    text
    user{
      screen_name
      followers{
        users{
          name
        }
      }
    }
  }
}
```

## To populate databsase

go to seeder directory and change the following variable

```
hashtagName := "#rust" // populate the hash tag you want to scrape.
flags.consumerKey = "key" // populate your consumer key
flags.consumerSecret = "key" // populate your consumer secret.
```

## Steps to populate
1) run dgraph instance
2) update the schema
3) run the seeder program