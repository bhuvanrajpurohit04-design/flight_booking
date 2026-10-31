/**
 * ================================================================================
 * FILE: static/js/app.js (Frontend Client-Side Logic - v3 Copilot & Cabin Class Edition)
 * PROJECT: SkyVoyage - Smart Flight Booking, Dynamic Cabin Classes, ±2 Days & AI Copilot
 * ================================================================================
 */

if (!window.__SKYVOYAGE_APP_INITIALIZED__) {
window.__SKYVOYAGE_APP_INITIALIZED__ = true;

// ==============================================================================
// 1. REAL INDIAN DOMESTIC FLIGHTS DATASET (Base Economy Fares in INR)
// ==============================================================================
const FALLBACK_FLIGHTS = [
  // Bengaluru (BLR) -> New Delhi (DEL)
  { id: 1, flightNumber: "6E-204", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A321neo", origin: "BLR", originName: "Bengaluru (T1)", destination: "DEL", destinationName: "New Delhi (IGI T2)", departTime: "06:10", arrivalTime: "09:05", duration: "2h 55m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 9408, price: 9408 },
  { id: 2, flightNumber: "QP-1304", airline: "Akasa Air", airlineCode: "QP", aircraft: "Boeing 737 MAX 8", origin: "BLR", originName: "Bengaluru (T1)", destination: "DEL", destinationName: "New Delhi (IGI T2)", departTime: "11:45", arrivalTime: "14:35", duration: "2h 50m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 9759, price: 9759 },
  { id: 3, flightNumber: "AI-804", airline: "Air India", airlineCode: "AI", aircraft: "Airbus A320neo", origin: "BLR", originName: "Bengaluru (T2)", destination: "DEL", destinationName: "New Delhi (IGI T3)", departTime: "08:30", arrivalTime: "11:20", duration: "2h 50m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 10276, price: 10276 },
  { id: 4, flightNumber: "IX-2742", airline: "Air India Express", airlineCode: "IX", aircraft: "Boeing 737-800", origin: "BLR", originName: "Bengaluru (T2)", destination: "DEL", destinationName: "New Delhi (IGI T3)", departTime: "15:15", arrivalTime: "18:15", duration: "3h 00m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 11483, price: 11483 },
  { id: 5, flightNumber: "6E-6012", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A320neo", origin: "BLR", originName: "Bengaluru (T1)", destination: "DEL", destinationName: "New Delhi (IGI T1)", departTime: "19:40", arrivalTime: "22:35", duration: "2h 55m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 12553, price: 12553 },

  // New Delhi (DEL) -> Bengaluru (BLR)
  { id: 6, flightNumber: "6E-2131", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A321neo", origin: "DEL", originName: "New Delhi (IGI T2)", destination: "BLR", destinationName: "Bengaluru (T1)", departTime: "07:05", arrivalTime: "09:55", duration: "2h 50m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 9026, price: 9026 },
  { id: 7, flightNumber: "IX-1145", airline: "Air India Express", airlineCode: "IX", aircraft: "Boeing 737 MAX 8", origin: "DEL", originName: "New Delhi (IGI T3)", destination: "BLR", destinationName: "Bengaluru (T2)", departTime: "10:15", arrivalTime: "13:10", duration: "2h 55m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 9354, price: 9354 },
  { id: 8, flightNumber: "QP-1511", airline: "Akasa Air", airlineCode: "QP", aircraft: "Boeing 737 MAX 8", origin: "DEL", originName: "New Delhi (IGI T2)", destination: "BLR", destinationName: "Bengaluru (T1)", departTime: "14:20", arrivalTime: "17:15", duration: "2h 55m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 10090, price: 10090 },
  { id: 9, flightNumber: "AI-502", airline: "Air India", airlineCode: "AI", aircraft: "Airbus A321", origin: "DEL", originName: "New Delhi (IGI T3)", destination: "BLR", destinationName: "Bengaluru (T2)", departTime: "18:00", arrivalTime: "20:50", duration: "2h 50m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 10710, price: 10710 },

  // Mumbai (BOM) -> New Delhi (DEL)
  { id: 10, flightNumber: "6E-512", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A320neo", origin: "BOM", originName: "Mumbai (CSMIA T2)", destination: "DEL", destinationName: "New Delhi (IGI T2)", departTime: "06:30", arrivalTime: "08:35", duration: "2h 05m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6475, price: 6475 },
  { id: 11, flightNumber: "IX-1214", airline: "Air India Express", airlineCode: "IX", aircraft: "Boeing 737-800", origin: "BOM", originName: "Mumbai (CSMIA T2)", destination: "DEL", destinationName: "New Delhi (IGI T3)", departTime: "09:45", arrivalTime: "12:10", duration: "2h 25m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6895, price: 6895 },
  { id: 12, flightNumber: "AI-866", airline: "Air India", airlineCode: "AI", aircraft: "Boeing 787 Dreamliner", origin: "BOM", originName: "Mumbai (CSMIA T2)", destination: "DEL", destinationName: "New Delhi (IGI T3)", departTime: "13:00", arrivalTime: "15:15", duration: "2h 15m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 7525, price: 7525 },
  { id: 13, flightNumber: "SG-8710", airline: "SpiceJet", airlineCode: "SG", aircraft: "Boeing 737-800", origin: "BOM", originName: "Mumbai (CSMIA T1)", destination: "DEL", destinationName: "New Delhi (IGI T1)", departTime: "17:30", arrivalTime: "19:50", duration: "2h 20m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 8950, price: 8950 },

  // New Delhi (DEL) -> Goa (GOI)
  { id: 14, flightNumber: "6E-441", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A320neo", origin: "DEL", originName: "New Delhi (IGI T2)", destination: "GOI", destinationName: "Goa (Mopa GOX)", departTime: "08:20", arrivalTime: "10:50", duration: "2h 30m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6507, price: 6507 },
  { id: 15, flightNumber: "QP-1602", airline: "Akasa Air", airlineCode: "QP", aircraft: "Boeing 737 MAX 8", origin: "DEL", originName: "New Delhi (IGI T2)", destination: "GOI", destinationName: "Goa (Mopa GOX)", departTime: "11:30", arrivalTime: "14:10", duration: "2h 40m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 7108, price: 7108 },
  { id: 16, flightNumber: "AI-883", airline: "Air India", airlineCode: "AI", aircraft: "Airbus A320neo", origin: "DEL", originName: "New Delhi (IGI T3)", destination: "GOI", destinationName: "Goa (Dabolim GOI)", departTime: "15:10", arrivalTime: "17:40", duration: "2h 30m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 8490, price: 8490 },

  // Bengaluru (BLR) -> Hyderabad (HYD)
  { id: 17, flightNumber: "6E-714", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A320neo", origin: "BLR", originName: "Bengaluru (T1)", destination: "HYD", destinationName: "Hyderabad (RGIA)", departTime: "07:10", arrivalTime: "08:30", duration: "1h 20m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 5091, price: 5091 },
  { id: 18, flightNumber: "QP-1412", airline: "Akasa Air", airlineCode: "QP", aircraft: "Boeing 737 MAX 8", origin: "BLR", originName: "Bengaluru (T1)", destination: "HYD", destinationName: "Hyderabad (RGIA)", departTime: "12:15", arrivalTime: "13:35", duration: "1h 20m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 5690, price: 5690 },
  { id: 19, flightNumber: "IX-2819", airline: "Air India Express", airlineCode: "IX", aircraft: "Boeing 737-800", origin: "BLR", originName: "Bengaluru (T2)", destination: "HYD", destinationName: "Hyderabad (RGIA)", departTime: "18:30", arrivalTime: "19:55", duration: "1h 25m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6890, price: 6890 },

  // New Delhi (DEL) -> Mumbai (BOM)
  { id: 20, flightNumber: "6E-2015", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A321neo", origin: "DEL", originName: "New Delhi (IGI T2)", destination: "BOM", destinationName: "Mumbai (CSMIA T2)", departTime: "08:00", arrivalTime: "10:15", duration: "2h 15m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6550, price: 6550 },
  { id: 21, flightNumber: "AI-678", airline: "Air India", airlineCode: "AI", aircraft: "Boeing 777-300ER", origin: "DEL", originName: "New Delhi (IGI T3)", destination: "BOM", destinationName: "Mumbai (CSMIA T2)", departTime: "15:00", arrivalTime: "17:15", duration: "2h 15m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 7890, price: 7890 }
];

// ==============================================================================
// 1B. CABIN CLASS PRICING & PERKS CONFIGURATION
// ==============================================================================
const CABIN_CLASSES = {
  "Economy": {
    code: "Economy",
    label: "Economy",
    multiplier: 1.0,
    baggage: "15kg Check-in + 7kg Cabin",
    frontSeatFee: 350,
    standardSeatFee: 150,
    loungeFeePerPax: 299,
    freeLounge: false,
    pillClass: "class-pill-economy",
    pillText: "💺 Economy • 15kg Bag",
    sliderMax: 20000
  },
  "Premium Economy": {
    code: "Premium Economy",
    label: "Premium Economy",
    multiplier: 1.45,
    baggage: "25kg Check-in + Priority + Hot Meal",
    frontSeatFee: 0,
    standardSeatFee: 100,
    loungeFeePerPax: 149,
    freeLounge: false,
    pillClass: "class-pill-premium",
    pillText: "✨ Prem Economy • 25kg + Priority",
    sliderMax: 30000
  },
  "Business": {
    code: "Business",
    label: "Business Class",
    multiplier: 2.25,
    baggage: "35kg Check-in + Recliner + Free VIP Lounge",
    frontSeatFee: 0,
    standardSeatFee: 0,
    loungeFeePerPax: 0,
    freeLounge: true,
    pillClass: "class-pill-business",
    pillText: "👑 Business Class • 35kg + Free Lounge & Seats",
    sliderMax: 45000
  }
};

function getCabinConfig(classVal) {
  const val = classVal || (dom && dom.travelClass ? dom.travelClass.value : "Economy");
  if (val.toLowerCase().includes("business")) return CABIN_CLASSES["Business"];
  if (val.toLowerCase().includes("premium")) return CABIN_CLASSES["Premium Economy"];
  return CABIN_CLASSES["Economy"];
}

// ==============================================================================
// 2. DESTINATION WEATHER, PACKING & 3-DAY ITINERARY GUIDES
// ==============================================================================
const WEATHER_DATA = {
  "DEL": {
    city: "New Delhi", temp: "22°C", cond: "Pleasant & Crisp Haze", icon: "🌤️",
    tip: "Carry a light jacket or shawl for cool Delhi mornings & evenings.",
    itinerary: [
      "Day 1 (Heritage): India Gate, Humayun's Tomb, Qutub Minar & dinner at Connaught Place.",
      "Day 2 (Old Delhi & Markets): Red Fort, Chandni Chowk Paranthe Wali Gali, Sarojini Nagar & Hauz Khas Village.",
      "Day 3 (Modern Delhi): Akshardham Temple, Lotus Temple, Dilli Haat shopping & Khan Market cafes."
    ],
    food: "Chole Bhature, Old Delhi Butter Chicken, Daulat Ki Chaat & Momos",
    stay: "Connaught Place, Aerocity (near T3), or South Delhi (Hauz Khas)"
  },
  "BLR": {
    city: "Bengaluru", temp: "24°C", cond: "Cool & Breezy", icon: "⛅",
    tip: "Bengaluru evenings drop to 19°C; pack a light hoodie & compact umbrella.",
    itinerary: [
      "Day 1 (Garden City): Lalbagh Glass House, Cubbon Park, Vidhana Soudha & MG Road / Church Street.",
      "Day 2 (Royal & Cafes): Bangalore Palace, ISKCON Temple, and specialty coffee & dining in Indiranagar / Koramangala.",
      "Day 3 (Sunrise & Shopping): Nandi Hills sunrise drive, Commercial Street shopping & UB City."
    ],
    food: "MTR Masala Dosa, Filter Coffee, Meghana Biryani & Corner House DBC",
    stay: "Koramangala / Jakkasandra, Indiranagar, or MG Road"
  },
  "BOM": {
    city: "Mumbai", temp: "30°C", cond: "Warm Coastal Breeze", icon: "☀️",
    tip: "Pack breathable cotton clothes & sunglasses for Mumbai's humid weather.",
    itinerary: [
      "Day 1 (South Mumbai): Gateway of India, Taj Mahal Palace, Colaba Causeway & sunset at Marine Drive.",
      "Day 2 (Bandra & Sea Link): Bandra-Worli Sea Link drive, Bandstand, Linking Road shopping & Juhu Beach.",
      "Day 3 (Culture & Caves): Elephanta Caves ferry or Kala Ghoda Art District & Palladium Mall."
    ],
    food: "Vada Pav, Pav Bhaji at Juhu, Bombay Sandwich & Bademiya Kebabs",
    stay: "Bandra West, Juhu, Andheri (near T2), or Colaba"
  },
  "GOI": {
    city: "Goa", temp: "31°C", cond: "Sunny Tropical Beach Weather", icon: "🌴",
    tip: "Pack resort wear, flip-flops, sunglasses & SPF 50 sunscreen for Goa!",
    itinerary: [
      "Day 1 (North Goa Beaches): Aguada Fort, Candolim, Baga water sports & sunset at Vagator / Chapora Fort.",
      "Day 2 (Old Goa & Panjim): Basilica of Bom Jesus, Fontainhas Latin Quarter walk & Mandovi River sunset cruise.",
      "Day 3 (South Goa Serenity): Palolem Beach kayaking, Cabo de Rama cliff view & beachside shack dinner."
    ],
    food: "Goan Fish Thali, Prawn Balchao, Poi Bread & Bebinca dessert",
    stay: "Candolim / Assagao (North Goa) or Palolem / Cavelossim (South Goa)"
  },
  "HYD": {
    city: "Hyderabad", temp: "27°C", cond: "Clear & Sunny", icon: "☀️",
    tip: "Light cotton formals or casuals are ideal for Hyderabad's warm afternoons.",
    itinerary: [
      "Day 1 (Old City): Charminar, Laad Bazaar bangles, Chowmahalla Palace & Mecca Masjid.",
      "Day 2 (Forts & Lake): Golconda Fort sound & light show, Hussain Sagar Lake & Tank Bund.",
      "Day 3 (Modern & Film City): Ramoji Film City tour or HITEC City / Jubilee Hills cafes & Birla Mandir."
    ],
    food: "Hyderabadi Dum Biryani, Irani Chai, Osmania Biscuits & Double Ka Meetha",
    stay: "Banjara Hills, Jubilee Hills, or Gachibowli / HITEC City"
  },
  "CCU": {
    city: "Kolkata", temp: "26°C", cond: "Mild & Humid", icon: "🌤️",
    tip: "Carry light cotton outfits and a compact umbrella for Kolkata.",
    itinerary: [
      "Day 1: Victoria Memorial, St. Paul's Cathedral & Park Street heritage dining.",
      "Day 2: Howrah Bridge, Flower Market, Dakshineswar Kali Temple & Prinsep Ghat boat ride.",
      "Day 3: Indian Museum, College Street book market & New Market shopping."
    ],
    food: "Kathi Rolls,Phuchka, Kosha Mangsho & Rosogolla / Mishti Doi",
    stay: "Park Street, Esplanade, or Salt Lake / New Town"
  },
  "MAA": {
    city: "Chennai", temp: "31°C", cond: "Warm & Humid", icon: "☀️",
    tip: "Light linen/cotton clothes and a water bottle recommended for Chennai.",
    itinerary: [
      "Day 1: Marina Beach sunrise, Kapaleeshwarar Temple in Mylapore & San Thome Basilica.",
      "Day 2: Day trip down East Coast Road (ECR) to Mahabalipuram Shore Temple & DakshinaChitra.",
      "Day 3: T. Nagar silk & jewelry shopping, Guindy National Park & Besant Nagar (Elliot's) Beach."
    ],
    food: "Chettinad Meals, Murugan Idli, Filter Coffee & Marina Sundal",
    stay: "T. Nagar, Mylapore, Adyar, or Guindy"
  },
  "JAI": {
    city: "Jaipur", temp: "25°C", cond: "Sunny Days & Cool Desert Nights", icon: "🏜️",
    tip: "Pack sunglasses for daytime forts and a light sweater for Jaipur nights.",
    itinerary: [
      "Day 1 (Pink City): Hawa Mahal, City Palace, Jantar Mantar & Johari Bazaar shopping.",
      "Day 2 (Royal Forts): Amer Fort, Jal Mahal, Nahargarh Fort sunset & Chokhi Dhani cultural dinner.",
      "Day 3 (Art & Gates): Patrika Gate photos, Albert Hall Museum & Bapu Bazaar handicrafts."
    ],
    food: "Dal Baati Churma, Pyaaz Kachori, Ghewar & Lassiwala Lassi",
    stay: "MI Road, Bani Park, or C-Scheme"
  }
};

// ==============================================================================
// 3. HOME-TO-AIRPORT RESIDENTIAL ROUTE MAP DATABASE (Real GPS Coordinates)
// ==============================================================================
const CITY_AIRPORT_ROUTES = {
  "BLR": {
    airportName: "Kempegowda International Airport (BLR T1/T2)",
    airportCoords: [13.1986, 77.7066],
    areas: [
      { name: "Jakkasandra / Koramangala", coords: [12.9279, 77.6271], midWay: [13.0358, 77.5970], distKm: 39.5, driveMins: 65, cabFare: 699, highway: "Bellary Road (NH-44) & Hebbal Elevated Flyover", traffic: "Moderate Traffic", steps: ["Start at Jakkasandra / 1st Block Koramangala", "Pass MG Road & Mekhri Circle", "Take Hebbal Flyover onto NH-44 Airport Expressway", "Arrive at BLR Terminal 1 / Terminal 2 Departure Ramp"] },
      { name: "HSR Layout (Sector 1–7)", coords: [12.9121, 77.6446], midWay: [13.0280, 77.6300], distKm: 42.8, driveMins: 72, cabFare: 749, highway: "Outer Ring Road & NH-44 Airport Expressway", traffic: "Moderate Traffic", steps: ["Start at HSR Layout BDA Complex", "Join Silk Board / Inner Ring Road towards Domlur", "Merge onto Bellary Road NH-44 at Hebbal", "Arrive at BLR Airport Departure Gate"] },
      { name: "Indiranagar (100 Feet Road)", coords: [12.9784, 77.6408], midWay: [13.0450, 77.6100], distKm: 36.4, driveMins: 56, cabFare: 649, highway: "New Airport Road & NH-44 Expressway", traffic: "Smooth Flow", steps: ["Start at Indiranagar 100 Ft Rd", "Head via Hennur / Hebbal Outer Ring Rd", "Fast-track on NH-44 Tollway", "Reach BLR Terminal Departure"] },
      { name: "Whitefield (ITPL / Hope Farm)", coords: [12.9698, 77.7500], midWay: [13.0850, 77.7650], distKm: 44.0, driveMins: 68, cabFare: 799, highway: "Budigere Cross / SH-104 Cargo Road (Toll-Free)", traffic: "Light Traffic", steps: ["Start at Whitefield / ITPL Main Rd", "Cross Hoskote & Budigere Cross", "Enter via BLR Airport Back Gate (SH-104)", "Arrive at BLR Terminal 1 / 2"] },
      { name: "Jayanagar / JP Nagar", coords: [12.9308, 77.5838], midWay: [13.0150, 77.5850], distKm: 41.2, driveMins: 68, cabFare: 729, highway: "Sankey Road & Bellary Road NH-44", traffic: "Moderate Traffic", steps: ["Start at Jayanagar 4th Block", "Pass Lalbagh & Palace Grounds", "Take NH-44 Elevated Expressway", "Arrive at BLR Airport"] },
      { name: "Electronic City (Phase 1)", coords: [12.8452, 77.6602], midWay: [12.9800, 77.6050], distKm: 54.5, driveMins: 85, cabFare: 949, highway: "Electronic City Elevated Flyover + NH-44", traffic: "High Peak Traffic", steps: ["Start at Electronic City Toll", "Take 10 km Elevated Hosur Rd Flyover", "Cross City Center to Hebbal NH-44", "Arrive at BLR Airport Terminal"] }
    ]
  },
  "DEL": {
    airportName: "Indira Gandhi International Airport (DEL T1/T2/T3)",
    airportCoords: [28.5562, 77.1000],
    areas: [
      { name: "Connaught Place (Central Delhi)", coords: [28.6315, 77.2167], midWay: [28.5950, 77.1600], distKm: 16.5, driveMins: 35, cabFare: 449, highway: "Sardar Patel Marg & NH-48 Delhi-Gurgaon Expressway", traffic: "Smooth Flow", steps: ["Start at Connaught Place Inner Circle", "Drive down Sardar Patel Marg / Dhaula Kuan", "Merge onto NH-48 Airport Approach Rd", "Arrive at DEL IGI Terminal 2 / 3"] },
      { name: "Hauz Khas / South Delhi", coords: [28.5494, 77.2001], midWay: [28.5550, 77.1500], distKm: 14.2, driveMins: 30, cabFare: 399, highway: "Outer Ring Road & Rao Tula Ram Flyover", traffic: "Light Traffic", steps: ["Start at Hauz Khas / IIT Gate", "Take Munirka / RTR Flyover", "Follow IGI Airport T3 signs", "Arrive at DEL Departure Forecourt"] },
      { name: "Dwarka (Sector 21 / 10)", coords: [28.5522, 77.0583], midWay: [28.5540, 77.0800], distKm: 8.5, driveMins: 18, cabFare: 299, highway: "Dwarka Expressway / UER-II Tunnel", traffic: "Fast Route", steps: ["Start at Dwarka Sector 21", "Enter New Shallow Tunnel to IGI T3", "Arrive at DEL Airport in 18 mins"] },
      { name: "Noida (Sector 18 / 62)", coords: [28.5708, 77.3260], midWay: [28.5680, 77.2200], distKm: 33.0, driveMins: 58, cabFare: 699, highway: "DND Flyway & Ring Road to NH-48", traffic: "Moderate Traffic", steps: ["Start at Noida Sector 18", "Cross Yamuna via DND Flyway", "Take AIIMS Ring Road to Dhaula Kuan", "Arrive at DEL IGI Airport"] },
      { name: "Gurugram (Cyber Hub / DLF)", coords: [28.4950, 77.0895], midWay: [28.5250, 77.0950], distKm: 13.8, driveMins: 25, cabFare: 399, highway: "NH-48 Delhi-Jaipur Expressway", traffic: "Smooth Flow", steps: ["Start at DLF Cyber Hub", "Cross Ambience Mall Toll on NH-48", "Take IGI T3 Exit Ramp", "Arrive at DEL Airport"] }
    ]
  },
  "BOM": {
    airportName: "Chhatrapati Shivaji Maharaj Intl Airport (BOM T1/T2)",
    airportCoords: [19.0896, 72.8656],
    areas: [
      { name: "Bandra West (Linking Road)", coords: [19.0596, 72.8295], midWay: [19.0750, 72.8500], distKm: 9.8, driveMins: 25, cabFare: 349, highway: "Western Express Highway (WEH) & Sahar Elevated Rd", traffic: "Moderate Traffic", steps: ["Start at Bandra West", "Join Western Express Highway Northbound", "Take Sahar Elevated Corridor", "Arrive at BOM T2 Departure"] },
      { name: "Andheri West (Lokhandwala)", coords: [19.1363, 72.8277], midWay: [19.1150, 72.8520], distKm: 7.4, driveMins: 22, cabFare: 299, highway: "Andheri-Ghatkopar Link Rd & WEH", traffic: "Moderate Traffic", steps: ["Start at Lokhandwala / Andheri", "Cross WEH Metro Junction", "Take Sahar Airport Approach", "Arrive at BOM Terminal"] },
      { name: "Colaba / Marine Drive (South Mumbai)", coords: [18.9220, 72.8347], midWay: [19.0150, 72.8180], distKm: 26.5, driveMins: 45, cabFare: 649, highway: "Coastal Road + Bandra-Worli Sea Link", traffic: "Scenic Fast Route", steps: ["Start at Colaba / Marine Drive", "Cruise via Mumbai Coastal Road & Sea Link", "Join WEH to Sahar Elevated Road", "Arrive at BOM T2"] },
      { name: "Powai (Hiranandani Gardens)", coords: [19.1176, 72.9060], midWay: [19.1050, 72.8850], distKm: 7.8, driveMins: 24, cabFare: 329, highway: "JVLR & Saki Naka Airport Road", traffic: "Light Traffic", steps: ["Start at Powai Lake / Hiranandani", "Pass Saki Naka Junction", "Arrive at BOM T2 International/Domestic Terminal"] }
    ]
  },
  "HYD": {
    airportName: "Rajiv Gandhi International Airport (HYD Shamshabad)",
    airportCoords: [17.2403, 78.4294],
    areas: [
      { name: "Gachibowli / HITEC City", coords: [17.4401, 78.3489], midWay: [17.3300, 78.3600], distKm: 32.5, driveMins: 40, cabFare: 649, highway: "Nehru Outer Ring Road (ORR 8-Lane Expressway)", traffic: "Fast 100 km/h", steps: ["Start at HITEC City / Mindspace", "Enter Nehru Outer Ring Road at Nanakramguda", "Exit at Shamshabad Airport Toll", "Arrive at HYD RGIA Departure"] },
      { name: "Banjara Hills / Jubilee Hills", coords: [17.4156, 78.4347], midWay: [17.3400, 78.4300], distKm: 30.2, driveMins: 46, cabFare: 599, highway: "PVNR Elevated Expressway (11.6 km Flyover)", traffic: "Smooth Flow", steps: ["Start at Banjara Hills Rd No. 12", "Get on PVNR Airport Expressway at Mehdipatnam", "Straight run to Shamshabad", "Arrive at HYD Terminal"] }
    ]
  },
  "GOI": {
    airportName: "Goa International Airport (Dabolim GOI)",
    airportCoords: [15.3808, 73.8314],
    areas: [
      { name: "Panjim City (Miramar / Fontainhas)", coords: [15.4909, 73.8278], midWay: [15.4350, 73.8450], distKm: 28.5, driveMins: 42, cabFare: 599, highway: "NH-66 & Atal Setu / Zuari New Bridge", traffic: "Smooth Flow", steps: ["Start at Panjim City", "Cross Bambolim & New Zuari Cable Bridge", "Take Dabolim Airport Highway", "Arrive at Goa Airport"] },
      { name: "Calangute / Baga Beach (North Goa)", coords: [15.5440, 73.7553], midWay: [15.4700, 73.8100], distKm: 39.0, driveMins: 65, cabFare: 849, highway: "CHOGM Road & NH-66 Highway", traffic: "Moderate Traffic", steps: ["Start at Calangute / Baga", "Cross Porvorim & Atal Setu Bridge", "Follow NH-66 to Dabolim", "Arrive at Goa Airport"] }
    ]
  }
};

// ==============================================================================
// 4. AI FARE PREDICTOR DATA (Economy Base Bands)
// ==============================================================================
const PRICE_PREDICTIONS = {
  "BLR-DEL": {
    lowBand: 6400, highBand: 9600,
    recommendation: "CHECK ±2 DAYS DEALS TO SAVE ₹1,129+",
    confidence: 89,
    badgeType: "wait",
    headline: "Bengaluru → New Delhi: Lower Fares Available 1–2 Days Around Selected Date",
    insight: "Google Flights historical data shows peak mid-week/weekend surges. Check the ±2 Days Ribbon above to lock in saver fares!",
    bestWindow: "Book 2–5 months ahead or travel 1–2 days earlier/later",
    driveTime: "35 min from DEL Terminal T3 to Connaught Place",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 11483 },
      { date: "2026-11-02", label: "02 Nov", price: 10276 },
      { date: "2026-11-05", label: "05 Nov", price: 12553 },
      { date: "2026-11-08", label: "08 Nov", price: 9759 },
      { date: "2026-11-09", label: "09 Nov", price: 9408 },
      { date: "2026-12-03", label: "03 Dec", price: 8680 },
      { date: "2026-12-04", label: "04 Dec", price: 9962 }
    ]
  },
  "DEL-BLR": {
    lowBand: 6300, highBand: 9600,
    recommendation: "BOOK NOW (91% CONFIDENCE)",
    confidence: 91,
    badgeType: "buy",
    headline: "New Delhi → Bengaluru: Lock in Lowest Fares Before Mid-Month Surge",
    insight: "Current nonstop fares are inside the fair price range. Flying 1–2 days earlier saves an additional 12% per person.",
    bestWindow: "Book 2+ weeks ahead",
    driveTime: "59 min from BLR Airport to Jakkasandra / Koramangala",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 9354 },
      { date: "2026-11-03", label: "03 Nov", price: 9026 },
      { date: "2026-11-05", label: "05 Nov", price: 9410 },
      { date: "2026-11-08", label: "08 Nov", price: 8724 },
      { date: "2026-12-02", label: "02 Dec", price: 8450 },
      { date: "2026-12-04", label: "04 Dec", price: 10090 },
      { date: "2026-12-05", label: "05 Dec", price: 8920 }
    ]
  },
  "BOM-DEL": {
    lowBand: 5400, highBand: 7100,
    recommendation: "BOOK NOW • GREAT FARE",
    confidence: 94,
    badgeType: "buy",
    headline: "Mumbai → New Delhi: Nonstop Fares at Floor Price",
    insight: "Mumbai to Delhi nonstop flights (2h 05m) are trading inside the lowest annual price band.",
    bestWindow: "Book 8+ days before departure",
    driveTime: "35 min from DEL IGI Airport to Central Delhi",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 7525 },
      { date: "2026-11-01", label: "01 Nov", price: 6895 },
      { date: "2026-11-05", label: "05 Nov", price: 10002 },
      { date: "2026-11-08", label: "08 Nov", price: 6475 },
      { date: "2026-12-03", label: "03 Dec", price: 5890 },
      { date: "2026-12-04", label: "04 Dec", price: 6475 },
      { date: "2026-12-05", label: "05 Dec", price: 5950 }
    ]
  },
  "DEL-GOI": {
    lowBand: 4900, highBand: 8000,
    recommendation: "BOOK IMMEDIATELY",
    confidence: 96,
    badgeType: "buy",
    headline: "New Delhi → Goa: Book Now Before Peak Tourist Surge!",
    insight: "Nonstop flights to Goa are holding steady right now, while adjacent dates drop another 11%.",
    bestWindow: "Check ±2 days strip for saver fare",
    driveTime: "42 min from Goa Airport to Panjim",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 6612 },
      { date: "2026-11-02", label: "02 Nov", price: 6507 },
      { date: "2026-11-05", label: "05 Nov", price: 6507 },
      { date: "2026-11-09", label: "09 Nov", price: 11436 },
      { date: "2026-12-03", label: "03 Dec", price: 5890 },
      { date: "2026-12-04", label: "04 Dec", price: 8423 },
      { date: "2026-12-05", label: "05 Dec", price: 6120 }
    ]
  },
  "BLR-HYD": {
    lowBand: 4500, highBand: 6200,
    recommendation: "BOOK NOW • FLOOR PRICE",
    confidence: 88,
    badgeType: "buy",
    headline: "Bengaluru → Hyderabad: 1h 20m Nonstop Saver Deals",
    insight: "Nonstop morning flights are at floor prices, with adjacent day saver deals available.",
    bestWindow: "Book 6+ days before departure",
    driveTime: "40 min from HYD Airport to HITEC City / Gachibowli",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 6227 },
      { date: "2026-11-02", label: "02 Nov", price: 5091 },
      { date: "2026-11-05", label: "05 Nov", price: 7245 },
      { date: "2026-11-08", label: "08 Nov", price: 5091 },
      { date: "2026-12-03", label: "03 Dec", price: 4690 },
      { date: "2026-12-04", label: "04 Dec", price: 5237 },
      { date: "2026-12-05", label: "05 Dec", price: 4750 }
    ]
  }
};

// ==============================================================================
// 5. APPLICATION STATE & CONVERSATIONAL MEMORY
// ==============================================================================
const state = {
  passengersCount: 1,
  currentFlight: null,
  selectedSeats: [],
  loungeIncluded: false,
  loungeFeePerPax: 299.0,
  selectedCabType: 'None',
  selectedCabFee: 0.0,
  selectedCabPickupTime: 'N/A',
  sortBy: 'price',
  maxPrice: 20000,
  activeAirlines: ['IndiGo', 'Air India', 'Akasa Air', 'Air India Express', 'SpiceJet'],
  allFlights: [],
  priceAlertEnabled: false,
  leafletMap: null,
  mapRouteLayer: null,
  cabMarker: null,
  cabAnimInterval: null,
  chatTurnCount: 0,
  chatMemory: {
    lastRecommendedFlight: null,
    lastTopic: null,
    history: []
  }
};

// ==============================================================================
// 6. DOM REFERENCES
// ==============================================================================
const dom = {
  navSearchBtn: document.getElementById('nav-search-btn'),
  navMapBtn: document.getElementById('nav-map-btn'),
  navBookingsBtn: document.getElementById('nav-bookings-btn'),
  brandLogo: document.getElementById('brand-logo'),
  bookingBadge: document.getElementById('booking-badge'),

  searchSection: document.getElementById('search-section'),
  mapSection: document.getElementById('map-section'),
  bookingsSection: document.getElementById('bookings-section'),
  
  bookingModal: document.getElementById('booking-modal'),
  ticketModal: document.getElementById('ticket-modal'),

  searchForm: document.getElementById('search-form'),
  originSelect: document.getElementById('origin-select'),
  destSelect: document.getElementById('dest-select'),
  departDate: document.getElementById('depart-date'),
  passengersSelect: document.getElementById('passengers-select'),
  travelClass: document.getElementById('travel-class'),
  travelerSummaryBadge: document.getElementById('traveler-summary-badge'),
  btnHeroMap: document.getElementById('btn-hero-map'),

  flexDatesTitle: document.getElementById('flex-dates-title'),
  flexDatesStrip: document.getElementById('flex-dates-strip'),
  nearbyDealsHeading: document.getElementById('nearby-deals-heading'),
  nearbyFlightsContainer: document.getElementById('nearby-flights-container'),

  predConfidenceBadge: document.getElementById('pred-confidence-badge'),
  predHeadline: document.getElementById('pred-headline'),
  predInsightText: document.getElementById('pred-insight-text'),
  predFairBand: document.getElementById('pred-fair-band'),
  predBestWindow: document.getElementById('pred-best-window'),
  predDriveTime: document.getElementById('pred-drive-time'),
  predBarsContainer: document.getElementById('pred-bars-container'),
  btnPriceAlert: document.getElementById('btn-price-alert'),
  priceAlertText: document.getElementById('price-alert-text'),
  weatherIcon: document.getElementById('weather-icon'),
  weatherTempCond: document.getElementById('weather-temp-cond'),
  weatherPackTip: document.getElementById('weather-pack-tip'),

  priceSlider: document.getElementById('price-slider'),
  priceValLabel: document.getElementById('price-val-label'),
  airlineFiltersContainer: document.getElementById('airline-filters-container'),
  btnResetFilters: document.getElementById('btn-reset-filters'),
  routeSummaryText: document.getElementById('route-summary-text'),
  flightsContainer: document.getElementById('flights-container'),
  sortChips: document.querySelectorAll('.sort-chip'),

  mapCitySelect: document.getElementById('map-city-select'),
  mapAreaSelect: document.getElementById('map-area-select'),
  mapCustomArea: document.getElementById('map-custom-area'),
  btnApplyCustomArea: document.getElementById('btn-apply-custom-area'),
  mapFlightTime: document.getElementById('map-flight-time'),
  mapTrafficBadge: document.getElementById('map-traffic-badge'),
  mapDistanceVal: document.getElementById('map-distance-val'),
  mapDurationVal: document.getElementById('map-duration-val'),
  mapCabEstVal: document.getElementById('map-cab-est-val'),
  mapHighwayText: document.getElementById('map-highway-text'),
  mapLeaveTimeVal: document.getElementById('map-leave-time-val'),
  mapLeaveExplain: document.getElementById('map-leave-explain'),
  btnSimulateDrive: document.getElementById('btn-simulate-drive'),
  linkGoogleMapsDir: document.getElementById('link-google-maps-dir'),
  mapRouteHeaderLabel: document.getElementById('map-route-header-label'),
  mapTurnSteps: document.getElementById('map-turn-steps'),

  btnCloseModal: document.getElementById('btn-close-modal'),
  modalPaxCountTitle: document.getElementById('modal-pax-count-title'),
  modalFlightDetails: document.getElementById('modal-flight-details'),
  seatInstructionBanner: document.getElementById('seat-instruction-banner'),
  seatsGrid: document.getElementById('seats-grid'),
  lblSelectedSeat: document.getElementById('lbl-selected-seat'),
  loungeSmartReason: document.getElementById('lounge-smart-reason'),
  loungeDescText: document.getElementById('lounge-desc-text'),
  chkLoungePass: document.getElementById('chk-lounge-pass'),
  loungeTotalLabel: document.getElementById('lounge-total-label'),
  cabSyncSubtitle: document.getElementById('cab-sync-subtitle'),
  cabGroupHint: document.getElementById('cab-group-hint'),
  paxFormCountLabel: document.getElementById('pax-form-count-label'),
  passengersInputsContainer: document.getElementById('passengers-inputs-container'),
  bookingForm: document.getElementById('booking-form'),

  farePaxMultiplier: document.getElementById('fare-pax-multiplier'),
  fareBase: document.getElementById('fare-base'),
  fareTax: document.getElementById('fare-tax'),
  fareSeatsList: document.getElementById('fare-seats-list'),
  fareSeat: document.getElementById('fare-seat'),
  fareLounge: document.getElementById('fare-lounge'),
  fareCabName: document.getElementById('fare-cab-name'),
  fareCab: document.getElementById('fare-cab'),
  fareTotal: document.getElementById('fare-total'),

  btnCloseTicket: document.getElementById('btn-close-ticket'),
  btnPrintTicket: document.getElementById('btn-print-ticket'),
  btnTicketOpenMap: document.getElementById('btn-ticket-open-map'),
  bpAirline: document.getElementById('bp-airline'),
  bpPnr: document.getElementById('bp-pnr'),
  bpOriginCode: document.getElementById('bp-origin-code'),
  bpOriginName: document.getElementById('bp-origin-name'),
  bpDestCode: document.getElementById('bp-dest-code'),
  bpDestName: document.getElementById('bp-dest-name'),
  bpDepartTime: document.getElementById('bp-depart-time'),
  bpArrivalTime: document.getElementById('bp-arrival-time'),
  bpDuration: document.getElementById('bp-duration'),
  bpPassenger: document.getElementById('bp-passenger'),
  bpFlightNum: document.getElementById('bp-flight-num'),
  bpSeat: document.getElementById('bp-seat'),
  bpClass: document.getElementById('bp-class'),
  bpDate: document.getElementById('bp-date'),
  bpTerminal: document.getElementById('bp-terminal'),
  bpGate: document.getElementById('bp-gate'),
  bpLoungeStrip: document.getElementById('bp-lounge-strip'),
  bpLoungeDetails: document.getElementById('bp-lounge-details'),
  bpCabStrip: document.getElementById('bp-cab-strip'),
  bpCabDetails: document.getElementById('bp-cab-details'),
  bpWeatherText: document.getElementById('bp-weather-text'),

  bookingsList: document.getElementById('bookings-list'),

  btnOpenChat: document.getElementById('btn-open-chat'),
  btnCloseChat: document.getElementById('btn-close-chat'),
  chatbotWindow: document.getElementById('chatbot-window'),
  chatMessages: document.getElementById('chat-messages'),
  chatQuickChips: document.getElementById('chat-quick-chips') || document.querySelector('.chat-quick-chips'),
  chatForm: document.getElementById('chat-form'),
  chatInput: document.getElementById('chat-input'),
  chatChips: document.querySelectorAll('.chat-chip'),

  toastContainer: document.getElementById('toast-container')
};

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  dom.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3800);
}

function getLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem('skyvoyage_local_bookings_v3') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLocalBookings(list) {
  try {
    localStorage.setItem('skyvoyage_local_bookings_v3', JSON.stringify(list));
  } catch (e) {}
}

// ==============================================================================
// 7. ±2 DAYS FLEXIBLE DATE FINDER & CHEAPER NEARBY FLIGHTS (Class-Aware)
// ==============================================================================
function renderFlexibleDatesAndNearbyDeals() {
  const selectedDateStr = dom.departDate.value || "2026-12-04";
  const baseDate = new Date(selectedDateStr + "T00:00:00");
  if (isNaN(baseDate.getTime())) return;

  const classCfg = getCabinConfig();
  const sortedFlights = [...state.allFlights].sort((a, b) => a.price - b.price);
  const lowestOnSelected = sortedFlights.length > 0 ? sortedFlights[0].price : Math.round(7500 * classCfg.multiplier);
  const cheapestFlightObj = sortedFlights[0] || {
    airline: "IndiGo", airlineCode: "6E", flightNumber: "6E-204",
    origin: dom.originSelect.value, destination: dom.destSelect.value,
    departTime: "06:10", arrivalTime: "09:05", duration: "2h 55m", stops: "Non-stop",
    baseEconomyPrice: 7500, price: lowestOnSelected
  };
  const secondFlightObj = sortedFlights[1] || cheapestFlightObj;

  const offsets = [
    { diff: -2, label: "2 Days Earlier", mult: 0.88, flightRef: cheapestFlightObj },
    { diff: -1, label: "1 Day Earlier",  mult: 0.91, flightRef: secondFlightObj },
    { diff: 0,  label: "Selected Date",  mult: 1.00, flightRef: cheapestFlightObj },
    { diff: 1,  label: "1 Day Later",    mult: 0.89, flightRef: cheapestFlightObj },
    { diff: 2,  label: "2 Days Later",   mult: 1.08, flightRef: secondFlightObj }
  ];

  const formattedSelected = baseDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  dom.flexDatesTitle.textContent = `Flexible Dates Around ${formattedSelected} (${dom.originSelect.value} → ${dom.destSelect.value} • ${classCfg.label})`;
  dom.nearbyDealsHeading.textContent = `Cheaper ${classCfg.label} Flights Available 1–2 Days Before & After ${formattedSelected}`;

  dom.flexDatesStrip.innerHTML = '';
  dom.nearbyFlightsContainer.innerHTML = '';

  offsets.forEach(item => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + item.diff);
    const isoStr = d.toISOString().split('T')[0];
    const niceDate = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const dayPrice = Math.round(lowestOnSelected * item.mult);
    const savings = Math.round(lowestOnSelected - dayPrice);

    let boxClass = "flex-date-box";
    if (item.diff === 0) boxClass += " is-selected";
    else if (savings > 0) boxClass += " is-cheaper";
    else boxClass += " is-expensive";

    const box = document.createElement('div');
    box.className = boxClass;
    box.innerHTML = `
      <span class="fd-offset-tag">${item.label}</span>
      <span class="fd-date-label">${niceDate}</span>
      <span class="fd-price-label">&#8377;${dayPrice.toLocaleString('en-IN')}</span>
      <span class="fd-save-note">
        ${item.diff === 0 ? `Selected (${classCfg.label})` : (savings > 0 ? `Save ₹${savings.toLocaleString('en-IN')}/pax` : `+₹${Math.abs(savings).toLocaleString('en-IN')}`)}
      </span>
    `;

    box.addEventListener('click', () => {
      dom.departDate.value = isoStr;
      showToast(`Switched date to ${niceDate} (${classCfg.label} Lowest: ₹${dayPrice.toLocaleString('en-IN')})`, "success");
      fetchFlights();
    });

    dom.flexDatesStrip.appendChild(box);

    if (item.diff !== 0 && savings > 0) {
      const f = item.flightRef;
      const discountedFlight = { ...f, price: dayPrice };
      const dealCard = document.createElement('div');
      dealCard.className = "nearby-deal-card";
      dealCard.innerHTML = `
        <div class="nd-top">
          <span class="nd-date-pill">&#128197; ${niceDate} (${item.label})</span>
          <span class="nd-save-pill">Save &#8377;${savings.toLocaleString('en-IN')}/pax</span>
        </div>
        <div class="nd-flight-info">
          ${f.airline} (${f.flightNumber}) &bull; ${f.departTime} &rarr; ${f.arrivalTime} (${f.duration}) &bull; <strong>${classCfg.label}</strong>
        </div>
        <div class="nd-bottom">
          <div>
            <span style="font-size:0.68rem; color:#64748b; display:block;">${classCfg.label} Saver Fare</span>
            <span class="nd-price">&#8377;${dayPrice.toLocaleString('en-IN')}</span>
          </div>
          <button type="button" class="btn btn-book-cheapest btn-sm">Switch to ${niceDate.split(',')[1] || niceDate} &amp; Book &rarr;</button>
        </div>
      `;

      dealCard.querySelector('button').addEventListener('click', () => {
        dom.departDate.value = isoStr;
        showToast(`Switched to ${niceDate}! Opening ${classCfg.label} booking...`, "success");
        fetchFlights();
        openBookingModal(discountedFlight);
      });

      dom.nearbyFlightsContainer.appendChild(dealCard);
    }
  });
}

// ==============================================================================
// 8. AI FARE PREDICTOR + WEATHER BANNER RENDERER (Scales with Cabin Class!)
// ==============================================================================
function renderFarePredictionAndWeather(origin, dest) {
  const key = `${origin}-${dest}`;
  const classCfg = getCabinConfig();
  const mult = classCfg.multiplier;

  const pred = PRICE_PREDICTIONS[key] || {
    lowBand: 5800, highBand: 8400,
    recommendation: "BOOK NOW (87% CONFIDENCE)",
    confidence: 87,
    badgeType: "buy",
    headline: `${origin} → ${dest}: Fares Are Currently in the Optimal Buying Zone`,
    insight: `Fares for ${origin} → ${dest} are lower on early morning flights and 1–2 days before/after peak dates.`,
    bestWindow: "Book 14–21 days ahead; Tue/Wed flights are 18% cheaper",
    driveTime: "45 min from Arrival Terminal to City Center",
    days: [
      { date: "2026-10-31", label: "31 Oct", price: 7200 },
      { date: "2026-11-02", label: "02 Nov", price: 6850 },
      { date: "2026-11-05", label: "05 Nov", price: 7490 },
      { date: "2026-11-08", label: "08 Nov", price: 6350 },
      { date: "2026-12-03", label: "03 Dec", price: 6190 },
      { date: "2026-12-04", label: "04 Dec", price: 6950 },
      { date: "2026-12-05", label: "05 Dec", price: 6250 }
    ]
  };

  const scaledLow = Math.round(pred.lowBand * mult);
  const scaledHigh = Math.round(pred.highBand * mult);

  dom.predConfidenceBadge.textContent = `${pred.confidence}% Confidence • ${pred.recommendation}`;
  dom.predConfidenceBadge.className = `pred-badge ${pred.badgeType}`;
  dom.predHeadline.textContent = `${pred.headline} (${classCfg.label})`;
  dom.predInsightText.textContent = `${pred.insight} Showing live ${classCfg.label} fares (${mult}× Economy rate • ${classCfg.baggage}).`;
  dom.predFairBand.textContent = `₹${scaledLow.toLocaleString('en-IN')} – ₹${scaledHigh.toLocaleString('en-IN')} (${classCfg.label})`;
  dom.predBestWindow.textContent = pred.bestWindow;
  dom.predDriveTime.textContent = pred.driveTime;

  const w = WEATHER_DATA[dest] || WEATHER_DATA["DEL"];
  dom.weatherIcon.textContent = w.icon;
  dom.weatherTempCond.textContent = `${dest} (${w.temp} • ${w.cond})`;
  dom.weatherPackTip.textContent = `🧳 Packing Tip: ${w.tip}`;

  const scaledDays = pred.days.map(d => ({ ...d, scaledPrice: Math.round(d.price * mult) }));
  const prices = scaledDays.map(d => d.scaledPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  dom.predBarsContainer.innerHTML = '';
  scaledDays.forEach(d => {
    const isCheapest = d.scaledPrice === minPrice;
    const heightPct = Math.max(25, Math.round((d.scaledPrice / maxPrice) * 100));

    const col = document.createElement('div');
    col.className = `trend-bar-col ${isCheapest ? 'is-cheapest' : ''}`;
    col.innerHTML = `
      <span class="trend-bar-price">&#8377;${(d.scaledPrice / 1000).toFixed(1)}k</span>
      <div class="trend-bar-fill" style="height: ${heightPct}%;"></div>
      <span class="trend-bar-date">${d.label}</span>
    `;

    col.addEventListener('click', () => {
      dom.departDate.value = d.date;
      showToast(`Travel date switched to ${d.label}`, "success");
      fetchFlights();
    });

    dom.predBarsContainer.appendChild(col);
  });
}

function calculateCabPickupTime(arrivalTimeStr) {
  try {
    const [hh, mm] = arrivalTimeStr.split(':').map(Number);
    let totalMins = hh * 60 + mm + 20;
    totalMins = totalMins % 1440;
    const outH = String(Math.floor(totalMins / 60)).padStart(2, '0');
    const outM = String(totalMins % 60).padStart(2, '0');
    return `${outH}:${outM}`;
  } catch (e) {
    return "20m after landing";
  }
}

// ==============================================================================
// 9. FETCH FLIGHTS & RENDER COLOR-CODED FLIGHT CARDS (With Cabin Class Multiplier)
// ==============================================================================
function syncSliderToCabinClass() {
  const classCfg = getCabinConfig();
  if (dom.priceSlider) {
    dom.priceSlider.max = classCfg.sliderMax;
    if (state.maxPrice < classCfg.sliderMax) {
      state.maxPrice = classCfg.sliderMax;
      dom.priceSlider.value = classCfg.sliderMax;
      dom.priceValLabel.innerHTML = `&#8377;${classCfg.sliderMax.toLocaleString('en-IN')}`;
    }
  }
}

function applyCabinClassToFlightList(rawList) {
  const classCfg = getCabinConfig();
  return rawList.map(f => {
    const baseEcon = f.baseEconomyPrice || f.base_price || f.price;
    const computedPrice = Math.round(baseEcon * classCfg.multiplier);
    return {
      ...f,
      baseEconomyPrice: baseEcon,
      price: computedPrice,
      cabinClass: classCfg.label
    };
  });
}

async function fetchFlights() {
  const origin = dom.originSelect.value;
  const destination = dom.destSelect.value;
  state.passengersCount = parseInt(dom.passengersSelect.value, 10) || 1;
  const classCfg = getCabinConfig();

  if (origin === destination) {
    showToast("Origin and Destination cannot be the same city!", "error");
    return;
  }

  syncSliderToCabinClass();

  dom.travelerSummaryBadge.textContent = `${state.passengersCount} Traveler${state.passengersCount > 1 ? 's' : ''} • ${classCfg.label} (${classCfg.multiplier}×) • ${classCfg.baggage}`;
  renderFarePredictionAndWeather(origin, destination);

  const url = `/api/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&sort=${state.sortBy}&travel_class=${encodeURIComponent(classCfg.code)}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      state.allFlights = applyCabinClassToFlightList(json.data);
      if (state.sortBy === 'price') state.allFlights.sort((a, b) => a.price - b.price);
      if (state.sortBy === 'duration') state.allFlights.sort((a, b) => a.duration.localeCompare(b.duration));
      if (state.sortBy === 'depart') state.allFlights.sort((a, b) => a.departTime.localeCompare(b.departTime));

      filterAndRenderFlights();
      renderFlexibleDatesAndNearbyDeals();
      dom.routeSummaryText.textContent = `${origin} → ${destination} on ${dom.departDate.value} • ${classCfg.label} • ${state.allFlights.length} Flights`;
      return;
    }
  } catch (err) {
    let matching = FALLBACK_FLIGHTS.filter(f => f.origin === origin && f.destination === destination);
    if (matching.length === 0) {
      matching = [
        { id: 901, flightNumber: "6E-312", airline: "IndiGo", airlineCode: "6E", aircraft: "Airbus A320neo", origin, originName: origin, destination, destinationName: destination, departTime: "06:45", arrivalTime: "09:20", duration: "2h 35m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 6150, price: 6150 },
        { id: 902, flightNumber: "QP-1408", airline: "Akasa Air", airlineCode: "QP", aircraft: "Boeing 737 MAX 8", origin, originName: origin, destination, destinationName: destination, departTime: "12:30", arrivalTime: "15:10", duration: "2h 40m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 7290, price: 7290 },
        { id: 903, flightNumber: "AI-504", airline: "Air India", airlineCode: "AI", aircraft: "Airbus A321", origin, originName: origin, destination, destinationName: destination, departTime: "18:45", arrivalTime: "21:30", duration: "2h 45m", stops: "Non-stop", stopCount: 0, baseEconomyPrice: 8950, price: 8950 }
      ];
    }

    state.allFlights = applyCabinClassToFlightList(matching);
    if (state.sortBy === 'price') state.allFlights.sort((a, b) => a.price - b.price);
    if (state.sortBy === 'duration') state.allFlights.sort((a, b) => a.duration.localeCompare(b.duration));
    if (state.sortBy === 'depart') state.allFlights.sort((a, b) => a.departTime.localeCompare(b.departTime));

    filterAndRenderFlights();
    renderFlexibleDatesAndNearbyDeals();
    dom.routeSummaryText.textContent = `${origin} → ${destination} on ${dom.departDate.value} • ${classCfg.label} • ${state.allFlights.length} Flights`;
  }
}

function filterAndRenderFlights() {
  const classCfg = getCabinConfig();
  const filtered = state.allFlights.filter(f => {
    const matchAirline = state.activeAirlines.includes(f.airline);
    const matchPrice = f.price <= state.maxPrice;
    return matchAirline && matchPrice;
  });

  dom.flightsContainer.innerHTML = '';

  if (filtered.length === 0) {
    dom.flightsContainer.innerHTML = `
      <div style="background:#fff; padding:2.5rem; text-align:center; border:1px solid #e2e8f0; border-radius:12px;">
        <h3>No Flights Match Your Filters</h3>
        <p style="color:#64748b; font-size:0.85rem; margin-top:0.4rem;">Try increasing the Max Price slider or clicking Reset next to Filters.</p>
      </div>
    `;
    return;
  }

  const pax = state.passengersCount;
  const prices = filtered.map(f => f.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const spread = Math.max(1, maxP - minP);

  filtered.forEach(f => {
    const cabTime = calculateCabPickupTime(f.arrivalTime);
    const departHour = parseInt((f.departTime || '12:00').split(':')[0], 10);
    const isEarlyOrPeak = departHour < 9 || departHour >= 18;
    const groupTotal = Math.round(f.price * pax);

    let tierClass = "tier-moderate";
    let btnTierClass = "btn-book-moderate";

    if (f.price <= minP + spread * 0.22) {
      tierClass = "tier-cheapest";
      btnTierClass = "btn-book-cheapest";
    } else if (f.price >= maxP - spread * 0.28 && filtered.length > 1) {
      tierClass = "tier-expensive";
      btnTierClass = "btn-book-expensive";
    }

    const loungePillHtml = classCfg.freeLounge
      ? `<span class="lounge-ready-pill">&#127869;&#65039; Free VIP Lounge Included</span>`
      : (isEarlyOrPeak ? `<span class="lounge-ready-pill">&#127869;&#65039; ₹${classCfg.loungeFeePerPax} Lounge</span>` : '');

    const economyRefHtml = classCfg.multiplier > 1.0
      ? `<span class="economy-base-ref">Economy: &#8377;${Math.round(f.baseEconomyPrice).toLocaleString('en-IN')} &rarr; <strong>${classCfg.multiplier}&times; ${classCfg.label}</strong></span>`
      : '';

    const card = document.createElement('div');
    card.className = `flight-card ${tierClass}`;
    card.innerHTML = `
      <div class="airline-badge">
        <div class="airline-logo-box logo-${f.airlineCode}">${f.airlineCode}</div>
        <div>
          <div class="airline-name">${f.airline}</div>
          <div class="flight-code">${f.flightNumber} &bull; ${f.aircraft || 'Airbus A320neo'}</div>
          <div>
            <span class="class-perk-pill ${classCfg.pillClass}">${classCfg.pillText}</span>
            <span class="cab-ready-pill">&#128661; Cab at ${cabTime}</span>
            ${loungePillHtml}
          </div>
        </div>
      </div>

      <div class="flight-schedule">
        <div class="time-box">
          <h4>${f.departTime}</h4>
          <span>${f.origin}</span>
        </div>
        <div class="duration-line">
          <span>${f.duration}</span>
          <div class="line"></div>
          <span class="stop-indicator">${f.stops}</span>
        </div>
        <div class="time-box">
          <h4>${f.arrivalTime}</h4>
          <span>${f.destination}</span>
        </div>
      </div>

      <div class="flight-price-box">
        ${economyRefHtml}
        <div class="price-label">&#8377;${Math.round(f.price).toLocaleString('en-IN')} / person</div>
        <div class="price-val">&#8377;${groupTotal.toLocaleString('en-IN')}</div>
        <span class="group-total-hint">${pax > 1 ? `Total for ${pax} Travelers • ${classCfg.label}` : `1 Adult • ${classCfg.label}`}</span>
        <button class="btn ${btnTierClass} btn-sm btn-book" data-id="${f.id}">Book ${classCfg.code === 'Business' ? 'Business' : ''} (${pax} Pax) &rarr;</button>
      </div>
    `;

    card.querySelector('.btn-book').addEventListener('click', () => openBookingModal(f));
    dom.flightsContainer.appendChild(card);
  });
}

// ==============================================================================
// 10. INTERACTIVE HOME-TO-AIRPORT ROUTE MAP ENGINE (Leaflet.js)
// ==============================================================================
function populateResidentialAreas(cityCode) {
  const cityObj = CITY_AIRPORT_ROUTES[cityCode] || CITY_AIRPORT_ROUTES["BLR"];
  dom.mapAreaSelect.innerHTML = '';
  cityObj.areas.forEach((area, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${area.name} (${area.distKm} km • ${area.driveMins} mins)`;
    dom.mapAreaSelect.appendChild(opt);
  });
}

function calculateLeaveHomeTime(flightDepartStr, driveMins) {
  try {
    const [fh, fm] = flightDepartStr.split(':').map(Number);
    let leaveMins = (fh * 60 + fm) - 120 - driveMins;
    while (leaveMins < 0) leaveMins += 1440;
    const h24 = Math.floor(leaveMins / 60) % 24;
    const m = leaveMins % 60;
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  } catch (e) {
    return "05:30 AM";
  }
}

function updateAirportRouteMap(customAreaName = null) {
  const cityCode = dom.mapCitySelect.value || "BLR";
  const cityObj = CITY_AIRPORT_ROUTES[cityCode] || CITY_AIRPORT_ROUTES["BLR"];
  const areaIdx = parseInt(dom.mapAreaSelect.value, 10) || 0;
  const baseArea = cityObj.areas[areaIdx] || cityObj.areas[0];

  const displayAreaName = customAreaName || baseArea.name;
  const flightTime = dom.mapFlightTime.value || "08:30";

  dom.mapTrafficBadge.textContent = baseArea.traffic;
  dom.mapDistanceVal.textContent = `${baseArea.distKm} km`;
  const hrs = Math.floor(baseArea.driveMins / 60);
  const mins = baseArea.driveMins % 60;
  dom.mapDurationVal.textContent = hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
  dom.mapCabEstVal.innerHTML = `&#8377;${baseArea.cabFare}`;
  dom.mapHighwayText.innerHTML = `&#128739;&#65039; <strong>Fastest Highway:</strong> Via ${baseArea.highway}`;

  const leaveBy = calculateLeaveHomeTime(flightTime, baseArea.driveMins);
  dom.mapLeaveTimeVal.textContent = leaveBy;
  dom.mapLeaveExplain.textContent = `For your ${flightTime} flight: Leave ${displayAreaName} at ${leaveBy} (${baseArea.driveMins}m drive + 2h 00m airport check-in & security buffer).`;

  dom.mapRouteHeaderLabel.innerHTML = `&#127968; ${displayAreaName} &rarr; &#9992;&#65039; ${cityObj.airportName}`;

  const qOrigin = encodeURIComponent(`${displayAreaName}, ${cityCode}`);
  const qDest = encodeURIComponent(cityObj.airportName);
  dom.linkGoogleMapsDir.href = `https://www.google.com/maps/dir/${qOrigin}/${qDest}`;

  dom.mapTurnSteps.innerHTML = baseArea.steps
    .map((s, i) => `<span><strong>Step ${i + 1}:</strong> ${i === 0 && customAreaName ? `Start at ${customAreaName}` : s}</span>`)
    .join(' &rarr; ');

  if (typeof L !== 'undefined') {
    if (!state.leafletMap) {
      state.leafletMap = L.map('airport-leaflet-map').setView(baseArea.coords, 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(state.leafletMap);
    }

    setTimeout(() => {
      state.leafletMap.invalidateSize();
    }, 150);

    if (state.mapRouteLayer) {
      state.leafletMap.removeLayer(state.mapRouteLayer);
    }
    if (state.cabMarker) {
      state.leafletMap.removeLayer(state.cabMarker);
    }

    const group = L.featureGroup();

    const homeIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background:#4f46e5; color:#fff; padding:4px 8px; border-radius:999px; font-weight:800; font-size:11px; white-space:nowrap; box-shadow:0 3px 8px rgba(0,0,0,0.3);">🏠 ${displayAreaName}</div>`,
      iconSize: [120, 28],
      iconAnchor: [60, 14]
    });

    const airportIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background:#059669; color:#fff; padding:4px 8px; border-radius:999px; font-weight:800; font-size:11px; white-space:nowrap; box-shadow:0 3px 8px rgba(0,0,0,0.3);">✈️ ${cityCode} Airport Terminal</div>`,
      iconSize: [140, 28],
      iconAnchor: [70, 14]
    });

    L.marker(baseArea.coords, { icon: homeIcon }).addTo(group)
      .bindPopup(`<b>🏠 Residential Pickup: ${displayAreaName}</b><br>Leave home by <b>${leaveBy}</b>`);

    L.marker(cityObj.airportCoords, { icon: airportIcon }).addTo(group)
      .bindPopup(`<b>✈️ ${cityObj.airportName}</b><br>Distance: ${baseArea.distKm} km (${baseArea.driveMins} mins)`);

    const routePoints = [baseArea.coords, baseArea.midWay, cityObj.airportCoords];
    const polyline = L.polyline(routePoints, {
      color: '#4f46e5',
      weight: 5,
      opacity: 0.85,
      dashArray: '10, 6'
    }).addTo(group);

    state.mapRouteLayer = group.addTo(state.leafletMap);
    state.leafletMap.fitBounds(polyline.getBounds(), { padding: [45, 45] });
  }
}

function animateCabOnMap() {
  if (typeof L === 'undefined' || !state.leafletMap) {
    showToast("Map is loading, please try in a moment.", "info");
    return;
  }
  const cityCode = dom.mapCitySelect.value || "BLR";
  const cityObj = CITY_AIRPORT_ROUTES[cityCode] || CITY_AIRPORT_ROUTES["BLR"];
  const areaIdx = parseInt(dom.mapAreaSelect.value, 10) || 0;
  const baseArea = cityObj.areas[areaIdx] || cityObj.areas[0];

  if (state.cabAnimInterval) clearInterval(state.cabAnimInterval);
  if (state.cabMarker) state.leafletMap.removeLayer(state.cabMarker);

  const cabIcon = L.divIcon({
    className: 'cab-moving-pin',
    html: `<div style="background:#f59e0b; color:#000; padding:3px 7px; border-radius:999px; font-weight:900; font-size:12px; box-shadow:0 4px 10px rgba(0,0,0,0.35);">🚕 Cab</div>`,
    iconSize: [60, 26],
    iconAnchor: [30, 13]
  });

  state.cabMarker = L.marker(baseArea.coords, { icon: cabIcon }).addTo(state.leafletMap);
  showToast(`Simulating cab ride from ${baseArea.name} to ${cityCode} Airport...`, "success");

  const pts = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    pts.push([
      baseArea.coords[0] + (baseArea.midWay[0] - baseArea.coords[0]) * t,
      baseArea.coords[1] + (baseArea.midWay[1] - baseArea.coords[1]) * t
    ]);
  }
  for (let i = 1; i <= 20; i++) {
    const t = i / 20;
    pts.push([
      baseArea.midWay[0] + (cityObj.airportCoords[0] - baseArea.midWay[0]) * t,
      baseArea.midWay[1] + (cityObj.airportCoords[1] - baseArea.midWay[1]) * t
    ]);
  }

  let step = 0;
  state.cabAnimInterval = setInterval(() => {
    if (step >= pts.length) {
      clearInterval(state.cabAnimInterval);
      showToast(`🎉 Arrived at ${cityObj.airportName} Departure Gate!`, "success");
      return;
    }
    state.cabMarker.setLatLng(pts[step]);
    step++;
  }, 90);
}

// ==============================================================================
// 11. BOOKING MODAL, MULTI-SEAT & MULTI-PASSENGER LOGIC (Cabin Class Aware)
// ==============================================================================
async function fetchOccupiedSeats(flightId, travelDate) {
  try {
    const res = await fetch(`/api/flights/${flightId}/seats?date=${encodeURIComponent(travelDate)}`);
    const json = await res.json();
    return json.success ? json.occupiedSeats : ['1A', '2C', '3D'];
  } catch (err) {
    const localBooked = [];
    getLocalBookings()
      .filter(b => b.flight && b.flight.id === flightId && b.travelDate === travelDate && b.status === 'CONFIRMED')
      .forEach(b => {
        (b.seat || '').split(',').forEach(s => {
          if (s.trim()) localBooked.push(s.trim());
        });
      });
    return Array.from(new Set(['1A', '2C', '3D', '4F', '5B', ...localBooked]));
  }
}

async function openBookingModal(flight) {
  const classCfg = getCabinConfig();
  const baseEcon = flight.baseEconomyPrice || flight.price;
  const adjustedFlight = {
    ...flight,
    baseEconomyPrice: baseEcon,
    price: Math.round(baseEcon * classCfg.multiplier)
  };

  state.currentFlight = adjustedFlight;
  state.passengersCount = parseInt(dom.passengersSelect.value, 10) || 1;
  state.selectedSeats = [];
  state.loungeFeePerPax = classCfg.loungeFeePerPax;
  state.loungeIncluded = classCfg.freeLounge;
  state.selectedCabType = 'None';
  state.selectedCabFee = 0.0;

  const pax = state.passengersCount;
  const pickupTime = calculateCabPickupTime(adjustedFlight.arrivalTime);
  state.selectedCabPickupTime = `${pickupTime} at ${adjustedFlight.destination} Arrival Gate`;

  dom.modalPaxCountTitle.textContent = `${pax} Traveler${pax > 1 ? 's' : ''} • ${classCfg.label}`;
  dom.modalFlightDetails.textContent = `${adjustedFlight.airline} (${adjustedFlight.flightNumber}) • ${adjustedFlight.origin} to ${adjustedFlight.destination} • ${dom.departDate.value} • ${classCfg.label} (₹${adjustedFlight.price.toLocaleString('en-IN')}/pax)`;
  dom.seatInstructionBanner.innerHTML = `Please select <strong>${pax} seat${pax > 1 ? 's' : ''}</strong> on the aircraft map (0/${pax} selected) ${classCfg.code === 'Business' ? '— <strong>All Seats FREE in Business Class!</strong>' : ''}`;
  dom.lblSelectedSeat.textContent = "None";

  if (classCfg.freeLounge) {
    dom.loungeSmartReason.textContent = `👑 COMPLIMENTARY WITH BUSINESS CLASS`;
    dom.loungeDescText.textContent = `Unlimited hot buffet, lounge recliners & Wi-Fi at ${adjustedFlight.origin} VIP Terminal Lounge are INCLUDED FREE with your Business Class ticket!`;
    dom.chkLoungePass.checked = true;
    dom.loungeTotalLabel.textContent = `FREE (₹0 for ${pax} Business Class Traveler${pax > 1 ? 's' : ''})`;
  } else {
    const departHour = parseInt((adjustedFlight.departTime || '12:00').split(':')[0], 10);
    if (departHour < 9) {
      dom.loungeSmartReason.textContent = `✨ RECOMMENDED FOR ${adjustedFlight.departTime} EARLY MORNING DEPARTURE`;
      dom.loungeDescText.textContent = `Beat the morning rush! Get hot breakfast buffet, filter coffee & Wi-Fi at ${adjustedFlight.origin} Terminal Lounge.`;
    } else if (departHour >= 18) {
      dom.loungeSmartReason.textContent = `✨ RECOMMENDED FOR ${adjustedFlight.departTime} EVENING DINNER FLIGHT`;
      dom.loungeDescText.textContent = `Relax before your evening flight with hot dinner buffet & charging pods at ${adjustedFlight.origin} Lounge.`;
    } else {
      dom.loungeSmartReason.textContent = `✨ PRE-FLIGHT COMFORT UPGRADE`;
      dom.loungeDescText.textContent = `Enjoy unlimited buffet meals, beverages & high-speed Wi-Fi at ${adjustedFlight.origin} VIP Terminal Lounge.`;
    }
    dom.chkLoungePass.checked = false;
    dom.loungeTotalLabel.textContent = `+₹${(classCfg.loungeFeePerPax * pax).toLocaleString('en-IN')} for ${pax} Traveler${pax > 1 ? 's' : ''}`;
  }

  dom.cabSyncSubtitle.innerHTML = `Flight lands at <strong>${adjustedFlight.arrivalTime}</strong> (${adjustedFlight.destination}) &rarr; Cab driver synced for pickup at <strong>${pickupTime}</strong>`;
  dom.cabGroupHint.textContent = pax >= 4 ? "SUV Recommended for 4 Pax" : "Zero Wait Guarantee";

  document.querySelectorAll('.cab-option-card').forEach((card, idx) => {
    card.classList.toggle('selected', idx === 0);
    const radio = card.querySelector('input');
    if (radio) radio.checked = (idx === 0);
  });

  renderPassengerInputs();
  updateFareSummary();

  const occupiedSeats = await fetchOccupiedSeats(adjustedFlight.id, dom.departDate.value);
  renderSeatGrid(occupiedSeats);

  dom.bookingModal.classList.remove('hidden');
}

function renderPassengerInputs() {
  const pax = state.passengersCount;
  dom.paxFormCountLabel.textContent = `${pax} Traveler${pax > 1 ? 's' : ''}`;
  dom.passengersInputsContainer.innerHTML = '';

  const sampleNames = ["Priya Sharma", "Aarav Sharma", "Rohan Verma", "Ananya Verma"];

  for (let i = 0; i < pax; i++) {
    const seatAssigned = state.selectedSeats[i] ? state.selectedSeats[i].code : 'Select Seat on Map';
    const div = document.createElement('div');
    div.className = 'pax-card-block';
    div.innerHTML = `
      <div class="pax-card-header">
        <span>Passenger ${i + 1} ${i === 0 ? '(Primary Traveler)' : ''}</span>
        <span class="pax-seat-pill" id="pax-seat-badge-${i}">Seat: ${seatAssigned}</span>
      </div>
      <div class="pax-inputs-grid">
        <div class="input-field">
          <label>Full Name *</label>
          <input type="text" class="pax-name-input" required placeholder="e.g. ${sampleNames[i] || 'Traveler Name'}">
        </div>
        <div class="input-field">
          <label>Age *</label>
          <input type="number" class="pax-age-input" min="1" max="110" required placeholder="${21 + i}">
        </div>
        <div class="input-field">
          <label>Gender *</label>
          <select class="pax-gender-input" required>
            <option value="Female" ${i % 2 === 0 ? 'selected' : ''}>Female</option>
            <option value="Male" ${i % 2 !== 0 ? 'selected' : ''}>Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    `;
    dom.passengersInputsContainer.appendChild(div);
  }
}

function updatePassengerSeatBadges() {
  const pax = state.passengersCount;
  for (let i = 0; i < pax; i++) {
    const badge = document.getElementById(`pax-seat-badge-${i}`);
    if (badge) {
      badge.textContent = state.selectedSeats[i] ? `Seat: ${state.selectedSeats[i].code}` : 'Seat: Not Selected';
    }
  }
}

function renderSeatGrid(occupiedSeats) {
  dom.seatsGrid.innerHTML = '';
  const classCfg = getCabinConfig();
  const rows = 7;
  const cols = ['A', 'B', 'C', 'aisle', 'D', 'E', 'F'];

  for (let r = 1; r <= rows; r++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'seat-row';

    cols.forEach(col => {
      if (col === 'aisle') {
        const aisle = document.createElement('span');
        aisle.className = 'seat-aisle-num';
        aisle.textContent = r;
        rowEl.appendChild(aisle);
        return;
      }

      const seatCode = `${r}${col}`;
      const isTaken = occupiedSeats.includes(seatCode);
      const isFrontRow = r <= 2;
      const fee = isFrontRow ? classCfg.frontSeatFee : classCfg.standardSeatFee;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seat-btn';
      btn.textContent = col;
      btn.dataset.seat = seatCode;
      btn.dataset.fee = fee;

      if (isTaken) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          const pax = state.passengersCount;
          const existingIdx = state.selectedSeats.findIndex(s => s.code === seatCode);

          if (existingIdx > -1) {
            state.selectedSeats.splice(existingIdx, 1);
            btn.classList.remove('selected');
          } else {
            if (state.selectedSeats.length >= pax) {
              const removed = state.selectedSeats.shift();
              const oldBtn = dom.seatsGrid.querySelector(`.seat-btn[data-seat="${removed.code}"]`);
              if (oldBtn) oldBtn.classList.remove('selected');
            }
            state.selectedSeats.push({ code: seatCode, fee });
            btn.classList.add('selected');
          }

          const codes = state.selectedSeats.map(s => s.code);
          const totalSeatFee = state.selectedSeats.reduce((sum, s) => sum + s.fee, 0);

          dom.seatInstructionBanner.innerHTML = `Selected <strong>${codes.length}/${pax} seat${pax > 1 ? 's' : ''}</strong> ${codes.length === pax ? '✓ Ready!' : ''}`;
          dom.lblSelectedSeat.textContent = codes.length > 0 ? `${codes.join(', ')} (${totalSeatFee === 0 ? 'FREE' : '₹' + totalSeatFee})` : 'None';

          updatePassengerSeatBadges();
          updateFareSummary();
        });
      }

      rowEl.appendChild(btn);
    });

    dom.seatsGrid.appendChild(rowEl);
  }
}

function updateFareSummary() {
  if (!state.currentFlight) return;
  const classCfg = getCabinConfig();
  const pax = state.passengersCount;
  const base = state.currentFlight.price * pax;
  const tax = Math.round(base * 0.12);
  const seatFee = state.selectedSeats.reduce((sum, s) => sum + s.fee, 0);
  const loungeFee = state.loungeIncluded ? (state.loungeFeePerPax * pax) : 0;
  const cabFee = state.selectedCabFee;
  const total = base + tax + seatFee + loungeFee + cabFee;

  const seatCodes = state.selectedSeats.map(s => s.code).join(', ') || 'None';

  dom.farePaxMultiplier.textContent = `${pax} × ${classCfg.label}`;
  dom.fareBase.innerHTML = `&#8377;${Math.round(base).toLocaleString('en-IN')}`;
  dom.fareTax.innerHTML = `&#8377;${tax.toLocaleString('en-IN')}`;
  dom.fareSeatsList.textContent = seatCodes;
  dom.fareSeat.innerHTML = seatFee === 0 && state.selectedSeats.length > 0 ? `<span style="color:#059669; font-weight:800;">FREE (&#8377;0)</span>` : `&#8377;${seatFee.toLocaleString('en-IN')}`;
  dom.fareLounge.innerHTML = (state.loungeIncluded && loungeFee === 0) ? `<span style="color:#059669; font-weight:800;">FREE (&#8377;0)</span>` : `&#8377;${loungeFee.toLocaleString('en-IN')}`;
  dom.fareCabName.textContent = state.selectedCabType;
  dom.fareCab.innerHTML = `&#8377;${cabFee.toLocaleString('en-IN')}`;
  dom.fareTotal.innerHTML = `&#8377;${total.toLocaleString('en-IN')}`;
}

async function submitBooking(e) {
  e.preventDefault();

  const classCfg = getCabinConfig();
  const pax = state.passengersCount;
  if (state.selectedSeats.length < pax) {
    showToast(`Please select ${pax} seat(s) on the aircraft map (${state.selectedSeats.length}/${pax} selected).`, "error");
    return;
  }

  const nameInputs = Array.from(document.querySelectorAll('.pax-name-input'));
  const ageInputs = Array.from(document.querySelectorAll('.pax-age-input'));
  const genderInputs = Array.from(document.querySelectorAll('.pax-gender-input'));
  const phone = document.getElementById('pax-phone').value.trim();
  const email = document.getElementById('pax-email').value.trim();

  const passengersArray = nameInputs.map((input, idx) => ({
    fullName: input.value.trim() || `Passenger ${idx + 1}`,
    age: parseInt(ageInputs[idx].value, 10) || 21,
    gender: genderInputs[idx].value,
    seatAssigned: state.selectedSeats[idx].code,
    phone,
    email
  }));

  const seatCodes = state.selectedSeats.map(s => s.code);
  const totalSeatFee = state.selectedSeats.reduce((sum, s) => sum + s.fee, 0);
  const totalLoungeFee = state.loungeIncluded ? (state.loungeFeePerPax * pax) : 0;

  const payload = {
    flightId: state.currentFlight.id,
    travelDate: dom.departDate.value,
    travelClass: classCfg.label,
    passengerCount: pax,
    seat: seatCodes.join(', '),
    seats: seatCodes,
    seatFee: totalSeatFee,
    loungeIncluded: state.loungeIncluded,
    loungeFee: totalLoungeFee,
    cabType: state.selectedCabType,
    cabFee: state.selectedCabFee,
    cabPickupTime: state.selectedCabPickupTime,
    passengers: passengersArray,
    passenger: passengersArray[0]
  };

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json = await res.json();

    if (json.success) {
      showToast(`Booked ${classCfg.label} for ${pax} Traveler(s)! PNR: ${json.booking.pnr}`, "success");
      dom.bookingModal.classList.add('hidden');
      dom.bookingForm.reset();
      displayBoardingPass(json.booking);
      updateBookingCount();
    } else {
      showToast(json.message || "Booking failed", "error");
    }
  } catch (err) {
    const pnr = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
    const baseFare = state.currentFlight.price * pax;
    const taxAmount = Math.round(baseFare * 0.12);
    const totalPaid = baseFare + taxAmount + totalSeatFee + totalLoungeFee + state.selectedCabFee;

    const fallbackBooking = {
      pnr,
      flight: state.currentFlight,
      travelDate: payload.travelDate,
      travelClass: payload.travelClass,
      passengerCount: pax,
      seat: payload.seat,
      seats: payload.seats,
      seatFee: totalSeatFee,
      loungeIncluded: state.loungeIncluded,
      loungeFee: totalLoungeFee,
      cabType: payload.cabType,
      cabFee: payload.cabFee,
      cabPickupTime: payload.cabPickupTime,
      baseFare,
      taxAmount,
      totalPaid,
      status: 'CONFIRMED',
      gate: `G-${Math.floor(2 + Math.random() * 15)}`,
      terminal: `T${Math.floor(1 + Math.random() * 3)}`,
      bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      passengers: passengersArray,
      passenger: passengersArray[0]
    };

    const list = getLocalBookings();
    list.unshift(fallbackBooking);
    saveLocalBookings(list);

    showToast(`Booked ${classCfg.label} for ${pax} Traveler(s)! PNR: ${pnr}`, "success");
    dom.bookingModal.classList.add('hidden');
    dom.bookingForm.reset();
    displayBoardingPass(fallbackBooking);
    updateBookingCount();
  }
}

function displayBoardingPass(b) {
  dom.bpAirline.textContent = b.flight ? b.flight.airline : "Airline";
  dom.bpPnr.textContent = b.pnr;
  dom.bpOriginCode.textContent = b.flight ? b.flight.origin : "ORIGIN";
  dom.bpOriginName.textContent = b.flight ? b.flight.originName : "";
  dom.bpDestCode.textContent = b.flight ? b.flight.destination : "DEST";
  dom.bpDestName.textContent = b.flight ? b.flight.destinationName : "";
  dom.bpDepartTime.textContent = b.flight ? b.flight.departTime : "";
  dom.bpArrivalTime.textContent = b.flight ? b.flight.arrivalTime : "";
  dom.bpDuration.textContent = b.flight ? b.flight.duration : "";

  if (b.passengers && b.passengers.length > 0) {
    dom.bpPassenger.textContent = b.passengers
      .map(p => `${p.fullName}${p.seatAssigned ? ` (${p.seatAssigned})` : ''}`)
      .join(', ');
  } else {
    dom.bpPassenger.textContent = b.passenger ? b.passenger.fullName : "Passenger";
  }

  dom.bpFlightNum.textContent = b.flight ? b.flight.flightNumber : "";
  dom.bpSeat.textContent = b.seat;
  dom.bpClass.textContent = b.travelClass;
  dom.bpDate.textContent = b.travelDate;
  dom.bpTerminal.textContent = b.terminal || "T2";
  dom.bpGate.textContent = b.gate || "G-12";

  if (b.loungeIncluded) {
    dom.bpLoungeStrip.classList.remove('hidden');
    const paxCount = b.passengerCount || (b.passengers ? b.passengers.length : 1);
    dom.bpLoungeDetails.textContent = `Admits ${paxCount} Traveler${paxCount > 1 ? 's' : ''} at ${b.flight ? b.flight.origin : ''} Terminal Lounge • Hot Buffet & Wi-Fi`;
  } else {
    dom.bpLoungeStrip.classList.add('hidden');
  }

  if (b.cabType && b.cabType !== 'None') {
    dom.bpCabStrip.classList.remove('hidden');
    dom.bpCabDetails.textContent = `${b.cabType} (₹${b.cabFee}) • Pickup: ${b.cabPickupTime || '20m after landing'}`;
  } else {
    dom.bpCabStrip.classList.add('hidden');
  }

  const destCode = b.flight ? b.flight.destination : 'DEL';
  const w = WEATHER_DATA[destCode] || WEATHER_DATA['DEL'];
  dom.bpWeatherText.textContent = `${w.icon} ${destCode} Weather (${w.temp}, ${w.cond}) — Packing Tip: ${w.tip}`;

  if (b.flight && b.flight.origin && CITY_AIRPORT_ROUTES[b.flight.origin]) {
    dom.mapCitySelect.value = b.flight.origin;
    populateResidentialAreas(b.flight.origin);
    dom.mapFlightTime.value = b.flight.departTime || "08:30";
  }

  dom.ticketModal.classList.remove('hidden');
}

async function loadBookings() {
  try {
    const res = await fetch('/api/bookings');
    const json = await res.json();
    if (json.success) {
      renderBookingsList(json.data);
      dom.bookingBadge.textContent = json.data.length;
      dom.bookingBadge.classList.toggle('hidden', json.data.length === 0);
      return;
    }
  } catch (err) {
    const localList = getLocalBookings();
    renderBookingsList(localList);
    dom.bookingBadge.textContent = localList.length;
    dom.bookingBadge.classList.toggle('hidden', localList.length === 0);
  }
}

async function updateBookingCount() {
  await loadBookings();
}

async function cancelBooking(pnr) {
  try {
    const res = await fetch(`/api/bookings/${pnr}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, "info");
      loadBookings();
      return;
    }
  } catch (err) {
    const list = getLocalBookings().map(b => b.pnr === pnr ? { ...b, status: 'CANCELLED' } : b);
    saveLocalBookings(list);
    showToast(`Booking ${pnr} cancelled.`, "info");
    loadBookings();
  }
}

function renderBookingsList(bookings) {
  dom.bookingsList.innerHTML = '';

  if (bookings.length === 0) {
    dom.bookingsList.innerHTML = `
      <div style="background:#fff; padding:3rem; text-align:center; border:1px solid #e2e8f0; border-radius:12px;">
        <h3>No Bookings Found</h3>
        <p style="color:#64748b; font-size:0.85rem; margin-top:0.4rem;">Book a solo or group flight from the Search tab.</p>
      </div>
    `;
    return;
  }

  bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = "booking-item-card";
    const isCancelled = b.status === 'CANCELLED';
    const paxNames = (b.passengers && b.passengers.length > 0)
      ? b.passengers.map(p => p.fullName).join(', ')
      : (b.passenger ? b.passenger.fullName : 'Guest');
    const loungeBadge = b.loungeIncluded ? ` &bull; <span style="color:#6d28d9; font-weight:700;">&#127869;&#65039; VIP Lounge</span>` : '';
    const cabText = (b.cabType && b.cabType !== 'None') ? ` &bull; <span style="color:#047857; font-weight:700;">&#128661; ${b.cabType}</span>` : '';

    card.innerHTML = `
      <div class="booking-item-info">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
          <span class="badge ${isCancelled ? 'badge-primary' : 'badge-success'}" style="${isCancelled ? 'background:#fee2e2; color:#b91c1c;' : ''}">
            ${b.status}
          </span>
          <strong style="font-family:monospace; font-size:0.9rem;">PNR: ${b.pnr}</strong>
          <span style="font-size:0.75rem; color:#94a3b8;">&bull; ${b.travelClass || 'Economy'} &bull; ${b.passengerCount || 1} Pax &bull; &#8377;${Math.round(b.totalPaid || 0).toLocaleString('en-IN')}</span>
        </div>
        <h4>${b.flight ? b.flight.origin : ''} &rarr; ${b.flight ? b.flight.destination : ''} (${b.flight ? b.flight.airline : ''} ${b.flight ? b.flight.flightNumber : ''})</h4>
        <p>Date: <strong>${b.travelDate}</strong> &bull; Travelers: <strong>${paxNames}</strong> &bull; Seats: <strong style="color:var(--primary);">${b.seat}</strong>${loungeBadge}${cabText}</p>
      </div>

      <div class="booking-actions">
        <button class="btn btn-map-shortcut btn-sm btn-route-map">&#128506;&#65039; Airport Map</button>
        <button class="btn btn-primary btn-sm btn-view-ticket">View Pass</button>
        ${!isCancelled ? `<button class="btn-danger-outline btn-cancel" data-pnr="${b.pnr}">Cancel</button>` : ''}
      </div>
    `;

    card.querySelector('.btn-route-map').addEventListener('click', () => {
      if (b.flight && CITY_AIRPORT_ROUTES[b.flight.origin]) {
        dom.mapCitySelect.value = b.flight.origin;
        populateResidentialAreas(b.flight.origin);
        dom.mapFlightTime.value = b.flight.departTime || "08:30";
      }
      switchMainTab('map');
    });
    card.querySelector('.btn-view-ticket').addEventListener('click', () => displayBoardingPass(b));
    card.querySelector('.btn-cancel')?.addEventListener('click', () => cancelBooking(b.pnr));

    dom.bookingsList.appendChild(card);
  });
}

// ==============================================================================
// 12. SKYBOT AI COPILOT ENGINE v3 (Agentic UI Control + Multi-Intent + Live AI)
// ==============================================================================
const CITY_ALIASES = {
  "blr": "BLR", "bangalore": "BLR", "bengaluru": "BLR",
  "del": "DEL", "delhi": "DEL", "new delhi": "DEL", "dilli": "DEL",
  "bom": "BOM", "mumbai": "BOM", "bombay": "BOM",
  "goi": "GOI", "goa": "GOI", "mopa": "GOI", "dabolim": "GOI",
  "hyd": "HYD", "hyderabad": "HYD",
  "ccu": "CCU", "kolkata": "CCU", "calcutta": "CCU",
  "maa": "MAA", "chennai": "MAA", "madras": "MAA",
  "jai": "JAI", "jaipur": "JAI"
};

function detectCitiesInText(text) {
  const lower = text.toLowerCase();
  const found = [];
  const keys = Object.keys(CITY_ALIASES).sort((a, b) => b.length - a.length);
  keys.forEach(k => {
    const regex = new RegExp(`\\b${k}\\b`, 'i');
    const match = regex.exec(lower);
    if (match) {
      found.push({ code: CITY_ALIASES[k], index: match.index });
    }
  });
  found.sort((a, b) => a.index - b.index);
  const uniqueCodes = [];
  found.forEach(item => {
    if (!uniqueCodes.includes(item.code)) uniqueCodes.push(item.code);
  });
  return uniqueCodes;
}

/**
 * Renders a chat bubble with up to 2 interactive action buttons
 */
function appendChatBubble(htmlContent, sender = 'bot', actions = []) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = `<div>${htmlContent}</div>`;

  if (Array.isArray(actions) && actions.length > 0) {
    const row = document.createElement('div');
    row.className = 'chat-action-row';
    actions.forEach((act, idx) => {
      if (!act || !act.label || typeof act.onClick !== 'function') return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chat-action-btn ${idx > 0 ? 'secondary' : ''}`;
      btn.innerHTML = act.label;
      btn.addEventListener('click', act.onClick);
      row.appendChild(btn);
    });
    bubble.appendChild(row);
  }

  dom.chatMessages.appendChild(bubble);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
  return bubble;
}

/**
 * Updates the quick-reply suggestion chips dynamically based on conversation context
 */
function updateDynamicChatChips(suggestions) {
  const container = document.getElementById('chat-quick-chips') || document.querySelector('.chat-quick-chips');
  if (!container || !Array.isArray(suggestions) || suggestions.length === 0) return;

  container.innerHTML = '';
  suggestions.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chat-chip';
    btn.dataset.prompt = item.prompt;
    btn.textContent = item.label;
    btn.addEventListener('click', () => handleChatQuery(item.prompt));
    container.appendChild(btn);
  });
}

/**
 * Calls free zero-key generative AI endpoint when online for open-ended questions,
 * grounded with live SkyVoyage route, cabin class, and flight data.
 */
async function fetchLiveGenerativeAIReply(userText, contextSummary) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);
  try {
    const systemPrompt =
      `You are SkyBot AI Copilot inside the SkyVoyage Indian Flight Booking Portal. ` +
      `Answer concisely in 2 to 4 short bullet points or sentences using HTML tags like <strong> and <br>. ` +
      `Never use markdown asterisks (**). Use the exact live flight data below:\n${contextSummary}`;

    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          ...state.chatMemory.history.slice(-4),
          { role: 'user', content: userText }
        ],
        model: 'openai',
        seed: 42
      })
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    let text = await res.text();
    if (!text || text.length < 10) return null;
    // Convert any markdown bold **text** to <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    return text;
  } catch (e) {
    clearTimeout(timeoutId);
    return null;
  }
}

async function handleChatQuery(userText) {
  if (!userText || !userText.trim()) return;
  const cleanText = userText.trim();
  appendChatBubble(cleanText, 'user');
  state.chatTurnCount++;
  state.chatMemory.history.push({ role: 'user', content: cleanText });

  const q = cleanText.toLowerCase();
  let origin = dom.originSelect.value;
  let dest = dom.destSelect.value;
  const actionsTaken = [];

  // ----------------------------------------------------------------------------
  // STEP 1: AGENTIC PAGE CONTROLLERS (Automatically executes changes on website!)
  // ----------------------------------------------------------------------------

  // 1A. Detect Route / City Change (e.g. "Delhi to Goa", "flights to Mumbai")
  const mentionedCities = detectCitiesInText(q);
  if (mentionedCities.length >= 2) {
    origin = mentionedCities[0];
    dest = mentionedCities[1];
    dom.originSelect.value = origin;
    dom.destSelect.value = dest;
    await fetchFlights();
    actionsTaken.push(`Switched route to <strong>${origin} &rarr; ${dest}</strong>`);
  } else if (mentionedCities.length === 1 && (q.includes('to ') || q.includes('for ') || q.includes('flight') || q.includes('goa') || q.includes('itinerary') || q.includes('visit') || q.includes('trip') || q.includes('plan') || q.includes('weather'))) {
    if (mentionedCities[0] !== origin) {
      dest = mentionedCities[0];
      dom.destSelect.value = dest;
      await fetchFlights();
      actionsTaken.push(`Updated destination to <strong>${dest}</strong>`);
    }
  }

  // 1B. Detect Cabin Class Switch Command (e.g. "switch to business", "change to premium economy")
  const wantsClassSwitch = q.includes('switch') || q.includes('change') || q.includes('select') || q.includes('set') || q.includes('karo') || q.includes('show business') || q.includes('in business') || q.includes('book business');
  if (wantsClassSwitch && q.includes('business')) {
    dom.travelClass.value = "Business";
    await fetchFlights();
    actionsTaken.push(`Switched Cabin Class to <strong>👑 Business Class (2.25&times;)</strong>`);
  } else if (wantsClassSwitch && q.includes('premium')) {
    dom.travelClass.value = "Premium Economy";
    await fetchFlights();
    actionsTaken.push(`Switched Cabin Class to <strong>✨ Premium Economy (1.45&times;)</strong>`);
  } else if (wantsClassSwitch && q.includes('economy') && !q.includes('premium')) {
    dom.travelClass.value = "Economy";
    await fetchFlights();
    actionsTaken.push(`Switched Cabin Class to <strong>💺 Economy (1&times;)</strong>`);
  }

  // 1C. Detect Passenger / Group Size Change (e.g. "for 3 people", "4 passengers")
  const paxMatch = q.match(/\b([1-4])\s*(people|person|pax|passenger|traveler|adult|log|member|seat|ticket)/i);
  if (paxMatch) {
    const newPax = parseInt(paxMatch[1], 10);
    dom.passengersSelect.value = String(newPax);
    state.passengersCount = newPax;
    await fetchFlights();
    actionsTaken.push(`Set group size to <strong>${newPax} Traveler${newPax > 1 ? 's' : ''}</strong>`);
  }

  // 1D. Detect Date Mention (e.g. "4 dec", "10 nov", "tomorrow")
  const dateMonths = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const dateRegex = /\b(\d{1,2})\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i;
  const dMatch = q.match(dateRegex);
  if (dMatch) {
    const dayStr = String(parseInt(dMatch[1], 10)).padStart(2, '0');
    const monStr = dateMonths[dMatch[2].toLowerCase().slice(0, 3)];
    if (monStr) {
      const isoDate = `2026-${monStr}-${dayStr}`;
      dom.departDate.value = isoDate;
      await fetchFlights();
      actionsTaken.push(`Changed travel date to <strong>${dayStr} ${dMatch[2].toUpperCase()} 2026</strong>`);
    }
  }

  // 1E. Detect Budget / Price Filter (e.g. "under 10000", "below 8000", "budget 15000")
  const budgetMatch = q.match(/(?:under|below|budget|less than|max|within)\s*(?:rs\.?|₹|inr)?\s*(\d{4,5})/i);
  if (budgetMatch) {
    const budgetVal = parseInt(budgetMatch[1], 10);
    state.maxPrice = budgetVal;
    if (dom.priceSlider) {
      if (budgetVal > parseInt(dom.priceSlider.max, 10)) dom.priceSlider.max = budgetVal;
      dom.priceSlider.value = budgetVal;
      dom.priceValLabel.innerHTML = `&#8377;${budgetVal.toLocaleString('en-IN')}`;
    }
    filterAndRenderFlights();
    actionsTaken.push(`Filtered flights under <strong>&#8377;${budgetVal.toLocaleString('en-IN')}</strong>`);
  }

  // Gather Live State after any automatic updates
  const classCfg = getCabinConfig();
  const pax = state.passengersCount;
  const sortedByPrice = [...state.allFlights].sort((a, b) => a.price - b.price);
  const cheapest = sortedByPrice[0];
  const fastest = [...state.allFlights].sort((a, b) => a.duration.localeCompare(b.duration))[0];
  const w = WEATHER_DATA[dest] || WEATHER_DATA["DEL"];
  if (cheapest) state.chatMemory.lastRecommendedFlight = cheapest;

  const actionNoteHtml = actionsTaken.length > 0
    ? `<div style="background:#eef2ff; border-left:3px solid #4f46e5; padding:0.35rem 0.6rem; border-radius:4px; font-size:0.73rem; color:#312e81; margin-bottom:0.45rem;">⚡ <strong>Auto-Updated Page:</strong> ${actionsTaken.join(' &bull; ')}</div>`
    : '';

  // ----------------------------------------------------------------------------
  // STEP 2: CHECK DIRECT BOOKING OR CONVERSATIONAL "YES / BOOK IT" CONFIRMATION
  // ----------------------------------------------------------------------------
  const isDirectBookConfirm =
    /^(yes|haan|ha|sure|ok|okay|book it|book now|book cheapest|book first|open seat map|do it|proceed|confirm)$/i.test(q) ||
    q.includes('book cheapest') || q.includes('book the cheapest') || q.includes('sasti flight book');

  // Also check if user typed a specific flight number like "6E-204" or "AI-804"
  const flightCodeMatch = q.match(/\b(6e|ai|qp|ix|sg)[-\s]?(\d{3,4})\b/i);
  if (flightCodeMatch) {
    const codeStr = `${flightCodeMatch[1].toUpperCase()}-${flightCodeMatch[2]}`;
    const targetF = state.allFlights.find(f => f.flightNumber.toUpperCase() === codeStr) || cheapest;
    if (targetF) {
      openBookingModal(targetF);
      const reply = `${actionNoteHtml}Opening the <strong>${classCfg.label} Seat Map &amp; Booking Modal</strong> for <strong>${targetF.airline} (${targetF.flightNumber})</strong> departing at ${targetF.departTime} (&#8377;${targetF.price.toLocaleString('en-IN')}/pax)! Select your ${pax} seat(s) to generate your PNR.`;
      appendChatBubble(reply, 'bot');
      return;
    }
  }

  if (isDirectBookConfirm && cheapest) {
    const targetF = state.chatMemory.lastRecommendedFlight || cheapest;
    openBookingModal(targetF);
    const reply = `${actionNoteHtml}Done! &#127915; I've opened the <strong>${classCfg.label} Booking &amp; Seat Selection Modal</strong> for <strong>${targetF.airline} ${targetF.flightNumber}</strong> (${origin} &rarr; ${dest} at ${targetF.departTime}, <strong>&#8377;${targetF.price.toLocaleString('en-IN')}/person</strong>). Pick your seats on the aircraft map!`;
    appendChatBubble(reply, 'bot');
    return;
  }

  // ----------------------------------------------------------------------------
  // STEP 3: MULTI-INTENT KNOWLEDGE & ACTION COMPOSER
  // ----------------------------------------------------------------------------
  let replySections = [];
  let botActions = [];

  // TOPIC 1: ECONOMY VS PREMIUM ECONOMY VS BUSINESS CLASS COMPARISON
  if (q.includes('business') || q.includes('premium') || q.includes('class') || q.includes('economy') || q.includes('why there is not') || q.includes('no change')) {
    const baseEcon = cheapest ? cheapest.baseEconomyPrice : 7500;
    const premPrice = Math.round(baseEcon * 1.45);
    const bizPrice = Math.round(baseEcon * 2.25);
    const fName = cheapest ? `${cheapest.airline} (${cheapest.flightNumber})` : 'Cheapest Flight';

    replySections.push(
      `<strong>&#128186; Cabin Class Fare Breakdown (${origin} &rarr; ${dest} on ${fName}):</strong><br>` +
      `&bull; <strong>💺 Economy (1.0&times;):</strong> <strong>&#8377;${baseEcon.toLocaleString('en-IN')}/pax</strong> (15kg bag, standard seats &#8377;150–&#8377;350)<br>` +
      `&bull; <strong>✨ Premium Economy (1.45&times;):</strong> <strong>&#8377;${premPrice.toLocaleString('en-IN')}/pax</strong> (25kg bag, priority boarding, front-row seats FREE)<br>` +
      `&bull; <strong>👑 Business Class (2.25&times;):</strong> <strong>&#8377;${bizPrice.toLocaleString('en-IN')}/pax</strong> (35kg bag, <strong>FREE Recliner Seats &amp; FREE VIP Lounge Pass</strong> included!)<br>` +
      `<em>Currently selected on page: <strong>${classCfg.label}</strong>. Click below to switch classes instantly!</em>`
    );

    if (classCfg.code !== 'Business') {
      botActions.push({
        label: `👑 Switch Page to Business Class (₹${bizPrice.toLocaleString('en-IN')})`,
        onClick: () => {
          dom.travelClass.value = "Business";
          fetchFlights();
          showToast("👑 Switched to Business Class (2.25× Fare + Free Lounge & Seats)!", "success");
        }
      });
    } else {
      botActions.push({
        label: `💺 Switch Page to Economy (₹${baseEcon.toLocaleString('en-IN')})`,
        onClick: () => {
          dom.travelClass.value = "Economy";
          fetchFlights();
          showToast("💺 Switched to Economy Class!", "info");
        }
      });
    }
    if (cheapest) {
      botActions.push({
        label: `🎟️ Book ${cheapest.flightNumber} (${classCfg.label})`,
        onClick: () => openBookingModal(cheapest)
      });
    }

    updateDynamicChatChips([
      { label: "👑 Switch to Business", prompt: "Switch to Business Class" },
      { label: "✨ Switch to Premium Economy", prompt: "Switch to Premium Economy" },
      { label: "💺 Switch to Economy", prompt: "Switch to Economy" },
      { label: `🎟️ Book ${cheapest ? cheapest.flightNumber : 'Flight'}`, prompt: "Book cheapest flight" }
    ]);
  }

  // TOPIC 2: 3-DAY DESTINATION ITINERARY / PLACES TO VISIT / TOURISM / FOOD / HOTELS
  if (q.includes('itinerary') || q.includes('plan') || q.includes('places') || q.includes('visit') || q.includes('tourist') || q.includes('sightseeing') || q.includes('hotel') || q.includes('stay') || q.includes('famous food') || q.includes('ghoomne') || q.includes('trip')) {
    const cityGuide = WEATHER_DATA[dest] || WEATHER_DATA["DEL"];
    const daysHtml = (cityGuide.itinerary || []).map(d => `&bull; ${d}`).join('<br>');
    replySections.push(
      `<strong>&#127796; 3-Day ${cityGuide.city} (${dest}) Travel &amp; Food Guide:</strong><br>` +
      `${daysHtml}<br>` +
      `&bull; <strong>&#127860; Must-Try Food:</strong> ${cityGuide.food}<br>` +
      `&bull; <strong>&#127976; Best Areas to Stay:</strong> ${cityGuide.stay}<br>` +
      `&bull; <strong>${cityGuide.icon} Weather &amp; Packing:</strong> ${cityGuide.temp} (${cityGuide.cond}) — ${cityGuide.tip}`
    );
    if (cheapest && botActions.length === 0) {
      botActions.push({
        label: `✈️ Book ${origin}→${dest} (${cheapest.airline} ₹${cheapest.price.toLocaleString('en-IN')})`,
        onClick: () => openBookingModal(cheapest)
      });
    }
    updateDynamicChatChips([
      { label: `✈️ Cheapest ${dest} Flight`, prompt: `Show cheapest flight to ${dest}` },
      { label: "📅 ±2 Days Saver Dates", prompt: "Show cheaper flights 1-2 days before or after" },
      { label: "🚕 Airport Cab Fare", prompt: "What are the airport cab options?" },
      { label: "🧮 Cost for 2 Travelers", prompt: "Total cost for 2 people" }
    ]);
  }

  // TOPIC 3: NEIGHBORHOOD / RESIDENTIAL AREA TO AIRPORT ROUTE MAP
  if (q.includes('map') || q.includes('route') || q.includes('traffic') || q.includes('distance') || q.includes('how far') || q.includes('kitni door') || q.includes('leave home') || q.includes('niklu') || q.includes('jakkasandra') || q.includes('koramangala') || q.includes('indiranagar') || q.includes('whitefield') || q.includes('hsr') || q.includes('jayanagar') || q.includes('electronic city') || q.includes('connaught') || q.includes('dwarka') || q.includes('hauz khas') || q.includes('noida') || q.includes('gurugram') || q.includes('bandra') || q.includes('andheri') || q.includes('colaba') || q.includes('powai') || q.includes('gachibowli') || q.includes('banjara') || q.includes('panjim') || q.includes('calangute')) {
    let matchedCity = origin;
    let matchedAreaIdx = 0;
    let matchedArea = (CITY_AIRPORT_ROUTES[origin] || CITY_AIRPORT_ROUTES["BLR"]).areas[0];

    Object.keys(CITY_AIRPORT_ROUTES).forEach(cCode => {
      CITY_AIRPORT_ROUTES[cCode].areas.forEach((areaObj, idx) => {
        const keywords = areaObj.name.toLowerCase().split(/[\s/()-]+/).filter(wKey => wKey.length > 2);
        if (keywords.some(kw => q.includes(kw))) {
          matchedCity = cCode;
          matchedAreaIdx = idx;
          matchedArea = areaObj;
        }
      });
    });

    const fTime = cheapest ? cheapest.departTime : "08:30";
    const leaveTime = calculateLeaveHomeTime(fTime, matchedArea.driveMins);

    replySections.push(
      `<strong>&#128506;&#65039; Residential-to-Airport Route (${matchedArea.name} &rarr; ${matchedCity} Airport):</strong><br>` +
      `&bull; <strong>Road Distance &amp; Drive Time:</strong> ${matchedArea.distKm} km (${matchedArea.driveMins} mins • ${matchedArea.traffic})<br>` +
      `&bull; <strong>Fastest Highway:</strong> ${matchedArea.highway}<br>` +
      `&bull; <strong>Leave Home By:</strong> <strong>${leaveTime}</strong> (for a ${fTime} departure, including 2h security buffer)<br>` +
      `&bull; <strong>Estimated Home-to-Airport Cab:</strong> &#8377;${matchedArea.cabFare}`
    );

    botActions.push({
      label: `🗺️ Open ${matchedArea.name} Route on Live Map`,
      onClick: () => {
        dom.mapCitySelect.value = matchedCity;
        populateResidentialAreas(matchedCity);
        dom.mapAreaSelect.value = String(matchedAreaIdx);
        switchMainTab('map');
      }
    });
    botActions.push({
      label: `🚕 Simulate Live Cab Ride`,
      onClick: () => {
        dom.mapCitySelect.value = matchedCity;
        populateResidentialAreas(matchedCity);
        dom.mapAreaSelect.value = String(matchedAreaIdx);
        switchMainTab('map');
        setTimeout(() => animateCabOnMap(), 400);
      }
    });
  }

  // TOPIC 4: SPECIFIC AIRLINE OR TIME-OF-DAY FILTER
  if (q.includes('indigo') || q.includes('air india') || q.includes('akasa') || q.includes('spicejet') || q.includes('express') || q.includes('morning') || q.includes('subah') || q.includes('evening') || q.includes('shaam') || q.includes('night') || q.includes('afternoon')) {
    let subset = [...state.allFlights];
    let filterLabels = [];

    if (q.includes('express')) { subset = subset.filter(f => f.airline === 'Air India Express'); filterLabels.push('Air India Express'); }
    else if (q.includes('air india')) { subset = subset.filter(f => f.airline === 'Air India'); filterLabels.push('Air India'); }
    else if (q.includes('indigo')) { subset = subset.filter(f => f.airline === 'IndiGo'); filterLabels.push('IndiGo'); }
    else if (q.includes('akasa')) { subset = subset.filter(f => f.airline === 'Akasa Air'); filterLabels.push('Akasa Air'); }
    else if (q.includes('spicejet')) { subset = subset.filter(f => f.airline === 'SpiceJet'); filterLabels.push('SpiceJet'); }

    if (q.includes('morning') || q.includes('subah')) {
      subset = subset.filter(f => parseInt(f.departTime.split(':')[0], 10) < 12);
      filterLabels.push('Morning (before 12 PM)');
    } else if (q.includes('evening') || q.includes('shaam') || q.includes('night')) {
      subset = subset.filter(f => parseInt(f.departTime.split(':')[0], 10) >= 16);
      filterLabels.push('Evening/Night (after 4 PM)');
    } else if (q.includes('afternoon')) {
      subset = subset.filter(f => {
        const h = parseInt(f.departTime.split(':')[0], 10);
        return h >= 12 && h < 16;
      });
      filterLabels.push('Afternoon (12–4 PM)');
    }

    const titleStr = filterLabels.join(' ') || 'Matching';
    if (subset.length > 0) {
      const lines = subset.map(f => `&bull; <strong>${f.airline} ${f.flightNumber}</strong> (${f.departTime} &rarr; ${f.arrivalTime}, ${f.duration}): <strong>&#8377;${f.price.toLocaleString('en-IN')}</strong> (${classCfg.label})`).join('<br>');
      replySections.push(`<strong>&#9992;&#65039; ${titleStr} Flights on ${origin} &rarr; ${dest}:</strong><br>${lines}`);
      state.chatMemory.lastRecommendedFlight = subset[0];
      botActions.push({
        label: `🎟️ Book ${subset[0].airline} ${subset[0].flightNumber} (₹${subset[0].price.toLocaleString('en-IN')})`,
        onClick: () => openBookingModal(subset[0])
      });
    } else {
      replySections.push(`No exact <strong>${titleStr}</strong> flights found on ${origin} &rarr; ${dest}, but our lowest overall flight is <strong>${cheapest ? cheapest.airline + ' ' + cheapest.flightNumber + ' at ' + cheapest.departTime + ' for ₹' + cheapest.price.toLocaleString('en-IN') : 'available'}</strong>.`);
    }
  }

  // TOPIC 5: ±2 DAYS FLEXIBLE DEALS & WHEN TO BOOK
  if (q.includes('days') || q.includes('before') || q.includes('after') || q.includes('±2') || q.includes('when') || q.includes('kab') || q.includes('predict') || q.includes('cheaper date') || q.includes('wait')) {
    const baseP = cheapest ? cheapest.price : 7500;
    const twoDaysEarlierPrice = Math.round(baseP * 0.88);
    const oneDayLaterPrice = Math.round(baseP * 0.89);
    const saveAmt = baseP - twoDaysEarlierPrice;

    const baseDate = new Date((dom.departDate.value || "2026-12-04") + "T00:00:00");
    const earlierDate = new Date(baseDate);
    earlierDate.setDate(earlierDate.getDate() - 2);
    const earlierIso = earlierDate.toISOString().split('T')[0];
    const earlierNice = earlierDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    replySections.push(
      `<strong>&#128197; &plusmn;2 Days Flexible Fare Comparison (${origin} &rarr; ${dest} • ${classCfg.label}):</strong><br>` +
      `&bull; <strong>Selected Date (${dom.departDate.value}):</strong> &#8377;${baseP.toLocaleString('en-IN')}/pax<br>` +
      `&bull; <strong>2 Days Earlier (${earlierNice}):</strong> <strong style="color:#059669;">&#8377;${twoDaysEarlierPrice.toLocaleString('en-IN')}/pax (Save &#8377;${saveAmt.toLocaleString('en-IN')}!)</strong><br>` +
      `&bull; <strong>1 Day Later:</strong> <strong style="color:#059669;">&#8377;${oneDayLaterPrice.toLocaleString('en-IN')}/pax</strong>`
    );

    botActions.push({
      label: `📅 Switch Date to ${earlierNice} (Save ₹${saveAmt.toLocaleString('en-IN')})`,
      onClick: () => {
        dom.departDate.value = earlierIso;
        fetchFlights();
        showToast(`Switched date to ${earlierNice} (₹${twoDaysEarlierPrice.toLocaleString('en-IN')})!`, "success");
      }
    });
  }

  // TOPIC 6: BEST / CHEAPEST / FASTEST / FLIGHT LIST / TOTAL COST MATH
  if (replySections.length === 0 && (routeSwitchedOrPaxUpdated(actionsTaken) || q.includes('cheap') || q.includes('sasta') || q.includes('sasti') || q.includes('best') || q.includes('recommend') || q.includes('fast') || q.includes('price') || q.includes('fare') || q.includes('cost') || q.includes('total') || q.includes('flight') || q.includes('show') || q.includes('kitna') || q.includes('budget'))) {
    if (cheapest) {
      const baseTotal = cheapest.price * pax;
      const gst = Math.round(baseTotal * 0.12);
      const seatTotal = classCfg.standardSeatFee * pax;
      const grandTotal = baseTotal + gst + seatTotal;

      const top3 = sortedByPrice.slice(0, 3).map((f, idx) =>
        `${idx === 0 ? '🟢 <strong>Cheapest:</strong>' : (f.id === fastest.id ? '⚡ <strong>Fastest:</strong>' : '🟡')} <strong>${f.airline} ${f.flightNumber}</strong> (${f.departTime}&rarr;${f.arrivalTime}, ${f.duration}) — <strong>&#8377;${f.price.toLocaleString('en-IN')}/pax</strong>`
      ).join('<br>');

      replySections.push(
        `<strong>&#9992;&#65039; Best ${classCfg.label} Flights on ${origin} &rarr; ${dest} (${pax} Traveler${pax > 1 ? 's' : ''}):</strong><br>${top3}<br><br>` +
        `<strong>&#129518; Itemized Total for ${pax} Traveler${pax > 1 ? 's' : ''} (${cheapest.flightNumber}):</strong><br>` +
        `Base (${pax}&times;&#8377;${cheapest.price.toLocaleString('en-IN')}) = &#8377;${baseTotal.toLocaleString('en-IN')} + 12% GST (&#8377;${gst.toLocaleString('en-IN')}) + Seats (${seatTotal === 0 ? 'FREE' : '₹' + seatTotal}) = <strong>&#8377;${grandTotal.toLocaleString('en-IN')}</strong>.`
      );

      botActions.push({
        label: `🎟️ Book ${cheapest.airline} ${cheapest.flightNumber} (₹${cheapest.price.toLocaleString('en-IN')})`,
        onClick: () => openBookingModal(cheapest)
      });
      if (classCfg.code === 'Economy') {
        botActions.push({
          label: `👑 Compare Business Class`,
          onClick: () => handleChatQuery("Compare Economy vs Business Class fares on this route")
        });
      }
    }
  }

  // TOPIC 7: BAGGAGE, DOCUMENTS, DIGIYATRA, WEB CHECK-IN, STUDENT DISCOUNT, CANCELLATION, LOUNGE, CABS
  if (q.includes('bag') || q.includes('luggage') || q.includes('weight') || q.includes('power bank') || q.includes('laptop')) {
    replySections.push(
      `<strong>&#129523; Baggage Allowance (${classCfg.label}):</strong><br>` +
      `&bull; <strong>Your Current Class (${classCfg.label}):</strong> <strong>${classCfg.baggage}</strong><br>` +
      `&bull; <strong>Items Rule:</strong> Laptops &amp; power banks (up to 100Wh) must be carried in your 7kg cabin hand-baggage (not check-in).`
    );
  }
  if (q.includes('document') || q.includes('id ') || q.includes('aadhaar') || q.includes('digiyatra') || q.includes('web check') || q.includes('boarding')) {
    replySections.push(
      `<strong>&#128196; Airport Check-in &amp; DigiYatra Rules:</strong><br>` +
      `&bull; <strong>Required ID:</strong> Original Aadhaar Card, Passport, Voter ID, or Driving License (DigiLocker valid at all Indian airports).<br>` +
      `&bull; <strong>DigiYatra Facial Entry:</strong> Available at BLR, DEL, BOM, HYD, CCU &amp; GOI (Mopa) — skip security queues in under 3 mins!`
    );
  }
  if (q.includes('student') || q.includes('discount') || q.includes('offer') || q.includes('promo') || q.includes('coupon') || q.includes('armed forces') || q.includes('senior')) {
    replySections.push(
      `<strong>&#127891; Special Fares &amp; Extra Baggage Benefits:</strong><br>` +
      `&bull; <strong>Student Benefit:</strong> Carry a valid College ID at check-in to get <strong>+10kg Extra Check-in Baggage FREE</strong> (25kg total in Economy!).<br>` +
      `&bull; <strong>Saver Tip:</strong> Use our <strong>&plusmn;2 Days Flexible Date Strip</strong> above to save an instant 11%–12% (&#8377;750–&#8377;1,450/pax) without needing a coupon!`
    );
  }
  if (q.includes('lounge') || q.includes('food') || q.includes('meal') || q.includes('buffet') || q.includes('khana')) {
    replySections.push(
      `<strong>&#127869;&#65039; Airport VIP Lounge &amp; In-Flight Meals:</strong><br>` +
      `&bull; <strong>Economy:</strong> Add the VIP Terminal Lounge &amp; Hot Buffet Pass for <strong>&#8377;299/pax</strong> (78% off walk-in rate).<br>` +
      `&bull; <strong>Premium Economy:</strong> Complimentary hot meal on board + 50% off VIP Lounge (<strong>&#8377;149/pax</strong>).<br>` +
      `&bull; <strong>Business Class:</strong> Gourmet multi-course meal + <strong>FREE VIP Terminal Lounge Access (&#8377;0)</strong>!`
    );
  }
  if (q.includes('cab') || q.includes('taxi') || q.includes('blusmart') || q.includes('innova')) {
    const arrT = cheapest ? cheapest.arrivalTime : "09:05";
    const pickT = calculateCabPickupTime(arrT);
    replySections.push(
      `<strong>&#128661; Landing-Synced Airport Cabs at ${dest}:</strong><br>` +
      `Synced to your <strong>${arrT}</strong> landing &rarr; Driver waiting at <strong>${pickT}</strong>:<br>` +
      `&bull; <strong>Mini Hatchback:</strong> &#8377;499 (1–2 pax) &bull; <strong>BluSmart EV Sedan:</strong> &#8377;749 (1–3 pax) &bull; <strong>Prime SUV Innova:</strong> &#8377;1,199 (4 pax + bags).`
    );
  }
  if (q.includes('my booking') || q.includes('pnr') || q.includes('cancel') || q.includes('refund') || q.includes('status')) {
    const myB = getLocalBookings();
    if (myB.length > 0) {
      const latest = myB[0];
      replySections.push(
        `<strong>&#127915; Your Active Bookings (${myB.length} total):</strong><br>` +
        `Latest PNR: <strong>${latest.pnr}</strong> (${latest.status}) — <strong>${latest.flight ? latest.flight.airline + ' ' + latest.flight.flightNumber : ''}</strong> (${latest.travelClass || 'Economy'}, ${latest.travelDate}, Seats: ${latest.seat}, Total Paid: &#8377;${Math.round(latest.totalPaid).toLocaleString('en-IN')}).`
      );
      botActions.push({
        label: `🎟️ View Boarding Pass (${latest.pnr})`,
        onClick: () => displayBoardingPass(latest)
      });
    } else {
      replySections.push(`You don't have any booked tickets yet. Click <strong>Book</strong> on any flight card to pick your seats and generate an instant PNR &amp; Boarding Pass!`);
    }
  }
  if (q.includes('weather') || q.includes('mausam') || q.includes('temp') || q.includes('pack')) {
    replySections.push(
      `<strong>${w.icon} ${w.city} (${dest}) Weather &amp; Packing Tip:</strong><br>` +
      `Currently <strong>${w.temp} (${w.cond})</strong>. ${w.tip}`
    );
  }

  // If our structured multi-intent engine built a rich answer, display it immediately!
  if (replySections.length > 0) {
    const finalHtml = actionNoteHtml + replySections.join('<br><br>');
    state.chatMemory.history.push({ role: 'assistant', content: finalHtml });
    setTimeout(() => appendChatBubble(finalHtml, 'bot', botActions.slice(0, 2)), 150);
    return;
  }

  // ----------------------------------------------------------------------------
  // STEP 4: LIVE GENERATIVE AI + CONTEXTUAL INTELLIGENCE FOR ANY OPEN-ENDED QUERY
  // ----------------------------------------------------------------------------
  const typingBubble = appendChatBubble(`<span class="chat-typing-bubble">✨ SkyBot AI Copilot is thinking...</span>`, 'bot');

  const contextSummary =
    `Active Route: ${origin} to ${dest} on ${dom.departDate.value}. ` +
    `Selected Cabin Class: ${classCfg.label} (${classCfg.multiplier}x multiplier, ${classCfg.baggage}). ` +
    `Travelers: ${pax}. ` +
    `Flights on this route: ${sortedByPrice.map(f => `${f.airline} ${f.flightNumber} (${f.departTime}->${f.arrivalTime}, ${f.duration}, ${classCfg.label} ₹${f.price}, Economy ₹${f.baseEconomyPrice})`).join('; ')}. ` +
    `Destination Weather (${w.city}): ${w.temp}, ${w.cond}. Packing Tip: ${w.tip}. ` +
    `3-Day Itinerary highlights: ${(w.itinerary || []).join(' | ')}.`;

  const aiReply = await fetchLiveGenerativeAIReply(cleanText, contextSummary);
  typingBubble.remove();

  if (aiReply) {
    const fullAiHtml = actionNoteHtml + aiReply;
    state.chatMemory.history.push({ role: 'assistant', content: fullAiHtml });
    const defaultActions = cheapest ? [
      { label: `🎟️ Book ${cheapest.airline} ${cheapest.flightNumber} (₹${cheapest.price.toLocaleString('en-IN')})`, onClick: () => openBookingModal(cheapest) },
      { label: `👑 Switch to Business Class`, onClick: () => { dom.travelClass.value = "Business"; fetchFlights(); } }
    ] : [];
    appendChatBubble(fullAiHtml, 'bot', defaultActions);
    return;
  }

  // Offline Intelligent Conversational Responder (analyzes question type, never repeats a static list)
  let smartOfflineHtml = actionNoteHtml;
  if (/^(hi|hello|hey|namaste|hola|good morning|good evening)\b/i.test(q)) {
    smartOfflineHtml += `Hey! 👋 I'm your <strong>SkyBot AI Copilot</strong>. Right now you're viewing <strong>${origin} &rarr; ${dest}</strong> in <strong>${classCfg.label}</strong> (${state.allFlights.length} nonstop flights starting at <strong>&#8377;${cheapest ? cheapest.price.toLocaleString('en-IN') : '6,475'}</strong>).<br><br>You can tell me to:<br>&bull; <em>"Switch to Business Class"</em> or <em>"Compare Economy vs Business"</em><br>&bull; <em>"Show Delhi to Goa for 3 people"</em><br>&bull; <em>"Plan a 3-day trip to ${w.city}"</em> or just say <em>"Book it"</em>!`;
  } else {
    const econP = cheapest ? cheapest.baseEconomyPrice : 6500;
    const bizP = Math.round(econP * 2.25);
    smartOfflineHtml +=
      `Here's what I found for <strong>"${cleanText}"</strong> on your <strong>${origin} &rarr; ${dest}</strong> trip:<br>` +
      `&bull; <strong>Top Flight Pick:</strong> <strong>${cheapest ? `${cheapest.airline} ${cheapest.flightNumber} (${cheapest.departTime} &rarr; ${cheapest.arrivalTime}, ${cheapest.duration})` : 'IndiGo Non-stop'}</strong> at <strong>&#8377;${cheapest ? cheapest.price.toLocaleString('en-IN') : econP.toLocaleString('en-IN')}</strong> in ${classCfg.label} (Economy: &#8377;${econP.toLocaleString('en-IN')} | Business: &#8377;${bizP.toLocaleString('en-IN')}).<br>` +
      `&bull; <strong>${w.city} Highlights:</strong> ${w.icon} ${w.temp} — Famous for ${w.food}.<br>` +
      `<em>Tip: Reply <strong>"book it"</strong> to open the seat map, <strong>"switch to business"</strong> to upgrade class, or <strong>"3-day plan"</strong> for a full ${w.city} itinerary!</em>`;
  }

  const fallbackActions = cheapest ? [
    { label: `🎟️ Book ${cheapest.airline} ${cheapest.flightNumber} (₹${cheapest.price.toLocaleString('en-IN')})`, onClick: () => openBookingModal(cheapest) },
    { label: `🌴 ${w.city} 3-Day Itinerary`, onClick: () => handleChatQuery(`Plan a 3-day itinerary for ${w.city}`) }
  ] : [];

  state.chatMemory.history.push({ role: 'assistant', content: smartOfflineHtml });
  appendChatBubble(smartOfflineHtml, 'bot', fallbackActions);
}

function routeSwitchedOrPaxUpdated(actionsTaken) {
  return Array.isArray(actionsTaken) && actionsTaken.length > 0;
}

function initAirlineFilters() {
  const airlines = ["IndiGo", "Air India", "Akasa Air", "Air India Express", "SpiceJet"];
  dom.airlineFiltersContainer.innerHTML = '';

  airlines.forEach(a => {
    const lbl = document.createElement('label');
    lbl.innerHTML = `<input type="checkbox" value="${a}" checked> <span>${a}</span>`;
    lbl.querySelector('input').addEventListener('change', () => {
      const checked = Array.from(dom.airlineFiltersContainer.querySelectorAll('input:checked')).map(i => i.value);
      state.activeAirlines = checked;
      filterAndRenderFlights();
    });
    dom.airlineFiltersContainer.appendChild(lbl);
  });
}

// ==============================================================================
// 13. VIEW SWITCHING & EVENT LISTENERS
// ==============================================================================
function switchMainTab(tabName) {
  dom.searchSection.classList.toggle('active', tabName === 'search');
  dom.mapSection.classList.toggle('active', tabName === 'map');
  dom.bookingsSection.classList.toggle('active', tabName === 'bookings');

  dom.navSearchBtn.classList.toggle('active', tabName === 'search');
  dom.navMapBtn.classList.toggle('active', tabName === 'map');
  dom.navBookingsBtn.classList.toggle('active', tabName === 'bookings');

  if (tabName === 'map') {
    updateAirportRouteMap();
  } else if (tabName === 'bookings') {
    loadBookings();
  }
}

function setupEventListeners() {
  dom.navSearchBtn.addEventListener('click', () => switchMainTab('search'));
  dom.navMapBtn.addEventListener('click', () => switchMainTab('map'));
  dom.navBookingsBtn.addEventListener('click', () => switchMainTab('bookings'));
  dom.brandLogo.addEventListener('click', () => switchMainTab('search'));

  dom.btnHeroMap.addEventListener('click', () => {
    if (CITY_AIRPORT_ROUTES[dom.originSelect.value]) {
      dom.mapCitySelect.value = dom.originSelect.value;
      populateResidentialAreas(dom.originSelect.value);
    }
    switchMainTab('map');
  });

  dom.btnTicketOpenMap.addEventListener('click', () => {
    dom.ticketModal.classList.add('hidden');
    switchMainTab('map');
  });

  dom.btnCloseModal.addEventListener('click', () => dom.bookingModal.classList.add('hidden'));
  dom.btnCloseTicket.addEventListener('click', () => dom.ticketModal.classList.add('hidden'));
  dom.btnPrintTicket.addEventListener('click', () => window.print());

  dom.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchFlights();
  });

  dom.originSelect.addEventListener('change', () => {
    if (dom.originSelect.value !== dom.destSelect.value) fetchFlights();
  });
  dom.destSelect.addEventListener('change', () => {
    if (dom.originSelect.value !== dom.destSelect.value) fetchFlights();
  });
  dom.departDate.addEventListener('change', () => {
    fetchFlights();
  });
  dom.passengersSelect.addEventListener('change', () => {
    fetchFlights();
  });

  // CABIN CLASS CHANGE LISTENER: Updates fares, slider max, ±2 days deals, and shows a toast!
  dom.travelClass.addEventListener('change', () => {
    const classCfg = getCabinConfig();
    state.maxPrice = classCfg.sliderMax;
    if (dom.priceSlider) {
      dom.priceSlider.max = classCfg.sliderMax;
      dom.priceSlider.value = classCfg.sliderMax;
      dom.priceValLabel.innerHTML = `&#8377;${classCfg.sliderMax.toLocaleString('en-IN')}`;
    }
    fetchFlights();
    showToast(`${classCfg.pillText} Selected! Fares updated (${classCfg.multiplier}× Economy Rate).`, "success");
  });

  dom.mapCitySelect.addEventListener('change', () => {
    populateResidentialAreas(dom.mapCitySelect.value);
    dom.mapCustomArea.value = '';
    updateAirportRouteMap();
  });
  dom.mapAreaSelect.addEventListener('change', () => {
    dom.mapCustomArea.value = '';
    updateAirportRouteMap();
  });
  dom.mapFlightTime.addEventListener('change', () => {
    updateAirportRouteMap(dom.mapCustomArea.value.trim() || null);
  });
  dom.btnApplyCustomArea.addEventListener('click', () => {
    const custom = dom.mapCustomArea.value.trim();
    if (custom) {
      updateAirportRouteMap(custom);
      showToast(`Route updated from ${custom} to ${dom.mapCitySelect.value} Airport!`, "success");
    }
  });
  dom.btnSimulateDrive.addEventListener('click', animateCabOnMap);

  dom.btnPriceAlert.addEventListener('click', () => {
    state.priceAlertEnabled = !state.priceAlertEnabled;
    dom.btnPriceAlert.classList.toggle('active', state.priceAlertEnabled);
    if (state.priceAlertEnabled) {
      dom.priceAlertText.textContent = "Alert Active ✓";
      showToast(`Price Drop Alert activated for ${dom.originSelect.value} → ${dom.destSelect.value}!`, "success");
    } else {
      dom.priceAlertText.textContent = "Track Price Drop Alert";
      showToast("Price alert turned off.", "info");
    }
  });

  dom.chkLoungePass.addEventListener('change', (e) => {
    state.loungeIncluded = e.target.checked;
    updateFareSummary();
  });

  document.querySelectorAll('.cab-option-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cab-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input');
      if (radio) radio.checked = true;
      state.selectedCabType = card.dataset.cab || 'None';
      state.selectedCabFee = parseFloat(card.dataset.fee || '0');
      updateFareSummary();
    });
  });

  dom.bookingForm.addEventListener('submit', submitBooking);

  dom.sortChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.sortChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.sortBy = chip.dataset.sort;
      fetchFlights();
    });
  });

  dom.priceSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.maxPrice = val;
    dom.priceValLabel.innerHTML = `&#8377;${val.toLocaleString('en-IN')}`;
    filterAndRenderFlights();
  });

  dom.btnResetFilters.addEventListener('click', () => {
    const classCfg = getCabinConfig();
    state.maxPrice = classCfg.sliderMax;
    dom.priceSlider.max = classCfg.sliderMax;
    dom.priceSlider.value = classCfg.sliderMax;
    dom.priceValLabel.innerHTML = `&#8377;${classCfg.sliderMax.toLocaleString('en-IN')}`;
    dom.airlineFiltersContainer.querySelectorAll('input').forEach(i => i.checked = true);
    state.activeAirlines = ["IndiGo", "Air India", "Akasa Air", "Air India Express", "SpiceJet"];
    filterAndRenderFlights();
  });

  dom.btnOpenChat.addEventListener('click', () => {
    dom.chatbotWindow.classList.toggle('hidden');
  });
  dom.btnCloseChat.addEventListener('click', () => {
    dom.chatbotWindow.classList.add('hidden');
  });
  dom.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = dom.chatInput.value;
    dom.chatInput.value = '';
    handleChatQuery(text);
  });
  dom.chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleChatQuery(chip.dataset.prompt);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  dom.departDate.min = today;
  dom.departDate.value = "2026-12-04";

  populateResidentialAreas("BLR");
  initAirlineFilters();
  setupEventListeners();
  fetchFlights();
  updateBookingCount();
});

} // End of guard
