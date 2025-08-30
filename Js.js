let clct=0;
let clcc=0;
let link="0"
let img="0"
let nm="0"
let ids=[]
let idx=0;
let cnt=0;

window.onload = Ld;

function showtime(){
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let now = new Date();
  let hours = now.getHours();
  let day = days[now.getDay()];
  let time = now.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"});
  let date = now.toLocaleDateString();
  document.getElementById("demo").innerHTML = `${day} &nbsp;&nbsp;${date} &nbsp;&nbsp; ${time}`;
  if (hours > 6 && hours < 18){
    document.getElementById("tim-cook").src = "Icons/Sun.png";
  }
  else{
    document.getElementById("tim-cook").src = "Icons/Moon.png";
  }
}
showtime();
setInterval(showtime,1000);
function Over(){
  document.getElementById("overlay").style.display="flex";
}
function Bck(){
  document.getElementById("overlay").style.display="none";
  document.getElementById("doverlay").style.display="none";
}

function add() {
  let link = document.getElementById("shortlink").value.trim();
  let nm   = document.getElementById("shortname").value.trim();
  let fileInput = document.getElementById("shortimg");
  let file = fileInput.files[0];

  if (!link || !nm || !file) {
    alert("One of the fields is empty!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(e) {
    let base64Image = e.target.result; // ✅ actual image data

    clct += 1;

    // create shortcut
    let a = document.createElement("a");
    a.className = "shortcut";
    a.href = link;
    a.target = "_blank";
    a.id = clct;

    let image = document.createElement("img");
    image.src = base64Image;
    image.alt = nm;

    let span = document.createElement("span");
    span.textContent = nm;

    a.appendChild(image);
    a.appendChild(span);

    document.querySelector(".shortcuts").appendChild(a);

    // ✅ save to localStorage
    localStorage.setItem("lnk" + clct, link);
    localStorage.setItem("img" + clct, base64Image);
    localStorage.setItem("nm" + clct, nm);
    localStorage.setItem("cnt", clct);

    // reset form
    document.getElementById("shortlink").value = "";
    document.getElementById("shortname").value = "";
    document.getElementById("shortimg").value = "";
    Bck();
  };

  reader.readAsDataURL(file); // convert file to base64 string
}

function Ld() {
  clct = parseInt(localStorage.getItem("cnt") || "0", 10);
  let clcc = 1;
  ids = []; // make sure this is defined globally

  while (clcc <= clct) {
    let link = localStorage.getItem("lnk" + clcc);
    let img  = localStorage.getItem("img" + clcc);
    let nm   = localStorage.getItem("nm" + clcc);

    if (!link || !img || !nm) { clcc++; continue; } // skip deleted

    let a = document.createElement("a");
    a.className = "shortcut";
    a.href = link;
    a.target = "_blank";
    a.id = clcc;        

    let image = document.createElement("img");
    image.src = img;
    image.alt = nm;

    let span = document.createElement("span");
    span.textContent = nm;

    a.appendChild(image);
    a.appendChild(span);

    document.querySelector(".shortcuts").appendChild(a);

    ids.push(clcc);    
    clcc++;
  }
}


function Dlt(){
 

  document.getElementById("doverlay").style.display="flex";

}

function Crdt(){
  let dltname = document.getElementById("shortdlt").value;
  let shrts = document.querySelectorAll(".shortcut");

  for (let shrt of shrts){
    let span = shrt.querySelector("span");
    if(span && span.textContent.trim() === dltname){
      let idVal =shrt.id ;
      let b= confirm("Are you sure you want to delete "+dltname+"?")
      if(b){
      shrt.remove();

      localStorage.removeItem("lnk" + idVal);
      localStorage.removeItem("img" + idVal);
      localStorage.removeItem("nm" + idVal);
      let a= localStorage.getItem("cnt")
      localStorage.setItem("cnt",a-1)
      Bck();

      // ✅ remove id from ids array
      let idx = ids.indexOf(idVal);
      if (idx !== -1) {
        ids.splice(idx, 1);
          
      }
    }
    }
  }

}
function cs(){
  document.getElementById("coverlay").style.display="flex";
}
function css(){
  let c=document.getElementById("bgclor").value;
  document.body.style.backgroundColor=c
  let d=document.getElementById("bgcdlor").value;
   document.getElementById("h").style.backgroundColor=d
 
}
