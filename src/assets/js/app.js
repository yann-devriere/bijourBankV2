console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});



//valeur qui sert a savoir du local storage est vide ou non
let valeurLS = localStorage.getItem("valeurSuivante");

//definition du tableau operation en fonction du status du local Storage
let operations=[]; 
if (valeurLS !== null){
  operations = JSON.parse(localStorage.getItem("operations"));
}

//definition du solde en fonction du status du local Storage
let solde = document.querySelector("#solde").innerHTML;
if (valeurLS !== null){
  solde = parseFloat(valeurLS);
  document.querySelector("#solde").innerHTML = solde+"€";
  console.log(solde);
}

//fonctionnement des "onglets" débit crédit et tout.
const bCredit = document.querySelector("#bCredit");

bCredit.addEventListener("click", function(){

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="none"}

  let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="contents"}
  
  bCredit.setAttribute("class", "active");
  bTout.removeAttribute("class");
  bDebit.removeAttribute("class");

})

const bDebit = document.querySelector("#bDebit");

bDebit.addEventListener("click", function(){

   let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="none"}

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}
 
        bDebit.setAttribute("class", "active");
        bTout.removeAttribute("class");
        bCredit.removeAttribute("class");

})

const bTout = document.querySelector("#bTout")

bTout.addEventListener("click",function(){

  let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="contents"}

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}

        bTout.setAttribute("class", "active");
        bCredit.removeAttribute("class");
        bDebit.removeAttribute("class");
})



//eventlistener qui réagit a l'envoi du formulaire
const form = document.querySelector("#operationForm")
form.addEventListener("submit",function(){

const titre = document.querySelector("#titre").value;

const desc = document.querySelector("#desc").value;

const montant = document.querySelector("#montant").value;

let operator = document.querySelector("#operator").value;

let image = '<img src="./assets/images/sac-dargent.png" alt="credit" />'

if (operator == "debit") { 
  image = '<img src="./assets/images/depenses.png" alt="debit" />'
}

//calcul du pourcentage que représente chaque opération par rapport au solde au moment de l'opé
let pourcentage1 = parseFloat(montant)/parseFloat(solde);
let pourcentage2 = parseFloat(pourcentage1)*100;
pourcentage2 = pourcentage2.toFixed(2);

//création de l'affichage des nouvelles opération avant refresh/ en live
let affichageBas = document.querySelector("#Affichage_bas")
affichageBas.innerHTML+=`<div class="operation ${operator}">
<div class="grid-x grid-padding-x align-middle">
  <div class="cell shrink">
    <div class="picto">
      ${image}
    </div>
  </div>
  <div class="cell auto">
    <div>
      <h2>${titre}</h2>
      <small>${desc}</small>
    </div>
  </div>
  <div class="cell small-3 text-right">
    <div>
      <p class="count">${montant}€</p>
      <small>${pourcentage2}%</small>
    </div>
  </div>
</div>
</div>`

//vidage du formulaire apres chaque envoi
let form = document.querySelector("#operationForm")
form.reset();

//definit le nouveau solde apres opération en fonction de la nature de cette opération
if (operator == "credit"){
solde = parseFloat(solde) + parseFloat(montant);
document.querySelector("#solde").innerHTML= solde+"€"
}
else {
  solde = parseFloat(solde) - parseFloat(montant);
document.querySelector("#solde").innerHTML= solde+"€"
}

//appel de la fonction qui change le "message" en dessous du solde
messenger();

//définition de l'objet operation
const operation = {
  type : operator,
  titre : titre,
  desc : desc,
  montant : montant,
  image : image,
  pourcentage : pourcentage2
};

//ajout de l'objet operation au tableau operationS
operations.push(operation);
//Stockage dans le local Storage du solde actualisé ainsi que du tableau operationS
localStorage.setItem("operations", JSON.stringify(operations));
localStorage.setItem("valeurSuivante", parseFloat(solde));
//appel de la fonction qui met à jour le graphique (définie dans l'autre JS)
updateGraph();

// return false;
// let hideform = document.querySelector(".reveal-overlay");
//       hideform.style.display = " none";
//       form.reset();  // Reset les champs du formulaire
//     return false; // Evite le refresh de la page

})

//génération automatique au refresh des opérations stockées dans le local storage
let affichageBas = document.querySelector("#Affichage_bas");
let tableauOpe = JSON.parse(localStorage.getItem("operations"));

 if (localStorage.getItem("valeurSuivante") !== null){
     for (let index = 0; index < tableauOpe.length; index++) {
  let operator =  tableauOpe[index].type;
  let image = tableauOpe[index].image;
  let titre = tableauOpe[index].titre;
  let desc = tableauOpe[index].desc;
  let montant = tableauOpe[index].montant;
  let pourcentage2 = tableauOpe[index].pourcentage

  affichageBas.innerHTML +=`<div class="operation ${operator}">
  <div class="grid-x grid-padding-x align-middle">
    <div class="cell shrink">
      <div class="picto">
        ${image}
      </div>
    </div>
    <div class="cell auto">
      <div>
        <h2>${titre}</h2>
        <small>${desc}</small>
      </div>
    </div>
    <div class="cell small-3 text-right">
      <div>
        <p class="count">${montant}€</p>
        <small>${pourcentage2}%</small>
      </div>
    </div>
  </div>
  </div>`;
       
     }
 }

//fonction qui définit la message a afficher
 function messenger (){
  let message = document.querySelector("#bien");

 if (solde<500 ){
  message.innerHTML = "Là c'est CHAUD ! 🥵";
  message.style.color="darkred";
}
else if (solde > 500 && solde < 1000){
  message.innerHTML = "Mouai... Fais gaffe quand même.😒"
  message.style.color="red"
}
else if (solde > 1000 && solde<2000){
  message.innerHTML = "Là on est pas mal...😏"
  message.style.color="lightgreen"
}
else if (solde > 2000 && solde<3000){
  message.innerHTML = "On est bien 😀"
  message.style.color="darkgreen"
}
else if (solde > 3000){
  message.innerHTML = "Roi du pétrole ! 😎"
  message.style.color="purple"
} }
//appel de cette meme fonction au chargement de la page.
 messenger();



