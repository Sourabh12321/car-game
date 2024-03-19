const CarGame = document.querySelector(".CarGame");
const playerscore = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const GameArea = document.querySelector(".GameArea");

let key = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}



let carObj = {
    1:"images/blueS.png",
    2:"images/green.png",
    3:"images/red.png",
    4:"images/police.png",
}


let player = { speed: 5, score:0 };



startScreen.addEventListener("click", start)

const accident = (cars, el) => {
    let car = cars.getBoundingClientRect();
    let ele = el.getBoundingClientRect();

    return !((car.bottom < ele.top) || (car.top > ele.bottom) || (car.right < ele.left) || (car.left > ele.right));

}




const cars = (car) => {
    let enemyCar = document.querySelectorAll(".enemy");

    enemyCar.forEach((el) => {
        if(accident(car, el)){
            player.start = false;
            startScreen.classList.remove("hide");
            startScreen.innerHTML = `GAME OVER <br> YOUR FINAL SCORE IS :- ${player.score +2} <br> PRESS HERE TO RESTART THE GAME`
            player.speed = 5;
        }
        
        if (el.y >= 700) {
            el.y -= 800;
            el.style.left = Math.floor(Math.random() * 350) + "px";
        }
        el.y += player.speed;
        el.style.top = el.y + "px";
    })

}

function moveLines() {
    let line = document.querySelectorAll(".line");

    line.forEach((el) => {
        if (el.y >= 740) {
            el.y -= 740;

        }
        el.y += player.speed;
        el.style.top = el.y + "px";
    })
}

function gamePlay() {
    let car = document.querySelector(".car");
    let road = GameArea.getBoundingClientRect();
    // console.log(road)
    if (player.start) {
        if(player.score%1000==0){
            player.speed++;
        }
        console.log(player.speed)

        moveLines();
        cars(car);


        if (key.ArrowUp && player.y > road.top + 150) {
            player.y -= player.speed;
        }
        if (key.ArrowDown && player.y < road.bottom - 90) {
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
        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        playerscore.innerHTML = "Score :"+player.score;
    }

}

function start() {
    // GameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    GameArea.innerHTML = "";
    player.start = true;
    window.requestAnimationFrame(gamePlay);
    player.score =0;


    for (let i = 0; i < 6; i++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "line");
        roadLine.y = (i * 150)
        roadLine.style.top = roadLine.y + "px";
        GameArea.appendChild(roadLine);
    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    let image = document.createElement("img");
    image.src = "images/car.png"
    car.append(image);
    GameArea.appendChild(car)

    player.x = car.offsetTop;
    player.y = car.offsetLeft;

    for (let i = 1; i < 5; i++) {
        let enemyCar = document.createElement("div");
        let img = document.createElement("img");
        if(carObj[i]){
            img.src = carObj[i]
        }
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = (i  * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        enemyCar.append(img);
        GameArea.appendChild(enemyCar);
    }

}

document.addEventListener("keydown", (e) => {
    key[e.key] = true;
    e.preventDefault()
    // console.log(key)
})

document.addEventListener("keyup", (e) => {
    key[e.key] = false;
    e.preventDefault()
    // console.log(key);
})