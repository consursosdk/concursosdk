$(document).ready(function(){
	let answer = '';
	let questions = [
		{
			question: '¿Cual es la distancia de la tierra a la lunaa?',
			answer: 'no se'
		},
		{
			question: '',
			answer: ''
		},
		{
			question: '',
			answer: ''
		},
		{
			question: '',
			answer: ''
		},
		{
			question: '',
			answer: ''
		}
	];

	$('#get-question').on('click', function() {
		$('#question').slideDown();
    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
		$('#question h2').text(selectedQuestion.question);
		answer = selectedQuestion.answer;
		$(this).slideUp();
	});

	$('form').on('submit', function(ev) {
		ev.preventDefault();
		var userAnswer = $('#answer').val();
		if (userAnswer.toLowerCase() == answer) {
			$('.overlay').css({
				display: 'block'
			});
		}
	});

	var users = [],
	shuffled = [],
	loadout = $("#loadout"),
	insert_times = 30,
	duration_time = 10000;
	$("#roll").click(function(){
		users = [
			"Perdedor",
			"Ganador"
		];

		$("#roll").attr("disabled",true);
		let scrollsize = 0,
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
		for(let times = 0; times < insert_times; times++){
			users.shuffle();
      users.forEach(shuffled => {
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
					const text = $(this).children().text();
					if (text == "Ganador") {
						$('#winner-animation').show();
						$('#roll').hide();
						$('.rollbox').hide();
					}
				}

			});
		});
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

	function randomEx(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}
});
