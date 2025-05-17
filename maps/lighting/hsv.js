// Doom 64 HSV Calculator


// RGB to HEX
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgb2hex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

// HEX to RGB
// https://learnersbucket.com/examples/interview/convert-hex-color-to-rgb-in-javascript/
const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // return {r, g, b} 
    return [r, g, b ];
}

// RGB to HSV
// From Doom 64: https://github.com/Erick194/DOOM64-RE/blob/27763a01dadd24dabff7cfdd860a4324cfc18939/doom64/c_convert.c#L18
function rgb2hsv(r, g, b) {
	let h = 0; // D64 hue
	let s = 0; // D64 saturation
	let v = 0; // D64 value
    let min = 0; // min color?
    let max = 0; // max color?
	let deltamin = 0;
    let deltamax = 0;
	let j = 0;
    let x = 0;
    let xr = 0;
    let xg = 0;
    let xb = 0;
    let sum = 0;
	
	// Determine max
	max = r;
    if (g < max) {
        max = g;
    }
    if (b < max) {
        max = b;
    }
	
	// Detmine min
	min = r;
    if (g > min) {
        min = g;
    }
    if (b > min) {
        min = b;
    }
	
	deltamin = min / 255.0;
    deltamax = deltamin - (max / 255.0);
	
	if(deltamin == 0.0) {
        j = 0.0;
    }
    else {
        j = deltamax / deltamin;
    }

    if(j != 0.0)
    {
        xr = r / 255.0;
        xg = g / 255.0;
        xb = b / 255.0;

        if(xr != deltamin)
        {
            if(xg != deltamin)
            {
                if(xb == deltamin)
                {
                    sum = ((deltamin - xg) / deltamax + 4.0) - ((deltamin - xr) / deltamax);
                }
            }
            else
            {
                sum = ((deltamin - xr) / deltamax + 2.0) - ((deltamin - xb) / deltamax);
            }
        }
        else
        {
            sum = ((deltamin - xb) / deltamax) - ((deltamin - xg) / deltamax);
        }

        x = sum * 60.0;

        if (x < 0.0)
        {
            x = x + 360.0;
        }
    }
    else
    {
        j = 0.0;
    }
	
	h = Math.floor((x / 360.0) * 255.0);
	s = Math.floor(j * 255.0);
	v = Math.floor(deltamin * 255.0);
	
	return [h, s, v];
}


// HSV to RGB
// From Doom 64: https://github.com/Erick194/DOOM64-RE/blob/27763a01dadd24dabff7cfdd860a4324cfc18939/doom64/c_convert.c#L18
function hsv2rgb(h, s, v) {
	
	let r = 0;
	let g = 0;
	let b = 0;
    let x = 0;
    let j = 0;
    let i = 0;
    let t = 0;
    let table = 0;
    let xr = 0;
    let xg = 0;
    let xb = 0;

    j = ((h / 255.0) * 360.0);

    if (360.0 <= j) {
        j = (j - 360.0);
    }

    x = (s / 255.0);
    i = (v / 255.0);

    if (x != 0.0)
    {

        table = Math.floor(j / 60.0);
        if (table < 6)
        {
            t = (j / 60.0);
            switch (table) {
            case 0:
                xr = i;
                xg = ((1.0 - ((1.0 - (t - table)) * x)) * i);
                xb = ((1.0 - x) * i);
                break;
            case 1:
                xr = ((1.0 - (x * (t - table))) * i);
                xg = i;
                xb = ((1.0 - x) * i);
                break;
            case 2:
                xr = ((1.0 - x) * i);
                xg = i;
                xb = ((1.0 - ((1.0 - (t - table)) * x)) * i);
                break;
            case 3:
                xr = ((1.0 - x) * i);
                xg = ((1.0 - (x * (t - table))) * i);
                xb = i;
                break;
            case 4:
                xr = ((1.0 - ((1.0 - (t - table)) * x)) * i);
                xg = ((1.0 - x) * i);
                xb = i;
                break;
            case 5:
                xr = i;
                xg = ((1.0 - x) * i);
                xb = ((1.0 - (x * (t - table))) * i);
                break;
            }
        }
    }
    else
    {
        xr = xg = xb = i;
    }

    r = Math.floor(xr * 255.0);
    g = Math.floor(xg * 255.0);
    b = Math.floor(xb * 255.0);
	
	return [r, g, b];
}

QForm = {};
 
ColorProcess = function () {
	// variables for color values
	let rgb = [0,0,0]; //  red, green, blue
	let hsv = [0,0,0]; //  hue, saturation, value
	let gamehex = 0; // hex value for in game colors
	
    // get the picked color
    let color = document.getElementById("color").value;
	let brightness = parseInt(document.getElementById("brightness").value);
	
	// convert to RGB colors
	rgb = hex2rgb(color);
	
	// convert to HSV colors
	hsv= rgb2hsv(rgb[0],rgb[1],rgb[2]);

	// show hex value
    document.getElementById("hex").value = color;
	
	// show RGB values
    document.getElementById("red").value = rgb[0];
    document.getElementById("green").value = rgb[1];
    document.getElementById("blue").value = rgb[2];
	
	// show HSV values
    document.getElementById("hue").value = hsv[0];
    document.getElementById("sat").value = hsv[1];
    document.getElementById("value").value = hsv[2];
	
	// set brightness warning
	if (hsv[2] > 128)
	{
		document.getElementById("warning").textContent = "Overbright";
	} else if (hsv[2] > 64)
	{
		document.getElementById("warning").textContent = "Bright";
	} else
	{
		document.getElementById("warning").textContent = "Dark";
	}
	
	
	// Convert to in game values now
	
	// If light amplification goggles
	if (document.getElementById("lightamp").checked == true)
	{
		brightness = 300;
	}
	
	// In game brightness boost on value
	hsv[2] = Math.floor(hsv[2] * ((brightness + 100) / 100.0));
	if (hsv[2] > 255) { // set maximum value
		hsv[2] = 255;
	}
	
	// set saturation warning
	if (hsv[2] >= 255)
	{
		document.getElementById("warninggame").textContent = "Saturated";
	} else
	{
		document.getElementById("warninggame").textContent = "Normal";
	}
	
	
	// convert HSV back to RGB
	rgb = hsv2rgb(hsv[0],hsv[1],hsv[2]);
	
	// show in game RGB values
    document.getElementById("redgame").value = rgb[0];
    document.getElementById("greengame").value = rgb[1];
    document.getElementById("bluegame").value = rgb[2];
	
	// convert to in-game hex value
	gamehex = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// show in game hex value
    document.getElementById("hexgame").value = gamehex;
    document.getElementById("colorgame").value = gamehex;
	
	// show in game HSV values
    document.getElementById("huegame").value = hsv[0];
    document.getElementById("satgame").value = hsv[1];
    document.getElementById("valuegame").value = hsv[2];
};

ColorProcessGame = function () {
	// variables for color values
	let rgb = [0,0,0]; //  red, green, blue
	let hsv = [0,0,0]; //  hue, saturation, value
	let gamehex = 0; // hex value for in game colors
	
    // get the picked color
    let color = document.getElementById("colorgame").value;
	let brightness = parseInt(document.getElementById("brightness").value);
	
	// convert to RGB colors
	rgb = hex2rgb(color);
	
	// convert to HSV colors
	hsv= rgb2hsv(rgb[0],rgb[1],rgb[2]);

	// show hex value
    document.getElementById("hexgame").value = color;
	
	// show RGB values
    document.getElementById("redgame").value = rgb[0];
    document.getElementById("greengame").value = rgb[1];
    document.getElementById("bluegame").value = rgb[2];
	
	// show HSV values
    document.getElementById("huegame").value = hsv[0];
    document.getElementById("satgame").value = hsv[1];
    document.getElementById("valuegame").value = hsv[2];
	
	// set saturation warning
	if (hsv[2] >= 255)
	{
		document.getElementById("warninggame").textContent = "Saturated";
	} else
	{
		document.getElementById("warninggame").textContent = "Normal";
	}
	
	// Convert to in game values now
	
	// If light amplification goggles
	if (document.getElementById("lightamp").checked == true)
	{
		brightness = 300;
	}
	
	// In game brightness boost on value
	hsv[2] = Math.floor(hsv[2] * (100.0 / (brightness + 100)));
	if (hsv[2] > 255) { // set maximum value
		hsv[2] = 255;
	}
	
		
	// set brightness warning
	if (hsv[2] > 128)
	{
		document.getElementById("warning").textContent = "Overbright";
	} else if (hsv[2] > 64)
	{
		document.getElementById("warning").textContent = "Bright";
	} else
	{
		document.getElementById("warning").textContent = "Dark";
	}
	
	
	// convert HSV back to RGB
	rgb = hsv2rgb(hsv[0],hsv[1],hsv[2]);
	
	// show map RGB values
    document.getElementById("red").value = rgb[0];
    document.getElementById("green").value = rgb[1];
    document.getElementById("blue").value = rgb[2];
	
	// convert to map hex value
	gamehex = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// show in game hex value
    document.getElementById("hex").value = gamehex;
    document.getElementById("color").value = gamehex;
	
	// show map HSV values
    document.getElementById("hue").value = hsv[0];
    document.getElementById("sat").value = hsv[1];
    document.getElementById("value").value = hsv[2];
};

HexProcess = function () {
	// set hex value
    document.getElementById("color").value = document.getElementById("hex").value;
	
	// process the rest of the colors
	ColorProcess();
};

HexProcessGame = function () {
	// set hex value
    document.getElementById("colorgame").value = document.getElementById("hexgame").value;
	
	// process the rest of the colors
	ColorProcessGame();
};

RGBProcess = function () {
	// variables for color values
	let rgb = [0,0,0]; //  red, green, blue
	
    // get RGB values
    rgb[0] = document.getElementById("red").value;
    rgb[1] = document.getElementById("green").value;
    rgb[2] = document.getElementById("blue").value;

	// set hex value
    document.getElementById("color").value = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// process the rest of the colors
	ColorProcess();
};

RGBProcessGame = function () {
	// variables for color values
	let rgb = [0,0,0]; //  red, green, blue
	
    // get RGB values
    rgb[0] = document.getElementById("redgame").value;
    rgb[1] = document.getElementById("greengame").value;
    rgb[2] = document.getElementById("bluegame").value;

	// set hex value
    document.getElementById("colorgame").value = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// process the rest of the colors
	ColorProcessGame();
};

HSVProcess = function () {
	// variables for color values
	let hsv = [0,0,0]; //  hue, saturation, value
	let rgb = [0,0,0]; //  red, green, blue
	
    // get HSV values
    hsv[0] = document.getElementById("hue").value;
    hsv[1] = document.getElementById("sat").value;
    hsv[2] = document.getElementById("value").value;
	
	// convert HSV to RGB
	rgb = hsv2rgb(hsv[0],hsv[1],hsv[2]);

	// set hex value
    document.getElementById("color").value = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// process the rest of the colors
	ColorProcess();
};

HSVProcessGame = function () {
	// variables for color values
	let hsv = [0,0,0]; //  hue, saturation, value
	let rgb = [0,0,0]; //  red, green, blue
	
    // get HSV values
    hsv[0] = document.getElementById("huegame").value;
    hsv[1] = document.getElementById("satgame").value;
    hsv[2] = document.getElementById("valuegame").value;
	
	// convert HSV to RGB
	rgb = hsv2rgb(hsv[0],hsv[1],hsv[2]);

	// set hex value
    document.getElementById("colorgame").value = rgb2hex(rgb[0], rgb[1], rgb[2]);
	
	// process the rest of the colors
	ColorProcessGame();
};