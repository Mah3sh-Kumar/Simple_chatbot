from flask import Flask, render_template, request, jsonify 
from simpleAI import get_response, say
import time
from bs4 import BeautifulSoup



app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')




#Response
@app.route('/get_response', methods=['POST'])
def get_bot_response():
    start = time.time()
    user_input = request.json.get('message')
    response = get_response(user_input)

    # Remove HTML tags if any accidentally added
    if '<' in response:
        soup = BeautifulSoup(response, 'html.parser')
        response = soup.get_text()

    print("Bot response time: ", time.time() - start)
    return jsonify({'response': response})


@app.route('/read_response', methods=['POST'])
def read_text():
    data = request.get_json()
    print("Receiving for speak..")
    text = data.get("response", "")
    try:
        say(text)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)
