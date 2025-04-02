/**document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.getElementById("prompt");
    const submitButton = document.getElementById("submit");
    const chatContainer = document.querySelector(".chat-container");

    let debateTopic = "";
    let userSide = "";
    let botSide = "";

    function handleUserInput() {
        const userMessage = promptInput.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, "user");
        promptInput.value = "";

        if (!debateTopic) {
            const { topic, side } = extractDebateDetails(userMessage);
            if (!topic || (side !== "for" && side !== "against")) {
                displayMessage("❌ Please specify the debate topic and whether you are speaking 'for' or 'against'.", "bot");
                return;
            }

            debateTopic = topic;
            userSide = side;
            botSide = userSide === "for" ? "against" : "for";

            displayMessage(`✔️ Debate Topic: <strong>${debateTopic}</strong><br>
                You are arguing <strong>${userSide.toUpperCase()}</strong>.<br>
                I will argue <strong>${botSide.toUpperCase()}</strong>. Let's start!`, "bot");
        } else {
            getBotResponse(userMessage).then(botResponse => displayMessage(botResponse, "bot"));
        }
    }

    submitButton.addEventListener("click", handleUserInput);

    promptInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    async function getBotResponse(userInput) {
        try {
            const apiUrl ="";

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: `Debate topic: ${debateTopic}.
The user is arguing **${userSide}**.
Respond with a strong **${botSide}** argument to this statement: "${userInput}".
Keep your response short (1-2 sentences maximum).` }] }
                    ],
                    generationConfig: { max_output_tokens: 50 } // Restricts response length
                })
            });

            const data = await response.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ I couldn't generate a response. Try again!";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "🚨 Error: Unable to connect to AI. Check API key or internet.";
        }
    }

    function extractDebateDetails(message) {
        const match = message.match(/topic is (.+?) and I am speaking (for|against)/i);
        return match ? { topic: match[1], side: match[2].toLowerCase() } : { topic: "", side: "" };
    }

    function displayMessage(text, sender) {
        const chatBox = document.createElement("div");
        chatBox.classList.add(sender === "user" ? "user-chat-box" : "ai-chat-box");

        const img = document.createElement("img");
        img.width = 70;
        img.alt = sender === "user" ? "User" : "AI";
        img.id = sender === "user" ? "userImage" : "aiImage";
        img.src = sender === "user" ? "user.png" : "ai.png";

        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-chat-area" : "ai-chat-area");
        messageDiv.innerHTML = text;

        chatBox.appendChild(img);
        chatBox.appendChild(messageDiv);
        chatContainer.appendChild(chatBox);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});**/

document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.getElementById("prompt");
    const submitButton = document.getElementById("submit");
    const chatContainer = document.querySelector(".chat-container");

    let debateTopic = "";
    let userSide = "";
    let botSide = "";

    function handleUserInput() {
        const userMessage = promptInput.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, "user");
        promptInput.value = "";

        if (!debateTopic) {
            const { topic, side } = extractDebateDetails(userMessage);
            if (!topic || (side !== "for" && side !== "against")) {
                displayMessage("❌ Please specify the debate topic and whether you are speaking 'for' or 'against'.", "bot");
                return;
            }

            debateTopic = topic;
            userSide = side;
            botSide = userSide === "for" ? "against" : "for";

            displayMessage(`✔️ Debate Topic: <strong>${debateTopic}</strong><br>
                You are arguing <strong>${userSide.toUpperCase()}</strong>.<br>
                I will argue <strong>${botSide.toUpperCase()}</strong>. Let's start!`, "bot");
        } else {
            // **Show Loading Message**
            const loadingMessage = displayMessage("🤖 AI is thinking...", "bot", true);

            getBotResponse(userMessage).then(botResponse => {
                // **Remove Loading Message**
                chatContainer.removeChild(loadingMessage);
                displayMessage(botResponse, "bot");
            });
        }
    }

    submitButton.addEventListener("click", handleUserInput);
    promptInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    async function getBotResponse(userInput) {
        try {
            const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDRYUSJ694QKbN-Vga0KXNgyF3AP1GbOrY"; 

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: `Debate topic: ${debateTopic}.
The user is arguing **${userSide}**.
Respond with a strong **${botSide}** argument to this statement: "${userInput}".
Keep your response short (1-2 sentences maximum).` }] }
                    ],
                    generationConfig: { max_output_tokens: 50 }
                })
            });

            const data = await response.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ I couldn't generate a response. Try again!";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "🚨 Error: Unable to connect to AI. Check API key or internet.";
        }
    } 

  
        function extractDebateDetails(message) {
        const match = message.match(/topic is (.+?) and I am speaking (for|against)/i);
        return match ? { topic: match[1], side: match[2].toLowerCase() } : { topic: "", side: "" };
    }

    function displayMessage(text, sender, isLoading = false) {
        const chatBox = document.createElement("div");
        chatBox.classList.add(sender === "user" ? "user-chat-box" : "ai-chat-box");

        const img = document.createElement("img");
        img.width = 70;
        img.alt = sender === "user" ? "User" : "AI";
        img.id = sender === "user" ? "userImage" : "aiImage";
        img.src = sender === "user" ? "user.png" : "ai.png";

        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-chat-area" : "ai-chat-area");

        if (isLoading) {
            messageDiv.innerHTML = `<span class="loading-text">🤖 AI is thinking...</span>`;
            chatBox.classList.add("loading");
        } else {
            messageDiv.innerHTML = text;
        }

        chatBox.appendChild(img);
        chatBox.appendChild(messageDiv);
        chatContainer.appendChild(chatBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        return chatBox; // Return message element to remove it later if needed
    }
});













/**document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.getElementById("prompt");
    const submitButton = document.getElementById("submit");
    const chatContainer = document.querySelector(".chat-container");

    let debateTopic = "";
    let userSide = "";
    let botSide = "";

    function handleUserInput() {
        const userMessage = promptInput.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, "user");
        promptInput.value = "";

        if (!debateTopic) {
            const { topic, side } = extractDebateDetails(userMessage);
            if (!topic || (side !== "for" && side !== "against")) {
                displayMessage("❌ Please specify the debate topic and whether you are speaking 'for' or 'against'.", "bot");
                return;
            }

            debateTopic = topic;
            userSide = side;
            botSide = userSide === "for" ? "against" : "for";

            displayMessage(`✔ Debate Topic: <strong>${debateTopic}</strong><br>
                You are arguing <strong>${userSide.toUpperCase()}</strong>.<br>
                I will argue <strong>${botSide.toUpperCase()}</strong>. Let's start!`, "bot");
        } else {
            fetchBotResponse(userMessage);
        }
    }

    async function fetchBotResponse(userMessage) {
        try {
            const response = await fetch("/api/debate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ debateTopic, userSide, botSide, userMessage }),
            });

            const data = await response.json();
            displayMessage(data.botResponse || "⚠ No response received. Try again!", "bot");
        } catch (error) {
            console.error("Error fetching AI response:", error);
            displayMessage("🚨 Error: Unable to connect to AI.", "bot");
        }
    }
});**/
