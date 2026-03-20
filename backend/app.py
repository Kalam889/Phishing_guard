from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, supports_credentials=True)
#------CREATE REPLACEMENT-----
replacements = {
    "4": "a",
    "0": "o",
    "1": "l",
    "3": "e",
    "5": "s"
}

def normalize(text):
    for key, value in replacements.items():
        text = text.replace(key, value)
    return text


#------HOME-------
@app.route("/")
def home():
    return "Backend is running"


#-----URL----
@app.route("/url", methods=["POST"])
def get_url():
    data = request.json
    url = data.get("url")    
    if not url:
        return jsonify({"error":"No url provided"}), 400
    url = url.lower()    
    normalized_url = normalize(url)
    risk = 0
    if "http://" in url:
        risk += 1
    if "login" in url or "verify" in url:
        risk += 1
    if url.endswith(".xyz") or url.endswith(".ru"):
        risk += 1
    brands = ["amazon", "google", "paypal"]
    keywords = ["login", "verify", "secure"]
    # for brand in brands:   
    #     if brand in url:
    #         if any(word in url  for word in keywords):
    #                 risk += 2
    for brand in brands:
        if brand in normalized_url:
            if any(word in normalized_url for word in keywords):
                risk += 2
                break
    if risk >= 2:
        result = "Phishing"
    elif risk == 1:
        result = "Suspicious"
    else:
        result = "Safe"
    return jsonify({"url":url,
                    "risk": risk,
                    "result": result})
        
if __name__ == "__main__":
    app.run(debug=True)
    