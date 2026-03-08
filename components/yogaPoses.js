let poses = []
let breakPoses = []
let poseIndex = 0
let poseInterval




// This function is used to preload the yoga poses so theres no lag when the user starts their break
async function preLoadYogaPoses() {
    const yogaInformationJSON = await fetch("https://yoga-api-nzy4.onrender.com/v1/categories?id=5&level=beginner")
    const yogaInformation = await yogaInformationJSON.json();
    poses = yogaInformation.poses || [];

    //preload images so switching is instant
    poses.forEach(pose => {
        const img = new Image()
        img.src = pose.url_svg
    })
    

}

