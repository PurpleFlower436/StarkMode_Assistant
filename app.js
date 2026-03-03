const start = document.getElementById("start")
const timer = document.getElementById("timer")


let timeLeft = 1500
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


    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Times up time to take a break!")
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
}

start.addEventListener("click", startTimer)