$(document).ready(function() {

	var canvas = $("#myCanvas");
	var context = canvas.get( 0).getContext("2d");

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	// local vars
	var playing = true;

	var canvasContainer = $("#cvsContainer");
	var canvasContainerHeight = canvasContainer.height();


	var download = $("#saveBtn");
	var titleBox = $("#titleBox");
	var imageLoader = $('#imageLoader');
	var imgCaption = $("#imgCaption");
	var flagLoader = $('#flagLoader');
	var flagLoader1 = $('#flagLoader1');
	var dateBox = $("#dateBox");
	var locBox = $("#locBox");
	var resultBox = $('#winBox');
	var bel1 = $("#bel1");
	var bel2 = $("#bel2");

	var Leaders1 = $("#Leaders1");
	var Leaders2 = $("#Leaders2");
	var uiLeader = $("#LeadersA");
	var Leaders1a = $("#Leaders1a");
	var Leaders2a = $("#Leaders2a");

	var strength1 = $("#strength1");
	var strength2 = $("#strength2");
	var uiStrength = $("#StrengthA");
	var strength1a = $("#strength1a");
	var strength2a = $("#strength2a");

	var lossBox1 = $("#loss1");
	var lossBox2 = $("#loss2");
	var uiLoss = $("#LossA");
	var lossBox1a = $("#loss1a");
	var lossBox2a = $("#loss2a");

	var uiAddCom = $("#AddCom");
	var uiMinusCom = $("#MinusCom");

	var uiAddStr = $("#AddStr");
	var uiMinusStr = $("#MinusStr");

	var uiAddLoss = $("#AddLoss");
	var uiMinusLoss = $("#MinusLoss");

	var uiUpload = $("#uploadBtn");

	var drawing = false;
	var flagbool = false;
	var flagbool1 = false;
	var captionY = 40;
	var additionYCom = 0;
	var additionYStr = 0;
	var additionYLoss = 0;

	// init canvas
	function init(){
		uiLeader.hide();	
		uiStrength.hide();
		uiLoss.hide();
		uiMinusCom.addClass('disabled');
		uiMinusStr.addClass('disabled');
		uiMinusLoss.addClass('disabled');

		titleBox.val("Default Title"); 

		uiAddCom.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiLeader.show();
			additionYCom = 25;
			canvas.prop('height', canvasHeight + additionYCom + additionYStr + additionYLoss);
			canvasContainer.css('height', canvasContainerHeight + additionYCom + additionYStr + additionYLoss);

			$(this).addClass('disabled');
			uiMinusCom.removeClass('disabled');

		});

		uiMinusCom.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiLeader.hide();
			additionYCom = 0;
			Leaders1a.val(null);
			Leaders2a.val(null);
			canvas.prop('height', canvasHeight-additionYCom + additionYStr + additionYLoss);
			canvasContainer.css('height', canvasContainerHeight - additionYCom - additionYStr - additionYLoss);

			$(this).addClass('disabled');
			uiAddCom.removeClass('disabled');
		});

		uiAddStr.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiStrength.show();
			additionYStr = 25;
			canvas.prop('height', canvasHeight + additionYStr + additionYCom + additionYLoss);
			canvasContainer.css('height', canvasContainerHeight + additionYStr + additionYCom + additionYLoss);

			$(this).addClass('disabled');
			uiMinusStr.removeClass('disabled');
		});

		uiMinusStr.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiStrength.hide();
			additionYStr = 0;
			strength1a.val(null);
			strength2a.val(null);
			canvas.prop('height', canvasHeight - additionYStr + additionYCom + additionYLoss);
			canvasContainer.css('height', canvasContainerHeight - additionYStr - additionYCom - additionYLoss);

			$(this).addClass('disabled');
			uiAddStr.removeClass('disabled');
		});

		uiAddLoss.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiLoss.show();
			additionYLoss = 24;
			canvas.prop('height', canvasHeight + additionYLoss + additionYStr + additionYCom);
			canvasContainer.css('height', canvasContainerHeight + additionYLoss + additionYStr + additionYCom);

			$(this).addClass('disabled');
			uiMinusLoss.removeClass('disabled');
		});

		uiMinusLoss.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();
			//may need if statement to collapse and show properly
			uiLoss.hide();
			additionYLoss = 0;
			lossBox1a.val(null);
			lossBox2a.val(null);
			canvas.prop('height', canvasHeight - additionYLoss + additionYStr + additionYCom);
			canvasContainer.css('height', canvasContainerHeight - additionYLoss - additionYStr - additionYCom);

			$(this).addClass('disabled');
			uiAddLoss.removeClass('disabled');
		});

		// Upload to imgur

		uiUpload.click(function(e) { // IF ADD BUTTON CLICKED SHOW PREVIOUS LEADER
			e.preventDefault();

			var img;
		    try {
		        img = myCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
		    } catch(e) {
		        img = myCanvas.toDataURL().split(',')[1];
		    }
		    var w = window.open();
		    w.document.write('Uploading to imgur.com...');
		    $.ajax({
		        url: 'https://api.imgur.com/3/upload.json',
		        type: 'POST',
		        headers: {
		            Authorization: 'Client-ID e1cceb4ed4e943d'
		        },
		        data: {
		            type: 'base64',
		            name: 'wiki_war.jpg',
		            title: titleBox.val(),
		            description: 'Made using http://wikiwarcreator.com/',
		            image: img
		        },
		        dataType: 'json'
		    }).success(function(data) {
		        var url = 'http://imgur.com/' + data.data.id + '?tags';
		        w.location.href = url;
		    }).error(function() {
		        alert('Could not reach api.imgur.com. Sorry :(');
		        w.close();
		    });
		});



		animate();
	};	

	$(function() {
		imageLoader.change(function(e) {
	        var file = e.target.files[0],
	            imageType = /image.*/;

	        if (!file.type.match(imageType)){
	        	drawing = false;
	            return;
	        }

	        var reader = new FileReader();
	        reader.onload = fileOnload;
	        reader.readAsDataURL(file);        
    	});

	    function fileOnload(e) {
	        var $img = $('<img>', { src: e.target.result });

	        $img.load(function() {
	            drawing = true;
	            image = this;
	        });
	    }
	});

	$(function() {
		flagLoader.change(function(e) {
	        var file = e.target.files[0],
	            imageType = /image.*/;

	        if (!file.type.match(imageType)){
	        	flagbool = false;
	            return;
	        }

	        var reader = new FileReader();
	        reader.onload = fileOnload;
	        reader.readAsDataURL(file);        
    	});

	    function fileOnload(e) {
	        var $img = $('<img>', { src: e.target.result });

	        $img.load(function() {
	            flagbool = true;
	            flag = this;
	        });
	    }
	});

	$(function() {
		flagLoader1.change(function(e) {
	        var file = e.target.files[0],
	            imageType = /image.*/;

	        if (!file.type.match(imageType)){
	        	flagbool1 = false;
	            return;
	        }

	        var reader = new FileReader();
	        reader.onload = fileOnload;
	        reader.readAsDataURL(file);        
    	});

	    function fileOnload(e) {
	        var $img = $('<img>', { src: e.target.result });

	        $img.load(function() {
	            flagbool1 = true;
	            flag1 = this;
	        });
	    }
	});


	function animate(){
	 	// clear the screen
	 	context.clearRect(0,0, canvas.width(), canvas.height());
	 	context.fillStyle = "rgb(255, 255, 255)";
	 	// white background
	 	context.fillRect(0,0, canvas.width(), canvas.height());

	 	// fram
	 	context.lineWidth = 1;
		context.strokeStyle = "rgb(180, 180, 180)";
		context.strokeRect(2, 2,  canvasWidth -4,  canvasHeight - 4 + additionYCom + additionYStr + additionYLoss); // Red square


		// bottom logo
		context.fillStyle = "rgb(200, 200, 200)";
		context.fillRect( canvasWidth/2, canvasHeight + additionYCom + additionYStr + additionYLoss - 15, canvasWidth/2 -5, 10);

		//Draw caption onto screen
	 	context.fillStyle = "rgb(0, 0, 0)";
	 	context.font = "9px arial";
	 	context.textAlign="center";
	 	context.fillText("wikiwarcreator.com", (canvasWidth/2 + 80), canvasHeight + additionYCom + additionYStr + additionYLoss - 7);

	 	// UI

	 	context.fillStyle = "rgb(176, 196, 222)";

	 	

	 	// title
	 	context.fillRect(5, 5, canvasWidth - 10, 20);
	 	// Belligerents
	 	context.fillRect(5, captionY + 90, canvasWidth - 10, 20);
	 	// Leaders and Commanders
	 	context.fillRect(5, captionY + 150, canvasWidth - 10, 20);
	 	// Str
	 	context.fillRect(5, captionY + 210+ additionYCom, canvasWidth - 10, 20);
	 	// Losses
	 	context.fillRect(5, captionY + 270+ additionYCom + additionYStr, canvasWidth - 10, 20);

	 	//Text
	 	var title = titleBox.val();
	 	var caption = imgCaption.val();
	 	var date = dateBox.val();
	 	var location = locBox.val();
	 	var result = resultBox.val();
	 	var belligerent1 = bel1.val();
	 	var belligerent2 = bel2.val();
	 	var commander1 = Leaders1.val();
	 	var commander2 = Leaders2.val();
	 	var commander1a = Leaders1a.val();
	 	var commander2a = Leaders2a.val();
	 	var str1 = strength1.val();
	 	var str2 = strength2.val();
	 	var str1a = strength1a.val();
	 	var str2a = strength2a.val();
	 	var loss1 = lossBox1.val();
	 	var loss2 = lossBox2.val();
	 	var loss1a = lossBox1a.val();
	 	var loss2a = lossBox2a.val();


	 	//Draw text onto screen
	 	context.fillStyle = "rgb(0, 0, 0)";
	 	context.font = "bold 14px arial";
	 	context.textAlign="center";
	 	context.fillText(title, (canvasWidth/2), 21);

	 	context.fillText("Belligerents", (canvasWidth/2), captionY+105);

	 	context.fillText("Commanders and leaders", (canvasWidth/2), captionY+165);

	 	context.fillText("Strength", (canvasWidth/2), captionY+225 + additionYCom);

	 	context.fillText("Casualties and losses", (canvasWidth/2), captionY+285 + additionYCom + additionYStr);
	 	// Flags
	 	if (drawing){
	    	context.drawImage(image, 10, 30, 301, 300);
	    	captionY = 343;
		}

		if (flagbool)
	    	context.drawImage(flag, 10, captionY+120, 23, 14);

		if (flagbool1)
	    	context.drawImage(flag1, canvasWidth/2 + 5, captionY+120, 23, 14);

		//Draw caption onto screen
	 	context.fillStyle = "rgb(0, 0, 0)";
	 	context.font = "12px arial";
	 	context.textAlign="center";
	 	context.fillText(caption, (canvasWidth/2), captionY);

	 	//Date
	 	context.fillStyle = "rgb(0, 0, 0)";
	 	context.font = "bold 15px arial";
	 	context.textAlign="left";
	 	context.fillText("Date", 10, captionY + 35);
	 	context.fillText("Location", 10, captionY + 55);
	 	context.fillText("Result", 10, captionY + 75);
	 	context.textAlign="left";
	 	context.font = "14px arial";
	 	context.fillText(date, canvasWidth - 230, captionY + 35);
	 	context.fillText(location, canvasWidth - 230, captionY + 55);
	 	context.fillText(result, canvasWidth - 230, captionY + 75);

	 	//Belligerents
	 	context.fillText(belligerent1, 38, captionY + 132);
	 	context.fillText(belligerent2, canvasWidth/2 + 32, captionY+132);
	 	//Leaders
	 	context.fillText(commander1, 8, captionY + 192);
	 	context.fillText(commander2, canvasWidth/2 + 8, captionY+192);

	 	context.fillText(commander1a, 8, captionY + 192 + additionYCom);
	 	context.fillText(commander2a, canvasWidth/2 + 8, captionY+192+additionYCom);
	 	//Strength
	 	context.fillText(str1, 8, captionY + 252 + additionYCom);
	 	context.fillText(str2, canvasWidth/2 + 8, captionY+252 + additionYCom);

	 	context.fillText(str1a, 8, captionY + 252 + additionYCom + additionYStr);
	 	context.fillText(str2a, canvasWidth/2 + 8, captionY+252+additionYCom + additionYStr);
	 	//Loss
	 	context.fillText(loss1, 8, captionY + 312 + additionYCom + additionYStr);
	 	context.fillText(loss2, canvasWidth/2 + 8, captionY+312+additionYCom + additionYStr);

	 	context.fillText(loss1a, 8, captionY + 312 + additionYCom + additionYStr + additionYLoss);
	 	context.fillText(loss2a, canvasWidth/2 + 8, captionY+312+additionYCom + additionYStr + additionYLoss);
	 	//Separator
		context.strokeStyle = "rgb(150, 150, 150)";
		context.beginPath();
		context.moveTo(7, captionY + 5);
		context.lineTo(canvasWidth-7, captionY + 5);
		context.closePath();
		context.stroke();
		context.save()

		//Vertical Separator
		context.strokeStyle = "rgb(70, 70, 70)";
		context.beginPath();
		context.setLineDash([1,2]);
		context.moveTo(canvasWidth/2, captionY + 120);
		context.lineTo(canvasWidth/2, captionY + 140); 

		context.moveTo(canvasWidth/2, captionY + 180);
		context.lineTo(canvasWidth/2, captionY + 200 + additionYCom); // adtnY changes 

		context.moveTo(canvasWidth/2, captionY + 240 + additionYCom);
		context.lineTo(canvasWidth/2, captionY + 260 + additionYCom  + additionYStr); 

		context.moveTo(canvasWidth/2, captionY + 300 + additionYCom  + additionYStr);
		context.lineTo(canvasWidth/2, captionY + 320 + additionYCom  + additionYStr + additionYLoss); 
		context.closePath();
		context.stroke();
		context.restore()

	 	if(playing){
	 		setTimeout(animate, 80);
	 	}
	 };

	 init();

	

	
	function dBug(data){
		console.log(data);
	};
});