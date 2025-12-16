/* ---------- Navigation Scroll Active ---------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

/* ---------- Gallery Popup ---------- */
const galleryImages = document.querySelectorAll(".gallery-img");
const popupOverlay = document.getElementById("popupOverlay");
if (popupOverlay) {
    const popupImg = popupOverlay.querySelector("img");
    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            popupImg.src = img.src;
            popupOverlay.style.display = "flex";
        });
    });
    popupOverlay.addEventListener("click", () => {
        popupOverlay.style.display = "none";
    });
}

/* ---------- Spinner & Form Submit (Admission) ---------- */
const admissionForm = document.getElementById("admissionForm");
const spinner = document.getElementById("spinner");
const totalStudents = document.getElementById("totalStudents");

if (admissionForm) {
    const scriptURL = 'PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL';
    
    // Load total students live
    fetch(scriptURL + '?count=1')
        .then(res => res.text())
        .then(count => totalStudents.textContent = count);

    admissionForm.addEventListener("submit", e => {
        e.preventDefault();
        spinner.style.display = 'inline-block';
        const data = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            mobile: document.getElementById('mobile').value,
            class: document.getElementById('classSelect').value
        };
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => {
            spinner.style.display = 'none';
            alert('Registration successful! Your number is generated.');
            admissionForm.reset();
            fetch(scriptURL + '?count=1')
                .then(res => res.text())
                .then(count => totalStudents.textContent = count);
        }).catch(err => {
            spinner.style.display = 'none';
            alert('Error submitting. Try again.');
        });
    });
}

/* ---------- Contact Form Placeholder ---------- */
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener('submit', e=>{
        e.preventDefault();
        alert('Message sent successfully! (placeholder)');
        contactForm.reset();
    });
}
