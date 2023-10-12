// Script to generate lauout for website with appropriate folder depth

function layout(depth) {
	let navdata = '\
	<img src="'+depth+'title.svg" alt="Doom 64 Compendium" style="width: 40rem; height: 8rem;" />\
	';
	document.getElementById("navigation").innerHTML = navdata;
	return;
}