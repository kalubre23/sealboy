
const gif = document.getElementById("gif");
const aaaVideo = document.getElementById("aaaVideo");
const sound = new Audio();
let resetTimeout = null;
let isPoweredOn = false;
const consoleBody = document.querySelector(".console");
const powerOffButton = document.getElementById("powerOff");
const powerOnButton = document.getElementById("powerOn");

function stopEverything() {
    // Zaustavi audio
    try{

        sound.pause();
        sound.currentTime = 0;
    
    
        // Zaustavi video
        aaaVideo.pause();
        aaaVideo.currentTime = 0;
    }catch(error){
        console.log(error);
    }
}
function switchImageAndPlaySound(e) {
    if (!isPoweredOn) {
        return;
    }

    stopEverything();

    if (e.currentTarget.dataset.video) {
        gif.style.display = "none";

        aaaVideo.style.display = "block";
        aaaVideo.src = e.currentTarget.dataset.video;
        aaaVideo.play();
        startCounter();
        return;
    }

    gif.style.display = "block";
    gif.src = e.currentTarget.dataset.gif;

    aaaVideo.style.display = "none";

    sound.src = e.currentTarget.dataset.sound;
    sound.play();

    startCounter();
}


const buttons = document.querySelectorAll(".btn");
buttons.forEach((button)=> {
    button.addEventListener("click", switchImageAndPlaySound);
})

function startCounter(){
    clearTimeout(resetTimeout);

    resetTimeout = setTimeout((e)=> {
        resetForm();
    }, 13000)
}

function resetForm(){
    stopEverything();
    aaaVideo.style.display = "none";
    gif.src= "images/jezik.png";
    gif.style.display = "block";
}

function powerOff() {
    isPoweredOn = false;
    clearTimeout(resetTimeout);
    stopEverything();
    gif.style.display = "none";
    aaaVideo.style.display = "none";
    consoleBody.classList.add("powered-off");
}

function powerOn() {
    isPoweredOn = true;
    consoleBody.classList.remove("powered-off");
    resetForm();
}

powerOffButton.addEventListener("click", powerOff);
powerOnButton.addEventListener("click", powerOn);
