"""
================================================================================
FILE: models.py (Database Schema / Tables - Pro v2 Multi-Passenger Edition)
PROJECT: SkyVoyage Pro - Multi-Passenger Flight Booking, Lounge, Weather & Cab System
================================================================================
KYU USE HUI HAI YE FILE? (Purpose of this file):
Is file mein humne apne database ke tables (Flight, Booking, Passenger) banaye hain.

PRO v2 UPGRADE CHANGES:
1. Multi-Passenger Support: Ab 1 Booking ke andar 1 se 4 Passengers ho sakte hain!
   Isliye Booking model mein `passengers = db.relationship('Passenger', ...)` se
   `uselist=False` hata diya hai taaki 1-to-Many (1 Booking -> Multiple Passengers) kaam kare!
2. Feature #1 (Smart Lounge Pass): Booking table mein `lounge_pass` aur `lounge_fee`
   columns add kiye hain.
3. Passenger table mein `seat_number` add kiya hai taaki har passenger ki apni seat (jaise 3A, 3B) save ho.
================================================================================
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# ==============================================================================
# TABLE 1: Flight Model (Real Indian Domestic Flights)
# ==============================================================================
class Flight(db.Model):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(20), unique=True, nullable=False)
    airline = db.Column(db.String(50), nullable=False)
    airline_code = db.Column(db.String(5), nullable=False)
    aircraft = db.Column(db.String(50), default='Airbus A320neo')
    origin = db.Column(db.String(10), nullable=False)
    origin_name = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(10), nullable=False)
    destination_name = db.Column(db.String(100), nullable=False)
    depart_time = db.Column(db.String(10), nullable=False)
    arrival_time = db.Column(db.String(10), nullable=False)
    duration = db.Column(db.String(20), nullable=False)
    stops = db.Column(db.String(50), default='Non-stop')
    stop_count = db.Column(db.Integer, default=0)
    base_price = db.Column(db.Float, nullable=False)
    total_seats = db.Column(db.Integer, default=42)

    bookings = db.relationship('Booking', backref='flight', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'flightNumber': self.flight_number,
            'airline': self.airline,
            'airlineCode': self.airline_code,
            'aircraft': self.aircraft,
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
# TABLE 2: Booking Model (Supports 1 to 4 Passengers + Lounge Pass + Airport Cab)
# ==============================================================================
class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    pnr = db.Column(db.String(15), unique=True, nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    travel_date = db.Column(db.String(20), nullable=False)
    travel_class = db.Column(db.String(20), default='Economy')

    # Multi-Passenger Columns:
    # passenger_count: Kitne yatri hain (1, 2, 3, ya 4)
    # seat_number: Sabhi chuni gayi seats comma ke sath (jaise '3A, 3B')
    passenger_count = db.Column(db.Integer, default=1)
    seat_number = db.Column(db.String(50), nullable=False)

    # Fare Breakdown Columns
    seat_fee = db.Column(db.Float, default=150.0)
    base_fare = db.Column(db.Float, nullable=False)
    tax_amount = db.Column(db.Float, nullable=False)

    # FEATURE #1: Smart Airport Lounge & Meal Pass Add-on
    lounge_included = db.Column(db.Boolean, default=False)
    lounge_fee = db.Column(db.Float, default=0.0)

    # Airport Cab Add-on Columns
    cab_type = db.Column(db.String(60), default='None')
    cab_fee = db.Column(db.Float, default=0.0)
    cab_pickup_time = db.Column(db.String(30), default='N/A')

    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='CONFIRMED')
    gate = db.Column(db.String(10), default='G-12')
    terminal = db.Column(db.String(10), default='T2')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 1-TO-MANY RELATIONSHIP: 1 Booking mein multiple Passengers ho sakte hain!
    passengers = db.relationship('Passenger', backref='booking', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        pax_list = [p.to_dict() for p in self.passengers]
        return {
            'id': self.id,
            'pnr': self.pnr,
            'flight': self.flight.to_dict() if self.flight else None,
            'travelDate': self.travel_date,
            'travelClass': self.travel_class,
            'passengerCount': self.passenger_count,
            'seat': self.seat_number,
            'seats': [s.strip() for s in self.seat_number.split(',') if s.strip()],
            'seatFee': self.seat_fee,
            'baseFare': self.base_fare,
            'taxAmount': self.tax_amount,
            'loungeIncluded': self.lounge_included,
            'loungeFee': self.lounge_fee,
            'cabType': self.cab_type,
            'cabFee': self.cab_fee,
            'cabPickupTime': self.cab_pickup_time,
            'totalPaid': self.total_amount,
            'status': self.status,
            'gate': self.gate,
            'terminal': self.terminal,
            'bookingDate': self.created_at.strftime('%d %b %Y') if self.created_at else '',
            'passengers': pax_list,
            'passenger': pax_list[0] if pax_list else None
        }


# ==============================================================================
# TABLE 3: Passenger Model (Stores each traveler in a single or group booking)
# ==============================================================================
class Passenger(db.Model):
    __tablename__ = 'passengers'

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    seat_assigned = db.Column(db.String(10), default='')  # Har yatri ki individual seat (e.g. '3A')
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'fullName': self.full_name,
            'age': self.age,
            'gender': self.gender,
            'seatAssigned': self.seat_assigned,
            'email': self.email,
            'phone': self.phone
        }
