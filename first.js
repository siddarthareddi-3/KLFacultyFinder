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
  "Law",
  "SAC-Student Activity Center"
];

// ✅ Faculty Data
const facultyData = {
  "Agriculture": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Agriculture", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Architecture": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Architecture", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Arts": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Arts", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Bio-Technology": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Bio-Technology", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Civil Engineering": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Civil Engineering", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Chemistry": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Chemistry", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" },
  ],
  "Computer Science & Engineering": [
    { name: "Dr. Pavan Kumar", dept: "Computer Science", cabinet: "Room 305, CS Building", img: "static/images/pavankumar.jpg" },
    { name: "Dr. Example", dept: "Computer Science", cabinet: "C-301", img: "static/images/6040.jpg" },
    { name: "Prof. Aditya Verma", dept: "CSE - AI & ML", cabinet: "A-115", img: "static/images/profile.jpg" }
  ],
  "Electronics & Communication Engineering": [
    { name: "Prof. Kiran Rao", dept: "Electronics & Communication Engineering", cabinet: "C-112", img: "static/images/profile.jpg" }
  ],
  "Mathematics": [
    { name: "Prof. Ravi Kumar", dept: "Mathematics", cabinet: "M-102", img: "static/images/profile.jpg" }
  ],
  "Mechanical Engineering": [
    { name: "Dr. Sneha Patil", dept: "Mechanical Engineering", cabinet: "P-210", img: "static/images/profile.jpg" }
  ],
  "Pharmacy": [
    { name: "Dr. Vineeth K", dept: "Pharmacy", cabinet: "SC-105", img: "static/images/profile.jpg" }
  ],
  "Physics": [
    { name: "Dr. Meena Iyer", dept: "Physics", cabinet: "B-303", img: "static/images/profile.jpg" }
  ],
  "Business School": [
    { name: "Prof. Lakshmi Devi", dept: "Business School", cabinet: "H-303", img: "static/images/profile.jpg" }
  ],
  "Computer Science and Applications": [
    { name: "Prof. Lakshmi Devi", dept: "Computer Science and Applications", cabinet: "H-303", img: "static/images/profile.jpg" }
  ],
  "Law": [
    { name: "Prof. Lakshmi Devi", dept: "Law", cabinet: "H-303", img: "static/images/profile.jpg" }
  ],
  "SAC-Student Activity Center": [
    { name: "Prof.Sai vijay", dept: "SAC-Student Activity Center", cabinet: "R-002", img: "static/images/saivijay.jpeg" }
  ],
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

// ✅ Universal Search (Live, Case-Insensitive, Multiple Results + Highlight)
const searchInput = document.getElementById("universalSearch");
const facultySection = document.getElementById("faculty-section");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();

  if (query === "") {
    facultySection.innerHTML = "";
    facultySection.classList.add("hidden");
    document.getElementById("department-list").classList.remove("hidden");
    return;
  }

  // 🔍 Check if query matches department
  const matchedDept = departments.find(d => d.toLowerCase().includes(query));
  if (matchedDept) {
    loadFaculty(matchedDept);
    return;
  }

  // 🔍 Search faculty across all departments
  let results = [];
  for (let dept in facultyData) {
    facultyData[dept].forEach(faculty => {
      if (faculty.name.toLowerCase().includes(query)) {
        results.push({ ...faculty, dept });
      }
    });
  }

  facultySection.innerHTML = "";
  facultySection.classList.remove("hidden");
  document.getElementById("department-list").classList.add("hidden");

  if (results.length === 0) {
    facultySection.innerHTML = `<p style="text-align:center;">❌ No results found</p>`;
    return;
  }

  // Render results with highlight
  results.forEach(faculty => {
    const highlightedName = faculty.name.replace(
      new RegExp(query, "gi"),
      match => `<mark style="background:yellow; border-radius:4px;">${match}</mark>`
    );

    const card = document.createElement("div");
    card.className = "faculty-card";
    card.innerHTML = `
      <img src="${faculty.img}" alt="Faculty Photo">
      <div class="info">
        <h2>${highlightedName}</h2>
        <p><strong>Department:</strong> ${faculty.dept}</p>
        <p><strong>Cabinet:</strong> ${faculty.cabinet}</p>
        <button onclick="showDetails('${faculty.name}')">More Info</button>
      </div>
    `;
    facultySection.appendChild(card);
  });
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
  searchInput.value = "";
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
