// ========================
// ADMIN JS
// ========================

// 🔐 Logout function
function logout() {
  sessionStorage.removeItem("admin");
  window.location = "admin-login.html";
}

// 🔐 Check if admin is logged in
if (!sessionStorage.getItem("admin")) {
  if (!document.getElementById("adminLoginForm")) { // Only redirect non-login pages
    window.location = "admin-login.html";
  }
}

// ========================
// Admin Login Handling
// ========================
const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  const spinner = document.getElementById("spinner");

  adminLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    spinner.style.display = "inline-block";

    // 🔹 Replace these credentials with your secure backend if needed
    const adminUser = "admin";
    const adminPass = "password123";

    const username = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    setTimeout(() => {
      spinner.style.display = "none";
      if (username === adminUser && pass === adminPass) {
        sessionStorage.setItem("admin", "true");
        alert("Login Successful!");
        window.location = "admin-dashboard.html";
      } else {
        alert("Invalid username or password.");
      }
    }, 800); // Spinner simulation
  });
}

// ========================
// Sample Data (Dummy)
// ========================

const admissionsData = JSON.parse(localStorage.getItem("admissions")) || [
  { fullName: "Ravi Kumar", dob: "2008-05-12", mobile: "9876543210", class: "11", registration: "ADM001" },
  { fullName: "Sita Sharma", dob: "2007-11-20", mobile: "9123456780", class: "12", registration: "ADM002" }
];

const noticesData = JSON.parse(localStorage.getItem("notices")) || [
  { title: "Exam Schedule Released", date: "2025-12-10", description: "Check the complete exam schedule." },
  { title: "Holiday Announcement", date: "2025-12-05", description: "College closed on Dec 15 for public holiday." },
  { title: "Sports Meet", date: "2025-11-30", description: "Annual sports meet schedule released." }
];

const galleryData = JSON.parse(localStorage.getItem("gallery")) || [
  { img: "https://via.placeholder.com/300x200?text=Event+1", title: "Event 1" },
  { img: "https://via.placeholder.com/300x200?text=Event+2", title: "Event 2" },
  { img: "https://via.placeholder.com/300x200?text=Event+3", title: "Event 3" },
  { img: "https://via.placeholder.com/300x200?text=Event+4", title: "Event 4" },
  { img: "https://via.placeholder.com/300x200?text=Event+5", title: "Event 5" },
  { img: "https://via.placeholder.com/300x200?text=Event+6", title: "Event 6" }
];

const resultsData = JSON.parse(localStorage.getItem("results")) || [
  { student: "Ravi Kumar", class: "11", subject: "Math", marks: 95 },
  { student: "Sita Sharma", class: "12", subject: "Physics", marks: 88 }
];

const idCardsData = JSON.parse(localStorage.getItem("idcards")) || [
  { student: "Ravi Kumar", class: "11", regNo: "ADM001" },
  { student: "Sita Sharma", class: "12", regNo: "ADM002" }
];

// ========================
// Load Data into Pages
// ========================

function loadAdmissions() {
  const tbody = document.getElementById("admissionsTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  admissionsData.forEach((adm, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${adm.fullName}</td>
      <td>${adm.dob}</td>
      <td>${adm.mobile}</td>
      <td>${adm.class}</td>
      <td>${adm.registration}</td>
    `;
    tbody.appendChild(tr);
  });
}

function loadNotices() {
  const container = document.getElementById("noticesContainer");
  if(!container) return;
  container.innerHTML = "";
  noticesData.forEach((notice, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="card card-hover p-3 mb-3 h-100">
        <h5>${notice.title}</h5>
        <small class="text-muted">${notice.date}</small>
        <p>${notice.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if(!container) return;
  container.innerHTML = "";
  galleryData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="card card-hover mb-3">
        <img src="${item.img}" class="card-img-top" alt="${item.title}">
        <div class="card-body text-center">
          <h6>${item.title}</h6>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function loadResults() {
  const tbody = document.getElementById("resultsTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  resultsData.forEach((res, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${res.student}</td>
      <td>${res.class}</td>
      <td>${res.subject}</td>
      <td>${res.marks}</td>
    `;
    tbody.appendChild(tr);
  });
}

function loadIDCards() {
  const tbody = document.getElementById("idcardsTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  idCardsData.forEach((idc, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${idc.student}</td>
      <td>${idc.class}</td>
      <td>${idc.regNo}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Call loaders
loadAdmissions();
loadNotices();
loadGallery();
loadResults();
loadIDCards();
