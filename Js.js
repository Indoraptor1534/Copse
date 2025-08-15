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
