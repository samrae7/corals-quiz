 $( document ).ready(function() {
   

// *********CAROUSEL*********

// $('#leftNav').click(moveSlideLeft).click(setMarginWidth);
// $('#rightNav').click(moveSlideRight).click(setMarginWidth);
$('#start-button').click(start);
$('.info-button').click(showInfo);
$('.close-icon').click(hideInfo);


var slidePosition=0;
setInfoText();
setSlideTitles();

function start(){
  $('.intro').fadeOut('fast');
  $('.intro-image-holder').fadeOut('fast');
  $('.slide-window').fadeIn();
  $('.quiz-box').fadeIn();
  return false;
}

function setSlideTitles(){
  var title=$('#slide'+(slidePosition+1)).data('title');
  $('.question h2').html(title);
}

function setMarginWidth(){
// var slideWidth = $('#slide1').width();
// var slideHolderMargin=-slideWidth*slidePosition
var slideHolderMargin=-100*slidePosition;
$('.slide-holder').css("margin-left", slideHolderMargin+'%');
}

function setInfoText(){
  var text=$('#slide'+(slidePosition+1)).data('infoText');
  $('.info-text').html(text);
}
//   var infoTextSlide1="Slide 1 info text";
//   var infoTextSlide2="Slide 2 info text";
//   var infoTextSlide3="Slide 3 info text";
// }

function moveSlideRight() {
  if(slidePosition==2) {
    slidePosition=0}
  else {
    slidePosition++;
  };
  hideInfo();
  setInfoText();
}

  function moveSlideLeft() {
  if(slidePosition==0) {
    slidePosition=2}
    else {
      slidePosition=slidePosition-1;
  };
  hideInfo();
  }
// 

  
function showInfo(){
  $('#infoBar').css('height','auto');
  $('.info-button').hide();
}

function hideInfo(){
  $('#infoBar').css('height','0');
  $('.info-button').show();
}

//********QUIZ*******

$( document ).ready(function() {
  
var noOfQuestions = $('.question').length;
var correctAnswers=0;
var questionsAnswered=0;



$(".no-of-questions").html(noOfQuestions);

$(function() {
    $('div.question').hide();
    $('div.question:first').show();
    $('div.question:last .next-button').attr('value','Show results');
    $('.next-button').click(function() {
        transition($(this).closest('.question'));
        return false;
    }).click(moveSlideRight).click(setMarginWidth);;
});

function transition($question) {
    $question.fadeOut('fast',function() {
        
        if ($question.attr('id') !== $('.question:last').attr('id')) {
            $question.next('.question').fadeIn('fast');
        } else {
            $('.slide-window').hide('fast');
            $(".quiz-box").hide('fast');
            $('.results-image-holder').show();
            $("#resultsSummary").show();

        }
    });
}

 
$('a').click(showMessage).click(showButton).click(unwrapAnswers).click(updateScore);
   

//I tried to write selectAnswer as a function with arguments and then parse (red, selectAnswer) to the click event but it didn;t work. ASK ABOUT THIS. NB: This was while trying to make selectAnswer give a green background for correct answer and red for wrong.

//Question 2 - is it ok use class as a selector if you want to populate a number in more than one place on the page?

function updateScore() {
  
  questionsAnswered++
  
  var questionsToGo = noOfQuestions-questionsAnswered;
  
  if ($(this).attr('data-answer') === 'correct') {  

        correctAnswers++
  
  } else {   
  }
  
$(".correct-answers").html(correctAnswers);
$(".answers-so-far").html(questionsAnswered);
  
  
if ( questionsAnswered < noOfQuestions
  ) {
    
    //update score box
   
    $("#questions-to-go").html(questionsToGo);
  
/*    console.log(questionsToGo);*/

    
    } else {
    //show final score
    // $(".quiz-box").hide();
    // $("#resultsSummary").show();
      
    }
}

/*  '#09F23F'*/
  

function unwrapAnswers() {
  
   $(this).closest('div').find('a').contents().unwrap();
  
};

function showMessage() {
  
  var question1CorrectMessage="This is the message you get when you get question  1 right";
  var question1IncorrectMessage="This is the message you get when you get question 1 wrong";

  var question2CorrectMessage="This is the message you get when you get question 2 right";
  var question2IncorrectMessage="This is the message you get when you get question 2 wrong";

  var question3CorrectMessage="This is the message you get when you get question 3 right";
  var question3IncorrectMessage="This is the message you get when you get question 3 wrong";
  
if ($(this).attr('data-answer') === 'correct') {  

        $(this).closest('ul').append('<div class="reveal-box"><p>' + eval($(this).closest('div').attr('id')+'CorrectMessage') + '</p></div>');   
  $(this).closest('li').addClass('answer-correct');
  
  } else {
    
         $(this).closest('ul').append('<div class="reveal-box"><p>'+ eval($(this).closest('div').attr('id')+'IncorrectMessage')+'</p></div>');
      $(this).closest('li').addClass('answer-incorrect');
}
return false;
};

});  

function showButton(){
  $(this).closest('div').find('.next-button').show();
};
  

/*function selectMessage() {
  
  var question1CorrectMessage="this is the message you get when you get question  1 right"
  var question1IncorrectMessage="this is the message you get when you get question 1 wrong"

  var question2CorrectMessage="this is the message you get when you get question 2 right"
  var question2IncorrectMessage="this is the message you get when you get question 2 wrong"

  var question3CorrectMessage="this is the message you get when you get question 3 right"
  var question3IncorrectMessage="this is the message you get when you get question 3 wrong"
  
  
  if ( $(this).attr('data-answer') === 'correct' ) {
  alert(eval($(this).closest('div').attr('id')+'CorrectMessage'));
}
  
else {
  alert(eval($(this).closest('div').attr('id')+'IncorrectMessage'));
}
};*/


  });