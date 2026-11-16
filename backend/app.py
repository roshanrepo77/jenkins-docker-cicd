
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/plan", methods=["POST"])
def create_trip():

    data = request.get_json(silent=True) or {}

    destination = data.get("destination")
    budget = data.get("budget")
    days = data.get("days")

    if not destination or not budget or not days:
        return jsonify({
            "error": "Please provide destination, budget and days"
        }), 400

    try:
        budget = float(budget)
        days = int(days)

        if budget <= 0 or days < 1 or days > 30:
            raise ValueError()

    except (ValueError, TypeError):
        return jsonify({
            "error": "Invalid budget or trip duration"
        }), 400

    activities = [
        "Explore famous local attractions",
        "Discover local food and culture",
        "Visit scenic locations",
        "Enjoy outdoor adventures",
        "Explore hidden gems",
        "Experience local shopping",
        "Enjoy your final day"
    ]

    itinerary = []

    for day in range(1, days + 1):
        itinerary.append({
            "day": day,
            "activity": activities[(day - 1) % len(activities)]
        })

    return jsonify({
        "success": True,
        "destination": destination,
        "budget": budget,
        "days": days,
        "daily_budget": round(budget / days, 2),
        "itinerary": itinerary
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
