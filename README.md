# 🚀 **Simple Chatbot**  

A lightweight Flask web application integrating **Google’s Generative AI (Gemini)** for conversational AI with **text-to-speech** support.  

## ✨ **Features**  

- 💬 **Interactive chat interface** powered by **Google Generative AI Gemini-1.5** model.  
- 🔊 **Text-to-speech (TTS)** functionality using `pyttsx3` for reading bot responses aloud.  
- 📝 **Markdown parsing** for formatted AI responses.  
- 🎨 **Clean, responsive UI** built with **HTML, CSS, and JavaScript**.  
- 🔐 **Environment variable support** for **secure API key management**.  


## 🚀 **Getting Started**  


### ✅ **Prerequisites**  

- 🐍 Python **3.10** or above  
- 🔑 A **Google Generative AI API key**  


### 🛠 **Installation**  

1️⃣ **Clone the repository:**  

   ```bash
   git clone https://github.com/<your-username>/Simple_chatbot.git
   cd Simple_chatbot
   ```  

2️⃣ **Create and activate a virtual environment** _(recommended)_:  

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```  

3️⃣ **Install dependencies:**  

   ```bash
   pip install -r requirements.txt
   ```  

4️⃣ **Set your Google API key as an environment variable:**  

   - On **macOS/Linux**:  

     ```bash
     export GOOGLE_API_KEY="your_api_key_here"
     ```  

   - On **Windows (PowerShell)**:  

     ```powershell
     setx GOOGLE_API_KEY "your_api_key_here"
     ```  

5️⃣ **Run the application:**  

   ```bash
   python main.py
   ```  

   Open your browser and navigate to: **[http://127.0.0.1:5000](http://127.0.0.1:5000)** to start chatting with the AI.  

## 📂 **Project Structure**  

```
📁 Simple_chatbot/
 ├── 📝 main.py          # Flask application entry point handling routes and API
 ├── 🧠 simpleAI.py      # Core logic interacting with Google Generative AI and TTS
 ├── 📂 templates/       # HTML templates for UI
 ├── 🎨 static/         # CSS and JavaScript assets
```

## 📌 **Notes**  

- 🔧 This project is intended for **development and learning** purposes.  
- 🚀 For **production**, consider deploying with a **production-grade WSGI server**.  
- 🔑 **Keep your API keys secure!** _Never commit them to public repositories._  

## 📜 **License**  

📝 This project is licensed under the **MIT License**.  

