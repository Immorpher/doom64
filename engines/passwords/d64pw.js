/*
  DOOM 64 Password Editor
  
  Based on code from the Doom 64 EX Project
  
  Copyright 2007-2012 Samuel Villarreal
  Copyright 2013 James Haley
  Additions by Immorpher
  Additions by Immorpher

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
  02111-1307, USA.
*/

//=============================================================================
//
// Data
//

QGlobals = {};

QGlobals.passwordData  = new Array();
QGlobals.passwordChar  = "bcdfghjklmnpqrstvwxyz0123456789?";
QGlobals.passwordTable = [1, 8, 9, 5, 6, 2, 7, 0, 4, 3];

QGlobals.numWeapons = 10;
QGlobals.weaponControlForIndex = [ 
  "chainsaw", "fist", "pistol", "shotgun", "ssg", "chaingun", "missile",
  "plasma", "bfg", "laser"
];

QGlobals.numAmmo = 4;
QGlobals.ammoCtrlForIdx    = [ "clip",    "shell",    "misl",    "cell"    ];
QGlobals.maxAmmoCtrlForIdx = [ "maxclip", "maxshell", "maxmisl", "maxcell" ];

QGlobals.normMaxAmmo = [ 200,  50,  50, 300 ];
QGlobals.backMaxAmmo = [ 400, 100, 100, 600 ];

QGlobals.maxLevel = 128;

QGlobals.levelNames = [
  'Staging Area',
  'The Terraformer',
  'Main Engineering',
  'Holding Area',
  'Tech Center',
  'Alpha Quadrant',
  'Research Lab',
  'Final Outpost',
  'Even Simpler',
  'The Bleeding',
  'Terror Core',
  'Altar Of Pain',
  'Dark Citadel',
  'Eye Of The Storm',
  'Dark Entries',
  'Blood Keep',
  'Watch Your Step',
  'Spawned Fear',
  'The Spiral',
  'Breakdown',
  'Pitfalls',
  'Burnt Offerings',
  'Unholy Temple',
  'No Escape',
  'Cat And Mouse (Fun Level)',
  'Hardcore (Fun Level)',
  'Playground (Fun Level)',
  'The Absolution',
  'Outpost Omega (Secret Level)',
  'The Lair (Secret Level)',
  'In The Void (Secret Level)',
  'Hectic (Secret Level)',
  'Title (Not playable)',
  'Plant Ops (The Lost Levels)',
  'Evil Sacrifice (The Lost Levels)',
  'Cold Grounds (The Lost Levels)',
  'Wretched Vats (The Lost Levels)',
  'Thy Glory (The Lost Levels)',
  'Final Judgement (The Lost Levels)',
  'Panic (The Lost Levels - Fun Level)'
];

//=============================================================================
//
// Utils
//

QUtils = {};

QUtils.intDivide = function (dividend, divisor) {
  return ~~(dividend / divisor);
};

QUtils.intMod = function (dividend, divisor) {
  return ~~(dividend % divisor);
};

QUtils.getFormValue = function (controlName) {
  return document.getElementById(controlName).value;
};

QUtils.setFormValue = function (controlName, val) {
  document.getElementById(controlName).value = val;
};

QUtils.getChecked = function (controlName) {
  return document.getElementById(controlName).checked;
};

QUtils.setChecked = function (controlName, check) {
  document.getElementById(controlName).checked = check;
};

QUtils.makeBE16 = function (byte1, byte2) {
  return ((byte1 << 8) | byte2);
};

QUtils.unmakeBE16 = function (innum) {
  return [(innum & 0x00ff), ((innum & 0xff00) >> 8)];
};

QUtils.byteSwap = function (innum) {
  var low  = (innum & 0x00ff) << 8;
  var high = (innum & 0xff00) >> 8;
  
  return (low | high);
};

QUtils.clearError = function () {
  document.getElementById("errormsg").textContent = "";
};

QUtils.showError = function () {
  var str = Array.prototype.slice.call(arguments).join("");
  document.getElementById("errormsg").textContent = str;
};

//=============================================================================
//
// Encoder
//

QEncoder = {};

QEncoder.encodePassword = function () {
  var encodePassItem = function (value, maxvalue) {
    var bit;
    value = value << 3;
    bit   = QUtils.intDivide(value, maxvalue);
    
    if(QUtils.intMod(value, maxvalue) !== 0)
      bit += 1;
      
    return bit;
  };
  
  var checkPassCode = function (bit1, bit2, encode) {
    var bit3;
    var checkByte = 0;
    
    if(bit1 < 0)
      bit2 = (bit1 + 7) >> 3;
    else
      bit2 = bit1 >> 3;
      
    bit3 = bit1 & 7;
    
    if(bit1 < 0) {
      if(bit3 !== 0)
        bit3 -= 7;
    }
    
    checkByte = encode[bit2];
    
    return [((checkByte & (0x80 >> bit3)) !== 0), bit1, bit2, bit3];
  };
  
  var encode = new Array();
  var i;
  var bit = 0;
  var decodebit = new Array();
  var passBit = 0;
  var xbit1 = 8;
  var xbit2 = 0;
  var xbit3 = 0;
  
  for(i = 0; i < 10; i++)
    encode[i] = 0;
  for(i = 0; i < 16; i++)
    QGlobals.passwordData[i] = 0;
  
  // map and skill  
  
  var nextmap   = QUtils.getFormValue("nextmap");
  var gameskill = QUtils.getFormValue("gameskill");
  
  encode[0] = (((nextmap & 0x3f) << 2) & 0xff) | (gameskill & 3);

  // weapons
  
  for(i = 0; i < QGlobals.numWeapons; i++) {
    if(i !== 1 && i !== 2) { // not fist or pistol
      var weaponowned = QUtils.getChecked(QGlobals.weaponControlForIndex[i]);
      if(weaponowned) {
        encode[1] |= 1 << bit;
        encode[1] = encode[1] & 0xff;
      }
      ++bit;
    }
  }
  
  // backpack
  
  if(QUtils.getChecked("backpack"))
    encode[5] |= 0x80;
    
  bit = 0;
  
  // clip
  
  bit = encodePassItem(QUtils.getFormValue("clip"), QUtils.getFormValue("maxclip"));
  encode[2] = (bit << 4) & 0xff;
  
  // shell
  
  bit = encodePassItem(QUtils.getFormValue("shell"), QUtils.getFormValue("maxshell"));
  encode[2] |= bit & 0xff;
  
  // cell
  
  bit = encodePassItem(QUtils.getFormValue("cell"), QUtils.getFormValue("maxcell"));
  encode[3] = (bit << 4) & 0xff;
  
  // rocket
  
  bit = encodePassItem(QUtils.getFormValue("misl"), QUtils.getFormValue("maxmisl"));
  encode[3] |= bit & 0xff;
  
  // health
  
  bit = encodePassItem(QUtils.getFormValue("health"), 200);
  encode[4] = bit << 4;
  
  // armor
  
  bit = encodePassItem(QUtils.getFormValue("armorpoints"), 200);
  encode[4] |= bit;
  
  // armortype
  
  encode[5] |= QUtils.getFormValue("armortype");
  
  // artifacts
  
  var artifacts = 0;
  if(QUtils.getChecked("fast"))
    artifacts |= 1;
  if(QUtils.getChecked("double"))
    artifacts |= 4;
  if(QUtils.getChecked("triple"))
    artifacts |= 2;
    
  encode[5] |= artifacts << 2;
  
  // encoding
  
  decodebit[0] = QUtils.makeBE16(encode[0], encode[1]);
  decodebit[1] = QUtils.makeBE16(encode[2], encode[3]);
  decodebit[2] = QUtils.makeBE16(encode[4], encode[5]);
  
  var dec1 = QUtils.byteSwap(~(decodebit[0] + decodebit[1] + decodebit[2]));
  var dec2 = QUtils.byteSwap(~(decodebit[0] ^ decodebit[1] ^ decodebit[2]));
  
  var dec1Exp = QUtils.unmakeBE16(dec1);
  var dec2Exp = QUtils.unmakeBE16(dec2);
  
  encode[6] = dec1Exp[0];
  encode[7] = dec1Exp[1];
  encode[8] = dec2Exp[0];
  encode[9] = dec2Exp[1];
  
  for(i = 0; i < 10; i++) {
    bit = encode[QGlobals.passwordTable[i]];
    encode[i] = encode[i] ^ bit;
  }
  
  bit = 0;
  
  while(bit < 0x50) {
    passBit = 0;
    
    var rets1 = checkPassCode(bit, xbit2, encode);
    bit   = rets1[1];
    xbit2 = rets1[2];
    xbit3 = rets1[3];
    if(rets1[0])
      passBit = 16;
    
    xbit1 = 8;
    ++bit;
    
    for(i = 0; i < 4; i++) {
      var rets2 = checkPassCode(bit, xbit2, encode);
      bit   = rets2[1];
      xbit2 = rets2[2];
      xbit3 = rets2[3];
      if(rets2[0])
        passBit |= xbit1;
      
      xbit1 >>= 1;
      ++bit;
    }
    
    QGlobals.passwordData[QUtils.intDivide(bit - 1, 5)] = passBit;
  }
};

QEncoder.displayPassword = function () {
  var outputStr = "";
  var i;
  var pdidx = 0;
  
  for(i = 0; i < 19; i++) {
    if(i == 4 || i == 9 || i == 14) {
      outputStr += ' ';
    } else {
      if(QGlobals.passwordData[pdidx] == 0xff)
        outputStr += '.';
      else
        outputStr += QGlobals.passwordChar.charAt(QGlobals.passwordData[pdidx]);
        
      ++pdidx;
    }    
  }
  
  QUtils.setFormValue("password", outputStr.toUpperCase());
};

//=============================================================================
//
// Decoder
//

QDecoder = {};

QDecoder.unFormatPassword = function () {
  var pw = QUtils.getFormValue("password");
  
  pw = pw.toLowerCase();     // convert to lowercase
  pw = pw.trim();            // trim superfluous whitespace
  
  // remove any intervening whitespace by splitting and reconcatenating
  var parts = pw.split(' ');
  pw = "";
  parts.forEach(function (element) { pw += element; });
  
  return pw;
};

QDecoder.validatePasswordBasic = function (pw) {
  var i;
  
  // must be 16 characters long
  if(pw.length !== 16) {
    QUtils.showError("Password must contain 16 significant characters!");
    return false;
  }
  
  // validate individual characters
  for(i = 0; i < pw.length; i++) {
    if(QGlobals.passwordChar.indexOf(pw.charAt(i)) === -1) {
      QUtils.showError("Password contains an invalid character! Valid chars are: " + QGlobals.passwordChar);
      return false;
    }
  }
  
  // check against special password
  if(pw.valueOf() === "rvnh3ct1cd3m0???") {
    QUtils.showError("Congratulations, you unlocked the Hectic demo! But, this password doesn't hash.");
    return false;
  }
  if(pw.valueOf() === "???03?15?1983???" || pw.valueOf() === "k41s3r?w4s?h3r3?") {
    QUtils.showError("Congratulations, you unlocked the Lost Levels, features menu, and Hectic demo in the remaster! But, this password doesn't hash.");
    return false;
  }

  // transform string back into passwordData array
  for(i = 0; i < 16; i++)
    QGlobals.passwordData[i] = QGlobals.passwordChar.indexOf(pw.charAt(i));
  
  // basic validation is successful
  return true;
};

QDecoder.decodePassword = function () {
  var decodePassItem = function (bytecode, maxvalue) {
    var value;
    var bitsum = bytecode * maxvalue;
    
    if(bitsum >= 0)
      value = bitsum >> 3;
    else
      value = (bitsum + 7) >> 3;
      
    return value;
  };  
  
  var data   = new Array();
  var decode = new Array();
  var bit    = 0;
  var xbit1  = 0;
  var xbit2  = 0;
  var xbit3  = 0;
  var i, j, passBit, decodeBit, checkByte;
  var x;
  var y;
  
  // make local copy of passwordData
  for(i = 0; i < 16; i++)
    data[i] = QGlobals.passwordData[i];
  
  // init decode array
  for(i = 0; i < 10; i++)
    decode[i] = 0;
 
  // decode password
  while(bit < 0x50) {
    passBit   = 0;
    decodeBit = 0x80;
    checkByte = 0;
    
    i = 0;
    
    while(i !== 8) {
      i += 4;
      
      for(j = 0; j < 4; j++) {
        checkByte = data[QUtils.intDivide(bit, 5)];
        if(checkByte & (16 >> QUtils.intMod(bit, 5)))
          passBit |= decodeBit;
        ++bit;
        decodeBit >>= 1;
      }
    }
    
    if((bit - 1) >= 0)
      checkByte = (bit - 1) >> 3;
    else
      checkByte = ((bit - 1) + 7) >> 3;
      
    decode[checkByte] = passBit;
  }
  
  for(i = 9; i >= 0; i--) {
    bit = decode[QGlobals.passwordTable[i]];
    decode[i] = decode[i] ^ bit;
  } 
  
  // verify decoded password
  xbit1 = QUtils.makeBE16(decode[0], decode[1]);
  xbit2 = QUtils.makeBE16(decode[2], decode[3]);
  xbit3 = QUtils.makeBE16(decode[4], decode[5]);
  
  x = ~((xbit1 + xbit2) + xbit3) & 0xffff;
  y = QUtils.makeBE16(decode[6], decode[7]);
  
  if(x !== y) {
    QUtils.showError("Password does not hash!");
    return false;
  }
  
  x = ~(xbit1 ^ (xbit2 ^ xbit3)) & 0xffff;
  y = QUtils.makeBE16(decode[8], decode[9]);
  
  if(x !== y) {
    QUtils.showError("Password does not hash!");
    return false;
  }
   
  // verify map
  var map = (decode[0] >> 2);
  if(map > QGlobals.maxLevel || map === 33) {
    QUtils.showError("Invalid destination level!");
    return false;
  }
  
  // verify skill
  if((decode[0] & 3) > 4) {
    QUtils.showError("Invalid skill level!");
    return false;
  }
  
  // verify ammo
  if((decode[2] & 0x0f) >= 9 || (decode[2] >> 4) >= 9 ||
     (decode[3] & 0x0f) >= 9 || (decode[3] >> 4) >= 9) {
    QUtils.showError("Invalid ammo amounts!");
    return false;
  }
  
  // verify health/armor
  if((decode[4] & 0x0f) >= 9 || (decode[4] >> 4) >= 9) {
    QUtils.showError("Invalid health or armor amount!");
    return false;
  }
  
  // verify armor type
  if((decode[5] & 3) >= 3) {
    QUtils.showError("Invalid armor type!");
    return false;
  }
  
  bit = 0;
  
  // get map
  QUtils.setFormValue("nextmap", decode[0] >> 2);
  
  // get skill
  QUtils.setFormValue("gameskill", decode[0] & 3);
  
  // get weapons
  for(i = 0; i < QGlobals.numWeapons; i++) {
    if(i !== 1 && i !== 2) { // not fist or pistol
      if(decode[1] & (1 << bit))
        QUtils.setChecked(QGlobals.weaponControlForIndex[i], true);
      else
        QUtils.setChecked(QGlobals.weaponControlForIndex[i], false);
        
      ++bit;
    }
  }

  var ammoToUse;
  
  // get backpack
  if(decode[5] & 0x80) {
    QUtils.setChecked("backpack", true);
    ammoToUse = QGlobals.backMaxAmmo;
  } else {
    QUtils.setChecked("backpack", false);
    ammoToUse = QGlobals.normMaxAmmo;
  }
  QForm.onClickBackpack(); // make maxammo amounts consistent  
  
  // get ammo amounts
  QUtils.setFormValue("clip",  decodePassItem(decode[2] >> 4,   ammoToUse[0]));
  QUtils.setFormValue("shell", decodePassItem(decode[2] & 0x0f, ammoToUse[1]));
  QUtils.setFormValue("misl",  decodePassItem(decode[3] & 0x0f, ammoToUse[2]));
  QUtils.setFormValue("cell",  decodePassItem(decode[3] >> 4,   ammoToUse[3]));
  
  // get health and armor
  QUtils.setFormValue("health",      decodePassItem(decode[4] >> 4,   200));
  QUtils.setFormValue("armorpoints", decodePassItem(decode[4] & 0x0f, 200));
  
  // get armor type
  QUtils.setFormValue("armortype", decode[5] & 3);
  
  // get artifacts
  QUtils.setChecked("fast",   false);
  QUtils.setChecked("double", false);
  QUtils.setChecked("triple", false);
  
  var artifacts = (decode[5] >> 2) & 7;
  if(artifacts & 1)
    QUtils.setChecked("fast", true);
  if(artifacts & 2)
    QUtils.setChecked("triple", true);
  if(artifacts & 4)
    QUtils.setChecked("double", true);
    
  return true;  
};

//=============================================================================
//
// Form Maintenance
//

QForm = {};

QForm.setLevelName = function () {
  var mapnum = parseInt(QUtils.getFormValue("nextmap"));
  
  if(!isNaN(mapnum) && mapnum >= 1 && mapnum <= QGlobals.levelNames.length) {
    document.getElementById("levelname").textContent = 'Level Name: ' + QGlobals.levelNames[mapnum - 1];
  } else {
    document.getElementById("levelname").textContent = 'Level Name: (expanded level)';
  }
};

QForm.onResetForm = function () {
  var i;
  
  for(i = 0; i < 16; i++)
    QGlobals.passwordData[i] = 0;
    
  QUtils.clearError();
  
  // update level name
  QUtils.setFormValue("nextmap", 1);
  this.setLevelName();
};

QForm.validateControls = function () {
  var i;
  
  // map
  var nextmap = parseInt(QUtils.getFormValue("nextmap"));
  if(isNaN(nextmap) || nextmap < 1 || nextmap > QGlobals.maxLevel) {
    QUtils.showError("Destination level must be between 1 and " + QGlobals.maxLevel + "!");
    return false;
  }
  
  if(nextmap === 33) {
    QUtils.showError("Title map is not allowed as a destination level!");
    return false;
  }

  // max ammo amounts
  for(i = 0; i < QGlobals.numAmmo; i++) {
    var ammoAmt = parseInt(QUtils.getFormValue(QGlobals.ammoCtrlForIdx[i]));
    var maxAmmo = parseInt(QUtils.getFormValue(QGlobals.maxAmmoCtrlForIdx[i]));
    
    if(isNaN(ammoAmt) || ammoAmt < 0 || ammoAmt > maxAmmo) {
      QUtils.showError("Ammo amounts must be between 0 and the max ammo amount!");
      return false;
    }
  }
  
  // health
  var health = parseInt(QUtils.getFormValue("health"));
  if(isNaN(health) || health < 0 || health > 200) {
    QUtils.showError("Health must be between 0 and 200!");
    return false;
  }

  // armor
  var armortype = parseInt(QUtils.getFormValue("armortype"));
  var armor     = parseInt(QUtils.getFormValue("armorpoints"));
  if(armortype === 0 && armor > 0) {
    QUtils.showError("Armor must be zero unless armor type is Green or Blue!");
    return false;
  }
  if(isNaN(armor) || armor < 0 || armor > 200) {
    QUtils.showError("Armor must be between 0 and 200!");
    return false;
  }
  
  // everything is good!
  return true;
};
 
QForm.onEncode = function () {
  QUtils.clearError();
  
  if(!this.validateControls())
    return;
  
  // calculate password from selected options
  QEncoder.encodePassword();
  
  // display the password
  QEncoder.displayPassword();
};

QForm.onDecode = function () {
  // retrieve and unformat password from the form
  var pw = QDecoder.unFormatPassword();

  QUtils.clearError();
  
  // run basic validation checks
  if(!QDecoder.validatePasswordBasic(pw))
    return;
  
  // decode the password
  QDecoder.decodePassword();
  
  // update level name
  this.setLevelName();
};

QForm.onClickBackpack = function () {
  var i;
  var ammoToUse;
  var haveBackpack = QUtils.getChecked("backpack");
  
  if(haveBackpack)
    ammoToUse = QGlobals.backMaxAmmo;
  else
    ammoToUse = QGlobals.normMaxAmmo;
    
  for(i = 0; i < QGlobals.numAmmo; i++) {
    QUtils.setFormValue(QGlobals.maxAmmoCtrlForIdx[i], ammoToUse[i]);
    
    // clip corresponding ammo amount if above new threshold
    var ammo = parseInt(QUtils.getFormValue(QGlobals.ammoCtrlForIdx[i]));
    if(ammo > ammoToUse[i])
      QUtils.setFormValue(QGlobals.ammoCtrlForIdx[i], ammoToUse[i]);
  }
};

QForm.onGiveAll = function () {
  var i;
  
  QUtils.clearError();
  
  // leave map and skill settings alone.
  
  // give backpack and set max ammos
  QUtils.setChecked("backpack", true);
  this.onClickBackpack();
  
  // give all weapons
  for(i = 0; i < QGlobals.numWeapons; i++) {
    if(i !== 1 && i !== 2) // not fist or pistol
      QUtils.setChecked(QGlobals.weaponControlForIndex[i], true);
  }
    
  // give maximum ammo for each amount
  for(i = 0; i < QGlobals.numAmmo; i++) {
    QUtils.setFormValue(
      QGlobals.ammoCtrlForIdx[i], 
      QUtils.getFormValue(QGlobals.maxAmmoCtrlForIdx[i])
    );
  }
  
  // give max health
  QUtils.setFormValue("health", "200");
  
  // give max blue armor
  QUtils.setFormValue("armortype",     "2");
  QUtils.setFormValue("armorpoints", "200");
  
  // give all demon keys
  QUtils.setChecked("fast",   true);
  QUtils.setChecked("double", true);
  QUtils.setChecked("triple", true);
  
  // calculate password
  this.onEncode();
};

QForm.onChangeMap = function () {
  this.setLevelName();
};

// EOF

