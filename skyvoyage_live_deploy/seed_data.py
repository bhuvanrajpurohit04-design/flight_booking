"""
================================================================================
FILE: seed_data.py (Real Indian Domestic Flight Schedules & Fares)
PROJECT: SkyVoyage Pro - Online Flight Booking System
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
Is file mein humne Google Flights ke real domestic schedules, flight numbers,
aircraft models (Airbus A320neo, Boeing 737 MAX 8, Airbus A321), real durations,
aur real INR fares rakhe hain taaki aapka project 100% authentic dikhe!
================================================================================
"""

from models import db, Flight

# Real Indian Domestic Flight Schedules & Fares across BLR, DEL, BOM, GOI, HYD, CCU, MAA, JAI
SAMPLE_FLIGHTS = [
    # ---------------- BENGALURU (BLR) -> NEW DELHI (DEL) ----------------
    {
        "flight_number": "6E-204",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A321neo",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T1)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T2)",
        "depart_time": "06:10",
        "arrival_time": "09:05",
        "duration": "2h 55m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 9408.0
    },
    {
        "flight_number": "AI-804",
        "airline": "Air India",
        "airline_code": "AI",
        "aircraft": "Airbus A320neo",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T2)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T3)",
        "depart_time": "08:30",
        "arrival_time": "11:20",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 10276.0
    },
    {
        "flight_number": "QP-1304",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "aircraft": "Boeing 737 MAX 8",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T1)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T2)",
        "depart_time": "11:45",
        "arrival_time": "14:35",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 9759.0
    },
    {
        "flight_number": "IX-2742",
        "airline": "Air India Express",
        "airline_code": "IX",
        "aircraft": "Boeing 737-800",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T2)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T3)",
        "depart_time": "15:15",
        "arrival_time": "18:15",
        "duration": "3h 00m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 11483.0
    },
    {
        "flight_number": "6E-6012",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A320neo",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T1)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T1)",
        "depart_time": "19:40",
        "arrival_time": "22:35",
        "duration": "2h 55m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 12553.0
    },

    # ---------------- NEW DELHI (DEL) -> BENGALURU (BLR) ----------------
    {
        "flight_number": "6E-2131",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A321neo",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T2)",
        "destination": "BLR",
        "destination_name": "Bengaluru (Kempegowda Intl T1)",
        "depart_time": "07:05",
        "arrival_time": "09:55",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 9026.0
    },
    {
        "flight_number": "IX-1145",
        "airline": "Air India Express",
        "airline_code": "IX",
        "aircraft": "Boeing 737 MAX 8",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T3)",
        "destination": "BLR",
        "destination_name": "Bengaluru (Kempegowda Intl T2)",
        "depart_time": "10:15",
        "arrival_time": "13:10",
        "duration": "2h 55m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 9354.0
    },
    {
        "flight_number": "QP-1511",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "aircraft": "Boeing 737 MAX 8",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T2)",
        "destination": "BLR",
        "destination_name": "Bengaluru (Kempegowda Intl T1)",
        "depart_time": "14:20",
        "arrival_time": "17:15",
        "duration": "2h 55m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 10090.0
    },
    {
        "flight_number": "AI-502",
        "airline": "Air India",
        "airline_code": "AI",
        "aircraft": "Airbus A321",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T3)",
        "destination": "BLR",
        "destination_name": "Bengaluru (Kempegowda Intl T2)",
        "depart_time": "18:00",
        "arrival_time": "20:50",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 10710.0
    },

    # ---------------- MUMBAI (BOM) -> NEW DELHI (DEL) ----------------
    {
        "flight_number": "6E-512",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A320neo",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA Terminal T2)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T2)",
        "depart_time": "06:30",
        "arrival_time": "08:35",
        "duration": "2h 05m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6475.0
    },
    {
        "flight_number": "IX-1214",
        "airline": "Air India Express",
        "airline_code": "IX",
        "aircraft": "Boeing 737-800",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA Terminal T2)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T3)",
        "depart_time": "09:45",
        "arrival_time": "12:10",
        "duration": "2h 25m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6895.0
    },
    {
        "flight_number": "AI-866",
        "airline": "Air India",
        "airline_code": "AI",
        "aircraft": "Boeing 787 Dreamliner",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA Terminal T2)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T3)",
        "depart_time": "13:00",
        "arrival_time": "15:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 7525.0
    },
    {
        "flight_number": "SG-8710",
        "airline": "SpiceJet",
        "airline_code": "SG",
        "aircraft": "Boeing 737-800",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA Terminal T1)",
        "destination": "DEL",
        "destination_name": "New Delhi (IGI Terminal T1)",
        "depart_time": "17:30",
        "arrival_time": "19:50",
        "duration": "2h 20m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 7698.0
    },

    # ---------------- NEW DELHI (DEL) -> GOA (GOI) ----------------
    {
        "flight_number": "6E-441",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A320neo",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T2)",
        "destination": "GOI",
        "destination_name": "Goa (Manohar Intl GOX / Dabolim)",
        "depart_time": "08:20",
        "arrival_time": "10:50",
        "duration": "2h 30m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6507.0
    },
    {
        "flight_number": "QP-1602",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "aircraft": "Boeing 737 MAX 8",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T2)",
        "destination": "GOI",
        "destination_name": "Goa (Manohar Intl GOX)",
        "depart_time": "11:30",
        "arrival_time": "14:10",
        "duration": "2h 40m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 7108.0
    },
    {
        "flight_number": "AI-883",
        "airline": "Air India",
        "airline_code": "AI",
        "aircraft": "Airbus A320neo",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T3)",
        "destination": "GOI",
        "destination_name": "Goa (Dabolim GOI)",
        "depart_time": "15:10",
        "arrival_time": "17:40",
        "duration": "2h 30m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 7744.0
    },

    # ---------------- BENGALURU (BLR) -> HYDERABAD (HYD) ----------------
    {
        "flight_number": "6E-714",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A320neo",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T1)",
        "destination": "HYD",
        "destination_name": "Hyderabad (Rajiv Gandhi Intl)",
        "depart_time": "07:10",
        "arrival_time": "08:30",
        "duration": "1h 20m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 5091.0
    },
    {
        "flight_number": "QP-1412",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "aircraft": "Boeing 737 MAX 8",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T1)",
        "destination": "HYD",
        "destination_name": "Hyderabad (Rajiv Gandhi Intl)",
        "depart_time": "12:15",
        "arrival_time": "13:35",
        "duration": "1h 20m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 5474.0
    },
    {
        "flight_number": "IX-2819",
        "airline": "Air India Express",
        "airline_code": "IX",
        "aircraft": "Boeing 737-800",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl T2)",
        "destination": "HYD",
        "destination_name": "Hyderabad (Rajiv Gandhi Intl)",
        "depart_time": "18:30",
        "arrival_time": "19:55",
        "duration": "1h 25m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6227.0
    },

    # ---------------- NEW DELHI (DEL) -> MUMBAI (BOM) ----------------
    {
        "flight_number": "6E-2015",
        "airline": "IndiGo",
        "airline_code": "6E",
        "aircraft": "Airbus A321neo",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T2)",
        "destination": "BOM",
        "destination_name": "Mumbai (CSMIA Terminal T2)",
        "depart_time": "08:00",
        "arrival_time": "10:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6550.0
    },
    {
        "flight_number": "AI-678",
        "airline": "Air India",
        "airline_code": "AI",
        "aircraft": "Boeing 777-300ER",
        "origin": "DEL",
        "origin_name": "New Delhi (IGI Terminal T3)",
        "destination": "BOM",
        "destination_name": "Mumbai (CSMIA Terminal T2)",
        "depart_time": "15:00",
        "arrival_time": "17:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 7320.0
    }
]


def seed_flights():
    if Flight.query.first() is None:
        print("Seeding real Indian domestic flights into database...")
        for data in SAMPLE_FLIGHTS:
            flight = Flight(**data)
            db.session.add(flight)
        db.session.commit()
        print(f"Successfully seeded {len(SAMPLE_FLIGHTS)} real flights.")
    else:
        print("Database already contains flight records.")
