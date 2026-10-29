# ✈️ SkyVoyage – Online Flight Booking System

SkyVoyage is a full-stack domestic flight reservation portal built as a college project. Users can search flights between major Indian cities, filter and sort the results, pick a seat on an interactive aircraft map, enter passenger details, and receive a printable digital boarding pass with a unique PNR. Bookings are stored in a SQL database and can be viewed or cancelled later.

The frontend also works **without the backend**: if the Flask server is not running, it falls back to built-in sample flights and saves bookings in the browser's `localStorage`.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [How Fares Are Calculated](#-how-fares-are-calculated)
- [Dual-Mode Frontend](#-dual-mode-frontend-with-or-without-the-server)
- [Known Limitations](#-known-limitations)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## ✨ Features

**Flight search**
- Search by origin, destination, departure date, and travel class (Economy / Business)
- 8 airports supported: Bengaluru (BLR), Delhi (DEL), Mumbai (BOM), Goa (GOI), Hyderabad (HYD), Kolkata (CCU), Chennai (MAA), Jaipur (JAI)
- Validation to prevent choosing the same origin and destination

**Filtering and sorting**
- Max-price slider (₹3,000 – ₹15,000)
- Airline checkboxes: IndiGo, Air India, Vistara, Akasa Air, SpiceJet
- Sort by **Cheapest**, **Fastest**, or **Earliest** departure
- One-click filter reset

**Booking flow**
- Interactive seat map (7 rows, layout `A B C | D E F`) with available, selected, and taken seats
- Front-row seats (rows 1–2) carry a higher seat fee
- Passenger form with validation (name, age, gender, 10-digit phone, email)
- Live fare breakdown: base fare + 12% GST + seat fee = total
- Duplicate-seat protection on the backend (HTTP 409 Conflict)

**Boarding pass and bookings**
- Digital boarding pass with PNR, route, timings, seat, class, terminal, and gate
- Print-friendly boarding pass (`@media print` hides everything except the pass)
- "My Bookings" tab with a live booking-count badge, ticket re-view, and cancellation

**UI / UX**
- Responsive layout (CSS Grid + Flexbox + media queries)
- Toast notifications instead of browser `alert()` popups
- Built-in "Viva & Architecture" modal summarising the stack, schema, and common viva questions

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Semantic HTML5, CSS3 (custom properties, Grid, Flexbox), Vanilla JavaScript (ES6+, Fetch API) |
| Backend | Python, Flask REST APIs, Flask-SQLAlchemy, Flask-CORS |
| Database | SQLite (default) or PostgreSQL via SQLAlchemy ORM |
| Version control | Git & GitHub |

---

## 📁 Project Structure

```
SkyVoyage/
├── app.py                  # Flask backend: REST APIs + SQLAlchemy models
├── templates/
│   └── index.html          # Main frontend page
├── static/
│   ├── css/
│   │   └── style.css       # Styling (CSS variables, responsive layout, print styles)
│   └── js/
│       └── app.js          # Client-side logic (API calls, rendering, fallback mode)
└── README.md
```

> The shared `index.html` has the CSS and JavaScript embedded in it, so it can be opened directly with a double-click.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Option 1: Run with the Flask backend (full-stack mode)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd SkyVoyage

# 2. (Optional) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install flask flask-sqlalchemy flask-cors

# 4. Start the server
python3 app.py
```

Then open **http://127.0.0.1:5050** in your browser.

### Option 2: Open the frontend only (no server)

Just double-click `index.html`. The app detects that no backend is available and runs on built-in sample data, saving bookings to your browser's `localStorage`.

### Switching from SQLite to PostgreSQL

The app uses SQLAlchemy, so only the `DATABASE_URL` environment variable needs to change:

```bash
# Default (SQLite)
DATABASE_URL=sqlite:///skyvoyage.db

# PostgreSQL
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
```

No change to the Python application code is required.

---

## 🔌 API Endpoints

These are the endpoints the frontend calls:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/flights?origin=BLR&destination=DEL&max_price=15000&sort=price` | Search flights (`sort` = `price`, `duration`, or `depart`) |
| `GET` | `/api/flights/<flight_id>/seats?date=YYYY-MM-DD` | Get already-occupied seats for a flight on a date |
| `POST` | `/api/book` | Create a booking (returns a PNR). Returns **409** if the seat is already taken |
| `GET` | `/api/bookings` | List all bookings |
| `DELETE` | `/api/bookings/<pnr>` | Cancel a booking |

**Sample `POST /api/book` body**

```json
{
  "flightId": 1,
  "travelDate": "2026-10-29",
  "travelClass": "Economy",
  "seat": "3A",
  "seatFee": 150,
  "passenger": {
    "fullName": "Priya Sharma",
    "age": 22,
    "gender": "Female",
    "phone": "9876543210",
    "email": "priya@college.edu"
  }
}
```

---

## 🗄 Database Schema

| Table | Columns |
|---|---|
| `flights` | `id`, `flight_number`, `airline`, `origin`, `destination`, `depart_time`, `arrival_time`, `base_price` |
| `bookings` | `id`, `pnr` (unique), `flight_id` (FK → flights), `travel_date`, `seat_number`, `total_amount`, `status` |
| `passengers` | `id`, `booking_id` (FK → bookings), `full_name`, `age`, `gender`, `email`, `phone` |

**Double-booking prevention:** before saving, `POST /api/book` checks for an existing `CONFIRMED` booking with the same `flight_id`, `travel_date`, and `seat_number`. If one exists, the API responds with `409 Conflict`.

---

## 💰 How Fares Are Calculated

```
Total = Base Fare + 12% GST + Seat Selection Fee
```

| Seat | Fee |
|---|---|
| Rows 1–2 (front) | ₹350 |
| Rows 3–7 | ₹150 |

Example: base fare ₹4,850 → GST ₹582 → seat in row 3 ₹150 → **total ₹5,582**.

---

## 🔁 Dual-Mode Frontend (With or Without the Server)

| | Server running | Opened directly (no server) |
|---|---|---|
| Flights | Fetched from `/api/flights` | Built-in `FALLBACK_FLIGHTS` dataset |
| Seat availability | Fetched from the database | Sample taken seats + seats booked locally |
| Bookings | Stored in SQL database | Stored in browser `localStorage` |

This makes the project easy to demo anywhere, even without Python installed.

---

## ⚠️ Known Limitations

- The **Round Trip** option is present in the search form, but search currently handles one-way journeys only.
- **Business** class is recorded on the booking, but it does not change the fare.
- Payment is not integrated; the booking is confirmed directly after the passenger form is submitted.
- Terminal and gate on the boarding pass are placeholder values.
- There is no user authentication, so all bookings are shown to every visitor.

---

## 🔮 Future Improvements

- Round-trip search and multi-passenger bookings
- Class-based pricing (Business vs Economy)
- User login and per-user booking history
- Payment gateway integration
- Email confirmation of the e-ticket
- Real-time flight data from an external API
- Docker setup for one-command deployment

---

## 📸 Screenshots

<!-- Add screenshots here, e.g.:
![Search page](screenshots/search.png)
![Seat selection](screenshots/seat-map.png)
![Boarding pass](screenshots/boarding-pass.png)
-->

---

## 👩‍💻 Author

**Navya Jain**
BTech CSE (AI/ML), JAIN (Deemed-to-be University)

- GitHub: [@navya5jain](https://github.com/navya5jain)
- LinkedIn: [navya-jain](https://linkedin.com/in/navya-jain-456749411)

---

*SkyVoyage is an academic project and is not affiliated with any airline. Flight data, fares, and schedules are sample data for demonstration only.*
