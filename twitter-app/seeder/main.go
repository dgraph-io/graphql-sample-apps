package main

import (
	"context"
	"fmt"
	"html"
	"log"
	"strings"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/machinebox/graphql"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
)

func main() {
	flags := struct {
		consumerKey    string
		consumerSecret string
	}{}
	hashtagName := "#rust"
	flags.consumerKey = "key"
	flags.consumerSecret = "key"
	if flags.consumerKey == "" || flags.consumerSecret == "" {
		log.Fatal("Application Access Token required")
	}

	// oauth2 configures a client that uses app credentials to keep a fresh token
	config := &clientcredentials.Config{
		ClientID:     flags.consumerKey,
		ClientSecret: flags.consumerSecret,
		TokenURL:     "https://api.twitter.com/oauth2/token",
	}
	// http.Client will automatically authorize Requests
	httpClient := config.Client(oauth2.NoContext)

	// Twitter client
	client := twitter.NewClient(httpClient)
	// search tweets
	search, _, _ := client.Search.Tweets(&twitter.SearchTweetParams{
		Query: hashtagName,
		Count: 10,
	})
	graphqlClient := graphql.NewClient("http://localhost:8080/graphql")
	uniqueUser := make(map[string]struct{}, 0)
	tweetsStr := "["
	for i, tweet := range search.Statuses {
		if _, ok := uniqueUser[tweet.User.ScreenName]; ok {
			continue
		}

		uniqueUser[tweet.User.ScreenName] = struct{}{}
		if i != len(search.Statuses)-1 && i != 0 {
			tweetsStr += ","
		}

		tweetsStr += fmt.Sprintf(`{
			text:"%s",
			user:{
				screen_name:"%s"
				}
			}`, html.EscapeString(strings.ReplaceAll(tweet.Text, "\n", "\\n")), html.EscapeString(tweet.User.ScreenName))
	}
	tweetsStr += `
	]`
	query := fmt.Sprintf(`
	mutation{
		addHashTag(input:[
		  {
			name:"%s",
			tweets: %s
		  }
		]){
		  numUids
		}
	  }`, hashtagName, tweetsStr)
	req := graphql.NewRequest(query)
	respData := make(map[string]interface{})
	if err := graphqlClient.Run(context.Background(), req, &respData); err != nil {
		log.Fatal(err)
	}
	fmt.Println(respData)
}
