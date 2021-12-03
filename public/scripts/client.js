/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    //Displaying error message if the the tweet content is empty or to long
    const text= $("#tweet-text").val();
    if(text===""||text===null){
      alert("Empty message!!");
      return;
    } else if(text.length>140){
      alert("Text too long!");
      return;
    }
    
    const tweetInfo = $("form").serialize();
    $.ajax("/tweets/", { method: "POST", data: tweetInfo, success: function (results) {
      console.log(results);
    }
  })

  });

  const loadTweets = function (tweetPath) {
    $.ajax(tweetPath, { method: "GET" }).then(function (results) {
      renderTweets(results);
      // console.log(results);
    });
  };

  loadTweets("/tweets/");

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

  const renderTweets = function (tweets) {
    const $formattedTweets = tweets.map((tweet) => createTweetElement(tweet));
    //console.log($formattedTweets);
    $formattedTweets.map(($formattedTweet) =>
      $("#tweets-container").append($formattedTweet)
    );
  };

  // renderTweets(data);
});
