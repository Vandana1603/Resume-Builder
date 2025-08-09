// Profile photo upload
document.getElementById("photo-upload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-photo").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Generate resume
document.getElementById("resume-form").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("resume-preview").classList.remove("hidden");

  document.getElementById("r-photo").src = document.getElementById("profile-photo").src;
  document.getElementById("r-name").textContent = document.getElementById("name").value;
  document.getElementById("r-email").textContent = document.getElementById("email").value;
  document.getElementById("r-phone").textContent = document.getElementById("phone").value;
  document.getElementById("r-summary").textContent = document.getElementById("summary").value;

  const skills = document.getElementById("skills").value.split(",");
  const skillsList = document.getElementById("r-skills");
  skillsList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });

  const experience = document.getElementById("experience").value.split("\n");
  const expList = document.getElementById("r-experience");
  expList.innerHTML = "";
  experience.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = exp.trim();
    expList.appendChild(li);
  });

  const education = document.getElementById("education").value.split("\n");
  const eduList = document.getElementById("r-education");
  eduList.innerHTML = "";
  education.forEach(edu => {
    const li = document.createElement("li");
    li.textContent = edu.trim();
    eduList.appendChild(li);
  });
});

// Theme switcher
document.getElementById("theme-selector").addEventListener("change", function () {
  const selectedTheme = this.value;
  const resume = document.getElementById("resume-preview");
  resume.classList.remove("theme-default", "theme-modern", "theme-classic");
  resume.classList.add(`theme-${selectedTheme}`);
});

// PDF download
document.getElementById("download-btn").addEventListener("click", function () {
  const resume = document.getElementById("resume-preview");
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(resume).save();
});