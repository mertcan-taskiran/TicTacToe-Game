let btnGroup = document.querySelectorAll(".button-group");
let gameEnd = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let gameMsg = document.getElementById("message");

// Kazanma desenleri
let winningPattern = [ 
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;

// Tüm butonları pasif yap
const disableButtons = () => {
    btnGroup.forEach((element) => (element.disabled = true));
    gameEnd.classList.remove("hide");
}

// Yeni oyun için tüm butonları etkinleştir.
const enableButtons = () => {
    btnGroup.forEach(element => {
        element.innerText = ""; // X ve O ları temizle
        element.disabled = false;
    });

    gameEnd.classList.add("hide");
};

// Bir oyuncu kazandığında çalıştır
const winFunction = (winner) => {
    disableButtons();
    if (winner == "X") {
      gameMsg.innerHTML = '<i class="fa-solid fa-crown"></i> Player X <i class="fa-solid fa-crown"></i>';
    } else {
      gameMsg.innerHTML = '<i class="fa-solid fa-crown"></i> Player O <i class="fa-solid fa-crown"></i>';
    }
};

// Berabere kalındığında çalıştır
const drawFunction = () => {
    disableButtons();
    gameMsg.innerHTML = '<i class="fa-solid fa-handshake"></i> Draw <i class="fa-solid fa-handshake"></i>';
};

// Yeni oyun
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Restart
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winChecker = () => {
    // Tüm kazanma modellerinde döngü yap
    for(let i of winningPattern){ 
        let [element1, element2, element3] = [
          btnGroup[i[0]].innerText,
          btnGroup[i[1]].innerText,
          btnGroup[i[2]].innerText,
        ];       
        // Elementlerin dolu olup olmadığını kontrol et
        if (element1 != "" && (element2 != "") & (element3 != "")){ 
            // Eğer 3 element aynı değere sahip ise
            if(element1 == element2 && element2 == element3){  
                winFunction(element1);
            }
        }
    }
};

// Tüm butonlarda gezin
btnGroup.forEach((element) => { 
    element.addEventListener("click", () => {
        if(xTurn){
            xTurn = false; 
            // Display X           
            element.innerText = "X"; 
            element.disabled = true;
        }else{
            xTurn = true;
            // Display O
            element.innerText = "O"; 
            element.disabled = true;
        }

        count += 1; // Her tıklamada sayıyı artır
        // Oyun bittiğinde ve kazanan olmadığında çalışır
        if(count === 9){ 
            drawFunction();
        }

        winChecker(); // Her tıklamada kazanmayı kontrol et       
    });
});

window.onload = enableButtons;