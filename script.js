/*
gerer l aleatoire ds le placement des cartes

*/

// déclarer un tableau de toutes les cartes
let allCards = document.querySelectorAll(".card")/*on va aller choper ttes les classes card */
let cptClickCurrent = 0; /*nbre de click */
let CardClickedId; 

//j ajoute l evenement de click sur ttes les cartes
allCards.forEach(card =>{
    card.addEventListener("click", function (){
        clickOnCardEvent(card); /*chq fois qu on clique sur une carte on lance la fonction clickOnCardEvent */
  });
});

//cette fonction gère ce qui se passe qd on click sur une carte
function clickOnCardEvent(card){
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
      
      /*ici on gère le bug du click deux fois sur la mm image: */
        if(CardClickedId == card.id){ /*on verifie si l image cliqué n a pas la mm id */
            cptClickCurrent =1;/*Si l image ok donc on remet à 1 le click comme si j avais pas cliqué */
            return;
        }
      
        else{
            card.classList.remove("hidden");
            let cardClickedBefore = document.getElementById(CardClickedId)
            if(cardClickedBefore.dataset.image == card.dataset.image){ /*ici on compare l'image qu on a recup ds le html */
              allCards.forEach(card =>{
                if(card.classList.contains("hidden")){
                  // c'est une carte cachée
                }
                else{ /* sinon c une carte ouverte et on va ajouter une class finded*/
                  card.classList.add("finded");
                }
              });
            }
            
            cptClickCurrent = 0;
            CardClickedId = "";/*Pr sauvegarder la 1ere carte trouvée pr comparer au 2e et après on repart à 0 d'où vide*/
        }
    }     
} 
  


  