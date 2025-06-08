const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send');
const readBtn = document.getElementById('read');

const speechSynthesisInstance = window.speechSynthesis;
const isSpeaking = false;  // Track if speech is running


const Bot = '<span class="bot-emoji" role="img">🤖</span>';


// Add message to chat
function addMessage(sender, text, isTyping = false) {
  const messageDiv = document.createElement('p');
  messageDiv.classList.add(sender === 'bot' ? 'bot' : 'user');


  // Convert line breaks to <br>
  const formattedText = text.replace(/\n/g, "<br>");

  if (isTyping) {
    messageDiv.classList.add('typing-dots');
    messageDiv.id = 'typing';
    messageDiv.innerHTML = `<b><span class="bot-emoji" role="img">🤖</span>:</b> ${formattedText}`;
  } else {
    messageDiv.innerHTML = `<b>${sender === 'bot' ? '<span class="bot-emoji" role="img">🤖</span>' : 'You'}:</b> ${formattedText}`;
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Remove typing animation
function removeTyping() {
  const typingDiv = document.getElementById('typing');
  if (typingDiv) typingDiv.remove();
}

// Handle sending
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage('user', message);
  userInput.value = '';
  userInput.disabled = true;
  sendBtn.disabled = true;

  addMessage('bot', 'Typing', true);

  try {
    const start = Date.now();
    const response = await fetch('/get_response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const end = Date.now();
    console.log("Response took", end - start, "ms");

    const data = await response.json();
    removeTyping();

    // ✅ Instant full response display
    addMessage('bot', data.response);

  } catch (error) {
    removeTyping();
    addMessage('bot', 'Oops! Something went wrong.');
    console.error(error);
  }

  userInput.disabled = false;
  sendBtn.disabled = false;
  userInput.focus();
}


//Speak function
async function speakResponse() {
  const botMessages = [...document.querySelectorAll('#chat-box p.bot')];
  const latestBot = botMessages.at(-1);
  if (!latestBot) return alert("Nothing to read aloud.");

  const plainText = latestBot.innerText.replace(/^Bot:\s*/, '');
  if (!plainText.trim()) return alert("Nothing to read aloud.");

  // ✅ If already speaking, stop the current speech
  if (isSpeaking) {
    speechSynthesisInstance.cancel();  // Stops ongoing speech
    isSpeaking = false;
    return;
  }

  isSpeaking = true;  // Start speaking

  try {
    const utterance = new SpeechSynthesisUtterance(plainText);
    speechSynthesisInstance.speak(utterance);

    // ✅ Reset `isSpeaking` when speech ends
    utterance.onend = () => isSpeaking = false;

  } catch (err) {
    console.error("Speech error:", err);
    alert("Could not read aloud.");
    isSpeaking = false;
  }
}



// Autoresize textarea
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});


// Press Enter to send (Shift+Enter = new line)
userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // prevent newline
    sendMessage();
  }
});


// Button bindings
sendBtn.onclick = sendMessage;
readBtn.onclick = speakResponse;

