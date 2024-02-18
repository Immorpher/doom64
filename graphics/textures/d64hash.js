// Texture hash number generator originally from Doom 64 EX and used in Doom 64 Remaster
// Based on a script by Kovic and adapted to javascript by Immorpher

QForm = {};
 
QForm.onEncode = function () {
  
	var texture = document.getElementById("texname").value; // get the texture name
	var hash = 1315423911; // set initial hash value
	var i = 0;
	
	texture = texture.toUpperCase(); // convert to upper case

    for (let i = 0; i < texture.length; i++)
    {
        hash ^= ((hash << 5) + texture.charCodeAt(i) + (hash >> 2));
    }
	
	hash = (hash >>>0) % 65536; // make it show as an unsigned int
	
	// Special case for blank texture
	if (texture == "BLANK")
	{
		hash = -6735;
	}

  
	document.getElementById("hashnum").value = hash;
	
};


