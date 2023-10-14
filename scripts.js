// Script to generate lauout for website with appropriate folder depth

function layout(depth) {
	let navdata = '\
		<img src="'+depth+'title.svg" alt="Doom 64 Compendium" style="width: 15rem; height: 12rem;" />\
		<a href="#directory">Directory</a>\
		<a href="#modding">Modding</a>\
		<a href="#contributors">Contributors</a>\
		<a href="#affiliates">Affiliates</a>\
	';
	document.getElementById("navigation").innerHTML = navdata;
	return;
}