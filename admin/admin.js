// 🔹 Replace with your deployed Google Script URL
const scriptURL = "YOUR_WEB_APP_URL_HERE";

// ------------------ LOGIN FORM ------------------
const loginForm = document.getElementById("adminLoginForm");
if(loginForm){
  const spinner = document.getElementById("spinner");
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    spinner.style.display = "inline-block";

    fetch(scriptURL, {
      method:"POST",
      body: JSON.stringify({
        action:"login",
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      })
    })
    .then(res => res.json())
    .then(data => {
      spinner.style.display = "none";
      if(data.status==="success"){
        sessionStorage.setItem("admin","true");
        window.location = "admin-dashboard.html";
      }else{
        alert("Invalid credentials!");
      }
    })
    .catch(err=>{
      spinner.style.display="none";
      alert("Error connecting server!");
      console.error(err);
    });
  });
}

// ------------------ SESSION PROTECTION ------------------
if(window.location.pathname.includes("admin-dashboard.html") && sessionStorage.getItem("admin")!=="true"){
  window.location = "admin-login.html";
}

// ------------------ LOGOUT ------------------
function logout(){
  sessionStorage.removeItem("admin");
  window.location="admin-login.html";
}

// ------------------ DASHBOARD DATA FETCH ------------------
function fetchAdmissions(){
  fetch(scriptURL+"?action=fetchAdmissions")
    .then(r=>r.json())
    .then(data=>console.log("Admissions:",data))
    .catch(e=>console.error(e));
}
function fetchNotices(){
  fetch(scriptURL+"?action=fetchNotices")
    .then(r=>r.json())
    .then(data=>console.log("Notices:",data))
    .catch(e=>console.error(e));
}
function fetchGallery(){
  fetch(scriptURL+"?action=fetchGallery")
    .then(r=>r.json())
    .then(data=>console.log("Gallery:",data))
    .catch(e=>console.error(e));
}
function fetchResults(){
  fetch(scriptURL+"?action=fetchResults")
    .then(r=>r.json())
    .then(data=>console.log("Results:",data))
    .catch(e=>console.error(e));
}

function generateIDCards(){ alert("ID Cards feature coming soon."); }
function openSettings(){ alert("Settings feature coming soon."); }
