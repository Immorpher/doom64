// Script to generate layout for website with appropriate folder depth

function layout(depth) {
	
	// Navigation html
	let navdata = '\
		<span id="navgraphic"><a href="'+depth+'index.html"><img src="'+depth+'title.svg" alt="Main Page"/></a></span>\
		<a href="'+depth+'directory.html">Directory</a>\
		<a href="'+depth+'engines/index.html">Engines</a>\
		<a href="'+depth+'structures/index.html">Structures</a>\
		<a href="'+depth+'maps/index.html">Maps</a>\
		<a href="'+depth+'graphics/index.html">Graphics</a>\
		<a href="'+depth+'audio/index.html">Audio</a>\
		<a href="'+depth+'contributors/index.html">Contributors</a>\
		<a href="'+depth+'links/index.html">Links</a>\
	';
	
	let footdata = 'The Doom 64 Compendum is collaboratively constructed by the <a href="'+depth+'contributors/index.html">contributors</a>.';
	
	// Add the doom 64 compendium title to pages which need it
	var titleid = document.getElementById("title");
	if (titleid) {
		document.getElementById("title").innerHTML = document.getElementById("title").innerHTML + " (Doom 64 Compendium)";
	}
	
	//Process the document to add the layout
	document.getElementById("navigation").innerHTML = navdata;
	document.getElementById("footer").innerHTML =  "<p>" + footdata + document.getElementById("footer").innerHTML + "</p>";
	return;
}