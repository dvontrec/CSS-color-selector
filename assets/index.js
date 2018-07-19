/*-----------------------------------------------
		Initial variable creation
-----------------------------------------------*/

const red = document.getElementById("red");
var redVal = document.getElementById('red-val');
const green = document.getElementById("green");
var greenVal = document.getElementById('green-val');
const blue = document.getElementById("blue");
var blueVal = document.getElementById('blue-val');
const alpha = document.getElementById("alpha");
var alphaVal = document.getElementById('alpha-val');
var colorText = document.getElementById('rgba-text');
const changeButton = document.getElementById('change');
const copyButton = document.getElementById('copy');
const codeButton = document.getElementById('code-icon');
const palletButton = document.getElementById('show-pallett');
const mainDisplay = document.getElementById('main');
const pallettDisplay = document.getElementById('pallett');
//gets an array of all items with the "colab details" class, since there is only one we want to store the 0 indedx
const colabDetails  =document.getElementsByClassName('colab-details')[0];

//finds the pallet boxes and stores them in an array
const palletBoxes = document.getElementsByClassName('box');

const contextMenu = document.getElementById('contextmenu');
const menuItems = contextMenu.children;

//calls the init function
init()

//function used to initialize the functionality of web page
//input: Null
//output: Null
function init(){
	//calls the setRandomColors function
	setRandomColors();

	//creates a collection of objects to hold the color controller
	const colorController = [
		{
			//sets the color slider of the object to the global variable
			colorSlider: red,
			//sets the color value object to the global variable
			colorVal: redVal
		},
		{
			colorSlider: green,
			colorVal: greenVal
		},
		{
			colorSlider: blue,
			colorVal: blueVal
		},
		{
			colorSlider: alpha,
			colorVal: alphaVal
		}
	]

	//loops through the collection of colorController objects so lines of code are not repeated.
	colorController.forEach(function(controller)
	{
		//when the value of the color slider is changed 
		controller.colorSlider.oninput = function()
		{
			//change the calue of the label to match the slider
			controller.colorVal.value = this.value;
			//call the changeColor function
			changeColor();
		}

		//when the value is changed on the color input
		controller.colorVal.oninput = function()
		{
			//change the slider to match the input value
			controller.colorSlider.value = this.value;
			//call the changeColor function
			changeColor();
		}
	});

	//when the change color button is pressed, call the setRandomColors function
	changeButton.onclick = setRandomColors

	//when the copy button is pressed
	copyButton.onclick = function()
	{
		//forces the computer to call the copy command, same as right clicking and copying
		document.execCommand('copy');
	}

	palletButton.onclick = function()
	{
		mainDisplay.style.display = 'none';
		pallettDisplay.style.display = 'flex'; 
		pallettDisplay.style.width = '100%'; 
		pallettDisplay.style.height = '100%'; 

	}

	//tells the webpage to listen for when the copy command is called
	document.addEventListener('copy', function(event)
	{
		//prevents the normal copy functoin from working
		event.preventDefault();
		//if the machine is capable of copying
		if (event.clipboardData) 
		{
			//sets the data on the clipboard to match the rgba value of the colorText text
		  event.clipboardData.setData("text/plain", colorText.innerHTML);
		}
	});

	//adds event listener to code icon so when it is clicked the toggleColab function is called
	codeButton.addEventListener('click', toggleColab);

	//Converts the htmlcollection into an array containing each box and loops through them.  
	Array.from(palletBoxes).forEach(function(box)
	{
		//adds a click event listener to each box
		box.addEventListener('contextmenu', function(event)
		{
			event.preventDefault();
			contextMenu.style.display = "block";
			contextMenu.style.left = `${event.pageX}px`;
			contextMenu.style.top = `${event.pageY}px`;

			contextFunction(box);
			hideContextMenu();

		});
	});




}


function contextFunction(box)
{
	//adds click event listeners to the menu items
	menuItems[0].onclick = () => 
	{
		//when the box is clicked set the background to be equal to the current body background color.  
		box.style.backgroundColor = document.body.style.backgroundColor;
		//sets the rgb text to be saved as a property of the box object
		box.rgb = colorText.innerHTML;
		//sets the values for each color to be properties of the box.  
		box.r = red.value;
		box.g = green.value;
		box.b = blue.value;
		box.a = alpha.value;
	}
	menuItems[1].onclick = () => 
	{
		if(box.rgb)
		{
			//sets the color of the body to match the box background color
			document.body.style.backgroundColor = box.style.backgroundColor;
			//sets the rgba text to match the one stored in the box property
			colorText.innerHTML = box.rgb;
			//sets the valuse displayed to match the box properties
			red.value = box.r;
			redVal.value = red.value;
			green.value = box.g;
			greenVal.value = green.value;
			blue.value = box.b;
			blueVal.value = blue.value;
			alpha.value = box.a;
			alphaVal.value = alpha.value;
		}
	}
}

function hideContextMenu()
{
	document.onclick = () =>
	{
		contextMenu.style.display = 'none';
		console.log('test')
	}
}

//function used to set the values of each slider to generate a new color
//input: Null
//output: Null
function setRandomColors()
{
	//sets the value of the colors to a random whole number between 0 and 255
	red.value = Math.floor(Math.random()*255);
	green.value = Math.floor(Math.random()*255);
	blue.value = Math.floor(Math.random()*255);
	//sets alpha value to stay at 1 when random color is created
	alpha.value = 100;

	//calls the changeColor function
	changeColor();
	//sets the value of the labels for the colors
	redVal.value = red.value;
	greenVal.value = green.value;
	blueVal.value = blue.value;
	alphaVal.value = alpha.value;
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
	var a = alpha.value /100
	//finds the average of the colors
	var avgColor = (r+g+b) / 3;

	//changes the background color of the body to match the RGB values
	document.body.style.backgroundColor = `rgba(${r},${g},${b},${a})`;

	//if the background alpha is over 55 te text can be set to white
	if(a > .55)
	{
		//if the background is light change the text color to white
		if(avgColor < 140)
		{
			document.body.style.color = "white";
		}
		else
		{
			document.body.style.color = "black";
		}
	}
	//if the background is dark change the text color to black
	else
	{
		document.body.style.color = "black";
	}

	colorText.innerHTML = `rgba(${r}, ${g}, ${b}, ${a})`
}

//function used to set the colab details to hidden or visable
//input: Null
//output: Null
function toggleColab()
{
	//if the colab details are visable
	if(colabDetails.classList.contains('visable'))
	{
		//removes visable from the class list making them dissappear from the page
		colabDetails.classList.remove('visable');
	}
	else
	{
		//adds the visable class to the class list making the appear on the page
		colabDetails.classList.add('visable');
	}

}

