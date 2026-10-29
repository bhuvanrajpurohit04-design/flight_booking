"""
================================================================================
FILE: seed_data.py (Initial Database Seeder)
PROJECT: SkyVoyage - Online Flight Booking System (College Project)
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
Jab aap pehli baar project run karoge, toh aapka database bilkul khali hoga.
Agar database khali hoga toh website par search karne par koi flight nahi dikhegi.
Isliye ye script check karti hai ki agar 'flights' table khali hai, toh usmein
10 realistic Indian domestic flights (IndiGo, Air India, Vistara, Akasa, SpiceJet)
automatically insert kar deti hai.
================================================================================
"""

# models.py se 'db' aur 'Flight' table import kiya hai taaki hum nayi flights add kar sakein
from models import db, Flight

# SAMPLE_FLIGHTS: Ye dictionaries ki list hai jismein alag-alag routes ki flights ka data hai
SAMPLE_FLIGHTS = [
    {
        "flight_number": "6E-204",
        "airline": "IndiGo",
        "airline_code": "6E",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "06:15",
        "arrival_time": "09:00",
        "duration": "2h 45m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 4850.0
    },
    {
        "flight_number": "AI-802",
        "airline": "Air India",
        "airline_code": "AI",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "08:30",
        "arrival_time": "11:20",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 5400.0
    },
    {
        "flight_number": "UK-812",
        "airline": "Vistara",
        "airline_code": "UK",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "11:45",
        "arrival_time": "14:35",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 6100.0
    },
    {
        "flight_number": "QP-1304",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "14:10",
        "arrival_time": "17:00",
        "duration": "2h 50m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 4320.0
    },
    {
        "flight_number": "SG-302",
        "airline": "SpiceJet",
        "airline_code": "SG",
        "origin": "BLR",
        "origin_name": "Bengaluru (Kempegowda Intl)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "18:00",
        "arrival_time": "22:15",
        "duration": "4h 15m",
        "stops": "1 Stop (HYD)",
        "stop_count": 1,
        "base_price": 3890.0
    },
    {
        "flight_number": "6E-512",
        "airline": "IndiGo",
        "airline_code": "6E",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "07:00",
        "arrival_time": "09:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 4100.0
    },
    {
        "flight_number": "AI-665",
        "airline": "Air India",
        "airline_code": "AI",
        "origin": "BOM",
        "origin_name": "Mumbai (CSMIA)",
        "destination": "DEL",
        "destination_name": "Delhi (Indira Gandhi Intl)",
        "depart_time": "16:30",
        "arrival_time": "18:50",
        "duration": "2h 20m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 4950.0
    },
    {
        "flight_number": "6E-441",
        "airline": "IndiGo",
        "airline_code": "6E",
        "origin": "DEL",
        "origin_name": "Delhi (Indira Gandhi Intl)",
        "destination": "GOI",
        "destination_name": "Goa (Dabolim)",
        "depart_time": "09:20",
        "arrival_time": "12:00",
        "duration": "2h 40m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 5200.0
    },
    {
        "flight_number": "UK-994",
        "airline": "Vistara",
        "airline_code": "UK",
        "origin": "DEL",
        "origin_name": "Delhi (Indira Gandhi Intl)",
        "destination": "BOM",
        "destination_name": "Mumbai (CSMIA)",
        "depart_time": "15:00",
        "arrival_time": "17:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 5800.0
    },
    {
        "flight_number": "QP-1511",
        "airline": "Akasa Air",
        "airline_code": "QP",
        "origin": "DEL",
        "origin_name": "Delhi (Indira Gandhi Intl)",
        "destination": "BLR",
        "destination_name": "Bengaluru (Kempegowda Intl)",
        "depart_time": "10:00",
        "arrival_time": "12:45",
        "duration": "2h 45m",
        "stops": "Non-stop",
        "stop_count": 0,
        "base_price": 4400.0
    }
]


def seed_flights():
    """
    Ye function check karta hai ki database mein pehle se koi flight hai ya nahi.
    Agar 'Flight.query.first()' None deta hai (matlab table khali hai),
    tabhi hum sample flights add karte hain taaki duplicate flights na banein.
    """
    if Flight.query.first() is None:
        print("Seeding initial flights into database...")
        for data in SAMPLE_FLIGHTS:
            # **data dictionary ke key-value pairs ko unpack karke Flight object banata hai
            flight = Flight(**data)
            # db.session.add() nayi flight ko staging area mein rakhta hai
            db.session.add(flight)
        # db.session.commit() saari flights ko permanently database mein save kar deta hai
        db.session.commit()
        print(f"Successfully seeded {len(SAMPLE_FLIGHTS)} flights.")
    else:
        print("Database already contains flight records.")
