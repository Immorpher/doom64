// Texture hash number generator originally from Doom 64 EX and used in Doom 64 Remaster
// Based on a script by Kovic and adapted to javascript by Immorpher

QForm = {};
 
QForm.onEncode = function () {
    // get the texture name and convert to upper case
    var texture = document.getElementById("texname").value.toUpperCase();
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
  
    document.getElementById("hashnum").value = hash;
};


