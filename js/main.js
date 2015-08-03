// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  $(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
      loading.hide();
    });

    createQuestion(quiz[0].question, 1);

    $("#quiz").on('click', "label", function () {
      var questionNum = +$("#qid").html();
      var choice = $(this).find('input:radio').parent().text();
      $('#loadbar').show();
      $('#quiz').fadeOut();
      setTimeout(function(){
           $( "#answer" ).html(  $(this).checkAnswer(choice, questionNum) );
            $('#quiz').show();
            $('#loadbar').fadeOut();
           /* something else */
      }, 1000);
    });

    //input: question text and question number. Process: add question and related options to a single Div.  Out: appends new div of questions and answers to the DOM.
    function createQuestion(question, num) {
      $('.modal-header').append('<h3><span class="label label-warning" id="qid">' + num + '</span>' + question + '</h3>');
      for (var i = 0; i < quiz[num - 1].options.length; i++) {
        $('#quizForm').append(createAnswers(quiz[num - 1].options[i], num));
      }
    }

    //input: answer option and unique ID.  Process: add the text and unique id to an html input and append to DOM.  Out:  appends new text and ID to the DOM
    function createAnswers(text, id) {
      $('#quiz').append('<label class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="1">' + text + '</label>');
    }


    //input: questions and submited answer.  Process: check to see if the answer is correct.  Out: record whether the selected answer is correct.
    $.fn.checkAnswer = function(answer, questionNum) {
    var counter = 0;

    if (quiz[questionNum - 1].answer === answer) {
      return "CORRECT";
    } else {
      return "INCORRECT";
    }
  };


  });

});
