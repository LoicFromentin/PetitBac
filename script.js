

var alphabet = new Array ("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
var themes = new Array ("Prénom","Sport","Insulte","Personnage Connu","Marque","Boisson","Objet","Qualité &amp; Défaut","Dessert","Instrument","Plat","Ville &amp; Pays","Animal","Véhicule","Série télé","Plante &amp; Arbre","Personnage Fictif","Fruit &amp; Légume");
var nbThemes = 0;
var fin = false;

// Affiche la liste des themes dans HTML
function setListThemes () {
	var str = "";	// Contient le code html a ajouter
	var indice = 0;	// Indice dans tab des themes
	for (var ligne=0 ; ligne<5 ; ligne++) {
		str += "<tr>";
		for (var col=0; col<4; col++) {
			str += "<td>- "+themes[indice]+"</td>";
			indice ++;
			if (indice==themes.length) break;
		}
		str += "</tr>";
	}
	document.getElementById('listThemes').innerHTML = str;
}

// MaJ nbThemes avec le choix user via comboBox
function majNbThemes () {
	// Recupere l'index de l'element de la combobox choisi par l'utilisateur
	var index = document.getElementById('thelist').selectedIndex;
	// MaJ le nombre de themes a tirer au sort par la valeur choisie par le user
	nbThemes = document.getElementById('thelist').options[index].innerHTML;
}

// Renvoie une liste aleatoire de themes de longueur=nbThemes
function getThemes () {
	var themesChoisis = new Array ();	// Contient la liste des themes tires aleatoirement
	var copie = new Array ();			// Copie de la liste des themes pour l'algo
	for (var i = 0; i < themes.length; i++) {	// Copie listThemes
		copie.push(themes[i]);
	}
	for (var i = 0; i < nbThemes; i++) {		// Boucle le nb de themes a tirer
		var indice = getRandomInt(copie.length);// Tire un indice aleatoire
		themesChoisis.push(copie[indice]);		// Ajoute a la liste des themes tires
		console.log(copie[indice]);
		copie.splice(indice,1);					// Supprime le theme tire de la liste copiee
	}
	return themesChoisis;
}


// Appelle getThemes() et MaJ HTML pour afficher les themes tires au sort
function majHTMLThemesTires () {
	if (nbThemes>0) {
		var themesChoisis = getThemes ();			// Recupere la liste des themes tires au sort
		var elem = document.getElementById('themesTiresAuSort');	// Element HTML a remplir
		var str = ""; 	// Contient le code html a ajouter
		var nbCol = 3;	// Nombre de colonnes
		var nbLi = 3;	// Nombre de lignes (peut =4)

		// Cas : tableau de 3 lignes et 2ou3 colonnes
		if (nbThemes==5 || nbThemes==6 || nbThemes==9) {
			for (var l = 0; l < nbLi; l++) {		// Boucle les lignes
				str += "<tr>";
				for (var c = 0; c < nbCol; c++) {	// Boucle les colonnes (=case)
					if (themesChoisis.length>0) {	// S'il reste des themes a afficher
						if (nbThemes!=9 && c==1) {
							str += "<td></td>";
						}
						// S'il y a 2 colonnes a afficher et qu'on est en train de remplir la colonne centrale, met des cases vides
						else {
							str += "<td>- "+themesChoisis[themesChoisis.length-1]+"</td>";
							themesChoisis.pop();
						}
					}
				}
				str += "</tr>";
			}
		}
		// Cas : tableau de 4 lignes et 2ou3 colonnes
		else {
			if (nbThemes>9) nbLi = 4;
			for (var l = 0; l < nbLi; l++) {		// Boucle les lignes
				str += "<tr>";
				for (var c = 0; c < nbCol; c++) {	// Boucle les colonnes (=case)
					if (themesChoisis.length>0) {	// S'il reste des themes a afficher
						if ((nbThemes==8 || nbThemes==7) && c==1) {
							str += "<td></td>";
						}
						// S'il y a 2 colonnes a afficher et qu'on est en train de remplir la colonne centrale, met des cases vides
						else {
							str += "<td>- "+themesChoisis[themesChoisis.length-1]+"</td>";
							themesChoisis.pop();
						}
					}
				}
				str += "</tr>";
			}
		}
		// Rempli la div qui affiche les themes tires au sort
		document.getElementById('divThemesTires').innerHTML = '<h3>Thèmes tirés au sort :</h3><table class="listThemes" id="themesTiresAuSort">'+str+"</table>";
	}
}

// Renvoie la lettre de l'alphabet qui correspond au nombre aleatoire tire au sort
function getLettre () {
	if (alphabet.length>0) {					// S'il reste des lettres a tirer au sort
		var nb = getRandomInt(alphabet.length);	// Tire un indice aleatoire
		var lettre = alphabet[nb];				// Recupere la lettre correspondante a l'indice
		alphabet.splice(nb,1);					// Supprime la lettre de l'alphabet
		document.getElementById('lettre').innerHTML = lettre;// MaJ contenu HTML avec la nouvelle lettre
	}
	else {
		document.getElementById('lettre').innerHTML = "Partie terminée, il ne reste plus de lettres dans l'alphabet !";
	}
}

// Affiche les lettres restantes (pas encore jouees)
function getAlphabet () {
	if (alphabet.length>0) {
		var str = "";
		for (var i=0 ; i<alphabet.length-1 ; i++) {
			str += alphabet[i]+", ";
		}
		str += alphabet[alphabet.length-1];
		document.getElementById('alphabet').innerHTML = str;
	}
	else {
		if (fin) finPartie ();
		document.getElementById('alphabet').innerHTML = "Partie terminée, il ne reste plus de lettres dans l'alphabet !";
		fin = true;
	}
}

// Modifie l'affichage de la page Lettre pour permettre de rejouer
function finPartie () {
	var contenu = document.getElementById('contenu');
	while (contenu.firstChild) {
		contenu.removeChild(contenu.firstChild);
	}
	document.getElementById('divBtn').style = "";
}


// Renvoie un nombre aleatoire entre 0 et max-1
function getRandomInt(max) {return Math.floor(Math.random() * Math.floor(max));}

