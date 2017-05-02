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
		$('#question h2').text(questions[0].question);
		answer = questions[0].answer;
		$(this).slideUp();
	});

	$('form').on('submit', function(ev) {
		ev.preventDefault();
		var userAnswer = $('#answer').val();
		if (userAnswer.toLowercase() == answer) {
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
		var scrollsize = 0,
		diff = 0;
		$(loadout).html("");
		$("#log").html("");
		loadout.css("left","100%");
		if(users.length < 10){
			insert_times = 20;
			duration_time = 5000;
		}else{
			insert_times = 10;
			duration_time = 10000;
		}
		for(var times = 0; times < insert_times; times++){
			shuffled = users;
			shuffled.shuffle();
			for(var i = 0;i < users.length;i++){
				loadout.append('<td><div class="roller"><div>'+shuffled[i]+'</div></div></td>');
				scrollsize = scrollsize + 192;
			}
		}
		
		
		diff = Math.round(scrollsize /2);
		diff = randomEx(diff - 300, diff + 300);
		$( "#loadout" ).animate({
			left: "-="+diff
		},  duration_time, function() {
			// $("#roll").attr("disabled",false);
			$('#loadout').children('td').each(function () {
				var center = window.innerWidth / 2;
				if($(this).offset().left < center && $(this).offset().left + 185 > center){
					var text = $(this).children().text();
					if (text == "Ganador") {
						$('#winner-animation').show();
						$('#roll').hide();
						$('.rollbox').hide();
					}
					$("#log").append("THE WINNER IS<br/> <span class=\"badge\">"+text+"</span>");
					
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
