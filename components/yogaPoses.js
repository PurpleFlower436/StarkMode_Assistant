const yoga_pose_photo = document.getElementById("yoga_pose_image");
const yoga_pose_name = document.getElementById("yoga_pose_name")
let interval



// This function is used to preload the yoga poses so theres no lag when the user starts their break
async function preload_yoga_poses() {
    const yoga_information_JSON = await fetch("https://yoga-api-nzy4.onrender.com/v1/poses?level=beginner");
    const yoga_information = await yoga_information_JSON.json();
    const poses = yoga_information.poses || [];

    
    //preload images so switching is instant
    poses.forEach(pose => {
        const img = new Image()
        img.src = pose.url_svg
    })
    
    return poses

}

/*
extension loads
↓
fetch yoga poses
↓
preload images
↓
user finishes work
↓
user clicks start break
↓
shuffle poses using Math.random
↓
take N poses (based on break length)
↓
show pose every 60 seconds
↓
break ends
↓
stop rotation
↓
The modal appears which asks the user if they want to continue another work session.
They click yes and then we go back to the work screen
↓
then we add the settings page at the end which has the toggle switch for light/dark mode
and music. 

*/


function shuffle_poses(array) {
    const shuffled_array = array.sort(() => Math.random() - 0.5 );
    return shuffled_array

}


export async function retrieve_n_poses(break_length) {
    const poses = await preload_yoga_poses()
    const valid_poses = poses.filter(pose => pose.url_svg);

   

    const shuffled_poses_array = shuffle_poses(valid_poses)

    // Check the length and the first pose in the array
   
    const portion_of_poses = shuffled_poses_array.slice(0, break_length);

    
   
    return portion_of_poses

}


function tony_stark_voice_guide(text) {
    var tony_stark_voice_guidance = new SpeechSynthesisUtterance();

    // List of Tony-style quips
    const quips = [
        "Breathe, and try not to collapse.",
        "Remember, genius, this is supposed to be relaxing…ish.",
        "Stay strong, even if your arms feel like spaghetti.",
        "I believe in you… mostly.",
        "Focus, breathe, and look cooler than you feel.",
        "If anyone asks, tell them Tony Stark sent you.",
        "Hey, genius, billionaire mindset doesnt work if your back is broken.Let's stretch.",
    ];

    // Pick a random quip
    const randomQuip = quips.sort(() => Math.random() - 0.5);

    tony_stark_voice_guidance.text = `Alright, genius, Hold the ${text} for 1 minute. ${randomQuip}`;
    const voices = window.speechSynthesis.getVoices();
    tony_stark_voice_guidance.voice = voices.find(voice => voice.name === "Google US English");
    tony_stark_voice_guidance.rate = 1.15;
    tony_stark_voice_guidance.pitch = 1.1;
    tony_stark_voice_guidance.volume = 1;

    window.speechSynthesis.speak(tony_stark_voice_guidance)
}
export function cycle_poses(array) {
    // We need the setinterval function here so we can cycle through the poses every one minute
    
    // start at the first pose in portion_of_poses
    let current_index = 0
     // Make we have a valid array of poses. If we have an empty array of poses then we must exit.
     if (!array || array.length === 0) {
        console.error("Error: The array is empty or undefined.");
        return;
    }
     

    
    if (array[0] && array[0].url_svg) {
        yoga_pose_photo.src = array[0].url_svg;
        yoga_pose_name.textContent = array[0].english_name;
        speak_tony_stark_style(yoga_pose_name.textContent)
    }
    current_index++; // start interval at the next pose

    // We use setInterval here so we can show each pose photo every 1 minute
    interval = setInterval(() => {
       
        
           
        if (array[current_index] && array[current_index].url_svg) {
            yoga_pose_photo.src = array[current_index % array.length].url_svg;
            yoga_pose_name.textContent = array[current_index % array.length].english_name;
            speak_tony_stark_style(yoga_pose_name.textContent)

        } else {
            console.error(`Pose at index ${current_index} is invalid or missing url_svg`)
        }
        current_index++
        // Once the current_index equals the array length then it means we've reached the end of the break session. 
        if (current_index === array.length)
            clearInterval(interval)
            // we show the modal here
    }, 60000); 



     }