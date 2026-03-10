
// This function is used to preload the yoga poses so theres no lag when the user starts their break
async function preload_yoga_poses() {
    const yoga_information_JSON = await fetch("https://yoga-api-nzy4.onrender.com/v1/categories?id=5&level=beginner")
    const yoga_information = await yoga_information_JSON.json();
    poses = yoga_information.poses || [];

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


export function retrieve_n_poses(break_length) {
    poses = preload_yoga_poses()
    shuffled_poses_array = shuffle_poses(poses)

    portion_of_poses = shuffled_poses_array.slice(0, break_length)

    return portion_of_poses

}

export function cycle_poses(array) {
    // We need the setinterval function here so we can cycle through the poses every one minute
    
    
    const current_index = 0

    setInterval(() => {
        array[current_index]
        current_index++
        if (current_index === array.length)
            clearInterval
            // we show the modal here
    }, 60000); 



}