/*-----------------------------------------------
		Initial variable creation
-----------------------------------------------*/

const red = document.getElementById("red")
var redVal = document.getElementById('red-val')
const green = document.getElementById("green")
var greenVal = document.getElementById('green-val')
const blue = document.getElementById("blue")
var blueVal = document.getElementById('blue-val')
//calls the init function
init()

//function used to initialize the functionality of web page
//input: Null
//output: Null
function init(){
	//calls the setRandomColors function
	setRandomColors();
	//calls the changeColor function
	changeColor();
	//sets the value of the labels for the colors
	redVal.innerHTML = red.value;
	greenVal.innerHTML = green.value;
	blueVal.innerHTML = blue.value;

	//as the red value changes change the text of the label.
	red.oninput = function()
	{
		//sets the label text to the value
		redVal.innerHTML = this.value;
		//calls the change color 
		changeColor();
	}

	//as the green value changes change the text of the label.
	green.oninput = function()
	{
		greenVal.innerHTML = this.value;
		changeColor();
	}

	//as the blue value changes change the text of the label.
	blue.oninput = function()
	{
		blueVal.innerHTML = this.value;
		changeColor();
	}
}


//function used to set the values of each slider to generate a new color
//input: Null
//output: Null
function setRandomColors()
{
	red.value = Math.floor(Math.random()*255);
	green.value = Math.floor(Math.random()*255);
	blue.value = Math.floor(Math.random()*255);
}

//Function used to change the color of the background
//input: Null
//output: Null
function changeColor()
{
	//creates an interger value for each corisponding color
	var r = parseInt(red.value);
	var g = parseInt(green.value);
	var b = parseInt(blue.value);
	//finds the average of the colors
	var avgColor = (r+g+b) / 3;

	//changes the background color of the body to match the RGB values
	document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

	//if the background is light change the text color to black
	if(avgColor < 170)
	{
		document.body.style.color = "white";
	}
	//if the background is dark change the text color to white
	else{document.body.style.color = "black";}

}

