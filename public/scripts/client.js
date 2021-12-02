/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
 // $(".timeago").text(timeago.format("2021-11-25"));

/*   const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  }; */
 

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function (tweet) {
    return ` 
<article>
<div class="article-header">
  <div class="avatar">
    <img src=${tweet.user.avatars} alt="user profile picture" />
    <div>${tweet.user.name}</div>
  </div>
  <div class="user-name">${tweet.user.handle}</div>
</div>
<div class="content">
  <h3>${tweet.content.text}</h3>
</div>
<div class="article-footer">
  <p class="timeago">${timeago.format(tweet.created_at)}</p>
  <div>
    <i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>
   
  </div>
</div>
</article>`;
  };

 /*  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);*/

  const renderTweets = function(tweets) {
    const $formattedTweets=tweets.map(tweet=>createTweetElement(tweet));
    console.log($formattedTweets);
    $formattedTweets.map($formattedTweet=> $('#tweets-container').append($formattedTweet));
  };

  renderTweets(data);
});
