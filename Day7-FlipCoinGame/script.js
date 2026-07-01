let heads = 0;
let tails = 0;

let coin = document.querySelector(".coin");

let flipButton = document.querySelector("#flip-button");
let restButton = document.querySelector("#rest-button");

flipButton.addEventListener("click", ()=>{
    let i = Math.floor(Math.random() * 2);
   console.log(i)
    // coin.style.animation = "none";
    coin.offsetWidth;

    if(i === 1){
         
        setTimeout(()=>{
            coin.style.animation = "spin-tails 3s forwards";
        },100)
        tails++;    
    } else{
               setTimeout(()=>{
            coin.style.animation = "spin-heads 3s forwards";
        },100)
        heads++;  
    }
    
    setTimeout(setUpdate, 3000);
    disabled();

});

function setUpdate(){
document.querySelector("#head-count").textContent = `Heads: ${heads}`;
document.querySelector("#tail-count").textContent = `Tails: ${tails}`;
}

function disabled(){
flipButton.disabled = true;
setTimeout(()=>{
flipButton.disabled = false
},3000)
}


restButton.addEventListener("click", ()=>{
    coin.style.animation ="none";
    heads = 0;
    tails = 0;

    setUpdate();
})

































// let heads = 0;
// let tails = 0;
// let coin = document.querySelector(".coin");
// let flipBtn = document.querySelector("#flip-button");
// let resetBtn = document.querySelector("#rest-button");


// flipBtn.addEventListener("click", ()=>{
//     let i = Math.floor(Math.random() * 2);
    
//     coin.style.animation = "none";
//     coin.offsetwidth;

//     if(i === 1){
//         setTimeout(()=>{
//         coin.style.animation = "spin-heads 3s forwards";
//         },100)
//         heads++;     
       
//         } else {

//          setTimeout(()=>{
//             coin.style.animation = "spin-tails 3s forwards";
//         },100);
//         tails++;

//     }


//     setTimeout(updateState, 3000);
//     disableButton();
// })


// function updateState(){
//     document.querySelector("#head-count").textContent = `Heads: ${heads}`;
//     document.querySelector("#tail-count").textContent = `Tails: ${tails}`;
// }


// function disableButton(){
//     flipBtn.disabled = true
//     setTimeout(function(){
//         flipBtn.disabled = false
//     }, 3000)
// }

// resetBtn.addEventListener("click", ()=>{
//     coin.style.animation = "none";
//     heads = 0;
//     tails = 0;
//     updateState();
// })