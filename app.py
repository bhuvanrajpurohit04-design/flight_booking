"""
================================================================================
FILE: app.py (Main Backend Server & REST APIs - Pro v2 Edition)
PROJECT: SkyVoyage Pro - Multi-Passenger, Lounge Pass, Weather Advisory & Cabs
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
1. Multi-Passenger Seat Locking (`GET /api/flights/<id>/seats` splits comma-separated seats)
2. Multi-Passenger Booking (`POST /api/book` saves 1 to 4 passengers & their seats)
3. Feature #1: Smart Airport Lounge & Meal Pass Recommender (`loungeIncluded`, `loungeFee`)
4. Feature #5: Destination Weather & Packing Advisory (`DESTINATION_WEATHER` dictionary)
================================================================================
"""

import os
import random
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from models import db, Flight, Booking, Passenger
from seed_data import seed_flights


# ==============================================================================
# FEATURE #5: DESTINATION LIVE WEATHER & PACKING ADVISORY DATA
# ==============================================================================
DESTINATION_WEATHER = {
    "DEL": {
        "temp": "22°C",
        "condition": "Pleasant & Crisp Haze",
        "icon": "🌤️",
        "packingTip": "Carry a light jacket or shawl for cool Delhi mornings & evenings."
    },
    "BLR": {
        "temp": "24°C",
        "condition": "Cool & Breezy",
        "icon": "⛅",
        "packingTip": "Bengaluru evenings are pleasant (19°C); pack a light hoodie & umbrella."
    },
    "BOM": {
        "temp": "30°C",
        "condition": "Warm Coastal Breeze",
        "icon": "☀️",
        "packingTip": "Pack breathable cotton clothes & sunglasses for Mumbai's humid weather."
    },
    "GOI": {
        "temp": "31°C",
        "condition": "Sunny Tropical Beach Weather",
        "icon": "🌴",
        "packingTip": "Pack resort wear, flip-flops, sunglasses & SPF 50 sunscreen for Goa!"
    },
    "HYD": {
        "temp": "27°C",
        "condition": "Clear & Sunny",
        "icon": "☀️",
        "packingTip": "Light cotton formals or casuals are ideal for Hyderabad's warm afternoons."
    },
    "CCU": {
        "temp": "26°C",
        "condition": "Mild & Humid",
        "icon": "🌤️",
        "packingTip": "Carry light cotton outfits and a compact umbrella for Kolkata."
    },
    "MAA": {
        "temp": "31°C",
        "condition": "Warm & Humid",
        "icon": "☀️",
        "packingTip": "Light linen/cotton clothes and hydration bottle recommended for Chennai."
    },
    "JAI": {
        "temp": "25°C",
        "condition": "Sunny Days & Cool Desert Nights",
        "icon": "🏜️",
        "packingTip": "Pack sunglasses for daytime forts and a light sweater for Jaipur nights."
    }
}

# ==============================================================================
# AI FARE PREDICTOR DATA
# ==============================================================================
ROUTE_PRICE_TRENDS = {
    "BLR-DEL": {
        "fairBand": "₹6,400 – ₹9,600",
        "currentLowest": 9408,
        "recommendation": "WAIT / FLY NOV 8–10 TO SAVE ₹3,145",
        "confidence": 89,
        "badgeType": "wait",
        "insight": "Peak festive demand makes Nov 5–6 expensive (up to ₹13,958). Shifting your trip to Nov 8–10 drops nonstop IndiGo & Akasa fares to ₹9,408 (saving ₹4,550!).",
        "bestWindow": "Book 2–5 months ahead or travel Tue/Sun (saves ~₹1,600)",
        "driveTime": "35 min from DEL T3 to Connaught Place",
        "days": [
            {"date": "2026-10-31", "label": "31 Oct", "price": 11483},
            {"date": "2026-11-01", "label": "01 Nov", "price": 12553},
            {"date": "2026-11-02", "label": "02 Nov", "price": 10276},
            {"date": "2026-11-05", "label": "05 Nov", "price": 12553},
            {"date": "2026-11-06", "label": "06 Nov", "price": 13958},
            {"date": "2026-11-08", "label": "08 Nov", "price": 9759},
            {"date": "2026-11-09", "label": "09 Nov", "price": 9408}
        ]
    },
    "DEL-BLR": {
        "fairBand": "₹6,300 – ₹9,600",
        "currentLowest": 9026,
        "recommendation": "BOOK NOW",
        "confidence": 91,
        "badgeType": "buy",
        "insight": "Current fares (₹9,026 – ₹9,410) are within the fair range before mid-November surge when DEL→BLR climbs to ₹13,682.",
        "bestWindow": "Book at least 14 days ahead before Nov 10 price spike",
        "driveTime": "59 min from BLR Airport to Bengaluru city center",
        "days": [
            {"date": "2026-10-31", "label": "31 Oct", "price": 9354},
            {"date": "2026-11-02", "label": "02 Nov", "price": 9181},
            {"date": "2026-11-03", "label": "03 Nov", "price": 9026},
            {"date": "2026-11-05", "label": "05 Nov", "price": 9410},
            {"date": "2026-11-08", "label": "08 Nov", "price": 8724},
            {"date": "2026-11-11", "label": "11 Nov", "price": 11830},
            {"date": "2026-11-14", "label": "14 Nov", "price": 13682}
        ]
    },
    "BOM-DEL": {
        "fairBand": "₹5,400 – ₹7,100",
        "currentLowest": 6475,
        "recommendation": "BOOK NOW (GREAT DEAL)",
        "confidence": 94,
        "badgeType": "buy",
        "insight": "Fares starting at ₹6,475 – ₹6,895 are right inside the lowest historical band for Mumbai to New Delhi (2h 05m nonstop).",
        "bestWindow": "Book 8+ days before departure; avoid Thursday evening peaks",
        "driveTime": "35 min from DEL Airport to New Delhi center",
        "days": [
            {"date": "2026-10-31", "label": "31 Oct", "price": 7525},
            {"date": "2026-11-01", "label": "01 Nov", "price": 6895},
            {"date": "2026-11-03", "label": "03 Nov", "price": 8206},
            {"date": "2026-11-05", "label": "05 Nov", "price": 10002},
            {"date": "2026-11-06", "label": "06 Nov", "price": 9534},
            {"date": "2026-11-08", "label": "08 Nov", "price": 6475},
            {"date": "2026-11-09", "label": "09 Nov", "price": 6475}
        ]
    },
    "DEL-GOI": {
        "fairBand": "₹4,900 – ₹8,000",
        "currentLowest": 6507,
        "recommendation": "BOOK IMMEDIATELY",
        "confidence": 96,
        "badgeType": "buy",
        "insight": "Nonstop flights to Goa are ₹6,507 right now through Nov 8, but jump sharply to ₹11,436 starting Nov 9 due to tourist rush!",
        "bestWindow": "Lock in ₹6,507 before Nov 8 (+₹4,929 surge expected)",
        "driveTime": "1 hr 19 min from Goa Airport to Panjim / North Goa beaches",
        "days": [
            {"date": "2026-10-31", "label": "31 Oct", "price": 6612},
            {"date": "2026-11-02", "label": "02 Nov", "price": 6507},
            {"date": "2026-11-04", "label": "04 Nov", "price": 6507},
            {"date": "2026-11-05", "label": "05 Nov", "price": 6507},
            {"date": "2026-11-08", "label": "08 Nov", "price": 6693},
            {"date": "2026-11-09", "label": "09 Nov", "price": 11436},
            {"date": "2026-11-10", "label": "10 Nov", "price": 10976}
        ]
    },
    "BLR-HYD": {
        "fairBand": "₹4,500 – ₹6,200",
        "currentLowest": 5091,
        "recommendation": "BOOK NOW",
        "confidence": 88,
        "badgeType": "buy",
        "insight": "Nonstop 1h 20m flights are at their floor price of ₹5,091 on Nov 2 and Nov 8–13 (compared to ₹8,226 on Friday Nov 6).",
        "bestWindow": "Book 6+ days ahead; Mon/Tue/Sun flights are ₹3,100 cheaper than Friday",
        "driveTime": "47 min from HYD Airport to HITEC City / Banjara Hills",
        "days": [
            {"date": "2026-10-31", "label": "31 Oct", "price": 6227},
            {"date": "2026-11-02", "label": "02 Nov", "price": 5091},
            {"date": "2026-11-04", "label": "04 Nov", "price": 6064},
            {"date": "2026-11-05", "label": "05 Nov", "price": 7245},
            {"date": "2026-11-06", "label": "06 Nov", "price": 8226},
            {"date": "2026-11-08", "label": "08 Nov", "price": 5091},
            {"date": "2026-11-09", "label": "09 Nov", "price": 5091}
        ]
    }
}


def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    CORS(app)

    database_url = os.getenv('DATABASE_URL', 'sqlite:///skyvoyage_v2.db')
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)

    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'skyvoyage-college-project-secret-key')

    db.init_app(app)

    with app.app_context():
        db.create_all()
        seed_flights()

    @app.route('/')
    def index():
        return render_template('index.html')

    # API 1: Search Flights
    @app.route('/api/flights', methods=['GET'])
    def search_flights():
        origin = request.args.get('origin', '').upper()
        destination = request.args.get('destination', '').upper()
        max_price = request.args.get('max_price', type=float)
        sort_by = request.args.get('sort', 'price')

        query = Flight.query
        if origin and destination:
            query = query.filter_by(origin=origin, destination=destination)
        if max_price:
            query = query.filter(Flight.base_price <= max_price)

        flights = query.all()

        if not flights and origin and destination and origin != destination:
            f1_num = f"6E-{random.randint(100, 899)}"
            f2_num = f"AI-{random.randint(100, 899)}"
            if not Flight.query.filter_by(flight_number=f1_num).first():
                db.session.add(Flight(
                    flight_number=f1_num, airline='IndiGo', airline_code='6E', aircraft='Airbus A320neo',
                    origin=origin, origin_name=origin, destination=destination, destination_name=destination,
                    depart_time='07:30', arrival_time='10:10', duration='2h 40m',
                    stops='Non-stop', stop_count=0, base_price=6850.0, total_seats=42
                ))
            if not Flight.query.filter_by(flight_number=f2_num).first():
                db.session.add(Flight(
                    flight_number=f2_num, airline='Air India', airline_code='AI', aircraft='Airbus A321',
                    origin=origin, origin_name=origin, destination=destination, destination_name=destination,
                    depart_time='14:15', arrival_time='17:00', duration='2h 45m',
                    stops='Non-stop', stop_count=0, base_price=7490.0, total_seats=42
                ))
            db.session.commit()
            flights = Flight.query.filter_by(origin=origin, destination=destination).all()

        flights_data = [f.to_dict() for f in flights]

        if sort_by == 'price':
            flights_data.sort(key=lambda x: x['price'])
        elif sort_by == 'duration':
            flights_data.sort(key=lambda x: x['duration'])
        elif sort_by == 'depart':
            flights_data.sort(key=lambda x: x['departTime'])

        return jsonify({'success': True, 'count': len(flights_data), 'data': flights_data})

    # API 2: AI Fare Predictor + Destination Weather Advisory
    @app.route('/api/predict', methods=['GET'])
    def predict_fares():
        origin = request.args.get('origin', 'BLR').upper()
        destination = request.args.get('destination', 'DEL').upper()
        key = f"{origin}-{destination}"
        weather = DESTINATION_WEATHER.get(destination, DESTINATION_WEATHER["DEL"])

        if key in ROUTE_PRICE_TRENDS:
            pred = {**ROUTE_PRICE_TRENDS[key], "weather": weather}
            return jsonify({'success': True, 'route': key, 'prediction': pred})

        default_pred = {
            "fairBand": "₹5,800 – ₹8,400",
            "currentLowest": 6850,
            "recommendation": "BOOK NOW",
            "confidence": 87,
            "badgeType": "buy",
            "insight": f"Fares for {origin} → {destination} are currently stable at ₹6,850, which is ₹1,100 below the weekend surge average.",
            "bestWindow": "Book 14–21 days ahead; Tuesday & Wednesday mornings are 18% cheaper",
            "driveTime": "45 min from Arrival Terminal to City Center",
            "weather": weather,
            "days": [
                {"date": "2026-10-31", "label": "31 Oct", "price": 7200},
                {"date": "2026-11-02", "label": "02 Nov", "price": 6850},
                {"date": "2026-11-04", "label": "04 Nov", "price": 6850},
                {"date": "2026-11-06", "label": "06 Nov", "price": 8490},
                {"date": "2026-11-08", "label": "08 Nov", "price": 6490},
                {"date": "2026-11-09", "label": "09 Nov", "price": 6350},
                {"date": "2026-11-10", "label": "10 Nov", "price": 6350}
            ]
        }
        return jsonify({'success': True, 'route': key, 'prediction': default_pred})

    # API 3: Occupied Seats Check (Supports Multi-Seat Bookings)
    @app.route('/api/flights/<int:flight_id>/seats', methods=['GET'])
    def get_flight_seats(flight_id):
        travel_date = request.args.get('date')
        query = Booking.query.filter_by(flight_id=flight_id, status='CONFIRMED')
        if travel_date:
            query = query.filter_by(travel_date=travel_date)
        bookings = query.all()

        # Har booking mein comma-separated seats ho sakti hain (jaise '3A, 3B'), unhe alag karke list banana
        taken_seats = []
        for b in bookings:
            for s in b.seat_number.split(','):
                if s.strip():
                    taken_seats.append(s.strip())

        default_occupied = ['1A', '2C', '3D', '4F', '5B']
        all_occupied = list(set(taken_seats + default_occupied))
        return jsonify({'success': True, 'flightId': flight_id, 'occupiedSeats': all_occupied})

    # API 4: Multi-Passenger Booking + Lounge Pass + Airport Cab
    @app.route('/api/book', methods=['POST'])
    def book_flight():
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No JSON payload provided'}), 400

        flight = Flight.query.get(data.get('flightId'))
        if not flight:
            return jsonify({'success': False, 'message': 'Flight does not exist'}), 404

        # Selected seats list (jaise ['3A', '3B'])
        seats_list = data.get('seats') or ([data['seat']] if 'seat' in data else [])
        if not seats_list:
            return jsonify({'success': False, 'message': 'Please select seats for all passengers.'}), 400

        # Check seat conflict across existing bookings for this flight and date
        existing_bookings = Booking.query.filter_by(
            flight_id=flight.id,
            travel_date=data['travelDate'],
            status='CONFIRMED'
        ).all()
        already_taken = set()
        for eb in existing_bookings:
            for s in eb.seat_number.split(','):
                if s.strip():
                    already_taken.add(s.strip())

        for s in seats_list:
            if s in already_taken:
                return jsonify({'success': False, 'message': f"Seat {s} is already booked. Please choose another seat."}), 409

        # Passengers array read karna
        passengers_input = data.get('passengers')
        if not passengers_input and 'passenger' in data:
            passengers_input = [data['passenger']]

        pax_count = len(passengers_input)

        while True:
            generated_pnr = f"SV-{random.randint(100000, 999999)}"
            if not Booking.query.filter_by(pnr=generated_pnr).first():
                break

        # Multi-Passenger Fare Calculation
        base_fare = flight.base_price * pax_count
        tax_amount = round(base_fare * 0.12, 2)
        seat_fee = float(data.get('seatFee', 150.0 * pax_count))
        lounge_included = bool(data.get('loungeIncluded', False))
        lounge_fee = float(data.get('loungeFee', 0.0))
        cab_type = data.get('cabType', 'None')
        cab_fee = float(data.get('cabFee', 0.0))
        cab_pickup_time = data.get('cabPickupTime', 'N/A')
        total_amount = base_fare + tax_amount + seat_fee + lounge_fee + cab_fee

        new_booking = Booking(
            pnr=generated_pnr,
            flight_id=flight.id,
            travel_date=data['travelDate'],
            travel_class=data.get('travelClass', 'Economy'),
            passenger_count=pax_count,
            seat_number=', '.join(seats_list),
            seat_fee=seat_fee,
            base_fare=base_fare,
            tax_amount=tax_amount,
            lounge_included=lounge_included,
            lounge_fee=lounge_fee,
            cab_type=cab_type,
            cab_fee=cab_fee,
            cab_pickup_time=cab_pickup_time,
            total_amount=total_amount,
            gate=f"G-{random.randint(2, 19)}",
            terminal=f"T{random.randint(1, 3)}"
        )
        db.session.add(new_booking)
        db.session.flush()

        # Save each passenger in the database with their assigned seat
        for idx, p_info in enumerate(passengers_input):
            assigned_seat = seats_list[idx] if idx < len(seats_list) else seats_list[-1]
            new_passenger = Passenger(
                booking_id=new_booking.id,
                full_name=p_info['fullName'].strip(),
                age=int(p_info['age']),
                gender=p_info['gender'],
                seat_assigned=assigned_seat,
                email=p_info.get('email', 'guest@college.edu').strip(),
                phone=p_info.get('phone', '9876543210').strip()
            )
            db.session.add(new_passenger)

        db.session.commit()

        return jsonify({
            'success': True,
            'message': f'Booked successfully for {pax_count} passenger(s)!',
            'booking': new_booking.to_dict()
        }), 201

    # API 5: Get All Bookings
    @app.route('/api/bookings', methods=['GET'])
    def get_all_bookings():
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
        return jsonify({'success': True, 'data': [b.to_dict() for b in bookings]})

    # API 6: Cancel Booking
    @app.route('/api/bookings/<string:pnr>', methods=['DELETE'])
    def cancel_booking(pnr):
        booking = Booking.query.filter_by(pnr=pnr.upper()).first()
        if not booking:
            return jsonify({'success': False, 'message': 'Booking not found'}), 404
        booking.status = 'CANCELLED'
        db.session.commit()
        return jsonify({'success': True, 'message': f'Booking {pnr} cancelled.'})

    # API 7: SkyBot AI Travel Assistant
    @app.route('/api/chat', methods=['POST'])
    def chatbot_reply():
        body = request.get_json() or {}
        msg = (body.get('message') or '').lower()
        origin = (body.get('origin') or 'BLR').upper()
        dest = (body.get('destination') or 'DEL').upper()

        flights = Flight.query.filter_by(origin=origin, destination=dest).order_by(Flight.base_price.asc()).all()
        cheapest = flights[0] if flights else None
        weather = DESTINATION_WEATHER.get(dest, DESTINATION_WEATHER["DEL"])

        if any(w in msg for w in ['cheap', 'sasti', 'sasta', 'lowest', 'price', 'fare', 'kitne']):
            if cheapest:
                reply = f"For {origin} → {dest}, the cheapest flight is {cheapest.airline} ({cheapest.flight_number}) departing at {cheapest.depart_time} for ₹{int(cheapest.base_price):,}/traveler."
            else:
                reply = f"Fares for {origin} → {dest} start around ₹5,091 – ₹9,408."
        elif any(w in msg for w in ['weather', 'mausam', 'temp', 'pack', 'jacket']):
            reply = f"Destination Weather in {dest}: {weather['icon']} {weather['temp']} ({weather['condition']}). Packing Tip: {weather['packingTip']}"
        elif any(w in msg for w in ['lounge', 'meal', 'food', 'layover', 'vip']):
            reply = "You can add the VIP Airport Lounge & Hot Buffet Pass for just ₹299/traveler (78% off airport walk-in rates) inside the booking popup!"
        elif any(w in msg for w in ['group', 'multiple', 'family', 'passengers', 'kitne log']):
            reply = "You can book for 1 to 4 Passengers together! Select the passenger count in the Search box, pick multiple seats on the aircraft map (e.g. 3A, 3B), and fill in each traveler's name."
        elif any(w in msg for w in ['cab', 'taxi', 'airport', 'car']):
            reply = "Our Landing-Synced Airport Cabs are scheduled 20 mins after your flight lands: Mini Hatch (₹499), BluSmart EV Sedan (₹749), or Prime SUV Innova (₹1,199 for groups of 4+)."
        else:
            reply = f"Hi! I'm SkyBot AI ✈️. Currently viewing {origin} → {dest} ({weather['icon']} {weather['temp']}). Ask me about 'cheapest flight', 'group booking', 'VIP lounge pass', 'weather tip', or 'airport cab'!"

        return jsonify({'success': True, 'reply': reply})

    return app


if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5050))
    print("\n=======================================================")
    print(f" SkyVoyage Pro v2 Server Running on: http://127.0.0.1:{port}")
    print(f" Active Database: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print("=======================================================\n")
    app.run(host='127.0.0.1', port=port, debug=True)
