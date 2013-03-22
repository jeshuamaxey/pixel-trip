$(document).ready(function() {
	var canvas = document.getElementById('theCanvas');
	if (canvas.getContext){
		console.log('canvas supported');

		var ctx = canvas.getContext('2d');
//defaults
		delay = 1010;
		pixels = 10;
		var inProgress = 0;

		var controls = new Array();

		prepCanvas(ctx);

		$('body,html').animate({
				scrollTop: 0,
				duration: 0,
		});
		setTimeout(showHelp, 50);

		$('#hint-container').click(function() {
			$('body').removeClass('dialog-open');
			$(this).fadeOut('slow');
		})

		$('div.table ul.controls').each(function() {
			controls.push($('this'));
		});

		var numOfControls = controls.length;
		var numOfControlsLeft = 0;
		var numOfControlsRight = controls.length - 1;

		$('#control-nav-left').click(function() {
			if(numOfControlsRight != 0) {
				$('.current-controls').hide('slide', 1000);
				controls[numOfControlsLeft+1].show('slide', 1000);
				controls[numOfControlsLeft+1].addClass('current-controls');
				numOfControlsRight -= 1;
				numOfControlsLeft += 1;
			}
		});

		$('#control-nav-right').click(function() {
			if(numOfControlsLeft != 0) {
				$('.current-controls').hide('slide', 1000);
				controls[numOfControlsLeft-1].show('slide', 1000);
				controls[numOfControlsLeft-1].addClass('current-controls');
				numOfControlsLeft -= 1;
				numOfControlsRight += 1;
				
			}

		});

		$('#start').click(function() {
			if(inProgress == 0) {
				interval = setInterval(function() {recolour(ctx)}, delay);
				inProgress = 1;
			}
		});

		$('#pause').click(function() {
			clearInterval(interval);
			inProgress = 0;
		});

		$('#stop').click(function() {
			clearInterval(interval);
			inProgress = 0;
			prepCanvas(ctx);
		});

		$('#reset').click(function() {
			prepCanvas(ctx);
		});

		$('#about').click(function () {
			$('body,html').animate({
				scrollTop: $("#explanation").offset().top-20
			}, 200);
		});

		$('#help').click(function() {
			$('body,html').animate({
				scrollTop: 0,
				duration: 200,
			});
			setTimeout(showHelp, 500);
		});


		$( "#freq-slider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 1,
			max: 100,
			value: 1,
			animate: "fast",
			slide: function( event, ui ) {
				delay = 10 + Math.floor(2000/(ui.value + 1));
				$( "#freq-amount" ).html( ui.value );
				if(inProgress == 1) {
					clearInterval(interval);
					interval = setInterval(function() {recolour(ctx, pixels)}, delay);
				}
			}
		});

		$( "#pixel-slider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 1,
			max: 50,
			value: 10,
			animate: "fast",
			slide: function( event, ui ) {
				pixels = ui.value;
				$( "#pixel-amount" ).html( ui.value );
				if(inProgress == 1) {
					clearInterval(interval);
					interval = setInterval(function() {recolour(ctx, pixels)}, delay);
				}
			}
		});

	} else {
		console.log('canvas unsupported');
	}
});

function showHelp() {
	$('#hint-container').fadeIn('slow');
	$('body').addClass('dialog-open');
}

function prepCanvas(ctx, pixels) {
	for(var x=0;x<10;x++) {
			for(var y=0;y<10;y++) {
				ctx.fillStyle = "rgb(200,"+10*x+","+10*y+")";
				ctx.fillRect (50*x, 50*y, 50, 50);
			};
		};
}

function recolourX(ctx) {
	console.log('recolour');
	for(var x=0;x<10;x++) {
		for(var y=0;y<10;y++) {
			ctx.fillStyle = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
			ctx.fillRect (50*x, 50*y, 50, 50);
		}
	}
}

function recolour(ctx) {
	console.log('recolour');
	for(var x=0;x<pixels;x++) {
		for(var y=0;y<pixels;y++) {
			ctx.fillStyle = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
			ctx.fillRect (500*x/pixels, 500*y/pixels, 500/pixels, 500/pixels);
		}
	}
}