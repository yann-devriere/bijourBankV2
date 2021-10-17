console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

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


const submit = document.querySelector("#submit")
submit.addEventListener("click",function(){

const titre = document.querySelector("#titre").value;

const desc = document.querySelector("#desc").value;

const montant = document.querySelector("#montant").value;

let operator = document.querySelector("#operator").value;

let affichageBas = document.querySelector("#Affichage_bas")
affichageBas.innerHTML= affichageBas.innerHTML+`<div class="operation ${operator}">
<div class="grid-x grid-padding-x align-middle">
  <div class="cell shrink">
    <div class="picto">
      <img src="./assets/images/sac-dargent.png" alt="credit" />
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
      <p class="count">${montant}</p>
      <small>100%</small>
    </div>
  </div>
</div>
</div>`



})

