$(document).ready(function() {
	dBug("Document is ready!");

	var canvas = $("#flagCanvas");
	var context = canvas.get( 0).getContext("2d");

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	// local vars
	var playing = true;
	var boolDark = false;
	var boolLight = false;

	var canvasContainer = $("#cvsContainer");
	var canvasContainerHeight = canvasContainer.height();

	var flegLoader = $('#flegLoader');
	var download = $("#dlBtn");

	var drawing = false;

	var darkGloss = new Image(); // create image object
					darkGloss.src = "images/gloss.png";

	var lightGloss = new Image(); // create image object
					lightGloss.src = "images/lgloss.png";



	// init canvas
	function init(){
		var scaledCanvas=document.createElement('canvas');

		var scaledContext=scaledCanvas.getContext('2d');

		scaledCanvas.width=flagCanvas.width*0.1;
		scaledCanvas.height=flagCanvas.height*0.1;

		scaledContext.scale(0.1,0.1);

		dBug(scaledCanvas.width);

		dBug(scaledCanvas.height);

		download.click(function(e) { // IF DL CLICK GET IMAGE FROM MINI CVS AND DL IT!!!
			e.preventDefault();

			scaledContext.drawImage(canvas.get(0),0,0);
			var dataURL = scaledCanvas.toDataURL();

			window.location.href = dataURL;
			window.download = "flag.png";
		});

		animate();
	};	


	$(function() {
		flegLoader.change(function(e) {
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

	$("#radio_1").prop('checked', false);
	$("#radio_2").prop('checked', false);

	$('input[type=radio]').change(function() {
        if (this.value == 'dGloss') {
            boolDark = true;
            boolLight = false;
            $("#radio_2").prop('checked', false);
        }
        else if (this.value == 'lGloss') {
            boolLight = true;
            boolDark = false;
            $("#radio_1").prop('checked', false);
        }
    });

    $(darkGloss).load(function() {
	            darkImg = this;
	});

	$(lightGloss).load(function() {
	            lightImg = this;
	});


	function animate(){
	 	//dBug("anim");
	 	// clear the screen
	 	context.clearRect(0,0, canvas.width(), canvas.height());
	 	context.fillStyle = "rgb(245, 245, 255)";
	 	// white background
	 	context.fillRect(0,0, canvas.width(), canvas.height());

	 	//Draw pixel image
	 	if (drawing){
		context.drawImage(image,0,0,canvas.width(), canvas.height());
		var imageData = context.getImageData(0, 0, canvas.width(), canvas.height());
		var pixels = imageData.data; // CanvasPixelArray

		context.clearRect(0, 0, canvas.width(), canvas.height());

		var numTileRows = 11;
		var numTileCols = 16;

		var tileWidth = imageData.width / numTileCols;
		var tileHeight = imageData.height / numTileRows;

		for(var r = 0; r < numTileRows; r++) {
				for(var c = 0; c < numTileCols; c++) {

					var x = (c*tileWidth)+(tileWidth/2); 
					var y = (r*tileHeight)+(tileHeight/2);
					var pos = (Math.floor(y)*(imageData.width*4))+(Math.floor(x)*4); 
					// get the pixel color from the center of the tile

					var red = pixels[pos];
					var green = pixels[pos+1];
					var blue = pixels[pos+2];
					
					context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
					context.fillRect(x-(tileWidth/2), y-(tileHeight/2), tileWidth, tileHeight);
				};
			};
		}

		if(boolDark){
			context.drawImage(darkImg,0,0,canvas.width(), canvas.height());
			var imageData1 = context.getImageData(0, 0, canvas.width(), canvas.height());
			var pixels1 = imageData1.data; // CanvasPixelArray

			var numTileRows1 = 11;
			var numTileCols1 = 16;

			var tileWidth1 = imageData1.width / numTileCols1;
			var tileHeight1 = imageData1.height / numTileRows1;

			for(var r = 0; r < numTileRows1; r++) {
					for(var c = 0; c < numTileCols1; c++) {

						var x = (c*tileWidth1)+(tileWidth1/2); 
						var y = (r*tileHeight1)+(tileHeight1/2);
						var pos = (Math.floor(y)*(imageData1.width*4))+(Math.floor(x)*4); 
						// get the pixel color from the center of the tile

						var red = pixels1[pos];
						var green = pixels1[pos+1];
						var blue = pixels1[pos+2];
						
						context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
						context.fillRect(x-(tileWidth1/2), y-(tileHeight1/2), tileWidth1, tileHeight1);
					};
				};
		}else if (boolLight){
			context.drawImage(lightImg,0,0,canvas.width(), canvas.height());
			var imageData2 = context.getImageData(0, 0,canvas.width(), canvas.height());
			var pixels2 = imageData2.data; // CanvasPixelArray

			var numTileRows2 = 11;
			var numTileCols2 = 16;

			var tileWidth2 = imageData2.width / numTileCols2;
			var tileHeight2 = imageData2.height / numTileRows2;

			for(var r = 0; r < numTileRows2; r++) {
					for(var c = 0; c < numTileCols2; c++) {

						var x = (c*tileWidth2)+(tileWidth2/2); 
						var y = (r*tileHeight2)+(tileHeight2/2);
						var pos = (Math.floor(y)*(imageData2.width*4))+(Math.floor(x)*4); 
						// get the pixel color from the center of the tile

						var red = pixels2[pos];
						var green = pixels2[pos+1];
						var blue = pixels2[pos+2];
						
						context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
						context.fillRect(x-(tileWidth2/2), y-(tileHeight2/2), tileWidth2, tileHeight2);
					};
				}
		}

	 	if(playing){
	 		setTimeout(animate, 100);
	 	}
	 };

	init();

	
	function dBug(data){
		console.log(data);
	};
});