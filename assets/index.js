const red = document.getElementById("red")
var redVal = document.getElementById('red-val')
const green = document.getElementById("green")
var greenVal = document.getElementById('green-val')
const blue = document.getElementById("blue")
var blueVal = document.getElementById('blue-val')

init()

red.oninput = function()
{
	redVal.innerHTML = this.value;
	changeColor();
}

green.oninput = function()
{
	greenVal.innerHTML = this.value;
	changeColor();
}

blue.oninput = function()
{
	blueVal.innerHTML = this.value;
	changeColor();
}

function init(){
	setRandomColors();
	changeColor();
	redVal.innerHTML = red.value;
	greenVal.innerHTML = green.value;
	blueVal.innerHTML = blue.value;
}

function setRandomColors()
{
	red.value = Math.floor(Math.random()*255);
	green.value = Math.floor(Math.random()*255);
	blue.value = Math.floor(Math.random()*255);
}

function changeColor()
{
	var r = parseInt(red.value);
	var g = parseInt(green.value);
	var b = parseInt(blue.value);

	var avgColor = (r+g+b) / 3;
	console.log(r + g + b);

	document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

	
	if(avgColor > 180)
	{
		document.body.style.color = "black";
	}
	else{document.body.style.color = "white";}

}

