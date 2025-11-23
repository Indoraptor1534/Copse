const repoOwner = "Indoraptor1534";
const repoName = "Copse";
const releaseURL = `https://api.github.com/repos/Indoraptor1534/Copse/releases/latest`;
const LastReleaseKey = `lastReleaseName_${repoOwner}_${repoName}`; // key for localStorage
const baselineVersion = "V4"
const closeBtn = document.querySelector(".clbutton");


if (!localStorage.getItem(LastReleaseKey)) {
    localStorage.setItem(LastReleaseKey, baselineVersion);
    console.log("Baseline set:", baselineVersion);
}

let LastRelease = localStorage.getItem(LastReleaseKey);


window.onload = checkForUpdates;
let ubox = document.getElementById("updt")
async function checkForUpdates() {
    try {
        const response = await fetch(releaseURL,{
                headers: {
        "User-Agent": "Copse-App", // <--- REQUIRED NOW
        "Accept": "application/vnd.github+json"
    }
        });

       
        

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No releases found for this repository.");
                return;
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const latestVersion = data.tag_name;
        const LatestName= data.name;
      

        if (latestVersion && latestVersion !== LastRelease ) { 
           
            
            document.getElementById("uoverlay").style.display = "flex"
            document.getElementById("uoverlay").style.opacity = 2;
            console.log("Update found:", LatestName);
            ubox.offsetHeight;
           ubox.classList.add("active");
          document.getElementById("updateTitle").innerText = `New Update: ${LatestName}`;
document.getElementById("updateChanges").innerText = data.body;
          
    
        } else {
            console.log("No updates found.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
}

function Dw(){
window.open("https://github.com/Indoraptor1534/Copse", "_blank");
localStorage.setItem(LastReleaseKey, document.getElementById("updateTitle").innerText.replace("New Update: ", ""));
}
 function Ig(){
      document.getElementById("updt").classList.remove("active");
      document.getElementById("updt").offsetHeight;
      document.getElementById("updt").classList.add("gone");
      setTimeout(() => {
           document.getElementById("updt").style.display = "none";
           document.getElementById("uoverlay").style.display = "none";
           document.getElementById("updt").classList.remove("gone");
      },300);
    


    }
