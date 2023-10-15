// Script to generate lauout for website with appropriate folder depth

function layout(depth) {
	
	// Navigation html
	let navdata = '\
		<img src="'+depth+'title.svg" alt="Doom 64 Compendium" style="width: 15rem; height: 12rem;" />\
		<a href="'+depth+'index.html">Directory</a>\
		<a href="#engines">Engines</a>\
		<a href="'+depth+'mapping/index.html">Mapping</a>\
		<a href="#graphics">Graphics</a>\
		<a href="#audio">Audio</a>\
		<a href="'+depth+'/contributors/index.html">Contributors</a>\
		<a href="#links">Links</a>\
	';
	
	let footdata = '\
		<p>The Doom 64 Compendum is collaboratively constructed by the <a href="'+depth+'/contributors/index.html">contributors</a>.</p>\
	';
	
	document.getElementById("navigation").innerHTML = navdata;
	document.getElementById("footer").innerHTML = footdata;
	return;
}