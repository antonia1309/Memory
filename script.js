
// déclarer un tableau de toutes les cartes

let cptClickCurrent = 0; /*nbre de click */
let CardClickedId; 
const cards = ["king", "queen", "valet", "as", "kingpiq", "kingtrefle"];//pr la fonction aleatoire
const gameBoard = document.getElementById("GameBoard");
let nbPairesOnGame;
let cptCartesTrouvees = 0;


//qd on click sur play, recupère le nbre de cartes et tu fait un initGame
document.getElementById("playButton").addEventListener("click", function(){
    let nbCardInput = document.getElementById("nbCardInput");
    initGame(nbCardInput.value);
});


//cette fonction gère ce qui se passe qd on click sur une carte
function clickOnCardEvent(card){
  let allCards = document.querySelectorAll(".card")/*on va aller choper ttes les classes card */ 
  if(card.classList.contains("finded")){
      return; /*ca v dire tu ne fait pas cette fonction */
   }
  
   cptClickCurrent  ++;/* cpte le nbre de click dc au 1er ou au 2e on cache ou montre l image */
  
   // premier click, je cache les images trouvées avant 
    if(cptClickCurrent == 1){
        allCards.forEach(card =>{
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
            let cardClickedBefore = document.getElementById(CardClickedId)
            if(cardClickedBefore.dataset.image == card.dataset.image){ /*ici on compare l'image du data qu on a cliqué avant est le mm que la carte au 2e click */
                allCards.forEach(card =>{
                  if(card.classList.contains("hidden")){
                    // c'est une carte cachée
                  }
                  else if(!card.classList.contains("finded")){ /* ! v dire ne contient pas */
                    card.classList.add("finded");/* sinon c une carte ouverte et on va ajouter une class finded*/
                    cptCartesTrouvees++;
                  }
                });
            }
            
            cptClickCurrent = 0;
            CardClickedId = "";/*Pr sauvegarder la 1ere carte trouvée pr comparer au 2e et après on repart à 0 d'où vide*/
            // compter les cartes qui n ont pas la classe finded
            if(cptCartesTrouvees == nbPairesOnGame*2){
              alert('gagné')
            }
            // si =0 alors on a gagné , le jeu est fini
        }
    }     
} 
  

//ici c est pr creer les cartes de manière aléatoire
function initGame(nbPaires){
    gameBoard.innerHTML = "";/*au dbut il vaut 0*/
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0;
    
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
    allCards.forEach(card =>{
    card.addEventListener("click", function (){
        clickOnCardEvent(card); /*chq fois qu on clique sur une carte on lance la fonction clickOnCardEvent */
    });
});

}


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function getHtmlCodeCard(nomCard, id){
    return `<div class="card hidden" id="${id}" data-image="${nomCard}"> 
          <img src="img/${nomCard}.png"/>
        </div>`;
    
}

  