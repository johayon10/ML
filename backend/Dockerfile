# Use the official python image as base
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt /app

# Install the required python packages
RUN pip install -r requirements.txt

# Copy the rest of the code to the working directory
COPY . /app

# Expose port 5000 for the flask app
EXPOSE 5000

# Run the app when the container launches
CMD ["python", "app.py"]
