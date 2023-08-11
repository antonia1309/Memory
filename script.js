
// déclarer un tableau de toutes les cartes

let cptClickCurrent = 0; /*nbre de click */
let CardClickedId; 
const cards = ["king", "queen", "valet", "as", "kingpiq", "kingtrefle"];//pr la fonction aleatoire
const gameBoard = document.getElementById("GameBoard");
let nbPairesOnGame;
let cptCartesTrouvees = 0;
const nbCoupsCurrentNode = document.getElementById("NbCoupsCurrent");
const BestScoreNode = document.getElementById("BestScore");
const avgScoreNode = document.getElementById("avgScore");
const BestScoreCookie = "BestScore";
const AllScoresCookie = "AllScores";

let nbCoups = 0;/*vaut 0 */

BestScoreNode.innerText = getCookie(BestScoreCookie);
avgScoreNode.innerText = getAverageNbCoups();

//qd on click sur play, recupère le nbre de cartes et tu fait un initGame
document.getElementById("playButton").addEventListener("click", function(){
    let nbCardInput = document.getElementById("nbCardInput");
    initGame(nbCardInput.value);
});

//fonction pr les boutons + et - afin de choisir le nb de cartes à jouer
document.getElementById("moreCards").addEventListener("click", function(){
  let nbCardInput =document.getElementById("nbCardInput");
  if(nbCardInput.value < 6){
    nbCardInput.value ++;
  }
});
document.getElementById("lessCards").addEventListener("click", function(){
  let nbCardInput =document.getElementById("nbCardInput");
  if(nbCardInput.value > 2){
    nbCardInput.value --;
  }
});


//cette fonction gère ce qui se passe qd on click sur une carte
function clickOnCardEvent(card){
    let allCards = document.querySelectorAll(".card");/*on va aller choper ttes les classes card */ 
    if(card.classList.contains("finded")){
        return; /*ca v dire tu ne fait pas cette fonction */
    }
    
    cptClickCurrent ++;/* cpte le nbre de click dc au 1er ou au 2e on cache ou montre l image */
  
   // premier click, je cache les images trouvées avant 
    if(cptClickCurrent == 1){
        allCards.forEach(card => {
          if(card.classList.contains("finded")){
            // c'est une carte trouvée
          }
          else{
            //pas trouvée, il faut qu'elle soit masquée
            card.classList.add("hidden");//on ajoute une classe hidden
          }
        });
      // j'affiche la carte que je viens de cliquer
      card.classList.remove("hidden");/*on enlève le hidden*/
      //je stocke la réponse derrière la carte
      CardClickedId = card.id;/*on va stocker l id de l image du html */
    }
    else if(cptClickCurrent == 2){
      //deuxième click, je verifie si l'image a été trouvée
      
      /*ici on gère le bug pr eviter de pouvoir clické deux fois sur la mm image qui est considéré comme trouver */
        if(CardClickedId == card.id){ /*on verifie si la que j ai cliqué n a pas la mm id */
            cptClickCurrent = 1;/*Si l image a le mm id donc on remet le compteur de click à 1 comme si j avais pas cliqué */
            return;
        }
      // au fait il ne faut pas que les id soient identique mais le nom de data- doivent être identique
        else{
            card.classList.remove("hidden");
            let cardClickedBefore = document.getElementById(CardClickedId);
            if(cardClickedBefore.dataset.image == card.dataset.image){ /*ici on compare l'image du data qu on a cliqué avant est le mm que la carte au 2e click */
                allCards.forEach(card => {
                  if(card.classList.contains("hidden")){
                    // c'est une carte cachée
                  }
                  else if(!card.classList.contains("finded")){ /* ! v dire ne contient pas */
                    card.classList.add("finded");/* sinon c une carte ouverte et on va ajouter une class finded*/
                    cptCartesTrouvees++;
                  }
                });
            }
            
            nbCoups++;/*chq fois qu il click à partir du 2e fois ca augmente */
            nbCoupsCurrentNode.innerText = nbCoups;
            
            cptClickCurrent = 0;
            CardClickedId = "";/*Pr sauvegarder la 1ere carte trouvée pr comparer au 2e et après on repart à 0 d'où vide*/
            // compter les cartes qui n ont pas la classe finded
            if(cptCartesTrouvees == nbPairesOnGame*2){
                // ajout animation car on a gangé
                // si =0 alors on a gagné , le jeu est fini
                setAnimationWin();
              //Partie terminée, je mets à jour les cookies
              let oldScore = getCookie(AllScoresCookie);
              let allscore = "";
              if(oldScore != null){
                  allscore = oldScore+"."+nbCoups;
              }
              else{
                  allscore = nbCoups;
              }

              setCookie(AllScoresCookie, allscore);
              avgScoreNode.innerText = getAverageNbCoups();

              if(nbCoups < getCookie(BestScoreCookie) 
              || getCookie(BestScoreCookie) == null){
                  //On a battu le meilleur score !
                  setCookie(BestScoreCookie, nbCoups);
                  BestScoreNode.innerText = nbCoups;
                  
                  let audio = new Audio("sounds/cheer2.mp3");
                  audio.play();
              }
              else{
                  let audio = new Audio("sounds/applause.mp3");
                  audio.play();
              }
            }
            
        }
    }     
} 
  

//ici c est pr creer les cartes de manière aléatoire
function initGame(nbPaires){
    stopAnimation();/*on stop les confeti au debut du jeu */
    
    gameBoard.innerHTML = "";/*au dbut il vaut 0*/
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0;
    nbCoups = 0;
    nbCoupsCurrentNode.innerText = nbCoups;/*innerText permet de modif le texte à 'interieur d un span par ex */
    
    let gameCard = [];/*le tab avec ttes mes cartes */
    
    for (let i = 0; i < nbPaires; i++){
        gameCard.push([cards[i], false]);
        gameCard.push([cards[i], false]);
    }
      //pr chaq carte il faut generer un chiffre aleatoire, ce chiffre ns permet de placer l elt
    for(let i = 0; i < gameCard.length; i++){
        let cardIsPositionned = false;
        while(!cardIsPositionned){
              let randomNumber = getRandomArbitrary(0, gameCard.length);/*min c 0 et max taille de mon tab */
              if(gameCard[randomNumber][1] == false){
                  //je peux positionner la carte ds le html
                  cardIsPositionned = true;
                  gameCard[randomNumber][1] = true; /*le 1 c est ce qu elle est positionnee ou pas et le 0 le nom de la carte  */
                  // positionner la carte ds le html
                  let cardHtml = getHtmlCodeCard(gameCard[randomNumber][0], i);
                  //faut générer le code html et l'inclure
                  gameBoard.innerHTML += cardHtml;/*on ajoute le cardHtml en html */
              }
        }
        
    }

    //j ajoute l evenement de click sur ttes les cartes
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.addEventListener("click", function(){
            clickOnCardEvent(card); /*chq fois qu on clique sur une carte on lance la fonction clickOnCardEvent */
        });
    });

}

// fonction pr des elts aleatoires avecun min et un max
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function getHtmlCodeCard(nomCard, id){
    return `<div class="card hidden" id="${id}" data-image="${nomCard}"> 
          <img src="img/${nomCard}.png"/>
        </div>`; 
}

//fonction pr les animations confetti quand on gagne
function setAnimationWin(){
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";

    for(let i = 0; i < 100; i++){
      let confeti = document.createElement("div");
      confeti.classList.add("confetti");
      confeti.style.left =getRandomArbitrary(0,100)+'%';
      confeti.style.animationDelay = 50*i+"ms";
      confeti.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);/*pr creer des couleurs aleatoires */
      animateDiv.appendChild(confeti);/*indique q confeti est un enfant de animateDiv */
    }
}

//fonction pr stopper l animation
function stopAnimation(){
  let animateDiv = document.getElementById("allconfettis");
  animateDiv.innerHTML = ""; /*pr vider la page html soit le allconfettis */
}

// fonction pour recup et stocker les cookies
function setCookie(name, value) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + "=" + encodeURIComponent(value);
  
      /* Sets the max-age attribute so that the cookie expires
      after the specified number of days */
      cookie += "; max-age=" + (100*24*60*60);  
      document.cookie = cookie;   
}


function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  
  // Return null if not found
  return null;
}

//fonction pour calcul de la moyenne des scores
function getAverageNbCoups(){
  let allscore = getCookie(AllScoresCookie);
  if(allscore != null){
      let allScoreTab = allscore.split(".");
      let sum = 0;
      let nbParties = 0;
      allScoreTab.forEach(score => {
          sum += +score;
          nbParties ++;
      });
  
      let moyenne = sum / nbParties;
      return Math.round(moyenne);
  }
  else{
      return 0;
  }
}