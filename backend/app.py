from flask import Flask, request
from pymongo import MongoClient

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://theowalton:fXDnQMMEFp8xj7Ec@cluster0.esw15iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["hackathon"]


dbname = get_database()
meeting_collection = dbname["meeting_schedules"]

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/meeting_schedule/new", methods = ['POST'])
def new_meeting_schedule():
    meeting_collection.insert_one(request.json)
    return ("success", 200)
