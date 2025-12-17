const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQkwmJiYb3AdygMjalImVXuBE_P58X2yz2EV7YcYC_4xRbR7zkEKaCn-VIUqAajF2G/exec";

function login(){
  fetch(SCRIPT_URL,{
    method:"POST",
    body:JSON.stringify({
      action:"login",
      username:document.getElementById("username").value,
      password:document.getElementById("password").value
    })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status==="success"){
      sessionStorage.setItem("admin","true");
      window.location="admin-dashboard.html";
    }else{
      alert("Invalid Login");
    }
  });
}
