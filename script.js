const cardWrapper = document.querySelector(".cards-wrapper");
const urlInput = document.querySelector(".add-images input");
const urlSubmit = document.querySelector(".add-images button");
const formErrorMsg = document.querySelector(".add-images__error");
const formDoubleMsg = document.querySelector(".add-images__double");
const formSuccessMsg = document.querySelector(".add-images__success");

const urlArr = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg",
    "img/11.jpg",
    "img/12.jpg"
];

const isImg = url => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

const generateGame = (imgArr) => {

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
    
    const finalUrlArr = shuffleArr(imgArr.concat(imgArr));
    
    finalUrlArr.forEach(url => {
        const el = `<div class="card"><div class="card__front"><i class="fa-solid fa-repeat"></i></div><div class=card__back><img src="${url}"></div></div>`;
        cardWrapper.innerHTML = cardWrapper.innerHTML + el;
    });
    
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            if (cardsCount !== 2 && !card.classList.contains("card--spin")){
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
                        setTimeout(() => cardsCount = 0, 1000);
                    }
    
                    if (cardsMatched === urlArr.length){
                        document.querySelector(".won").style.display = "flex";
                    }
                }
            }
        })
    })
};

generateGame(urlArr);

urlSubmit.addEventListener("click", () => {
    if (!isImg(urlInput.value)){
        formErrorMsg.style.display = "block";
        setTimeout(() => formErrorMsg.style.display = "none", 3000);
    } else if (urlArr.includes(urlInput.value)) {
        formDoubleMsg.style.display = "block";
        setTimeout(() => formDoubleMsg.style.display = "none", 3000);
    } else {
        formErrorMsg.style.display = "none";
        cardWrapper.innerHTML = "";
        urlArr.pop();
        urlArr.unshift(urlInput.value);
        generateGame(urlArr);
        urlInput.value = "";
        formSuccessMsg.style.display = "block";
        setTimeout(() => formSuccessMsg.style.display = "none", 3000);
    }
})

 
