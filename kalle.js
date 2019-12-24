// var buzzwords = new Array ("\"Hoho, sån målarfärg skulle man ju ha!\"",	
// 	"Någon vuxen klagar på att de yngre sitter på sina mobiltelefoner.",
// 	"\"Nåja, vad är väl en bal på slottet?\"",
// 	"Någon fejkskrattar.",
// 	"Någon " + "sjunger".strike() + " försöker sjunga.",
// 	"Någon somnar.",
// 	"\"Här kommer din favoritdel, [namn]!\"",
// 	"Någon imiterar kockarna från Lady och Lufsen.",
// 	"Någon klagar över hur det var bättre förr när de ser klippet från nya Disneyfilmen.",
// 	"Någon klagar över årets julvärd/\"Ingen jul utan Weise.\"",
// 	"Sista pralinen i första lagret av Aladdinasken ligger orörd i mer än fem minuter.",


// 	)

var buzzwords = new Array ("\"Hoho, sån målarfärg skulle man ju ha!\"",	
	"Någon vuxen klagar på att de yngre sitter på sina mobiltelefoner.",
	"\"Nåja, vad är väl en bal på slottet?\"",
	"Någon fejkskrattar.",
	"Någon " + "sjunger".strike() + " försöker sjunga.",
	"Någon somnar.",
	"Någon klagar över censur.",
	"\"Här kommer din favoritdel, [namn]!\"",
	"Någon imiterar kockarna från Lady och Lufsen.",
	"Någon klagar över hur det var bättre förr när de ser klippet från nya Disneyfilmen.",
	"Någon klagar över årets julvärd/\"Ingen jul utan Weise.\"",
	"Sista pralinen i första lagret av Aladdinasken ligger orörd i mer än fem minuter.",
	"De vuxna bryr sig mer om vad som händer på TV än vad barnen gör.",
	"Det blir pinsamt tyst efter någons hostattack.",
	"\"Arra-papapa-papa-papa-papa-papa-ria\"",
	"\"Det är Robin Hood jag vill ha!\"",
	"Någon kopplar en händelse i programmet till en personlig anekdot de berättar varje år.",
	"En släkting i tonåren himlar med ögonen åt de vuxnas trams.",
	"\"Öh, ha den äran.\"",
	"\"Höhö, det är ju JAG som kör!\"",
	"\"Jag har sett den här X gånger och det slutar aldrig vara roligt!\"",
	"Någon vill ta en bild på släkten och lägga ut på sociala medier.",
	"Någon påpekar att det hänger korkar i korkträdet.",
	"Någon klagar på att där är fel mängd snö ute.",
	"Någon fiser.",
	"Någon nyser.",
	"\"Från oss alla, till er alla...\"",
	"Någon yttrar en onödig politisk kommentar.",
	"Någon imiterar mössen med ljus röst.",
	"Någon hyschar folk att vara tysta.",
	"Någon går för att slå in julklappar i sista minuten.",
	"Någon börjar äta från andra lagret i Aladdinasken."
);

var usedWords = new Array(buzzwords.length);
window.onload = initAll;

function initAll() {
	if (document.getElementById) {
		if(checkQuery()){
			return;
		}
		newCard();
	}
	else {
		alert("Sorry, your browser doesn't support this script");
	}
}

function newCard() {
	let id = "";
	for (var i=0; i<24; i++) {
		var index = getRandomIndex();
		id += convertToBase64(index << 1); //is disabled
	}
	//This will reload and parseQuery will eventually generate the board
	window.location = "?id=" + id;
}

function getRandomIndex() {
	do {
		var randomWord = Math.floor(Math.random() * buzzwords.length);
	}
	while (usedWords[randomWord]);

	usedWords[randomWord] = true;
	return randomWord;
}

function anotherCard() {
	window.location = "?id=";
}

function toggleColor(evt) {
	if (evt) {
		var thisSquare = evt.target;
	}
	else {
		var thisSquare = window.event.srcElement;
	}
	if (thisSquare.className == "") {
		thisSquare.className = "pickedBG";
	}
	else {
		thisSquare.className = "";
	}
	toggleBit(thisSquare);
	// checkWin();
}

function toggleBit(elem){
	var index = elem.id;
	index = parseInt(index.substring(6)); //Length of "square"

	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');

	let charAt = id[index];
	let value = convertFromBase64(charAt);
	value = value ^ 1; //XOR with last bit == enabled bit

	let newCharAt = convertToBase64(value);
	let newId = id.substring(0, index) + newCharAt + id.substring(index + 1);

	window.location = "?id=" + newId;
}

/* 
	Each char in the query represents a "base-64" value
	The last bit of the value is the toggle bit. If 1, the 
		square is enabled. 0 means it's not
	The other (>> 1) is the random buzzword index that the 
		square has as text. So if character 5 has index 9, it means
		that the 5th square has the 9th buzzword

*/
function parseQuery(id){
	for(var index = 0; index < id.length; index++){
		let c = id[index];
		let value = convertFromBase64(c);
		let isEnabled = value & 1;
		let buzzWordIndex = value >> 1;
		var currSquare = "square" + index;

		//Basically old setSquare
		document.getElementById(currSquare).innerHTML = buzzwords[buzzWordIndex];
		document.getElementById(currSquare).className = "";
		if(isEnabled)
			document.getElementById(currSquare).className = "pickedBG";
		document.getElementById(currSquare).onmousedown = toggleColor;
	}
}

function checkQuery(){
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	//Must be there and of size 25 
	if(id == null || id.length != 24){
		return false; //Generate
	}
	parseQuery(id);

	return true;
}

let base64String = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?-"
function convertFromBase64(char){
	return base64String.indexOf(char);
}

function convertToBase64(number){
	return base64String[number];
}

// function checkWin() {
// 	var winningOption = -1;
// 	var setSquares = 0;
// 	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

// 	for (var i=0; i<24; i++) {
// 		var currSquare = "square" + i;
// 		if (document.getElementById(currSquare).className != "") {
// 			document.getElementById(currSquare).className = "pickedBG";
// 			setSquares = setSquares | Math.pow(2,i);
// 		}
// 	}

// 	for (var i=0; i<winners.length; i++) {
// 		if ((winners[i] & setSquares) == winners[i]) {
// 			winningOption = i;
// 		}
// 	}
	
// 	if (winningOption > -1) {
// 		for (var i=0; i<24; i++) {
// 			if (winners[winningOption] & Math.pow(2,i)) {
// 				currSquare = "square" + i;
// 				document.getElementById(currSquare).className = "winningBG";
// 			}
// 		}
// 	}
// }




// var table = document.querySelector('#table')
// var selectedCells = table.getElementsByClassName('selected')

// table.addEventListener('click', function(e) {
//   var td = e.target
  
//   if (td.tagName !== 'TD') {
//     return
//   }
  
//   if (selectedCells.length) {
//     selectedCells[0].className = ''    
//   }

//   td.className = 'selected'
// })




$('td').on('click', function(){

    $('td').css('background-color', '');
    $(this).css('background-color', 'red');

})