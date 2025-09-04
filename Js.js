  let clct=0;
  let clcc=0;
  let link="0"
  let img="0"
  let nm="0"
  let ids=[]
  let idx=0;
  let cnt=0;
  let g=0;
      let mcontainer=document.querySelector("body");
      let row = null;

  window.onload = Ld;

  function showtime(){
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let now = new Date();
    let hours = now.getHours();
    let day = days[now.getDay()];
    let time = now.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"});
    let date = now.toLocaleDateString();
    document.getElementById("demo").innerHTML = `${day} &nbsp;&nbsp;${date} &nbsp;&nbsp; ${time}`;
    if (hours > 6 && hours < 19){
      document.getElementById("tim-cook").src = "Icons/Sun.png";
    }
    else{
      document.getElementById("tim-cook").src = "Icons/Moon.png";
    }
  }
  showtime();
  setInterval(showtime,1000);
  function Over(){
    document.getElementById("aoverlay").style.display="flex";
    document.getElementById("ad").style.display="flex";
    
  }
  function Bck(){
    document.getElementById("doverlay").style.display="none";
    document.getElementById("aoverlay").style.display="none";
    document.getElementById("ad").style.display="none";
    document.getElementById("dl").style.display="none";
    document.getElementById("coverlay").style.display="none";
    document.getElementById("PS").style.display="none";
   
    
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
      if (!row||g=== 5){
        row = document.createElement("div");
        row.className="shortcuts";
        mcontainer.appendChild(row);
        g=0;

      }
      row.appendChild(a);
      g++;




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
    g=0;
    document.querySelectorAll('.shortcuts:empty').forEach(row => row.remove());
    row = null;  
    let savedBg = localStorage.getItem("bgImage");
  if (savedBg) {
    document.body.style.backgroundImage = `url(${savedBg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

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

      if (g===0){
        
        row=document.createElement("div");
        row.className="shortcuts"
      mcontainer.appendChild(row);
      }

      row.appendChild(a);
        g++;
      if(g==5) g=0;

      ids.push(clcc);    
      clcc++;
    
    }
    if (row) {
    g = row.children.length; // set g to the number of shortcuts in the current row
  } else {
    g = 0;
  }
  }


  function Dlt(){
  

    document.getElementById("doverlay").style.display="flex";
  document.getElementById("dl").style.display="flex";
  }

  function Crdt(){
    let dltname = document.getElementById("shortdlt").value;
    let shrts = document.querySelectorAll(".shortcut");

    for (let shrt of shrts){
      let span = shrt.querySelector("span");
      if(span && span.textContent.trim() === dltname){
        let idVal =shrt.id ;
        let b= confirm("Are you sure you want to delete "+dltname+"?")
  if (b) {
      shrt.remove();

      localStorage.removeItem("lnk" + idVal);
      localStorage.removeItem("img" + idVal);
      localStorage.removeItem("nm" + idVal);
      document.querySelectorAll('.shortcuts:empty').forEach(r => r.remove());
      row = null;

      Bck();

      let idx = ids.indexOf(idVal);
      if (idx !== -1) ids.splice(idx, 1);
  }
      }
    }

  }
  function Cs(){
    document.getElementById("coverlay").style.display="flex";
      document.getElementById("PS").style.display="flex";
    

  }
function Crd() {
  // Get the file input element
  let fileInput = document.getElementById("Bg");
  if(fileInput.files.length>0){
  let b=confirm("Are You Sure You Want To Change The Background?")
  if(b){
  
  let file = fileInput.files[0]; // get the actual file
  if (!file) return; // exit if no file selected

  let reader = new FileReader();
  reader.onload = function(e) {
    let base64Image = e.target.result;

    // Apply as background
    document.body.style.backgroundImage = `url(${base64Image})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Save to localStorage
    localStorage.setItem("bgImage", base64Image);
    Bck();
   
  };

  reader.readAsDataURL(file); 
  // triggers reading the file
}}
else{
  alert("Choose A File")
}}


document.addEventListener("keydown",function(event){

  if (event.key === "Enter"){ /*makes enter also work idiot(im talkign to myself incase i forget)*/
    let ade=document.getElementById("aoverlay");
    let m=document.getElementById("doverlay");
    let c=document.getElementById("coverlay");
     event.preventDefault();
    if(ade.style.display=== "flex"){

      add();
    }
    if(m.style.display === "flex"){

      Crdt();
    }
    if(c.style.display === "flex"){
      Crd();
    }

  }
}
)


document.addEventListener("keydown",function(event){

  if(event.key==="Escape"){
    Bck();  
  }
})



