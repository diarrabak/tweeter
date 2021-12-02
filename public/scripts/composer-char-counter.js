//This script counts the number of characters typed by the user when composing a tweet

$(document).ready(function () {
  $("#tweet-text").keydown(function() {
      let currentTextLength=$(this).val().length? $(this).val().length+1: $(this).val().length;
      let textLength=140;
      $(".counter").css("color","black");
      if(currentTextLength>textLength){
        $(".counter").css("color","red");
      } 
      $(".counter").val(textLength-currentTextLength);
   // console.log($("#tweet-text").val().length);
  });
});
