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
	// "Sista pralinen i första lagret av Aladdinasken ligger orörd i mer än fem minuter.",
	"De vuxna bryr sig mer om vad som händer på TV än vad barnen gör.",
	"Det blir pinsamt tyst efter någons hostattack.",
	"\"Arra-papapa-papa-papa-papa-papa-ria\"",
	"\"Det är Robin Hood jag vill ha!\"",
	"Någon kopplar en händelse i programmet till en personlig anekdot de berättar varje år.",
	// "En släkting i tonåren himlar med ögonen åt de vuxnas trams.",
	"\"Öh, ha den äran.\"",
	"\"Höhö, det är ju JAG som kör!\"",
	"\"Jag har sett den här X gånger och det slutar aldrig vara roligt!\"",
	"Någon vill ta en bild på familjen och lägga ut på sociala medier.",
	"Någon påpekar att det hänger korkar i korkträdet.",
	"Någon klagar på att där är fel mängd snö ute.",
	"Någon fiser.",
	"Någon nyser.",
	"\"Från oss alla, till er alla...\"",
	"Någon yttrar en onödig politisk kommentar.",
	"Någon imiterar mössen med ljus röst.",
	"Någon hyschar folk att vara tysta.",
	"Någon går för att slå in julklappar i sista minuten.",
	"Någon börjar äta från andra lagret i Aladdinasken.",
	// "Någon säger att man borde gå ut och röra på sig.",
	"Någon går på toa.",
	"Någon säger att de inte orkar se ett av klippen igen.",
	"Någon säger att Karl Bertil Jonsson är bättre.",
	"Någon (som inte spelar) nämner Kalle Anka Bingo.",
	"Fler personer ser på sina mobiler än på TV:n.",
	"Någon går för att diska/röja upp julbordet.",
	"Yngre släkting har fått i sig för mycket socker.",
	"Nån rödklädd skäggig jävel dyker upp.",
	// "Någon yngre släkting tjatar om julklappar.",
	"Någon undrar varför man kollar på Kalle Anka varje julafton.",
	"\"Den här julen kommer vi minnas länge.\"",
	"Någon skiter i att hålla avstund och använda munskydd.",
	"Familjens hypokondriker sitter skrämd, ensam i ett hörn.",
	"Någon säger något hjärnbefriat om vaccinet.",
	"\"Hö hö hö, [valfri figur] håller ju inte avstånd!\""
);


var usedWords = new Array(buzzwords.length);
window.onload = initAll;

function initAll() {
	if (document.getElementById) {
		document.getElementById("reload").onclick = anotherCard;
		newCard();
	}
	else {
		alert("Sorry, your browser doesn't support this script");
	}
}

function newCard() {
	for (var i=0; i<24; i++) {
		setSquare(i);
	}
}

function setSquare(thisSquare) {
	do {
		var randomWord = Math.floor(Math.random() * buzzwords.length);
	}
	while (usedWords[randomWord]);

	usedWords[randomWord] = true;
	var currSquare = "square" + thisSquare;
	document.getElementById(currSquare).innerHTML = buzzwords[randomWord];
	document.getElementById(currSquare).className = "";
	document.getElementById(currSquare).onmousedown = toggleColor;
}

function anotherCard() {
	for (var i=0; i<buzzwords.length; i++) {
		usedWords[i] = false;
	}

	newCard();
	return false;
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
	// checkWin();
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





$('td').on('click', function(){

    $('td').css('background-color', '');
    $(this).css('background-color', 'red');

})
