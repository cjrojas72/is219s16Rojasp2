// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapDetails()
{
	$('.location').append(" " + mImages[mCurrentIndex].loc);
	$('.description').append(" " + mImages[mCurrentIndex].descript);
	$('.date').append(" " + mImages[mCurrentIndex].d);
	
	console.log('swapDetails');
}


function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	$('#photo').attr('src', mImages[mCurrentIndex].imgString);
	
	swapDetails();
	
	console.log(mImages[mCurrentIndex].imgString);
	
	if(mCurrentIndex >= mImages.length - 1)
	{
		mCurrentIndex=0;
	}
	else
	{
		mCurrentIndex++;
	}
	console.log('swap photo');
}

function revSwapPhoto()
{
	mCurrentIndex--; 
	
	if(mCurrentIndex <= 0)
	{
		mCurrentIndex = mImages.length - 1;
	}
	$('#photo').attr('src', mImages[mCurrentIndex].imgString);
	
	swapDetails();
	
}




var mURL= 'images.json';
// Counter for the mImages array
var mCurrentIndex=0;
// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() 
{
// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) 
	{
		try 
		{
		// Let’s try and see if we can parse JSON
		mJson = JSON.parse(mRequest.responseText);
		// Let’s print out the JSON; It will likely show as “obj”
			for(var i=0; i< mJson.images.length; i++)
			{
				mImages.push(new GalleryImage(mJson.images[i].imgPath, mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date));	
			}
			console.log(mImages);
		} 
		catch(err) 
		{
		console.log(err.message);
		}
	}
};
mRequest.open("GET","images.json", true);
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];
// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgString, loc, descript, d) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.imgString= imgString;
	this.loc= loc;
	this.descript= descript;
	this.d= d;

}


$(document).ready(function()
{
	$('#nextPhoto').hover(function(){
		$(this).css("opacity", "0.8");
	});
	$('#nextPhoto').mouseout(function(){
		$(this).css("opacity", "1");
	});
	$('#prevPhoto').hover(function(){
		$(this).css("opacity", "0.8");
	});
	$('#prevPhoto').mouseout(function(){
		$(this).css("opacity", "1");
	});
	
	$('#nextPhoto').click(function(){
		swapPhoto();
	});
	$('#prevPhoto').click(function(){
		revSwapPhoto();
	});
	
	$('.moreIndicator').click(function(){
		$(this).toggleClass('rot270');
		
		$('.details').toggle(function(){
			$('.details').show();	
		});
	});
});
