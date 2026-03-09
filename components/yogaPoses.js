let poses = []
let break_poses = []
let pose_index = 0
let pose_interval




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

*/


function shuffle_poses(array) {
    const shuffled_array = array.sort(() => Math.random() - 0.5 );
    return shuffled_array

}

