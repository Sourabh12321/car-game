const CarGame = document.querySelector(".CarGame");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const GameArea = document.querySelector(".GameArea");

let key = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
}
let player = {speed:5};


startScreen.addEventListener("click",start)

function gamePlay(){
    let car = document.querySelector(".car");
    if(player.start){
        if(key.ArrowUp) {
            player.y -=player.speed; 
        }
        if(key.ArrowDown) {
            player.y +=player.speed; 
        }
        if(key.ArrowLeft) {
            player.x -=player.speed; 
        }
        if(key.ArrowRight) {
            player.x +=player.speed; 
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        console.log("hello i am clicked");
        window.requestAnimationFrame(gamePlay);
    }
    
}

function start(){
    GameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    player.start = true;
    window.requestAnimationFrame(gamePlay);

    let car = document.createElement("div");
    car.setAttribute("class","car");
    GameArea.appendChild(car)

    player.x = car.offsetTop;
    player.y = car.offsetLeft;
    
}

document.addEventListener("keydown",(e)=>{
    key[e.key] = true;
    e.preventDefault()
    console.log(key)
})

document.addEventListener("keyup",(e)=>{
    key[e.key] = false;
    e.preventDefault()
    console.log(key);   
})