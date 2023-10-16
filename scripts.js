const CarGame = document.querySelector(".CarGame");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const GameArea = document.querySelector(".GameArea");

let key = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}


let player = { speed: 5 };



startScreen.addEventListener("click", start)


function moveLines(){
    let line = document.querySelectorAll(".line");

    line.forEach((el)=>{
        if(el.y>=740){
            el.y -=740; 
        }
        el.y += player.speed;
        el.style.top = el.y +"px";
    })
}

function gamePlay() {
    let car = document.querySelector(".car");
    let road = GameArea.getBoundingClientRect();
    console.log(road)
    if (player.start) {
        moveLines();
        if (key.ArrowUp && player.y > road.top + 150) {
            player.y -= player.speed;
        }
        if (key.ArrowDown && player.y < road.bottom - 75) {
            player.y += player.speed;
        }
        if (key.ArrowLeft && player.x > 5) {
            player.x -= player.speed;
        }
        if (key.ArrowRight && player.x < road.width - 60) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        console.log("hello i am clicked");
        window.requestAnimationFrame(gamePlay);
    }

}

function start() {
    GameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    player.start = true;
    window.requestAnimationFrame(gamePlay);


    for (let i = 0; i < 6; i++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "line");
        roadLine.y = (i*150)
        roadLine.style.top = roadLine.y +"px";
        GameArea.appendChild(roadLine);
    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    GameArea.appendChild(car)

    player.x = car.offsetTop;
    player.y = car.offsetLeft;

}

document.addEventListener("keydown", (e) => {
    key[e.key] = true;
    e.preventDefault()
    console.log(key)
})

document.addEventListener("keyup", (e) => {
    key[e.key] = false;
    e.preventDefault()
    console.log(key);
})