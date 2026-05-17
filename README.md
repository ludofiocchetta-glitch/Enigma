# Enigma - web escape room

> A logic, math, computer science and science focused web arcade escape room experience.

## About the project

**Enigma** is an interactive web-based arcade escape room composed of five challenging levels. Players must explore their surroundings, find hidden clues, and solve complex puzzles to unlock the door to the next room. 

The core of the game is deeply rooted in logic, mathematics, computer science and science. The first four rooms are inspired by the brilliance of four famous historical scientists—**Alan Turing, Marie Curie, Albert Einstein, and Ada Lovelace**—each corresponding to a playable avatar. The fifth and final room serves as the ultimate test, where players must combine all the knowledge and clues gathered throughout their journey to escape.

## Key features
* **Point & Click Exploration:** Interactive environments with hidden items, notes, and interactive modals on clickable objects.
* **Themed Puzzles:** Cryptography, chemistry, physics, and algorithm-based challenges.
* **Dynamic Scoring System:** A competitive leaderboard based on both correct answers and time efficiency.
* **Interactive Notebook:** A built-in digital notebook that automatically saves crucial clues for the final challenge.
* **Responsiveness:** Fully optimized for desktop, tablet, and mobile devices using custom CSS media queries. It includes a specific viewport lock that forces smartphones into landscape orientation to guarantee an immersive experience.

## Built with 

The project follows a decoupled client-server architecture:

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **UI Framework:** [Bootstrap 5](https://getbootstrap.com/) (Modals, Buttons)
* **Backend:** [Node.js](https://nodejs.org/), Express
* **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
  
## Project structure

The repository is divided into two main sections: `Backend` and `Frontend`.

```text
Enigma
├── 📂 Backend
│   └── 📄 index.js         # Node.js, Express server and database communication logic
└── 📂 Frontend
    ├── 📂 assets
    │   ├── 📂 audio        # Audio files
    │   └── 📂 images       # Images files
    ├── 📂 css              # Custom stylesheets
    │   ├── 📄 bootstrap.css
    │   └── 📄 style.css
    ├── 📂 js
    │   ├── 📄 api.js       # Functions handling fetch requests to the backend
    │   ├── 📄 main.js      # Shared logic (timer, score, music, setting, UI interactions)
    │   ├── 📄 room1.js     # Specific logic for Turing's room
    │   ├── 📄 room2.js     # Specific logic for Curie's room
    │   └── 📄 ...          # (room3.js, room4.js, room5.js, room6.js)
    ├── 📂 pages            # HTML files for each escape room
    │   ├── 📄 login.html
    │   ├── 📄 room1.html
    │   └── 📄 ...
    └── 📄 index.html       # Home page
```

## Getting started

## Prerequisites
Node.js installed on your machine
A Supabase project set up with the required database schema (progress, Leaderboard, User, session, inventory and room)

## Installation
Clone the repository:
git clone [https://github.com/ludofiocchetta-glitch/Enigma](https://github.com/ludofiocchetta-glitch/Enigma)

Navigate to the backend directory and install dependencies
```text
cd Backend
npm install
```
Set up your environment variables (e.g. Supabase URL and API keys) in a .env file.

Start the server:
```text
node index.js
```

Open the application in your browser (on http://localhost:3000)
