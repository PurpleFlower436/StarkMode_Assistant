const start = document.getElementById("start")
const timer = document.getElementById("timer")
const minutesInput = document.getElementById("minutesInput")
const breakMinutesInput = document.getElementById("breakMinutesInput")
const arcScreen = document.getElementById("arcReactor")
const breakScreen = document.getElementById("suitCooldown")
const userInputModal = document.getElementById("modalForUserContinuingWork")




const startTimer = () => {

    const userMinutes = parseInt(minutesInput.value);

    if (isNaN(userMinutes) || userMinutes <= 0){
        alert("Please enter a valid number of minutes.");
        return;
    }
    chrome.alarms.create("arcReactorLevel", {
        delayinMinutes:userMinutes
    });

    
            arcScreen.style.display="none";
 
 
 
            breakScreen.style.display = 'block';
}

start.addEventListener("click", startTimer)

const showYogaPoses = () => {

    //Get the picture of the yoga pose and name from the api 
    // use the setInterval function so that the user holds the pose for one minute and
    // then it changes to the next pose. We keep doing this until the break timer runs out. 
    // Once the break timer runs out then we show the modal that asks if the 
    // user wants to start another work session or stop. If yes then we go back to the arc reactor screen. 



    

    async function fetchData(){
        const yogaInformationJSON = await fetch("https://yoga-api-nzy4.onrender.com/v1/categories?id=5&level=beginner")
        const yogaInformation = yogaInformationJSON.json();
        document.getElementById("photo").innerHTML=yogaInformation.poses[0].url_svg
        document.getElementById("yoga pose name").innerHTML=yogaInformation.poses[0].english_name

        //console.log(yogaInformation)
    }


    
    fetchData()





}


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
            showYogaPoses();
            updateTimer();
        }
    }, 1000);

}
start.addEventListener("click", startBreakTimer)


