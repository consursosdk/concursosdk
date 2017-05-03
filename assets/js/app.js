$(document).ready(function(){
	var answerSelected = '';
  var tada = new Audio('assets/sounds/tada.wav');
  var wrong = new Audio('assets/sounds/wrong.wav');
	var questions = [
		{
			question: 'Dinos el nombre de un speaker',
			answer: 'Enrique Zamudio Veronica Lopez Jeduan Cornejo Norberto Ortigoza David Sanders Mario Garcia'
		},
		{
			question: 'Menciona nombre de una persona que trabaja en michelada',
			answer: 'Alexis Navarro David Padilla Ana Molina Angel Baltazar Edmundo Eduardo Mota Gilberto Hector rojo Herman Isay Jaime Jimmy Jesus Jhonathan Joanatan Garay george Jorge Pardiñas Lenin Mario Chavez Noel Escobedo Elsa Fernando Barajas'
		},
		{
			question: 'Di un lenguaje que se va a presentar',
			answer: 'Java Go JavaScript Elixir Julia Phyton'
		},
		{
			question: '¿Dónde es es el evento?',
			answer: 'museo regional de historia'
		},
		{
			question: '¿Cuándo es el evento?',
			answer: '12 de mayo 12/05/17 12/05/2017'
		}
	];

	$('#get-question').on('tap click', function() {
    $('#question').removeClass('hide').addClass('show');
    var selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
		$('#question h2').text(selectedQuestion.question);
		answerSelected = selectedQuestion.answer.toLowerCase();
		$(this).addClass('hide').removeClass('show');
	});

	$('form').on('submit', function(ev) {
		ev.preventDefault();
		var userAnswer = $('#answer').val().toLowerCase();
    if(userAnswer.length > 1 && answerSelected.includes(userAnswer)) {
      $('.overlay').css({
        display: 'block'
      });
    } else {
      wrong.play();
    }

	});

	var users = [
    "Perdedor <i class='fa fa-frown-o'></i>",
    "Perdiste <i class='fa fa-frown-o'></i>",
    "Nop <i class='fa fa-frown-o'></i>",
    "Casi <i class='fa fa-frown-o'></i>",
    "No ganaste <i class='fa fa-frown-o'></i>",
    "Casi <i class='fa fa-frown-o'></i>",
    "Ganador"
	];
	var shuffled = [],
	loadout = $("#loadout"),
	insert_times = 30,
	duration_time = 10000;
	$("#roll").on('click tap', function(){

		$("#roll").attr("disabled",true);
		var scrollsize = 0,
		diff = 0;
		$(loadout).html("");
		loadout.css("left","100%");
		if(users.length < 10){
			insert_times = 20;
			duration_time = 5000;
		}else{
			insert_times = 10;
			duration_time = 10000;
		}
		for(var times = 0; times < insert_times; times++){
			users.shuffle();
      users.forEach(function(shuffled) {
        loadout.append('<td><div class="roller"><div>'+shuffled+'</div></div></td>');
				scrollsize += 192;
      });
		}


		diff = Math.round(scrollsize /2);
		diff = randomEx(diff - 300, diff + 300);
		$( "#loadout" ).animate({
			left: "-="+diff
		},  duration_time, function() {
			$('#loadout').children('td').each(function () {
				var center = window.innerWidth / 2;
				if($(this).offset().left < center && $(this).offset().left + 185 > center){
					var text = $(this).children().text();
					if (text == "Ganador") {
						$('#winner-animation').show();
            tada.play();
						$('#roll').hide();
						$('.rollbox').hide();
					} else {
            wrong.play();
          }
				}

			});
		});
	});

  $('.refresh-icon').on('click tap', function() {
    $('.overlay').css({
      display: 'none'
    });
    $('#answer').val('');
    $('#get-question').removeClass('hide').addClass('show');
    $('#question').removeClass('show').addClass('hide');
    $('#loadout').empty();
    $("#roll").attr("disabled", false);
  });

	Array.prototype.shuffle = function(){
		var counter = this.length, temp, index;
		while (counter > 0) {
			index = (Math.random() * counter--) | 0;
			temp = this[counter];
			this[counter] = this[index];
			this[index] = temp;
		}
	}

	function randomEx(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
});
