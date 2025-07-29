// ✅ Departments
const departments = [
  "Agriculture",
  "Architecture",
  "Arts",
  "Bio-Technology",
  "Civil Engineering",
  "Chemistry",
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mathematics",
  "Mechanical Engineering",
  "Pharmacy",
  "Physics",
  "Business School",
  "Computer Science and Applications",
  "Law"
];

// ✅ Faculty Data
const facultyData = {
  "Computer Science & Engineering": [
    { name: "Dr. Pavan Kumar", dept: "Computer Science", cabinet: "Room 305, CS Building", img: "static/images/pavankumar.jpg" },
    { name: "Dr. Example", dept: "Computer Science", cabinet: "C-301", img: "static/images/6040.jpg" },
    { name: "Prof. Aditya Verma", dept: "CSE - AI & ML", cabinet: "A-115", img: "static/images/profile.jpg" }
  ],
  "Civil Engineering": [
    { name: "Prof. Kiran Rao", dept: "Civil Engineering", cabinet: "C-112", img: "static/images/profile.jpg" }
  ],
  "Mechanical Engineering": [
    { name: "Prof. Ravi Kumar", dept: "Mechanical Engineering", cabinet: "M-102", img: "static/images/profile.jpg" }
  ],
  "Pharmacy": [
    { name: "Dr. Sneha Patil", dept: "Pharmacy", cabinet: "P-210", img: "static/images/profile.jpg" }
  ],
  "Physics": [
    { name: "Dr. Vineeth K", dept: "Physics", cabinet: "SC-105", img: "static/images/profile.jpg" }
  ],
  "Business School": [
    { name: "Dr. Meena Iyer", dept: "MBA", cabinet: "B-303", img: "static/images/profile.jpg" }
  ],
  "English": [
    { name: "Prof. Lakshmi Devi", dept: "English", cabinet: "H-303", img: "static/images/profile.jpg" }
  ]
};

// ✅ Render Departments on Home Page
const deptList = document.getElementById("department-list");
departments.forEach(dept => {
  const div = document.createElement("div");
  div.className = "faculty-card";
  div.setAttribute("data-dept", dept.toLowerCase());
  div.innerHTML = `
    <div class="info">
      <h2>${dept}</h2>
      <button onclick="loadFaculty('${dept}')">View Faculty</button>
    </div>
  `;
  deptList.appendChild(div);
});

// ✅ Universal Search (Faculty or Department)
document.getElementById("universalSearch").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const query = this.value.toLowerCase().trim();
    if (query === "") return;

    // 1️⃣ Search Department
    const matchedDept = departments.find(d => d.toLowerCase().includes(query));
    if (matchedDept) {
      loadFaculty(matchedDept);
      return;
    }

    // 2️⃣ Search Faculty across all departments
    let foundFaculty = null;
    let foundDept = null;

    for (let dept in facultyData) {
      facultyData[dept].forEach(faculty => {
        if (faculty.name.toLowerCase().includes(query)) {
          foundFaculty = faculty.name;
          foundDept = dept;
        }
      });
      if (foundFaculty) break;
    }

    // 3️⃣ If Faculty Found → Load Dept and Highlight
    if (foundFaculty && foundDept) {
      loadFaculty(foundDept);
      setTimeout(() => {
        const cards = document.querySelectorAll("#faculty-section .faculty-card");
        cards.forEach(card => {
          if (card.querySelector("h2").innerText === foundFaculty) {
            card.style.border = "2px solid red";
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => card.style.border = "", 3000);
          }
        });
      }, 300);
    } else {
      alert("❌ No Faculty or Department Found!");
    }
  }
});

// ✅ Load Faculty for Selected Department
function loadFaculty(department) {
  const facultySection = document.getElementById("faculty-section");
  facultySection.innerHTML = "";
  document.getElementById("department-list").classList.add("hidden");
  facultySection.classList.remove("hidden");

  facultySection.innerHTML += `<button onclick="showDepartments()" style="margin-bottom:15px;">⬅ Back to Departments</button>`;

  if (!facultyData[department]) {
    facultySection.innerHTML += `<p>No faculty data available for ${department}.</p>`;
    return;
  }

  facultyData[department].forEach(faculty => {
    const card = document.createElement("div");
    card.className = "faculty-card";
    card.innerHTML = `
      <img src="${faculty.img}" alt="Faculty Photo">
      <div class="info">
        <h2>${faculty.name}</h2>
        <p><strong>Department:</strong> ${faculty.dept}</p>
        <p><strong>Cabinet:</strong> ${faculty.cabinet}</p>
        <button onclick="showDetails('${faculty.name}')">More Info</button>
      </div>
    `;
    facultySection.appendChild(card);
  });
}

// ✅ Back to Departments
function showDepartments() {
  document.getElementById("faculty-section").classList.add("hidden");
  document.getElementById("department-list").classList.remove("hidden");
  document.getElementById("details").classList.add("hidden");
}

// ✅ Show Faculty Details
function showDetails(name) {
  const details = document.getElementById("details");
  details.innerHTML = `<h3>${name}</h3>
                       <p>More information about ${name} will be added soon.</p>
                       <button onclick="hideDetails()">Close</button>`;
  details.classList.remove("hidden");
  details.scrollIntoView({ behavior: "smooth" });
}

function hideDetails() {
  document.getElementById("details").classList.add("hidden");
}
