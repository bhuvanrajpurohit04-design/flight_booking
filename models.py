"""
================================================================================
FILE: models.py (Database Schema / Tables)
PROJECT: SkyVoyage - Online Flight Booking System (College Project)
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
Is file mein humne apne database ke tables (Flight, Booking, Passenger) banaye hain.
Humne yahan raw SQL queries (jaise CREATE TABLE...) likhne ke bajaye 'SQLAlchemy ORM'
(Object Relational Mapper) ka use kiya hai.

VIVA TIP:
Agar examiner puche "ORM kyu use kiya?", toh batana:
"ORM ki madad se hum Python classes likhte hain jo automatically database tables ban
jaati hain. Iska sabse bada fayda ye hai ki bina code badle hum SQLite (local testing)
aur PostgreSQL (production) dono chala sakte hain, aur ye SQL Injection attacks se bhi bachata hai."
================================================================================
"""

# datetime module: Booking kis waqt (date & time) hui, wo record karne ke liye import kiya hai
from datetime import datetime

# Flask-SQLAlchemy: Python classes ko SQL tables mein convert karne wali library
from flask_sqlalchemy import SQLAlchemy

# 'db' object banaya hai jo poore project mein database connection ko manage karega
db = SQLAlchemy()


# ==============================================================================
# TABLE 1: Flight Model (Saari flights ka data store karne ke liye)
# ==============================================================================
class Flight(db.Model):
    # Database mein is table ka naam 'flights' rakha gaya hai
    __tablename__ = 'flights'

    # Primary Key: Har flight ko ek unique ID milegi (1, 2, 3...)
    id = db.Column(db.Integer, primary_key=True)

    # flight_number: Jaise '6E-204' ya 'AI-802'. 'unique=True' ka matlab do flights ka same number nahi ho sakta
    flight_number = db.Column(db.String(20), unique=True, nullable=False)

    # airline: Airline ka poora naam (jaise 'IndiGo', 'Air India')
    airline = db.Column(db.String(50), nullable=False)

    # airline_code: Chhota code jo logo badge mein dikhega (jaise '6E', 'AI', 'UK')
    airline_code = db.Column(db.String(5), nullable=False)

    # origin & origin_name: Kahan se flight udegi (Airport code 'BLR' aur city 'Bengaluru')
    origin = db.Column(db.String(10), nullable=False)
    origin_name = db.Column(db.String(100), nullable=False)

    # destination & destination_name: Kahan flight jayegi (Airport code 'DEL' aur city 'Delhi')
    destination = db.Column(db.String(10), nullable=False)
    destination_name = db.Column(db.String(100), nullable=False)

    # depart_time & arrival_time: Flight udne aur pahunchne ka samay (jaise '08:30' aur '11:15')
    depart_time = db.Column(db.String(10), nullable=False)
    arrival_time = db.Column(db.String(10), nullable=False)

    # duration: Safar mein kitna time lagega (jaise '2h 45m')
    duration = db.Column(db.String(20), nullable=False)

    # stops & stop_count: Flight direct hai ('Non-stop', 0) ya ruk ke jayegi ('1 Stop', 1)
    stops = db.Column(db.String(50), default='Non-stop')
    stop_count = db.Column(db.Integer, default=0)

    # base_price: Ek ticket ka basic kiraya (Float isliye taaki decimal values bhi aa sakein)
    base_price = db.Column(db.Float, nullable=False)

    # total_seats: Aircraft mein kul kitni seats hain (humne 7 rows x 6 seats = 42 rakhi hain)
    total_seats = db.Column(db.Integer, default=42)

    # RELATIONSHIP (1-to-Many):
    # Ek Flight mein bohot saari Bookings ho sakti hain.
    # 'cascade="all, delete-orphan"' ka matlab hai agar flight delete hui toh uski bookings bhi saaf ho jayengi.
    bookings = db.relationship('Booking', backref='flight', lazy=True, cascade='all, delete-orphan')

    # to_dict() Function:
    # KYU USE HUA: Python database object ko direct browser (JavaScript) ko nahi bhej sakte.
    # Isliye ye function flight ke data ko Python Dictionary mein badalta hai, jo aage JSON ban ke frontend par jata hai.
    def to_dict(self):
        return {
            'id': self.id,
            'flightNumber': self.flight_number,
            'airline': self.airline,
            'airlineCode': self.airline_code,
            'origin': self.origin,
            'originName': self.origin_name,
            'destination': self.destination,
            'destinationName': self.destination_name,
            'departTime': self.depart_time,
            'arrivalTime': self.arrival_time,
            'duration': self.duration,
            'stops': self.stops,
            'stopCount': self.stop_count,
            'price': self.base_price,
            'totalSeats': self.total_seats
        }


# ==============================================================================
# TABLE 2: Booking Model (Jab user ticket book karega, wo record yahan save hoga)
# ==============================================================================
class Booking(db.Model):
    # Database mein is table ka naam 'bookings' hoga
    __tablename__ = 'bookings'

    # Primary Key: Har booking ki unique internal ID
    id = db.Column(db.Integer, primary_key=True)

    # pnr: Passenger Name Record (jaise 'SV-482910'). Ye ticket par print hota hai aur unique hota hai
    pnr = db.Column(db.String(15), unique=True, nullable=False)

    # FOREIGN KEY (flights.id):
    # Ye batata hai ki ye booking kaunsi flight ke liye hui hai. Ye 'bookings' table ko 'flights' table se jodta hai.
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)

    # travel_date: Kis tareekh ki flight book ki gayi hai (YYYY-MM-DD)
    travel_date = db.Column(db.String(20), nullable=False)

    # travel_class: 'Economy' ya 'Business' class
    travel_class = db.Column(db.String(20), default='Economy')

    # seat_number: User ne seat map par kaunsi seat chuni (jaise '3A', '4B')
    seat_number = db.Column(db.String(10), nullable=False)

    # Fare Breakdown Columns: Base kiraya, seat fee, 12% GST tax, aur kul rakam (total_amount)
    seat_fee = db.Column(db.Float, default=150.0)
    base_fare = db.Column(db.Float, nullable=False)
    tax_amount = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

    # status: Ticket 'CONFIRMED' hai ya user ne 'CANCELLED' kar diya hai
    status = db.Column(db.String(20), default='CONFIRMED')

    # gate & terminal: Boarding pass par dikhane ke liye airport Gate (G-12) aur Terminal (T2)
    gate = db.Column(db.String(10), default='G-12')
    terminal = db.Column(db.String(10), default='T2')

    # created_at: Kis din aur samay booking ki gayi (automatically current UTC time le leta hai)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # RELATIONSHIP (1-to-1):
    # Har booking ke sath passenger ki details judi hoti hain ('uselist=False' ka matlab 1 booking = 1 passenger record)
    passenger = db.relationship('Passenger', backref='booking', uselist=False, cascade='all, delete-orphan')

    # Booking object ko JSON friendly dictionary mein badalne ka function
    def to_dict(self):
        return {
            'id': self.id,
            'pnr': self.pnr,
            'flight': self.flight.to_dict() if self.flight else None,
            'travelDate': self.travel_date,
            'travelClass': self.travel_class,
            'seat': self.seat_number,
            'seatFee': self.seat_fee,
            'baseFare': self.base_fare,
            'taxAmount': self.tax_amount,
            'totalPaid': self.total_amount,
            'status': self.status,
            'gate': self.gate,
            'terminal': self.terminal,
            'bookingDate': self.created_at.strftime('%d %b %Y') if self.created_at else '',
            'passenger': self.passenger.to_dict() if self.passenger else None
        }


# ==============================================================================
# TABLE 3: Passenger Model (Yatri ki personal details save karne ke liye)
# ==============================================================================
class Passenger(db.Model):
    # Database mein is table ka naam 'passengers' hoga
    __tablename__ = 'passengers'

    # Primary Key: Har passenger record ki unique ID
    id = db.Column(db.Integer, primary_key=True)

    # FOREIGN KEY (bookings.id):
    # Ye passenger kis booking ke andar aata hai, uska link
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)

    # Passenger ki basic details jo form mein bhari jaati hain
    full_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    # Passenger details ko dictionary mein convert karne ka method
    def to_dict(self):
        return {
            'id': self.id,
            'fullName': self.full_name,
            'age': self.age,
            'gender': self.gender,
            'email': self.email,
            'phone': self.phone
        }
