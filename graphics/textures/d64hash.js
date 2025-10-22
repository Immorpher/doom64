// Texture hash number generator originally from Doom 64 EX and used in Doom 64 Remaster
// Based on a script by Kovic and adapted to javascript by Immorpher

// Set the hash calculator
QForm = {};
QForm.onEncode = function () {
    // get the texture name and hash it
    document.getElementById("hashnum").value = Hashing(document.getElementById("texname").value);
};

// Set the hash file checker
const $output = document.getElementById('output'); // set the output table
document.getElementById('file').onchange = function() {
	const selectedFiles = event.target.files; // list of files
	
	const NumFiles = selectedFiles.length; // Number of files
	
	var Files = new Array(NumFiles); // Space for stripped extension files
	var Hashes = new Array(NumFiles); // Space for file hashes
	var Duplicates = new Array(NumFiles); // Space for duplicate determination
	
	for (let i = 0; i < NumFiles; i++) { // Process hashes
		Files[i] = RemoveExtension(selectedFiles[i].name);
		Hashes[i] = Hashing(Files[i]);
	}
	
	for (let i = 0; i < NumFiles; i++) { // Find duplicates
		Duplicates[i] = ""; // Clean array
		for (let j = 0; j < NumFiles; j++) {
			if (Hashes[i] == Hashes[j] && i != j) { // Check for matches that is not itself
				Duplicates[i] = Duplicates[i] + Files[j] + '</br>'; // Store duplicate name
			}
		}
	}
	
	// Write HTML table
	var TableHTML = "<table><thead><tr><td>File #</td><td>File Name</td><td>Hash #</td><td>Duplicates</td></tr></thead><tbody>"; // set table header
	for (let i = 0; i < NumFiles; i++) {
		TableHTML = TableHTML + '\n' + '<tr><td>' + i + '</td><td>' + Files[i] + '</td><td>' + Hashes[i] + '</td><td>' + Duplicates[i] + '</td></tr>';
	}
	TableHTML = TableHTML + "</tbody></table>"; // close the table body
	output.innerHTML = TableHTML; // store the html
};

// Use this to remove file extensions
function RemoveExtension(filename) {
	// Matches a dot followed by one or more characters that are not a dot or a slash, at the end of the string.
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) { // No extension found
		return filename;
	}
	return filename.substring(0, lastDotIndex);
}

// Function to calculate texture hash numbers
function Hashing(texture) {
	// Convert text to upper case as it would appear in the WAD
	texture = texture.toUpperCase(); // make it uppercase for Doom WAD format
	
	// clamp the number of characters we check to 8 because lumpinfo_t
	// can only store 8 bytes (texture names in WAD can only be 8 characters long)
	var repetitions = texture.length < 8 ? texture.length : 8;
	// set initial hash value
	var hash = 1315423911;

	for (let i = 0; i < repetitions; i++)
	{
		hash ^= ((hash << 5) + texture.charCodeAt(i) + (hash >> 2));
	}
	
	// make it show as 16-bit unsigned integer
	hash = (hash >>> 0) % 65536;
  
	return hash;
}
