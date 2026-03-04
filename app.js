const start = document.getElementById("start")
const timer = document.getElementById("timer")
const minutesInput = document.getElementById("minutesInput")
const breakMinutesInput = document.getElementById("breakMinutesInput")
const arcScreen = document.getElementById("arcReactor")
const breakScreen = document.getElementById("suitCooldown")
const userInputModal = document.getElementById("modalForUserContinuingWork")


let timeLeft;
let interval;



const updateTimer = () => {

    // Calculate full minutes remaining
    const minutes = Math.floor(timeLeft/60);

    // Get remaining seconds after minutes are removed
    const seconds = timeLeft % 60;

    // Update to the timer display with leading zeros (e.g., 05:09)
    timer.innerHTML = `${minutes.toString().padStart(2,"0")}
    :${seconds.toString().padStart(2, "0")}`;
};


const startTimer = () => {
    if (interval) {
        clearInterval(interval); //Clear any existing interval
    }

    const userMinutes = parseInt(minutesInput.value);

    if (!userMinutes || userMinutes <= 0){
        alert("Please enter a valid number of minutes.");
        return;
    }

    timeLeft = userMinutes * 60;
    updateTimer();
    clearInterval(interval);

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            arcScreen.style.display="none";
            breakScreen.style.display = 'block';
            updateTimer();
        }
    }, 1000);
}

start.addEventListener("click", startTimer)

const startBreakTimer = () => {
    if (interval) {
        clearInterval(interval); //Clear any existing interval
    }

    const userMinutes = parseInt(breakMinutesInput.value);

    if (!userMinutes || userMinutes <= 0){
        alert("Please enter a valid number of minutes.");
        return;
    }

    timeLeft = userMinutes * 60;
    updateTimer();
    clearInterval(interval);

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            //userInputModal.style.display = "block"
            updateTimer();
        }
    }, 1000);

}
//start.addEventListener("click", startBreakTimer)


const showYogaPoses = () => {

    //Get the picture of the yoga pose and name from the api 
    // use the setInterval function so that the user holds the pose for one minute and
    // then it changes to the next pose. We keep doing this until the break timer runs out. 
    // Once the break timer runs out then we show the modal that asks if the 
    // user wants to start another work session or stop. If yes then we go back to the arc reactor screen. 











}