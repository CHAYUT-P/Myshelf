# MyShelf

A simple bookshelf web application built with React (Vite) and Express backend, where users can:

•	Register and login securely (with hashed passwords using bcrypt).

•	Create and manage multiple shelves.

•	Add, edit, and delete books inside shelves.

•	Mark favorite shelves.

### Screenshot

<img src="./client/src/assets/Screenshot%202025-09-28%20at%2020.33.59.png"> 
	

### 🎨 Frontend & UI

[React (Vite)](https://react.dev/) — Fast development and build tool for modern React apps

[React Router](https://reactrouter.com) — Client-side routing and navigation

[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) — Custom styling for components



### ⚙️ Backend & API
[Express.js](https://expressjs.com/) — Minimal and flexible Node.js web framework

[bcrypt](https://www.npmjs.com/package/bcrypt) — Secure password hashing for authentication

[jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken) — Token-based user authentication

[CORS](https://www.npmjs.com/package/cors) — Enable cross-origin requests

[dotenv](https://www.npmjs.com/package/dotenv) — Environment variable management


### 🗄 Database (Current & Future)
Currently using local JSON or in-memory data (for testing)

Future plan: migrate to #MySQL / PostgreSQL



## Quick Start

1. Clone the repository
   
	```bash
	git clone https://github.com/your-username/myshelf.git
	cd myshelf
	```

2. Install dependencies

	frontend
	```bash
	cd frontend
	npm install
 	npm run dev
	```

3. Install dependencies

	backend
	```bash
	cd backend
	npm install
 	npm start
	```

