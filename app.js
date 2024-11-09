const Base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector("#fromCountries");
const toCurr = document.querySelector("#toCountries");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (  currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name ==="from" && currCode === "USD"){
        newOption.selected = "selected";
    } else  if (select.name ==="to" && currCode === "INR"){
        newOption.selected = "selected";
    } 
    select.append(newOption);
    }   
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag= (element)=>{
 let currCode = element.value;
 let countryCode = countryList[currCode];
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
 let img=  element.parentElement.querySelector("img");
 if (img) {
    img.src = newSrc;
}
};
const updateExchangeRate =  async ()=>{
    let amount = document.querySelector(".amount input ");
 let amtVal = amount.value;
 if (amtVal ===""|| amtVal <1 ){
    amtVal= 1;
    amount.value="1";
 }
 const URL = `${Base_url}/${fromCurr.value.toLowerCase()}.json`;
 let response= await fetch(URL);
 let data = await response.json();
 let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 

 let finalAmount = amtVal * rate;
 msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click",  (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener ("load", ()=>{
    updateExchangeRate();
  });