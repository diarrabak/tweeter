/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    //Displaying error message in an error div if the the tweet content is empty or to long
    const text = $("#tweet-text").val();

    $(".error").text("").css("display", "none"); //Div created to display errors

    if (text === "" || text === null) {
      //If the user typed text is empty
      $(".error").text("Empty message!!").slideDown("slow").css({
        color: "red",
        "margin-bottom": "2em",
        display: "block",
        border: "2px solid red",
        font: "1.25em bold",
        padding: "0.5em",
      });
      return;
    } else if (text.length > 140) {
      //If the user typed text is more than 140 characters
      $(".error")
        .text("The text is long, more than 140 characters!")
        .slideDown("slow")
        .css({
          color: "red",
          "margin-bottom": "2em",
          display: "block",
          border: "2px solid red",
          font: "1.25em bold",
          padding: "0.5em",
        });
      return;
    }

    const tweetInfo = $("form").serialize(); //Serialize the data from the form brfore sending to the server
    $.ajax("/tweets/", {
      method: "POST",
      data: tweetInfo,
      async: true,
      success: function () {
        //In case of success, we clear the text area and display the new tweet before all the older ones
        $("#tweet-text").val("");
        loadTweets("/tweets/", "new"); //Updated loadTweets function
      },
      error: function () {
        console.log("Data could not be saved!");
      },
    });
  });

  //This function loads all the tweets and display all of them of jsut the newer one depending the scenario

  const loadTweets = function (tweetPath, newTweet) {
    $.ajax(tweetPath, {
      method: "GET",
      success: function (results) {
        const sortedTweets = results.sort(
          (a, b) => a.created_at - b.created_at
        ); //The tweets are sorted in descending order
        if (newTweet !== "new") {
          //Case of all tweets
          renderTweets(sortedTweets);
        } else {
          //Case of new tweet creation
          const tempTweet = []; //renderTweets requires an arrays of object
          tempTweet.push(sortedTweets[sortedTweets.length - 1]); //The last element of the array is the new tweet
          // console.log(temp);
          renderTweets(temp);
        }
      },
      error: function () {
        console.log("Data could not be loaded!");
      },
    });
  };

  loadTweets("/tweets/"); //Display all the tweets on the web page

  const createTweetElement = function (tweet) {
    //HTML Template for the tweet display
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
  <h3>${escape(tweet.content.text)}</h3>
</div>
<div class="article-footer">
  <p class="timeago">${timeago.format(tweet.created_at)}</p>
  <div>
    <i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>
   
  </div>
</div>
</article>`;
  };

  //This function adds/displays all the tweets to the web page
  const renderTweets = function (tweets) {
    const $formattedTweets = tweets.map((tweet) => createTweetElement(tweet)); //Each tweet is transformed using the HTML template
    $formattedTweets.map(($formattedTweet) =>
      $("#tweets-container").prepend($formattedTweet)
    ); //Tweets are rendered in creation order with the newest one on top of the list so that the same function can be used for the new created tweet
  };

  // renderTweets(data);

  const escape = function (str) {
    //XSS protection function provided by the exercise notes
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
