let allCards = document.querySelectorAll(".card")/*on va aller choper ttes les classes card */
let cptClickCurrent = 0; /*nbre de click */
let dataImageShowed; 

allCards.forEach(card =>{
  card.addEventListener("click", function (){
    playGame(card); /*chq fois qu on clique sur une carte on lance la fonction playgame */
  });
});

function playGame(card){
   cptClickCurrent  ++;/* est ce qu on a cliqué 1 ou 2 fois */
  
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
      dataImageShowed = card.dataset.image;/*pr recup un data attribut avec dataset ;.image du data attributs ds html */
    }
    else if(cptClickCurrent == 2){
      //deuxième click, je verifie si l'image a été trouvée
        card.classList.remove("hidden");
        if(dataImageShowed == card.dataset.image){
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
        dataImageShowed = "";/*Pr sauvegarder la 1ere carte trouvée pr comparer au 2e et après on repart à 0 d'où vide*/
  }
} 
  


  /*if(card.classList.contains("hidden")){ //les cards qui contiennent la class hidden 
      card.classList.remove("hidden");//on enlève le hidden
    }
    else{
      card.classList.add("hidden");//sinon on l'ajoute 
    } 
}*/