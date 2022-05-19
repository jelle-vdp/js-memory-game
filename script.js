const urlArr = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg"
]

const cardWrapper = document.querySelector(".cards-wrapper");

let cardsCount = 0;
let firstCardIndex;
let cardsMatched = 0;

const shuffleArr = arr => {
    let i = arr.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
};

const finalUrlArr = shuffleArr(urlArr.concat(urlArr));

finalUrlArr.forEach(url => {
    const el = `<div class="card"><div class="card__front">Flip me</div><div class=card__back><img src="${url}"></div></div>`
    cardWrapper.innerHTML = cardWrapper.innerHTML + el;
});

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        if (cardsCount !== 2){
            card.classList.add("card--spin");
            cardsCount++;
            if (cardsCount === 1){
                firstCardIndex = index;
            }
    
            if (cardsCount === 2){

                if (card.querySelector("img").src !== cards[firstCardIndex].querySelector("img").src){
                    
                    setTimeout(() => {
                        cards[firstCardIndex].classList.remove("card--spin");
                        card.classList.remove("card--spin");
                        cardsCount = 0;
                    }, 1000);
                } else {
                    cardsMatched++;
                    setTimeout(() => cardsCount = 0, 1000)
                }

                console.log(cardsMatched);
                console.log(urlArr.length);


                if (cardsMatched === urlArr.length){
                    console.log("gewonnen");
                    document.querySelector(".won").style.display = "flex";
                }
            }
        };
    })
})
 
