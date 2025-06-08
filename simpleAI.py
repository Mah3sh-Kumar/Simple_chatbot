# simpleAI.py


import google.generativeai as ai
import markdown
import pyttsx3
import os
import threading
import logging
import html

# API key setup and validation
apiKey = os.getenv("GOOGLE_API_KEY")
if not apiKey:
    logging.error("GOOGLE_API_KEY not found in environment variables. Exiting.")
    raise EnvironmentError("Missing GOOGLE_API_KEY environment variable.")

ai.configure(api_key=apiKey)
model = ai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat()

# Text-to-speech setup
engine = pyttsx3.init()
engine.setProperty('rate', 200)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id if len(voices) > 1 else voices[0].id)

def say(text: str):
    def speak():
        logging.info(f"Speaking: {text}")
        engine.say(text)
        engine.runAndWait()
    threading.Thread(target=speak, daemon=True).start()

def get_response(user_input: str) -> str:
    if not user_input.strip():
        return "Please enter something meaningful."
    
    try:
        response = chat.send_message(user_input)
        # Convert markdown to HTML safely
        cleaned_response = markdown.markdown(response.text)
        # Optionally escape untrusted HTML here
        return cleaned_response
    except Exception as e:
        logging.error(f"Error fetching Gemini response: {e}")
        # Return user-friendly message without raw exception text
        return "<i>Sorry, I couldn't process that. Please try again.</i>"
