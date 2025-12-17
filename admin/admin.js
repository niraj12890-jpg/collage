// ====================== Admin Credentials ======================
const adminCredentials = { username: "admin", password: "12345" };

// ------------------ Login Form ------------------
const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const spinner = document.getElementById("spinner");
    spinner.style.display = "inline-block";

    setTimeout(() => {
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

// ------------------ Logout Function ------------------
function logout() {
  sessionStorage.removeItem("admin");
  window.location = "admin-login.html";
}

// ------------------ Session Protection ------------------
if (
  window.location.pathname.includes("admin-dashboard.html") ||
  window.location.pathname.includes("admissions.html") ||
  window.location.pathname.includes("notices.html") ||
  window.location.pathname.includes("gallery.html") ||
  window.location.pathname.includes("results.html") ||
  window.location.pathname.includes("idcards.html")
) {
  if (sessionStorage.getItem("admin") !== "true") {
    window.location = "admin-login.html";
  }
}

// ====================== Google Sheet Integration ======================
// 🔹 Replace with your deployed Google Script URL
const sheetURL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

// ------------------ Load Admissions ------------------
async function loadAdmissions() {
  const table = document.getElementById("admissionsTable");
  if (!table) return;

  try {
    const res = await fetch(sheetURL + "?action=fetchAdmissions");
    const data = await res.json();
    table.innerHTML = "";

    if (!data.length) {
      table.innerHTML = `<tr><td colspan="6" class="text-center">No admissions yet</td></tr>`;
      return;
    }

    data.forEach((stu, i) => {
      table.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${stu.fullName}</td>
        <td>${stu.dob}</td>
        <td>${stu.mobile}</td>
        <td>${stu.class}</td>
        <td>${stu.regNo}</td>
      </tr>`;
    });
  } catch (err) {
    console.error("Error fetching admissions:", err);
    table.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Failed to load data</td></tr>`;
  }
}

// ------------------ Load Notices ------------------
async function loadNotices() {
  const container = document.getElementById("noticesContainer");
  if (!container) return;

  try {
    const res = await fetch(sheetURL + "?action=fetchNotices");
    const data = await res.json();

    container.innerHTML = "";
    if (!data.length) {
      container.innerHTML = `<p class="text-center">No notices yet</p>`;
      return;
    }

    data.forEach(n => {
      container.innerHTML += `<div class="col-md-4 mb-3">
        <div class="card p-3 card-hover">
          <h6>${n.title}</h6>
          <p class="mb-0">Date: ${n.date}</p>
        </div>
      </div>`;
    });
  } catch (err) {
    console.error("Error fetching notices:", err);
    container.innerHTML = `<p class="text-center text-danger">Failed to load notices</p>`;
  }
}

// ------------------ Load Gallery ------------------
async function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if (!container) return;

  try {
    const res = await fetch(sheetURL + "?action=fetchGallery");
    const data = await res.json();

    container.innerHTML = "";
    if (!data.length) {
      container.innerHTML = `<p class="text-center">No gallery images</p>`;
      return;
    }

    data.forEach(g => {
      container.innerHTML += `<div class="col-md-4 mb-3">
        <div class="card card-hover">
          <img src="${g.img}" class="card-img-top" alt="${g.title}">
          <div class="card-body">
            <h6 class="card-title">${g.title}</h6>
          </div>
        </div>
      </div>`;
    });
  } catch (err) {
    console.error("Error fetching gallery:", err);
    container.innerHTML = `<p class="text-center text-danger">Failed to load gallery</p>`;
  }
}

// ------------------ Load Results ------------------
async function loadResults() {
  const table = document.getElementById("resultsTable");
  if (!table) return;

  try {
    const res = await fetch(sheetURL + "?action=fetchResults");
    const data = await res.json();

    table.innerHTML = "";
    if (!data.length) {
      table.innerHTML = `<tr><td colspan="5" class="text-center">No results yet</td></tr>`;
      return;
    }

    data.forEach((r, i) => {
      table.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${r.name}</td>
        <td>${r.class}</td>
        <td>${r.subject}</td>
        <td>${r.marks}</td>
      </tr>`;
    });
  } catch (err) {
    console.error("Error fetching results:", err);
    table.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Failed to load results</td></tr>`;
  }
}

// ------------------ Load ID Cards ------------------
async function loadIDCards() {
  const table = document.getElementById("idcardsTable");
  if (!table) return;

  try {
    const res = await fetch(sheetURL + "?action=fetchAdmissions");
    const data = await res.json();

    table.innerHTML = "";
    if (!data.length) {
      table.innerHTML = `<tr><td colspan="4" class="text-center">No data</td></tr>`;
      return;
    }

    data.forEach((stu, i) => {
      table.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${stu.fullName}</td>
        <td>${stu.class}</td>
        <td>${stu.regNo}</td>
      </tr>`;
    });
  } catch (err) {
    console.error("Error loading ID Cards:", err);
    table.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Failed to load data</td></tr>`;
  }
}

// ====================== Initialize All ======================
document.addEventListener("DOMContentLoaded", () => {
  loadAdmissions();
  loadNotices();
  loadGallery();
  loadResults();
  loadIDCards();
});
