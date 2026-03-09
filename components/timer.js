const start = document.getElementById("start")
const timer = document.getElementById("timer")
const minutes_input = document.getElementById("minutes_input")
const break_minutes_input = document.getElementById("break_minutes_input")
const arc_screen = document.getElementById("arcReactor")
const break_screen = document.getElementById("suit_cooldown")
const user_input_modal = document.getElementById("modal_for_user_continuing_work")
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
    break_screen.style.display = 'block';

}


const hideWorkScreen = () => {
    arc_screen.style.display="none";

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
    startTimer(minutes_input.value, timer);
});
startBreakButton.addEventListener("click", () => {
    startTimer(break_minutes_input.value, breakTimer);
    
    
});






