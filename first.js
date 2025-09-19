// ✅ Departments
const departments = [
  "Agriculture", "Architecture", "Arts", "Bio-Technology",
  "Civil Engineering", "Chemistry", "Computer Science & Engineering",
  "Electronics & Communication Engineering", "Electrical & Electronics Engineering",
  "Mathematics", "Mechanical Engineering", "Pharmacy", "Physics",
  "Business School", "Computer Science and Applications",
  "Law", "SAC-Student Activity Center"
];

// ✅ Faculty Data (sample entries only)
const facultyData = {
  "Agriculture": [
    { name: "Mr.BODDEPALLI RAMBABU", dept: "Agriculture", cabinet: "Room 305, CS Building", img: "static/images/Mr.BODDEPALLIRAMBABU.jpg" }
  ],
  "Computer Science & Engineering": [
    { name: "Dr. Pavan Kumar", dept: "Computer Science", cabinet: "Room 305, CS Building", img: "static/images/pavankumar.jpg" },
    { name: "Prof. Aditya Verma", dept: "CSE - AI & ML", cabinet: "A-115", img: "static/images/profile.jpg" }
  ],
  "Mathematics": [
    { name: "Prof. Ravi Kumar", dept: "Mathematics", cabinet: "M-102", img: "static/images/profile.jpg" }
  ]
};

// ✅ Render Departments
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

// ✅ Universal Search
document.getElementById("universalSearch").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const query = this.value.toLowerCase().trim();
    if (query === "") return;

    // Search Department
    const matchedDept = departments.find(d => d.toLowerCase().includes(query));
    if (matchedDept) {
      loadFaculty(matchedDept);
      return;
    }

    // Search Faculty
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

// ✅ Load Faculty
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

function showDepartments() {
  document.getElementById("faculty-section").classList.add("hidden");
  document.getElementById("department-list").classList.remove("hidden");
  document.getElementById("details").classList.add("hidden");
}

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

// ✅ Chatbot (Create/Delete)
document.getElementById("chat-toggle").addEventListener("click", function () {
  let chatbot = document.getElementById("chatbot");

  if (chatbot) {
    chatbot.remove(); // delete after use
    return;
  }

  chatbot = document.createElement("div");
  chatbot.id = "chatbot";
  chatbot.innerHTML = `
    <div style="background:#b30000; color:white; padding:10px; display:flex; justify-content:space-between; align-items:center;">
      <span>Student HelpDesk Chat</span>
      <button id="closeChat" style="background:none; border:none; color:white; font-size:18px; cursor:pointer;">❌</button>
    </div>
    <div id="chat-content" style="flex:1; padding:10px; overflow-y:auto;">
      <p><strong>Bot:</strong> Hi! How can I help you today?</p>
    </div>
    <div style="display:flex; border-top:1px solid #ccc;">
      <input type="text" id="chat-input" placeholder="Type your message..." 
             style="flex:1; padding:10px; border:none; outline:none;">
      <button id="sendChat" style="background:#b30000; color:white; border:none; padding:10px 15px; cursor:pointer;">Send</button>
    </div>
  `;
  document.body.appendChild(chatbot);

  document.getElementById("closeChat").addEventListener("click", () => chatbot.remove());

  document.getElementById("sendChat").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    const content = document.getElementById("chat-content");
    if (input.value.trim() !== "") {
      content.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
      input.value = "";
      content.scrollTop = content.scrollHeight;
    }
  });
});
