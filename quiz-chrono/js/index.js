 $( document ).ready(function() {
   


$('#start-button').click(start);
$('.info-button').click(showInfo);
$('.close-icon').click(hideInfo);

$('a').click(showMessage).click(showButton).click(scrollDown).click(unwrapAnswers).click(updateScore);

$(function() {
    $('div.question').hide();
    $('div.question:first').show();
    $('div.question:last .next-button').attr('value','Show results');
    $('.next-button').click(function() {
        transition($(this).closest('.question'));
        return false;
    }).click(moveSlideRight).click(setMarginWidth);;
});

var slidePosition=0;
var noOfQuestions = $('.question').length;
var correctAnswers=0;
var questionsAnswered=0;

setInfoText();
setSlideTitles();

function start(){
  $('.intro').fadeOut('fast',function(){
     $('.quiz-box').fadeIn('fast');
  });
  $('.intro-image-holder').fadeOut('fast', function(){
    $('.slide-window').fadeIn('fast');
  });
  return false;
}

function setSlideTitles(){
  var title=$('#slide'+(slidePosition+1)).data('title');
  $('.question h2').html(title);
}

function setMarginWidth(){
var slideHolderMargin=-100*slidePosition;
$('.slide-holder').css("margin-left", slideHolderMargin+'%');
}

function setInfoText(){
  var text=$('#slide'+(slidePosition+1)).data('infoText');
  $('.info-text').html(text);
}


function moveSlideRight() {
  if(slidePosition==4) {
    slidePosition=0}
  else {
    slidePosition++;
  };
  hideInfo();
  setInfoText();
}

  function moveSlideLeft() {
  if(slidePosition==0) {
    slidePosition=4}
    else {
      slidePosition=slidePosition-1;
  };
  hideInfo();
  }

  
function showInfo(){
  $('#infoBar').css('height','auto');
  $('.info-button').hide();
}

function hideInfo(){
  $('#infoBar').css('height','0');
  $('.info-button').show();
}



$(".no-of-questions").html(noOfQuestions);

function transition($question) {
    $question.fadeOut('fast',function() {

      setSlideTitles();
        
        if ($question.attr('id') !== $('.question:last').attr('id')) {
            $question.next('.question').fadeIn('fast');
        } else {
            $('.slide-window').fadeOut('fast',function(){
              $('.results-image-holder').fadeIn();
            });
            $(".quiz-box").fadeOut('fast', function(){
              $("#resultsSummary").fadeIn();
            });
        }
    });
}

   

function scrollDown(){
  var nextB = $(this).closest('div').find('.next-button');
   $('html, body').animate({
    scrollTop: nextB.offset().top
}, 1000);
 }

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
  
    
    } else {
      
    }
}
  

function unwrapAnswers() {
  
   $(this).closest('div').find('a').contents().unwrap();
  
};

  function showMessage() {
    
    var question1CorrectMessage="That's right. A coral starts with a single polyp, which forms a calcium carbonate foundation with six sides.";
    var question1IncorrectMessage="Sorry, wrong shape. Every coral begins as a hexagon when a single polyp lays down a calcium carbonate foundation with six sides. ";

    var question2CorrectMessage="That's right. Sea fans filter bacteria, plankton and waste matter from the water using their eight-tentacled polyps.";
    var question2IncorrectMessage="Corals can't eat seaweed or seahorses. They get nutrients by filtering bacteria, plankton and waste matter from the water.";

    var question3CorrectMessage="Yes that's right. This is an example of commensalism - a relationship where one species benefits and the other is unharmed.";
    var question3IncorrectMessage="Sponges don't help with that. It's for protection from predators.";

     var question4CorrectMessage="Correct. Did you know, a protective coating of mucus allows the clownfish to take refuge in the anemone's tentacles without being stung?";
    var question4IncorrectMessage="The correct answer is 'mutualistic', which is one type of symbiosis.";

     var question5CorrectMessage="Well done. Noticing small details like these is an important skill for scientists.";
    var question5IncorrectMessage="Take a closer look - those bumps are from the surface of the spiny cushion star.";
    
  if ($(this).attr('data-answer') === 'correct') {  

          $(this).closest('ul').append('<div class="reveal-box"><p>' + eval($(this).closest('div').attr('id')+'CorrectMessage') + '</p></div>');   
    $(this).closest('li').addClass('answer-correct');
    
    } else {
      
           $(this).closest('ul').append('<div class="reveal-box"><p>'+ eval($(this).closest('div').attr('id')+'IncorrectMessage')+'</p></div>');
        $(this).closest('li').addClass('answer-incorrect');
  }
  return false;
  };
 

function showButton(){
  $(this).closest('div').find('.next-button').show();
};
  

});