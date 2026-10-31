# ✈️ SkyVoyage Pro v3 — Vivid AI Flight Booking, ±2 Days Deals & Home-to-Airport Route Map

**SkyVoyage Pro v3** is a full-stack web engineering college project built with **HTML5, CSS3, Vanilla JavaScript (ES6+), Leaflet.js Maps** on the frontend and **Python Flask + SQLAlchemy ORM (SQLite & PostgreSQL)** on the backend.

---

## 🌟 10 Standout Features of SkyVoyage Pro v3

### 1. 🎨 Vivid Aurora UI & Color-Coded Flight Fare Boxes
* **🟢 Green Flight Box (`.tier-cheapest`)**: Automatically highlights the cheapest flights on the route in a rich emerald-green card with a `🟢 CHEAPEST FLIGHT • BEST SAVER DEAL` ribbon.
* **🟡 Amber/Gold Flight Box (`.tier-moderate`)**: Highlights mid-range smart-value flights in warm amber/gold.
* **🔴 Red/Coral Flight Box (`.tier-expensive`)**: Highlights high-demand peak-fare flights in crimson/coral red (`🔴 EXPENSIVE • HIGH DEMAND PEAK FARE`) so travelers can spot price tiers at a glance.

### 2. 📅 Smart ±2 Days Flexible Date Finder (e.g., Searching 4 Dec Shows 2 Dec – 6 Dec Deals)
* Whenever a user selects any departure date (such as **`4 Dec 2026`**), the website automatically computes and displays fares for **1 to 2 days earlier and 1 to 2 days later (`2 Dec`, `3 Dec`, `4 Dec`, `5 Dec`, `6 Dec`)**.
* Displays both a **5-Day Flexible Date Comparison Ribbon** at the top and a dedicated **"💰 Cheaper Flights Available 1–2 Days Around Your Selected Date"** section at the bottom with 1-click date switching and booking.

### 3. 🗺️ Interactive Home-to-Airport Live Route Map & "Leave Home By" Calculator
* Integrated **Leaflet.js (OpenStreetMap)** route planner that connects the traveler's **Residential Area** (e.g., *Jakkasandra / Koramangala*, *HSR Layout*, *Indiranagar*, *Whitefield* in Bengaluru; *Connaught Place*, *Dwarka*, *Hauz Khas* in Delhi; *Bandra*, *Andheri*, *Colaba* in Mumbai; *Gachibowli* in Hyderabad; *Panjim* in Goa — or any custom typed locality) directly to the **Departure Airport Terminal**.
* Displays exact **Road Distance (`km`)**, **Fastest Highway/Expressway**, **Live Traffic Drive Time**, and calculates the exact **"Recommended Time to Leave Home"** (`Flight Departure Time - 2h Check-in Buffer - Road Drive Time`).
* Includes an interactive **"🚕 Animate Cab Journey on Map"** simulation and a 1-click **Google Maps Live Turn-by-Turn Navigation** launcher.

### 4. 🛫 Real Indian Domestic Airline Schedules & Fares
* Includes 21+ real domestic flights across **BLR, DEL, BOM, GOI, HYD, CCU, MAA, and JAI** (**IndiGo `6E-204`**, **Air India `AI-804`**, **Akasa Air `QP-1304`**, **Air India Express `IX-2742`**, **SpiceJet `SG-8710`**).

### 5. 📈 AI Fare Predictor & 7-Day Interactive Price Trend Box
* Displays the **Google Flights Fair Price Band**, **Buy Now vs. Wait Confidence Score**, **Price Drop Alert Toggle**, and a clickable **7-Day Price Bar Graph**.

### 6. 👨‍👩‍👧‍👦 Multi-Passenger Group Booking & Multi-Seat Aircraft Map (1 to 4 Travelers)
* Supports booking for **1 to 4 Travelers** simultaneously, selecting multiple seats (`3A, 3B, 3C`) on the 42-seat aircraft cabin grid, and storing 1-to-Many passenger records in SQL.

### 7. 🚕 Landing-Time Synced Airport Cab Pre-Booking
* Automatically schedules destination airport pickup for **`Flight Arrival Time + 20 mins`** with Mini Hatch (`₹499`), BluSmart EV Sedan (`₹749`), and Prime SUV Innova (`₹1,199`) options.

### 8. 🍽️ Smart Layover & VIP Terminal Lounge Pass Recommender
* Recommends a discounted **Terminal VIP Lounge & Hot Buffet Pass (`+₹299/pax`)** based on departure hour and prints a lounge voucher on the Boarding Pass.

### 9. 🌤️ Live Destination Weather & Packing Advisory
* Displays destination temperature, sky condition, and a tailored packing tip in both the search dashboard and the Boarding Pass.

### 10. 🤖 SkyBot AI Travel Assistant Chatbot
* Floating conversational assistant answering English and Hinglish queries about green cheapest flights, ±2 days deals, airport map routes, lounge passes, and weather tips.

---

## 🛠️ Technology Stack

| Layer | Technology Used | Purpose in Project |
| :--- | :--- | :--- |
| **Frontend UI & Maps** | HTML5, CSS3, Vanilla JS ES6+, Leaflet.js | Vivid responsive UI, Green/Amber/Red fare tiers, ±2 days engine, interactive GPS map |
| **Backend Server** | Python 3, Flask, Flask-CORS (`app.py`) | RESTful APIs, PNR generation, seat conflict prevention, fare & tax calculation |
| **Database & ORM** | SQLAlchemy ORM (`models.py`) | Relational schema (`flights`, `bookings`, `passengers`) for SQLite & PostgreSQL |
| **Version Control** | Git & GitHub (`.gitignore`) | Commit tracking and GitHub Pages live hosting |
