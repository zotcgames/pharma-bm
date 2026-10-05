# pharma-bm
Pharma BM — plateforme web pour trouver les pharmacies ouvertes et de garde à Bordj Menaïel.
# 💊 Pharma BM — Pharmacies de Bordj Menaïel

> **Find an open pharmacy near you — Trouver une pharmacie ouverte maintenant à Bordj Menaïel**

Pharma BM is a modern web application designed to help people in **Bordj Menaïel, Algeria** quickly find:

- 🟢 Pharmacies open now
- 🌙 Pharmacies de garde
- ⭐ Pharmacies open 24/7
- 🔴 Closed pharmacies
- 📍 Pharmacies near the user's location
- 🗺️ Pharmacies on an interactive map
- 📞 Pharmacy phone numbers
- 🧭 Navigation / directions
- 🕐 Opening and closing times
- 🔄 Automatically discovered pharmacies from OpenStreetMap
- ✅ Verified pharmacy information
- 📱 Mobile/PWA experience

The project is designed to start with **Bordj Menaïel** and can later expand to other Algerian cities.

---

# 🎯 Project Goal

The main question Pharma BM answers is:

> **"Where is the nearest pharmacy that is open right now?"**

The user should not need to search manually through Google.

The application should:

1. Detect the user's location.
2. Display pharmacies around the user.
3. Determine their current status.
4. Put the closest pharmacies first.
5. Highlight pharmacies that are currently open.
6. Show the pharmacy de garde.
7. Provide phone and navigation buttons.

---

# 🧠 Important Principle

Finding a pharmacy on a map and knowing whether it is open are two different things.

OpenStreetMap can help discover:

- Name
- Location
- Address
- Phone
- Website
- Existing opening-hour information

But the application must maintain its own verified data for:

- Opening hours
- Temporary closures
- Holidays
- Special schedules
- Pharmacy de garde
- 24/7 status

Therefore:

```text
OpenStreetMap
     ↓
Discover pharmacies
     ↓
Pharma BM Database
     ↓
Verify / edit information
     ↓
Opening Hours Engine
     ↓
🟢 OPEN
🌙 DE GARDE
⭐ 24H
🔴 CLOSED
```

Never claim that a pharmacy is open solely because it exists on OpenStreetMap.

---

# 🏗️ Architecture

Recommended architecture:

```text
                         ┌─────────────────────┐
                         │      USER PHONE     │
                         │  Android / iPhone   │
                         └──────────┬──────────┘
                                    │
                              GPS / HTTPS
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   PHARMA BM WEB     │
                         │ React / Next.js     │
                         │ Leaflet Map         │
                         │ PWA                 │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │    NODE.JS API      │
                         │ Express / TypeScript│
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
           ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
           │ PostgreSQL  │   │ Opening     │   │ OSM/Overpass│
           │ + PostGIS   │   │ Engine      │   │ Sync        │
           └─────────────┘   └─────────────┘   └─────────────┘
```

---

# 🧰 Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- React Leaflet
- Lucide Icons
- PWA support

## Backend

- Node.js
- TypeScript
- Express
- Zod
- Helmet
- CORS
- Pino logging

## Database

- PostgreSQL
- PostGIS
- Prisma ORM

## Geographic Data

- OpenStreetMap
- Overpass API
- Leaflet
- OpenStreetMap map tiles

## Testing

- Vitest
- Supertest
- Playwright

## Development

- Git
- GitHub
- VS Code
- npm / pnpm

---

# 📁 Project Structure

Recommended structure:

```text
pharma-bm/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── styles/
│   │   ├── package.json
│   │   └── next.config.ts
│   │
│   └── api/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── middleware/
│       │   ├── validators/
│       │   ├── jobs/
│       │   ├── utils/
│       │   └── server.ts
│       └── package.json
│
├── packages/
│   ├── opening-engine/
│   ├── geo/
│   ├── shared/
│   └── config/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── scripts/
│   ├── osm-sync.ts
│   ├── import-pharmacies.ts
│   └── verify-data.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── deployment.md
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# 🗺️ Main User Interface

The homepage must immediately show the most important information.

```text
┌─────────────────────────────────────────────┐
│ 💊 PHARMA BM                               │
│ Pharmacies de Bordj Menaïel                │
│                                             │
│ 🔎 Rechercher une pharmacie...             │
│                                             │
│ 🟢 7 ouvertes   🌙 1 de garde   ⭐ 1 24H   │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │                                         │ │
│ │              🗺️ LIVE MAP                │ │
│ │                                         │ │
│ │       🟢        🔴                     │ │
│ │               🌙                        │ │
│ │                    🟢                   │ │
│ │             📍 YOU                     │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ 📍 Pharmacies près de moi                   │
│                                             │
│ 🟢 OUVERTES MAINTENANT                      │
│                                             │
│ 💊 Pharmacie XXXXX                         │
│ 📍 450 m · Bordj Menaïel                  │
│ 🕐 Ferme à 22:00                           │
│                                             │
│ [📞 Appeler] [🧭 Itinéraire]               │
└─────────────────────────────────────────────┘
```

---

# 📱 Mobile First

The application must be designed primarily for smartphones.

Navigation:

```text
┌─────────────────────────────┐
│ 💊 Pharma BM                │
├─────────────────────────────┤
│ 🟢 Ouvertes                 │
│ 🌙 De garde                │
│ 🗺️ Carte                   │
│ 💊 Toutes                  │
│ ℹ️ Informations             │
└─────────────────────────────┘
```

Use large buttons for:

- 📞 Call
- 🧭 Directions
- 📍 Near me
- 🌙 Duty pharmacy

---

# 📍 User Location

When the user selects:

**📍 Pharmacies près de moi**

request browser geolocation permission.

Flow:

```text
User presses "Near me"
          ↓
Browser GPS permission
          ↓
Latitude / Longitude
          ↓
Backend
          ↓
PostGIS distance calculation
          ↓
Sort pharmacies
          ↓
Display nearest pharmacies
```

Example:

```text
🟢 350 m — Pharmacie A
🌙 650 m — Pharmacie B
🟢 900 m — Pharmacie C
🔴 1.2 km — Pharmacie D
```

Never expose or permanently store the user's precise location unless explicitly required and consented to.

---

# 🗺️ Interactive Map

Use:

- Leaflet
- OpenStreetMap
- PostGIS geographic coordinates

Markers:

```text
🟢 Open
🌙 Duty
⭐ 24H
🔴 Closed
📍 User
```

Clicking a marker:

```text
┌──────────────────────────┐
│ 🟢 Pharmacie ABC         │
│                          │
│ 📍 Bordj Menaïel         │
│ 🕐 Open until 22:00      │
│                          │
│ [📞 Call]                │
│ [🧭 Directions]          │
│ [ℹ️ Details]             │
└──────────────────────────┘
```

---

# 🤖 Automatic Pharmacy Discovery

Pharma BM should automatically discover pharmacies from OpenStreetMap using the Overpass API.

Primary tag:

```text
amenity=pharmacy
```

The synchronization service should search the Bordj Menaïel area.

Data that may be discovered:

```text
OSM ID
Name
Latitude
Longitude
Address
Phone
Website
Opening hours
```

---

# 🔄 OSM Synchronization

The backend must have an automatic synchronization job.

Recommended schedule:

```text
Every 24 hours
        ↓
Query Overpass API
        ↓
Find pharmacies
        ↓
Compare OSM IDs
        ↓
New pharmacies
        ↓
Updated pharmacies
        ↓
Removed/missing pharmacies
        ↓
Database
```

Example:

```text
OSM SYNC

✓ 31 pharmacies found
✓ 27 already known
+ 3 new pharmacies
~ 1 updated
! 0 errors

Last synchronization:
05/10/2026 03:00
```

Do not automatically delete pharmacies from the database when they disappear from one OSM query.

Instead:

```text
active = false
needs_review = true
```

This protects against incomplete external data.

---

# ✅ Verification System

Every pharmacy should have a verification status.

Possible states:

```text
UNVERIFIED
PENDING
VERIFIED
REJECTED
```

Example:

```text
💊 Pharmacie ABC

🟢 Open
✅ Verified
📍 Bordj Menaïel
```

Unverified information must not be presented as officially confirmed.

---

# 🕐 Opening Hours Engine

The application must have a dedicated opening-hours engine.

Do NOT implement opening status using a simple:

```text
currentTime > openingTime
```

The engine must support:

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday
- Multiple periods
- Overnight schedules
- 24-hour pharmacies
- Holidays
- Temporary closures
- Special schedules
- Pharmacy duty periods

Examples:

```text
08:00 → 22:00

08:00 → 12:00
14:00 → 22:00

20:00 → 08:00

24 hours
```

Function:

```text
getPharmacyStatus(pharmacy, dateTime)
```

Return:

```json
{
  "status": "OPEN",
  "label": "Ouverte maintenant",
  "opensAt": "08:00",
  "closesAt": "22:00",
  "verified": true
}
```

Possible statuses:

```text
OPEN
CLOSED
DUTY
OPEN_24H
CLOSING_SOON
TEMPORARILY_CLOSED
UNKNOWN
```

---

# 🌙 Pharmacy de Garde

The duty system is separate from normal opening hours.

A pharmacy can be:

```text
Normally closed
+
Currently on duty
=
🌙 PHARMACIE DE GARDE
```

Duty record:

```text
Pharmacy
Start date/time
End date/time
Verification status
Source
Notes
```

Example:

```text
🌙 PHARMACIE DE GARDE

05 October 2026

💊 Pharmacie ABC
📍 Bordj Menaïel
🕐 20:00 → 08:00

[📞 Appeler]
[🧭 Itinéraire]
```

---

# ⭐ 24/7 Pharmacies

Support:

```text
open24h = true
```

Display:

```text
⭐ OUVERTE 24H/24
```

24/7 status must override normal daily schedules.

---

# 🏥 Pharmacy Status Priority

When calculating the displayed status, use this priority:

```text
1. TEMPORARILY_CLOSED
2. DUTY
3. OPEN_24H
4. SPECIAL_EXCEPTION
5. NORMAL_OPENING_HOURS
6. CLOSED
7. UNKNOWN
```

However, the UI should clearly distinguish:

```text
🌙 DE GARDE
```

from:

```text
🟢 OUVERTE
```

A pharmacy may be open normally without being the official duty pharmacy.

---

# 🗄️ Database

PostgreSQL + PostGIS is recommended.

## pharmacies

```text
id
name
slug
address
city
wilaya
phone
website
latitude
longitude
location
osm_id
osm_type
osm_tags
source
verification_status
verified_at
active
created_at
updated_at
```

## opening_hours

```text
id
pharmacy_id
day_of_week
opens_at
closes_at
is_closed
created_at
updated_at
```

## opening_exceptions

```text
id
pharmacy_id
date
opens_at
closes_at
closed
reason
created_at
updated_at
```

## duty_shifts

```text
id
pharmacy_id
starts_at
ends_at
source
verification_status
notes
created_at
updated_at
```

## osm_sync_log

```text
id
started_at
completed_at
discovered_count
created_count
updated_count
deactivated_count
error_count
status
error_message
```

## admin_users

```text
id
name
email
password_hash
role
active
created_at
updated_at
```

Roles:

```text
SUPER_ADMIN
ADMIN
EDITOR
VERIFIER
VIEWER
```

---

# 📐 Geographic Search

Use PostGIS.

The application should support:

```text
Nearby pharmacies
Radius search
Distance sorting
Bounding-box map queries
Nearest open pharmacy
Nearest duty pharmacy
```

Example:

```http
GET /api/pharmacies/nearby?lat=36.75&lng=3.72&radius=5000
```

The backend should calculate actual geographic distance rather than trusting client-provided distance.

---

# 🔌 REST API

## Get pharmacies

```http
GET /api/pharmacies
```

Filters:

```text
status
verified
duty
open24h
radius
lat
lng
search
```

---

## Open pharmacies

```http
GET /api/pharmacies/open-now
```

---

## Nearby pharmacies

```http
GET /api/pharmacies/nearby?lat={lat}&lng={lng}&radius={meters}
```

---

## Duty pharmacies

```http
GET /api/pharmacies/duty/today
```

---

## Pharmacy details

```http
GET /api/pharmacies/:id
```

---

## Search

```http
GET /api/pharmacies/search?q=pharmacie
```

---

## Map

```http
GET /api/pharmacies/map?bbox=minLng,minLat,maxLng,maxLat
```

---

# 🔐 Admin API

```http
POST   /api/admin/pharmacies
GET    /api/admin/pharmacies
PATCH  /api/admin/pharmacies/:id
DELETE /api/admin/pharmacies/:id

POST   /api/admin/duty
PATCH  /api/admin/duty/:id
DELETE /api/admin/duty/:id

POST   /api/admin/osm/sync
GET    /api/admin/osm/sync/status
```

All admin endpoints require authentication and authorization.

---

# 🖥️ Admin Dashboard

Route:

```text
/admin
```

Dashboard:

```text
┌──────────────────────────────────────┐
│ PHARMA BM ADMIN                     │
├──────────────────────────────────────┤
│ Pharmacies                  31       │
│ 🟢 Open now                  7       │
│ 🌙 Duty                      1       │
│ ⭐ 24H                       1       │
│ Pending verification         3       │
│                                      │
│ Last OSM sync               03:00    │
├──────────────────────────────────────┤
│ [Pharmacies]                         │
│ [Duty Schedule]                      │
│ [Opening Hours]                      │
│ [Map]                                │
│ [OSM Synchronization]               │
│ [Users]                              │
│ [Reports]                            │
└──────────────────────────────────────┘
```

---

# ➕ Add Pharmacy Manually

Admins must be able to add pharmacies manually.

Form:

```text
Name
Address
City
Phone
Website

Latitude
Longitude

Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

24H
Pharmacy de garde
Verified
Active
```

The admin should also be able to select the location directly on the map.

---

# ✏️ Edit Pharmacy

Admin can modify:

```text
Name
Address
Phone
Website
Coordinates
Opening hours
Special hours
Duty schedule
Verification
Active status
```

Show source:

```text
Source:
[OpenStreetMap]
[Admin]
[Verified]
```

---

# 🔎 Search

Search should support:

```text
Pharmacy name
Address
Neighborhood
Phone
```

Example:

```text
Search:
"pharmacie"

Results:
🟢 Pharmacie ABC
🔴 Pharmacie XYZ
🌙 Pharmacie DEF
```

---

# 📞 Phone

Every pharmacy with a valid phone number gets:

```text
📞 Appeler
```

Use:

```text
tel:+213XXXXXXXXX
```

Normalize Algerian phone numbers before storing/displaying them.

---

# 🧭 Directions

Use the pharmacy coordinates to open navigation.

The application should support a URL generated from:

```text
User location
        ↓
Pharmacy location
        ↓
Directions
```

Do not permanently store the user's GPS coordinates.

---

# 📍 Distance

Display:

```text
350 m
1.2 km
4.8 km
```

For nearby results:

```text
sort by distance
```

But the default ranking should prioritize:

```text
1. Duty
2. Open
3. 24H
4. Distance
```

Configuration should allow this ranking to be changed.

---

# 🧩 Main Pages

## `/`

Homepage.

Contains:

- Search
- Current open pharmacies
- Duty pharmacy
- Map
- Near-me button

---

## `/map`

Full-screen map.

---

## `/pharmacies`

All pharmacies.

Filters:

```text
All
Open
Duty
24H
Closed
Verified
```

---

## `/pharmacies/:slug`

Pharmacy details.

---

## `/garde`

Pharmacies de garde.

---

## `/near-me`

GPS-focused pharmacy finder.

---

## `/about`

Information about Pharma BM.

---

## `/admin`

Administration dashboard.

---

# 📱 PWA

Pharma BM should be installable as a Progressive Web App.

Required:

```text
manifest.json
service worker
icons
offline fallback
```

App name:

```text
Pharma BM
```

Short name:

```text
Pharma BM
```

Theme:

```text
Medical / Pharmacy
```

The PWA should cache:

- Application shell
- Basic UI
- Static assets

Do not cache sensitive admin information in public browser storage.

---

# 🔔 Future Notifications

Future versions may support:

```text
🌙 New pharmacy de garde
📍 Duty pharmacy changed
🟢 Pharmacy reopened
⚠️ Temporary closure
```

Notifications must be opt-in.

Do not send unnecessary notifications.

---

# 🛡️ Security

Backend must implement:

- HTTPS in production
- Helmet
- CORS configuration
- Rate limiting
- Input validation with Zod
- Password hashing
- JWT/session authentication
- Role-based authorization
- SQL injection protection through Prisma
- Secure cookies where applicable
- CSRF protection where applicable
- Audit logs for admin changes

Never store plaintext passwords.

Never put:

```text
DATABASE_URL
JWT_SECRET
ADMIN_PASSWORD
API_PRIVATE_KEYS
```

inside GitHub.

Use `.env`.

---

# 🔐 Environment Variables

Create:

```text
.env
```

from:

```text
.env.example
```

Example:

```env
NODE_ENV=development

DATABASE_URL=postgresql://postgres:password@localhost:5432/pharma_bm

API_PORT=4000

NEXT_PUBLIC_API_URL=http://localhost:4000

OSM_OVERPASS_URL=https://overpass-api.de/api/interpreter

NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

JWT_SECRET=CHANGE_THIS_SECRET
```

Never commit `.env`.

---

# 🐳 Docker

Recommended development environment:

```text
docker compose up -d
```

Services:

```text
postgres
api
web
```

PostgreSQL must have PostGIS enabled.

Example:

```text
PostgreSQL
+
PostGIS
```

---

# 📦 Node Dependencies

## Frontend

```text
next
react
react-dom
typescript
tailwindcss
leaflet
react-leaflet
lucide-react
```

## Backend

```text
express
cors
helmet
zod
dotenv
pino
jsonwebtoken
bcrypt
```

## Database

```text
prisma
@prisma/client
```

## Geo

```text
@turf/distance
```

## Testing

```text
vitest
supertest
playwright
```

---

# 🧪 Testing

The project must include:

## Unit tests

Opening-hours engine:

```text
08:00 → 22:00
```

Test:

```text
07:59 = CLOSED
08:00 = OPEN
12:00 = OPEN
21:59 = OPEN
22:00 = CLOSED
```

Overnight:

```text
20:00 → 08:00
```

Test:

```text
19:59 = CLOSED
20:00 = OPEN
23:00 = OPEN
02:00 = OPEN
07:59 = OPEN
08:00 = CLOSED
```

24H:

```text
00:00 = OPEN
12:00 = OPEN
23:59 = OPEN
```

Duty:

```text
Duty period active = DUTY
```

---

# 🧪 API Tests

Test:

```text
GET /api/pharmacies
GET /api/pharmacies/open-now
GET /api/pharmacies/nearby
GET /api/pharmacies/duty/today
GET /api/pharmacies/search
```

---

# 🎭 End-to-End Tests

Playwright should test:

```text
Open homepage
↓
Search pharmacy
↓
Open map
↓
Allow location
↓
Find nearest pharmacy
↓
Open pharmacy details
↓
Click call
↓
Click directions
```

---

# 🔄 Data Sources

Possible sources:

## OpenStreetMap

Used for:

- Pharmacy discovery
- Geographic coordinates
- Public map information

## Official/verified sources

Used where available for:

- Duty schedules
- Official opening hours
- Phone numbers
- Temporary closures

## Manual admin verification

Used to correct incomplete or outdated information.

---

# ⚠️ Data Accuracy

The application must clearly distinguish:

```text
✅ Verified
⚠️ Unverified
🕐 Last updated
```

Example:

```text
🟢 Ouverte maintenant

Dernière vérification:
05/10/2026 09:15

Source:
Pharma BM Admin
```

Never fabricate:

- Opening hours
- Duty status
- Phone numbers
- Addresses

If information is unknown:

```text
ℹ️ Horaires non confirmés
```

---

# 🌍 Expansion

Version 1:

```text
Bordj Menaïel
```

Future:

```text
Bordj Menaïel
        ↓
Boumerdès
        ↓
Boumerdès Wilaya
        ↓
Algeria
```

Database should therefore not hard-code Bordj Menaïel everywhere.

Use:

```text
country
wilaya
commune
city
```

---

# 🏙️ Multi-City Architecture

Future API:

```http
GET /api/cities
GET /api/cities/:slug/pharmacies
```

Example:

```text
/api/cities/bordj-menaiel/pharmacies
/api/cities/boumerdes/pharmacies
```

---

# 📊 Statistics

Future admin statistics:

```text
Total pharmacies
Verified pharmacies
Open pharmacies
Duty pharmacies
24H pharmacies
New pharmacies
OSM synchronization errors
```

Charts:

```text
Pharmacies by commune
Pharmacies by verification status
OSM synchronization history
```

---

# ♻️ Data Synchronization Rules

OSM data must not blindly overwrite manually verified information.

Priority:

```text
Verified Admin Data
        ↓
Official Source
        ↓
OpenStreetMap
        ↓
Unknown
```

If OSM changes a phone number that was manually verified:

```text
Do not automatically replace it.
Create:
"Possible change detected"
```

Admin can approve the change.

---

# 📝 Audit Log

Every important admin change should be recorded.

Example:

```text
Admin:
admin@example.com

Action:
UPDATE_PHARMACY

Pharmacy:
Pharmacie ABC

Changed:
opening_hours

Old:
08:00 → 20:00

New:
08:00 → 22:00

Date:
05/10/2026 10:15
```

---

# 🚦 Status Colors

Use semantic status styles:

```text
🟢 OPEN
🌙 DUTY
⭐ 24H
🟡 CLOSING SOON
🔴 CLOSED
⚠️ UNKNOWN
```

Do not depend only on color.

Always include text/icons for accessibility.

---

# ♿ Accessibility

The website must support:

- Keyboard navigation
- Screen readers
- Large buttons
- Sufficient contrast
- Accessible labels
- Focus states
- `aria-label`
- Map controls with accessible names

---

# ⚡ Performance

Optimize for mobile networks.

Requirements:

- Lazy-load map
- Lazy-load images
- Minimize JavaScript
- Compress assets
- Cache static resources
- Paginate pharmacy lists
- Use map bounding boxes
- Avoid loading every pharmacy when unnecessary

For map queries:

```text
Only retrieve pharmacies inside the visible map area.
```

---

# 🌐 Deployment

GitHub stores the source code.

GitHub Pages can host a static frontend, but it cannot run the Node.js API or PostgreSQL database.

Recommended production architecture:

```text
GitHub
   │
   ├── Source
   │
   └── CI/CD
          │
          ├───────────────┐
          ▼               ▼
      Web Hosting      API Hosting
          │               │
          │               ▼
          │          PostgreSQL
          │          + PostGIS
          │
          ▼
       Users
```

The frontend and backend may be deployed to platforms that support Node.js.

---

# 🚀 Development Commands

Install:

```bash
pnpm install
```

Database:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Development:

```bash
pnpm dev
```

Tests:

```bash
pnpm test
```

End-to-end:

```bash
pnpm test:e2e
```

Build:

```bash
pnpm build
```

Production:

```bash
pnpm start
```

OSM synchronization:

```bash
pnpm osm:sync
```

---

# 🗺️ OSM Synchronization Example

Conceptual Overpass query:

```text
[out:json];

(
  node["amenity"="pharmacy"](around:RADIUS,LAT,LNG);
  way["amenity"="pharmacy"](around:RADIUS,LAT,LNG);
  relation["amenity"="pharmacy"](around:RADIUS,LAT,LNG);
);

out center tags;
```

The application must respect OpenStreetMap/Overpass usage policies and avoid excessive requests.

Use caching and scheduled synchronization rather than querying Overpass on every visitor request.

---

# 🧠 Smart Search Algorithm

Recommended ranking:

```text
1. Pharmacy de garde
2. Currently open
3. 24H
4. Verified
5. Distance
```

Example:

```text
🌙 Duty — 1.4 km
🟢 Open — 350 m
🟢 Open — 800 m
⭐ 24H — 1.2 km
🔴 Closed — 100 m
```

For the "nearest open pharmacy" feature:

```text
FILTER:
status = OPEN OR DUTY OR OPEN_24H

SORT:
distance ASC
```

---

# 🔍 Search Example

User enters:

```text
KHERACHI
```

System:

```text
Search database
      ↓
Name
Address
Phone
Neighborhood
      ↓
Results
```

---

# 🧭 Nearest Pharmacy Algorithm

Pseudo-code:

```text
getUserLocation()

pharmacies =
    getPharmaciesWithinRadius(
        latitude,
        longitude,
        radius
    )

for each pharmacy:
    status = getPharmacyStatus(
        pharmacy,
        currentDateTime
    )

filter:
    OPEN
    DUTY
    OPEN_24H

sort:
    distance ascending

return results
```

---

# 🛎️ "Open Now" API Response

Example:

```json
{
  "currentTime": "20:15",
  "city": "Bordj Menaïel",
  "results": [
    {
      "id": 1,
      "name": "Pharmacie ABC",
      "status": "OPEN",
      "distanceMeters": 350,
      "closesAt": "22:00",
      "verified": true
    }
  ]
}
```

---

# 🌙 Duty API Response

```json
{
  "date": "2026-10-05",
  "results": [
    {
      "id": 12,
      "name": "Pharmacie XYZ",
      "status": "DUTY",
      "startsAt": "20:00",
      "endsAt": "08:00",
      "verified": true
    }
  ]
}
```

---

# 🛡️ Privacy

The application should minimize personal data.

User location:

```text
Browser GPS
     ↓
Nearest pharmacy calculation
     ↓
Do not store permanently
```

The system should not require user registration for basic pharmacy search.

Registration should only be required for:

```text
Admin
Editor
Verifier
```

---

# 📜 Licensing / Attribution

If OpenStreetMap data or map tiles are used, comply with the applicable OpenStreetMap attribution and usage requirements.

Display appropriate attribution on the map.

Do not remove required map attribution.

---

# 🧑‍💻 Development Philosophy

The application should prioritize:

```text
Simple
Fast
Mobile-first
Accurate
Accessible
Secure
Maintainable
```

Avoid unnecessary complexity.

Do not build a fake/demo system.

All core functionality should work with real data.

---

# 🏁 Development Roadmap

## Phase 1 — Foundation

- [ ] Repository structure
- [ ] Next.js frontend
- [ ] Node.js API
- [ ] PostgreSQL
- [ ] PostGIS
- [ ] Prisma
- [ ] Environment configuration

## Phase 2 — Pharmacy Database

- [ ] Pharmacy model
- [ ] Opening hours
- [ ] Exceptions
- [ ] Duty schedules
- [ ] Verification
- [ ] Admin CRUD

## Phase 3 — Map

- [ ] Leaflet
- [ ] OpenStreetMap
- [ ] Pharmacy markers
- [ ] User location
- [ ] Marker details
- [ ] Directions

## Phase 4 — Automatic Discovery

- [ ] Overpass integration
- [ ] OSM import
- [ ] OSM synchronization
- [ ] Duplicate detection
- [ ] Change detection
- [ ] Admin verification

## Phase 5 — Opening Engine

- [ ] Normal schedules
- [ ] Multiple periods
- [ ] Overnight periods
- [ ] 24H
- [ ] Exceptions
- [ ] Duty schedules
- [ ] Closing-soon status

## Phase 6 — User Experience

- [ ] Search
- [ ] Nearby pharmacies
- [ ] Open now
- [ ] Duty
- [ ] Filters
- [ ] Phone
- [ ] Directions
- [Mobile UI

## Phase 7 — PWA

- [ ] Manifest
- [ ] Service worker
- [ ] Install prompt
- [ ] Offline shell
- [ ] Mobile optimization

## Phase 8 — Security

- [ ] Authentication
- [ ] Roles
- [ ] Rate limiting
- [ ] Validation
- [ ] Audit logs
- [ ] Secure sessions
- [ ] Production HTTPS

## Phase 9 — Testing

- [ ] Unit tests
- [ ] API tests
- [ ] Database tests
- [ ] Opening-hours tests
- [ ] GPS tests
- [ ] Map tests
- [ ] Playwright E2E

## Phase 10 — Production

- [ ] Production database
- [ ] API deployment
- [ ] Web deployment
- [ ] Domain
- [ ] HTTPS
- [ ] Monitoring
- [ ] Scheduled OSM sync
- [ ] Backups

---

# ⭐ Future Features

Possible future versions:

- 👤 User accounts
- ❤️ Favorite pharmacies
- 🔔 Notifications
- 📱 Native Android application
- 🗣️ Arabic / French / English
- 🌙 Ramadan schedules
- 🚨 Emergency information
- 💊 Search medicines
- 📦 Pharmacy inventory
- 💬 Pharmacy announcements
- 🧑‍⚕️ Doctor directory
- 🏥 Nearby hospitals
- 🚑 Emergency services
- 📊 Public pharmacy statistics

---

# 🌍 Languages

The interface should eventually support:

```text
🇩🇿 العربية
🇫🇷 Français
🇬🇧 English
```

Default:

```text
Français
```

The architecture must support RTL for Arabic.

---

# 🇩🇿 Algeria Focus

The application is initially designed for:

```text
Country:
Algeria

Wilaya:
Boumerdès

Commune:
Bordj Menaïel
```

The architecture must remain generic enough to support all Algerian communes later.

---

# 📌 Important Rules for Developers

1. Do not invent pharmacy information.
2. Do not invent opening hours.
3. Do not invent duty schedules.
4. Do not claim unverified information is official.
5. Never expose private environment variables.
6. Never store user GPS unnecessarily.
7. Do not query Overpass on every page load.
8. Cache external geographic data.
9. Respect OpenStreetMap attribution and usage policies.
10. Keep the application mobile-first.
11. Keep the map fast.
12. Separate external data from verified data.
13. Keep an audit history of admin changes.
14. Write tests for the opening-hours engine.
15. Use real working APIs rather than mock-only functionality.

---

# 💡 Core Product

The final product should make this possible:

```text
USER OPENS PHARMA BM
          ↓
📍 ALLOW LOCATION
          ↓
🗺️ MAP CENTERS ON USER
          ↓
💊 PHARMACIES FOUND
          ↓
🧠 OPENING-HOURS ENGINE
          ↓
┌────────────────────────────┐
│ 🌙 DUTY                    │
│ 🟢 OPEN                    │
│ ⭐ 24H                     │
│ 🔴 CLOSED                  │
└────────────────────────────┘
          ↓
📍 SORT BY DISTANCE
          ↓
💊 CHOOSE PHARMACY
          ↓
┌────────────────────────────┐
│ 📞 CALL                    │
│ 🧭 DIRECTIONS              │
│ ℹ️ DETAILS                 │
└────────────────────────────┘
```

---

# 🚀 Mission

**Pharma BM — Bordj Menaïel**

> **Une pharmacie ouverte, au bon endroit, au bon moment.**

The goal is to provide a fast, reliable and mobile-friendly way for people to find pharmacies in Bordj Menaïel, especially when they urgently need a pharmacy that is open or on duty.

---

# Repository

GitHub:

`https://github.com/zotcgames/pharma-bm`

Project name:

**Pharma BM**

Version:

**0.1.0 — Initial Architecture**
