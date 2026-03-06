const start = document.getElementById("start")
const timer = document.getElementById("timer")
const minutesInput = document.getElementById("minutesInput")
const breakMinutesInput = document.getElementById("breakMinutesInput")
const arcScreen = document.getElementById("arcReactor")
const breakScreen = document.getElementById("suitCooldown")
const userInputModal = document.getElementById("modalForUserContinuingWork")
const startBreakButton = document.getElementById("startBreak")
const breakTimer = document.getElementById("breakTimer")

let timeLeft;
let interval;



const updateTimer = (timerDisplayElement) => {

    // Calculate full minutes remaining
    const minutes = Math.floor(timeLeft/60);

    // Get remaining seconds after minutes are removed
    const seconds = timeLeft % 60;

    // Update to the timer display with leading zeros (e.g., 05:09)
    timerDisplayElement.innerHTML = `${minutes.toString().padStart(2,"0")}
    :${seconds.toString().padStart(2, "0")}`;
};


const showBreakScreen = () => {
    breakScreen.style.display = 'block';

}


const hideWorkScreen = () => {
    arcScreen.style.display="none";

}

const showYogaPoses = () => {

    //Get the picture of the yoga pose and name from the api 
    // use the setInterval function so that the user holds the pose for one minute and
    // then it changes to the next pose. We keep doing this until the break timer runs out. 
    // Once the break timer runs out then we show the modal that asks if the 
    // user wants to start another work session or stop. If yes then we go back to the arc reactor screen. 



    

    async function fetchData(){
        const photoIndex = 0
        const yogaInformationJSON = await fetch("https://yoga-api-nzy4.onrender.com/v1/categories?id=5&level=beginner")
        const yogaInformation = await yogaInformationJSON.json();
        document.getElementById("photo").innerHTML=`<img src="${yogaInformation.poses[0].url_svg}" width="200">`
        document.getElementById("yogaPoseName").innerHTML=yogaInformation.poses[0].english_name

        console.log(yogaInformation)
    }


    
    fetchData()





}
const startTimer = (minutes, timerDisplayElement) => {
    console.log("Timer element:", timerDisplayElement);
    const userMinutes = parseInt(minutes);
    console.log("work minutes", userMinutes);
    if (isNaN(userMinutes) || userMinutes <= 0){
        alert("Please enter a valid number of minutes.");
        return;
    }

    clearInterval(interval);
    timeLeft = userMinutes * 60;
    updateTimer(timerDisplayElement);
    

    
    interval = setInterval(() => {
        timeLeft--;
        updateTimer(timerDisplayElement);

        if (timeLeft === 0) {
            clearInterval(interval);
            updateTimer(timerDisplayElement);
            hideWorkScreen();
            showBreakScreen();
           
        }
    }, 1000);
}

start.addEventListener("click", () => {
    startTimer(minutesInput.value, timer);
});
startBreakButton.addEventListener("click", () => {
    startTimer(breakMinutesInput.value, breakTimer);
    showYogaPoses()
    
});






