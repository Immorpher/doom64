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
	const CheckOriginals = document.getElementById("originals").checked;
	
	// Original textures
	const OriginalName = ["?", "C5", "C6", "C8", "C9", "C10", "C12", "C13", "C14", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C28", "C29", "C31", "C33", "C34", "C35", "C35B", "C37", "C38", "C41", "C42", "C43", "C44", "C44B", "C45", "C46", "C47", "C48", "C49", "C50", "C51", "C52", "C53", "C54", "C55", "C56", "C57", "C58", "C59", "C60", "C61", "C62", "C63", "C64", "C65", "C66", "C67", "C72", "C74", "C75", "C76", "C77", "C78", "C79", "C80", "C81", "C83", "C86", "C87", "C88", "C89", "C90", "C91", "C92", "C97", "C98", "C99", "C100", "C101", "C102", "C102B", "C104", "C108", "C109", "C200", "C201", "C204", "C206", "C301", "C302", "C303", "C306", "C307", "C307B", "C308", "C401", "C402", "C403", "C405", "C408", "C500", "CASF07", "CASF11", "CASF12", "CASF20B", "CASF30", "CASF50", "CASF70", "CASF80", "CASF87", "CASF89", "CASF102", "CASF103", "CASF104", "CASF105", "CASF106", "CASF107", "CASF108", "CASF109", "CASF200", "CASF201", "CASF203", "CASF204", "CASFL1", "CASFL2", "CASFL3", "CASFL4", "CASFL5", "CASFL6", "CASFL7", "CASFL8", "CASFL9", "CASFL10", "CASFL20", "CASFL21", "CASFL22", "CASFL23", "CASFL24", "CASFL25", "CASFL26", "CASFL27", "CASFL28", "CASFL53", "CASFL54", "CASFL55", "CASFL56", "CASFL57", "CASFL58", "CASFL70", "CASFL94", "CASFL96", "CASFL97", "CASFL98", "CASFL99", "CASL13", "CASL19", "CBTRAKA", "CDOR2BB", "CDOR2TA", "CDOR3TA", "CDOR4BB", "CDOR4TA", "CFACEA", "CFACEB", "CFACEC", "CRTRAKA", "CTEL", "CTRAK0", "CTRAK1", "CYTRAKA", "F_SKYA", "F_SKYB", "F_SKYC", "F_SKYD", "F_SKYE", "F_SKYF", "F_SKYG", "F_SKYH", "F_SKYI", "F_SKYJ", "F_SKYK", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H18", "H20", "H21", "H23", "H24", "H25", "H26", "H27", "H28", "H29", "H30", "H31", "H32", "H33", "H36", "H37", "H41", "H44", "H48", "H49", "H50", "H51", "H52", "H53", "H54", "H55", "H56", "H57", "H58", "H59", "H60", "H63", "H64", "H65", "H66", "H67", "H68", "H69", "H77", "H79", "H82", "H88", "H89", "H90", "H91", "H92", "H93", "H94", "H95", "H96", "H97", "H98", "H99", "H100", "H110", "H112", "H113", "H116", "H117", "H118", "H119", "H122", "H123", "H124", "H127", "H128", "H129", "H130", "H131", "HDOR1BB", "HDOR1TA", "HDOR2BB", "HDOR2TA", "HDOR3A", "HDOR4A", "HDOR6A", "HDOR9A", "HDOR10A", "HELLAA", "HELLAAA", "HELLAB", "HELLAC", "HELLAD", "HELLAE", "HELLAF", "HELLAH", "HELLAI", "HELLAJ", "HELLAK", "HELLAL", "HELLAM", "HELLAN", "HELLAO", "HELLAP", "HELLAQ", "HELLAR", "HELLAS", "HFL10", "HFL12", "HFL13", "HFL14", "HFL15", "HFL16", "HFL17", "HFL20", "HFLATA", "HFLATB", "HFLATC", "HFLATD", "HFLATE", "HFLATF", "HFLATG", "HFLATH", "HFLATI", "HFLATJ", "HFLATK", "HFLATL", "HFLATM", "HFLATN", "HFLATO", "HTELA", "HTELB", "HTELC", "HTELD", "HTRAC1", "HTRAC2", "HTRAC3", "HTRAC4", "HTRAC6", "SDFLTA", "SDFLTAB", "SDFLTAC", "SDFLTAD", "SDFLTAE", "SDFLTB", "SDFLTBB", "SDFLTC", "SDFLTCB", "SDFLTCC", "SDOORA", "SDOORB", "SDOORC", "SDOORD", "SDOORE", "SDOORFA", "SDOORFB", "SDOORGA", "SDOORGB", "SEXIT", "SEXITA", "SFLATA", "SFLATAB", "SFLATAC", "SFLATAD", "SFLATAE", "SFLATAF", "SFLATAI", "SFLATAJ", "SFLATAK", "SFLATAL", "SFLATAM", "SFLATAN", "SFLATAO", "SFLATAP", "SFLATAQ", "SFLATAR", "SFLATAS", "SFLATB", "SFLATBB", "SFLATBC", "SFLATBE", "SFLATBF", "SFLATC", "SFLATCB", "SFLATCC", "SFLATCD", "SFLATCE", "SFLATCF", "SFLATCG", "SFLATCH", "SFLATD", "SFLATDC", "SFLATDD", "SFLATDE", "SFLATDF", "SFLATDG", "SLIMEA", "SLIMEB", "SLUDGEA", "SLUDGEB", "SMONAA", "SMONAB", "SMONAC", "SMONAD", "SMONBA", "SMONBB", "SMONBC", "SMONBD", "SMONCA", "SMONCB", "SMONCC", "SMONCD", "SMONDA", "SMONDB", "SMONDC", "SMONDD", "SMONEA", "SMONEB", "SMONEC", "SMONED", "SMONF", "SPACAMM", "SPACEAA", "SPACEAB", "SPACEAC", "SPACEAE", "SPACEAF", "SPACEAG", "SPACEAH", "SPACEAI", "SPACEAJ", "SPACEAK", "SPACEAL", "SPACEAM", "SPACEAN", "SPACEAO", "SPACEAP", "SPACEAQ", "SPACEAR", "SPACEAS", "SPACEAT", "SPACEAU", "SPACEAV", "SPACEAW", "SPACEAX", "SPACEAY", "SPACEAZ", "SPACEB", "SPACEBA", "SPACEBB", "SPACEBC", "SPACEBD", "SPACEBE", "SPACEBF", "SPACEBG", "SPACEBH", "SPACEBI", "SPACEBJ", "SPACEBK", "SPACEBL", "SPACEBM", "SPACEBN", "SPACEBO", "SPACEBQ", "SPACEBR", "SPACEBS", "SPACEBT", "SPACEC", "SPACECA", "SPACECB", "SPACECC", "SPACECD", "SPACECE", "SPACECF", "SPACECG", "SPACECH", "SPACECI", "SPACECJ", "SPACECL", "SPACECM", "SPACECN", "SPACECO", "SPACECP", "SPACECQ", "SPORTA", "SPORTB", "STRACA", "STRACB", "STRAKB", "STRAKR", "STRAKY", "SWXCA", "SWXCB", "SWXCKA", "SWXCKB", "SWXCKLA", "SWXCKLB", "SWXCLA", "SWXCLB", "SWXHCA", "SWXHCB", "SWXSAA", "SWXSAB", "SWXSCA", "SWXSCB", "SWXSDA", "SWXSDB", "SWXSEA", "SWXSEB", "SWXSFA", "SWXSFB", "SWXSGA", "SWXSGB", "TITLEA", "TITLEB", "WATERA", "WATERB", "WFALL", "BLANK", "BLOODA", "BLOODB", "C1", "C2", "C3", "C4"];
	
	// Original hashes
	const OriginalHash = [111, 19908, 19931, 19929, 19928, 34400, 34402, 34403, 34404, 34406, 34407, 34408, 34409, 33094, 33093, 33092, 33091, 33090, 33089, 33102, 33101, 33188, 33186, 33187, 33184, 38154, 33198, 33199, 33159, 33158, 33153, 33152, 37154, 33155, 33154, 33165, 33164, 33167, 33253, 33254, 33255, 33248, 33249, 33250, 33251, 33260, 33261, 33262, 33501, 33500, 33491, 33490, 33489, 33488, 33495, 33494, 33586, 33584, 33585, 33590, 33591, 33588, 33589, 33567, 33566, 33552, 33557, 33556, 33559, 33558, 33662, 33663, 33648, 33653, 33654, 33655, 11176, 11177, 11178, 43974, 11180, 11184, 11185, 34823, 34820, 34819, 34817, 38109, 38108, 38107, 38104, 37927, 15884, 37926, 37014, 37015, 37008, 37010, 37021, 40108, 45604, 33564, 33565, 49728, 33633, 33702, 33764, 33733, 33598, 33596, 50809, 50808, 50815, 50814, 50813, 50812, 50755, 50754, 49714, 49715, 49713, 49718, 48733, 48732, 48731, 48730, 48729, 48728, 48551, 48550, 48549, 1338, 1307, 1300, 1301, 1302, 1303, 1296, 1297, 1298, 1299, 1200, 1203, 1202, 1205, 1204, 1207, 6622, 6552, 6554, 6629, 6628, 6631, 21958, 22012, 46548, 29820, 31142, 32157, 3182, 29108, 55908, 55909, 55910, 7580, 6861, 10065, 10066, 21582, 6451, 6450, 6449, 6448, 6415, 6414, 6413, 6412, 6411, 6410, 6409, 19574, 19575, 19560, 19561, 19562, 19563, 19564, 19566, 19543, 19542, 19528, 19531, 19530, 19533, 19532, 19535, 19534, 20399, 20396, 20397, 20394, 20393, 20406, 20365, 20362, 20374, 20373, 20461, 20462, 20463, 20456, 20457, 20458, 20459, 20468, 20469, 20470, 20428, 20425, 20424, 20427, 20426, 20437, 20436, 20439, 20269, 20275, 20233, 20243, 20242, 20328, 20329, 20330, 20331, 20332, 20333, 20334, 20335, 20336, 20337, 61051, 61018, 61016, 60999, 60996, 60995, 60994, 60993, 60452, 60453, 60454, 60473, 60474, 60475, 60419, 60418, 45801, 46987, 48864, 46146, 13425, 13456, 13394, 13488, 46112, 54794, 41225, 54795, 55284, 55285, 55286, 55287, 55281, 55282, 55283, 55292, 55293, 55294, 55295, 55288, 55289, 55290, 55291, 55268, 53906, 53904, 53905, 53910, 53911, 53908, 53909, 53939, 50511, 50508, 50509, 50482, 50483, 50480, 50481, 50486, 50487, 50484, 50485, 50490, 50491, 50488, 50489, 370, 373, 372, 375, 32566, 32567, 32564, 32565, 32563, 52952, 32, 33, 34, 35, 52953, 449, 52954, 482, 483, 2712, 2715, 2714, 2717, 2716, 40023, 40022, 39990, 39991, 16695, 30297, 9566, 4103, 4100, 4101, 4098, 4099, 4158, 4159, 4156, 4157, 4154, 4155, 4152, 4153, 4150, 4151, 4148, 9553, 5863, 5862, 5864, 5867, 9552, 5830, 5831, 5832, 5833, 5834, 5835, 5836, 9555, 5796, 5803, 5802, 5801, 5800, 52635, 52634, 26218, 26219, 15204, 15205, 15206, 15207, 13382, 13381, 13380, 13387, 13479, 13476, 13477, 13482, 13444, 13447, 13446, 13449, 13541, 13542, 13543, 13544, 13271, 43678, 6490, 6491, 6488, 6486, 6487, 6484, 6485, 6482, 6483, 6480, 6481, 6510, 6511, 6508, 6509, 6506, 6507, 6504, 6505, 6502, 6503, 6500, 6501, 6498, 6499, 44097, 7984, 7987, 7986, 7989, 7988, 7991, 7990, 7993, 7992, 7995, 7994, 7997, 7996, 7999, 7998, 8128, 8131, 8130, 8133, 44096, 7953, 7954, 7955, 7956, 7957, 7958, 7959, 7960, 7961, 7962, 7964, 7965, 7966, 7967, 7968, 7969, 31015, 31000, 41728, 41729, 42083, 42099, 42058, 49082, 49081, 8097, 8098, 8704, 8705, 7813, 7812, 14956, 14957, 55490, 55491, 55424, 55425, 57238, 57237, 56439, 56436, 56404, 56407, 56373, 56374, 15239, 15238, 45900, 45901, 64100, 58801, 3601, 3602, 19904, 19911, 19910, 19909];
	
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
		
		if (CheckOriginals == true) { // Check for duplicates against original textures if wanted
			for (let j = 0; j < 501; j++) { // 502 is the number of non-duplicate original textures
				if (Hashes[i] == OriginalHash[j]) { // Check for any matches
					Duplicates[i] = Duplicates[i] + OriginalName[j] + '</br>'; // Store duplicate name
				}
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
