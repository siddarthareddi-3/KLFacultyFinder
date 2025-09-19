const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chat-toggle");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Toggle chatbot
chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

// Add message
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Handle user input
function handleUserMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  // Simple bot responses
  setTimeout(() => {
    let reply = "I'm not sure, please contact admin.";
    if (text.toLowerCase().includes("faculty")) {
      reply = "You can search faculty using the search bar above 👆.";
    } else if (text.toLowerCase().includes("department")) {
      reply = "Departments are listed on the main page.";
    } else if (text.toLowerCase().includes("help")) {
      reply = "Sure! How can I assist you? You can ask about faculty, departments, or general info.";
    }
    addMessage(reply, "bot");
  }, 600);
}

sendBtn.addEventListener("click", handleUserMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserMessage();
});
