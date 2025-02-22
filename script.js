function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user message
    let chatBox = document.getElementById("chat-box");
    let userMessage = `<p class="user-message">${userInput}</p>`;
    chatBox.innerHTML += userMessage;

    // Send request to Python backend (change the URL to your deployed backend)
    fetch("https://medical-chatbot.onrender.com/chat", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = `<p class="bot-message">🤖 ${data.response}</p>`;
        chatBox.innerHTML += botMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        let errorMessage = `<p class="bot-message">⚠ Sorry, I couldn't process your request.</p>`;
        chatBox.innerHTML += errorMessage;
    });

    // Clear input field
    document.getElementById("user-input").value = "";
}
