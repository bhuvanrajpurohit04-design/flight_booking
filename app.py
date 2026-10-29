"""
================================================================================
FILE: app.py (Main Backend Server & REST APIs)
PROJECT: SkyVoyage - Online Flight Booking System (College Project)
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
Ye humare project ka dimaag (Backend Server) hai jo Python Flask par bana hai.
Iska kaam hai:
1. User ko Frontend HTML page dikhana (`/` route).
2. Frontend se aane wali search requests ke liye Database se flights dhoondh kar laana.
3. Seat khali hai ya nahi wo check karna (Double-booking rokna).
4. Ticket book karna, 6-digit PNR code banana, aur GST ke sath total fare calculate karna.
5. Booking cancel karna ya boarding pass ka data dena.
================================================================================
"""

# os: Environment variables (jaise DATABASE_URL ya PORT) padhne ke liye
import os
# random: Unique 6-digit PNR number aur random Gate/Terminal generate karne ke liye
import random
# Flask utilities: Server banane, HTML template render karne, aur JSON response bhejne ke liye
from flask import Flask, render_template, request, jsonify
# CORS: Cross-Origin Resource Sharing enable karne ke liye taaki frontend API calls block na hon
from flask_cors import CORS
# Humare banaye hue database tables aur seed function ko import kiya
from models import db, Flight, Booking, Passenger
from seed_data import seed_flights


def create_app():
    # Flask app initialize kiya:
    # template_folder='templates' batata hai ki HTML files kahan rakhi hain
    # static_folder='static' batata hai ki CSS aur JS files kahan rakhi hain
    app = Flask(__name__, template_folder='templates', static_folder='static')
    CORS(app)

    # ==========================================================================
    # SECTION 1: DATABASE CONFIGURATION (SQLite + PostgreSQL Support)
    # ==========================================================================
    # VIVA TIP: Examiner puche "SQLite se PostgreSQL kaise switch hota hai?"
    # Toh ye 4 lines dikhana: Agar DATABASE_URL set nahi hai toh default 'sqlite:///skyvoyage.db'
    # chalta hai. Agar PostgreSQL URL diya hai toh wahi code PostgreSQL par chalne lagta hai!
    database_url = os.getenv('DATABASE_URL', 'sqlite:///skyvoyage.db')
    if database_url.startswith('postgres://'):
        # Kuch cloud providers 'postgres://' dete hain jise SQLAlchemy ke liye 'postgresql://' banana padta hai
        database_url = database_url.replace('postgres://', 'postgresql://', 1)

    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    # Modification tracking band rakhte hain taaki extra memory waste na ho
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # Session security ke liye secret key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'skyvoyage-college-project-secret-key')

    # Database ko Flask app ke sath link kiya
    db.init_app(app)

    # Server start hote hi saare tables create karega (agar nahi bane hain) aur initial flights daal dega
    with app.app_context():
        db.create_all()
        seed_flights()

    # ==========================================================================
    # SECTION 2: FRONTEND ROUTE (Website ka Home Page)
    # ==========================================================================
    @app.route('/')
    def index():
        # Jab user http://127.0.0.1:5050 kholega, toh templates/index.html page dikhega
        return render_template('index.html')

    # ==========================================================================
    # SECTION 3: RESTful API ENDPOINTS (Frontend se baat karne ke raaste)
    # ==========================================================================

    # API 1: GET /api/airports -> Saare airports ki list dene ke liye
    @app.route('/api/airports', methods=['GET'])
    def get_airports():
        airports = [
            {'code': 'DEL', 'name': 'Delhi', 'airport': 'Indira Gandhi Intl'},
            {'code': 'BOM', 'name': 'Mumbai', 'airport': 'Chhatrapati Shivaji Maharaj Intl'},
            {'code': 'BLR', 'name': 'Bengaluru', 'airport': 'Kempegowda Intl'},
            {'code': 'GOI', 'name': 'Goa', 'airport': 'Dabolim / Mopa'},
            {'code': 'HYD', 'name': 'Hyderabad', 'airport': 'Rajiv Gandhi Intl'},
            {'code': 'CCU', 'name': 'Kolkata', 'airport': 'Netaji Subhash Chandra Bose'},
            {'code': 'MAA', 'name': 'Chennai', 'airport': 'Chennai Intl'},
            {'code': 'JAI', 'name': 'Jaipur', 'airport': 'Jaipur Intl'}
        ]
        return jsonify({'success': True, 'data': airports})

    # API 2: GET /api/flights -> Origin, Destination aur Price ke hisab se flights search karne ke liye
    @app.route('/api/flights', methods=['GET'])
    def search_flights():
        # Frontend ne URL mein jo query parameters bheje hain (jaise ?origin=BLR&destination=DEL) unhe padhna
        origin = request.args.get('origin', '').upper()
        destination = request.args.get('destination', '').upper()
        max_price = request.args.get('max_price', type=float)
        airline = request.args.get('airline')
        sort_by = request.args.get('sort', 'price')  # Default sorting 'price' (Cheapest first) rakhi hai

        # Database query shuru karna
        query = Flight.query

        # Agar user ne origin aur destination dono chune hain toh filter lagao
        if origin and destination:
            query = query.filter_by(origin=origin, destination=destination)
        elif origin:
            query = query.filter_by(origin=origin)
        elif destination:
            query = query.filter_by(destination=destination)

        # Agar user ne price slider se max_price set kiya hai toh usse sasti flights hi lao
        if max_price:
            query = query.filter(Flight.base_price <= max_price)

        # Agar specific airline chuni hai toh uska filter lagao
        if airline:
            query = query.filter(Flight.airline == airline)

        # Query execute karke matching flights ki list nikalna
        flights = query.all()

        # FALLBACK LOGIC:
        # Agar user aisi do cities chunta hai jinki flight seed_data mein nahi thi (jaise JAI to CCU),
        # toh khali screen dikhane ke bajaye hum 2 dynamic flights database mein create kar dete hain
        # taaki demo ke waqt har route par flights mil sakein!
        if not flights and origin and destination and origin != destination:
            f1_num = f"6E-{random.randint(100, 899)}"
            f2_num = f"AI-{random.randint(100, 899)}"
            if not Flight.query.filter_by(flight_number=f1_num).first():
                new_f1 = Flight(
                    flight_number=f1_num, airline='IndiGo', airline_code='6E',
                    origin=origin, origin_name=origin, destination=destination, destination_name=destination,
                    depart_time='07:30', arrival_time='10:15', duration='2h 45m',
                    stops='Non-stop', stop_count=0, base_price=4650.0, total_seats=42
                )
                db.session.add(new_f1)
            if not Flight.query.filter_by(flight_number=f2_num).first():
                new_f2 = Flight(
                    flight_number=f2_num, airline='Air India', airline_code='AI',
                    origin=origin, origin_name=origin, destination=destination, destination_name=destination,
                    depart_time='14:15', arrival_time='17:00', duration='2h 45m',
                    stops='Non-stop', stop_count=0, base_price=5200.0, total_seats=42
                )
                db.session.add(new_f2)
            db.session.commit()
            flights = Flight.query.filter_by(origin=origin, destination=destination).all()

        # Saare flight objects ko dictionary mein convert karna
        flights_data = [f.to_dict() for f in flights]

        # Sorting Logic: User ne Cheapest, Fastest, ya Earliest mein se jo chuna hai us hisab se sort karna
        if sort_by == 'price':
            flights_data.sort(key=lambda x: x['price'])
        elif sort_by == 'duration':
            flights_data.sort(key=lambda x: x['duration'])
        elif sort_by == 'depart':
            flights_data.sort(key=lambda x: x['departTime'])

        return jsonify({'success': True, 'count': len(flights_data), 'data': flights_data})

    # API 3: GET /api/flights/<flight_id>/seats -> Kisi flight mein kaunsi seats pehle se booked hain
    @app.route('/api/flights/<int:flight_id>/seats', methods=['GET'])
    def get_flight_seats(flight_id):
        travel_date = request.args.get('date')
        # Sirf wo bookings check karo jo CONFIRMED hain (CANCELLED wali seat wapas khali ho jati hai)
        query = Booking.query.filter_by(flight_id=flight_id, status='CONFIRMED')
        if travel_date:
            query = query.filter_by(travel_date=travel_date)

        bookings = query.all()
        # Database mein jo seats book ho chuki hain unki list
        taken_seats = [b.seat_number for b in bookings]
        # Airplane seat map realistic dikhe isliye kuch seats pehle se occupied dikhayi hain
        default_occupied = ['1A', '2C', '3D', '4F', '5B']
        all_occupied = list(set(taken_seats + default_occupied))

        return jsonify({'success': True, 'flightId': flight_id, 'occupiedSeats': all_occupied})

    # API 4: POST /api/book -> Naya Ticket Book Karne ka Main Endpoint
    @app.route('/api/book', methods=['POST'])
    def book_flight():
        # Frontend ne POST request mein jo JSON data bheja hai use padhna
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No JSON payload provided'}), 400

        # Step 1: Check karna ki saari zaroori fields aayi hain ya nahi
        for field in ['flightId', 'travelDate', 'seat', 'passenger']:
            if field not in data:
                return jsonify({'success': False, 'message': f'Missing field: {field}'}), 400

        passenger_info = data['passenger']
        for pfield in ['fullName', 'age', 'gender', 'email', 'phone']:
            if pfield not in passenger_info or not str(passenger_info[pfield]).strip():
                return jsonify({'success': False, 'message': f'Missing passenger field: {pfield}'}), 400

        # Step 2: Check karna ki flight database mein maujood hai ya nahi
        flight = Flight.query.get(data['flightId'])
        if not flight:
            return jsonify({'success': False, 'message': 'Flight does not exist'}), 404

        # Step 3: SEAT COLLISION CHECK (Double-Booking Prevention)
        # VIVA TIP: Ye block examiner ko zaroor dikhana!
        # Hum check karte hain ki isi flight, isi date, aur isi seat par koi CONFIRMED booking toh nahi hai?
        existing = Booking.query.filter_by(
            flight_id=flight.id,
            travel_date=data['travelDate'],
            seat_number=data['seat'],
            status='CONFIRMED'
        ).first()

        if existing:
            # Agar seat pehle se booked hai toh HTTP 409 (Conflict) error bhej do
            return jsonify({'success': False, 'message': f"Seat {data['seat']} is already booked."}), 409

        # Step 4: Unique 6-digit PNR Generate karna (jaise SV-491023)
        while True:
            generated_pnr = f"SV-{random.randint(100000, 999999)}"
            # Check karo ki ye PNR pehle kisi aur ko toh nahi mila
            if not Booking.query.filter_by(pnr=generated_pnr).first():
                break

        # Step 5: Total Fare Calculation
        base_fare = flight.base_price
        tax_amount = round(base_fare * 0.12, 2)  # 12% GST & Airport Tax
        seat_fee = float(data.get('seatFee', 150.0))
        total_amount = base_fare + tax_amount + seat_fee

        # Step 6: Booking table mein record banana
        new_booking = Booking(
            pnr=generated_pnr,
            flight_id=flight.id,
            travel_date=data['travelDate'],
            travel_class=data.get('travelClass', 'Economy'),
            seat_number=data['seat'],
            seat_fee=seat_fee,
            base_fare=base_fare,
            tax_amount=tax_amount,
            total_amount=total_amount,
            gate=f"G-{random.randint(2, 19)}",
            terminal=f"T{random.randint(1, 3)}"
        )
        db.session.add(new_booking)
        # db.session.flush() isliye kiya taaki commit se pehle hi humein 'new_booking.id' mil jaye
        db.session.flush()

        # Step 7: Passenger table mein yatri ki details save karna aur booking_id se link karna
        new_passenger = Passenger(
            booking_id=new_booking.id,
            full_name=passenger_info['fullName'].strip(),
            age=int(passenger_info['age']),
            gender=passenger_info['gender'],
            email=passenger_info['email'].strip(),
            phone=passenger_info['phone'].strip()
        )
        db.session.add(new_passenger)
        # Dono tables (Booking + Passenger) ko ek sath database mein commit (save) karna
        db.session.commit()

        # HTTP 201 (Created) status ke sath confirm ticket wapas frontend ko bhejna
        return jsonify({
            'success': True,
            'message': 'Flight booked successfully!',
            'booking': new_booking.to_dict()
        }), 201

    # API 5: GET /api/bookings -> 'My Bookings' tab ke liye saari bookings ki list dena
    @app.route('/api/bookings', methods=['GET'])
    def get_all_bookings():
        # Sabse nayi booking sabse upar dikhe isliye 'created_at.desc()' lagaya hai
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
        return jsonify({'success': True, 'data': [b.to_dict() for b in bookings]})

    # API 6: GET /api/bookings/<pnr> -> PNR number se kisi ek ticket ka boarding pass dekhna
    @app.route('/api/bookings/<string:pnr>', methods=['GET'])
    def get_booking_by_pnr(pnr):
        booking = Booking.query.filter_by(pnr=pnr.upper()).first()
        if not booking:
            return jsonify({'success': False, 'message': 'Booking not found'}), 404
        return jsonify({'success': True, 'booking': booking.to_dict()})

    # API 7: DELETE /api/bookings/<pnr> -> Ticket Cancel karne ka Endpoint
    @app.route('/api/bookings/<string:pnr>', methods=['DELETE'])
    def cancel_booking(pnr):
        booking = Booking.query.filter_by(pnr=pnr.upper()).first()
        if not booking:
            return jsonify({'success': False, 'message': 'Booking not found'}), 404
        # Hum record ko database se delete nahi karte, balki uska status 'CANCELLED' kar dete hain
        # taaki booking history mein record rahe aur wo seat doosre yatriyon ke liye khali ho jaye.
        booking.status = 'CANCELLED'
        db.session.commit()
        return jsonify({'success': True, 'message': f'Booking {pnr} cancelled.'})

    return app


# Jab hum terminal mein 'python3 app.py' likhte hain, toh ye block execute hota hai
if __name__ == '__main__':
    app = create_app()
    # MAC PORT FIX: MacOS par Port 5000 Apple AirPlay Receiver (ControlCenter) use karta hai,
    # isliye humne default port 5050 rakha hai taaki bina kisi error ke website turant khule!
    port = int(os.getenv('PORT', 5050))
    print("\n=======================================================")
    print(f" SkyVoyage Server Running on: http://127.0.0.1:{port}")
    print(f" Active Database: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print("=======================================================\n")
    app.run(host='127.0.0.1', port=port, debug=True)
