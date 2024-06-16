from flask import Flask, request
from pymongo import MongoClient
from flask_socketio import SocketIO

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://theowalton:fXDnQMMEFp8xj7Ec@cluster0.esw15iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["hackathon"]


dbname = get_database()
meeting_collection = dbname["meeting_schedules"]
meeting_archive = dbname["meeting_archive"]

def populate_mock_schema():
    meeting_collection.delete_many({"name": "mock_district"})
    meeting_collection.insert_one({
        "name": "mock_district",
        "display_name": "Mock District",
        "upcoming_meetings": [
            {
                "title": "Geese problem discussion #2",
                "start": 1719706529,
                "end": 1719710129,
                "meeting_url": "https://zoom.us/meeting",
            },
            {
                "title": "Geese problem discussion #3",
                "start": 1719792929,
                "end": 1719796529,
                "meeting_url": "https://zoom.us/meeting",
            },
        ],
    })


    meeting_archive.delete_many({"district": "mock_district"})
    meeting_archive.insert_many([
        {
            "district": "mock_district",
            "meeting_url": "https://zoom.us/meeting",
            "chat_log": "abcde",
            "start": 1717377329,
            "end": 1717380929,
        },
        {
            "district": "mock_district",
            "meeting_url": "https://zoom.us/meeting",
            "chat_log": ".....somelog",
            "start": 1717377329,
            "end": 1717380929,
        }
    ])


populate_mock_schema()

app = Flask(__name__)
socketio = SocketIO(app)
# socketio.run(app)


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('connect')
def test_connect():
    print("socket connected")


@app.route("/meeting_schedule/new", methods = ["POST"])
def new_meeting_schedule():
    if not request.json.get("name"):
        return ("schedule needs a name", 400)
    meeting_collection.delete_many({"name": str(request.json["name"])})
    meeting_collection.insert_one(request.json)
    return ("success", 200)


@app.route("/meeting_schedule/delete", methods = ["POST"])
def delete_meeting_schedule():
    meeting_collection.delete_many({"name": str(request.json["name"])})
    return ("success", 200)


@app.route("/meeting_schedule/<name>", methods = ["GET"])
def get_meeting_schedules(name):
    document = meeting_collection.find_one({"name": name})
    del document["_id"]
    if document:
        return (document, 200)
    return ("No schedules found", 404)


@app.route("/meeting_archive/new", methods = ["POST"])
def new_meeting_archive(name):
    if not request.json.get("id"):
        return ("archive needs a unique ID", 400)
    if not request.json.get("district"):
        return ("archive needs a district", 400)
    meeting_archive.insert_one(**request.json)
    return ("success", 200)


@app.route("/meeting_archive/<district>", methods = ["GET"])
def get_meeting_archives(district):
    results = meeting_archive.find({"district": district})
    if not results:
        return ("no archives found", 404)
    output = [dict(x) for x in results]
    for x in output:
        del x["_id"]
    return (output, 200)