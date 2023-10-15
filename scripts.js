// Script to generate layout for website with appropriate folder depth

function layout(depth) {
	
	// Navigation html
	let navdata = '\
		<img src="'+depth+'title.svg" alt="Doom 64 Compendium" style="width: 15rem; height: 12rem;" />\
		<a href="'+depth+'index.html">Directory</a>\
		<a href="'+depth+'engines/index.html">Engines</a>\
		<a href="'+depth+'mapping/index.html">Mapping</a>\
		<a href="#graphics">Graphics</a>\
		<a href="#audio">Audio</a>\
		<a href="'+depth+'/contributors/index.html">Contributors</a>\
		<a href="#links">Links</a>\
	';
	
	let footdata = '\
		<p>The Doom 64 Compendum is collaboratively constructed by the <a href="'+depth+'/contributors/index.html">contributors</a>.</p>\
	';
	
	// Add the doom 64 compendium title
	document.getElementsByTagName("title")[0].innerHTML = document.getElementsByTagName("title")[0].innerHTML + " (Doom 64 Compendium)";
	
	//Process the document to add the layout
	document.getElementById("navigation").innerHTML = navdata;
	document.getElementById("footer").innerHTML = footdata;
	return;
}