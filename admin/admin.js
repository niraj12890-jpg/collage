// admin.js
const adminCredentials = { username: "admin", password: "password123" };

// Login form submission
const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const spinner = document.getElementById("spinner");
    spinner.style.display = "inline-block";

    setTimeout(() => { // simulate server delay
      spinner.style.display = "none";
      if (username === adminCredentials.username && password === adminCredentials.password) {
        sessionStorage.setItem("admin", "true");
        window.location = "admin-dashboard.html";
      } else {
        alert("Invalid credentials!");
      }
    }, 800);
  });
}

// Logout function
function logout() {
  sessionStorage.removeItem("admin");
  window.location = "admin-login.html";
}

// Session protection on admin pages
if (window.location.pathname.includes("admin-dashboard.html") ||
    window.location.pathname.includes("admissions.html") ||
    window.location.pathname.includes("notices.html") ||
    window.location.pathname.includes("gallery.html") ||
    window.location.pathname.includes("results.html") ||
    window.location.pathname.includes("idcards.html")) {
  if (sessionStorage.getItem("admin") !== "true") {
    window.location = "admin-login.html";
  }
}
