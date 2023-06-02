# Import the required libraries
import os
import json
import requests
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask_cors import CORS, cross_origin 

# Load the model and tokenizer
model_name = "moyix/csrc_774m"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define the flask app
app = Flask(__name__)
CORS(app) 

# Define the endpoint for generating text
@cross_origin
@app.route("/generate", methods=["POST"])
def generate():
    # Get the input data from the request
    data = request.get_json()
    # Validate the input data
    if not data or not data.get("text"):
        return jsonify({"error": "Invalid input data"})
    
    # Get the text from the input data
    text = data["text"]
    
    tokenizer.pad_token = tokenizer.eos_token
    # Encode the text as input ids
    input_ids = tokenizer.encode(text, return_tensors="pt", padding=True, truncation=True)
    attention_mask = input_ids.ne(tokenizer.pad_token_id)
    
    # Generate text using the model
    output_ids = model.generate(input_ids, max_length=200, attention_mask=attention_mask, pad_token_id=tokenizer.pad_token_id)

    # Decode the output ids as text
    output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    # Return the output text as json response
    return jsonify({"text": output_text})

# Define the main function to run the app
if __name__ == "__main__":
    # Set the port number
    # port = int(os.environ.get("PORT", 5000))
    # Run the app on the specified port
    app.run(host="0.0.0.0", port=5000)
