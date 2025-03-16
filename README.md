# StudyCircle Backend

## 🚀 About the Project
StudyCircle Backend is a Node.js-based server for managing study materials, user authentication, and various educational features. Built using **Express.js** and **MySQL**, this backend provides APIs for handling users, courses, messages, and more.

## 🏗️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** Express-session
- **File Uploads:** Multer
- **Testing:** Cypress, Playwright

## 📁 Project Structure
```
/StudyCircle-Backend
│── /config       # Configuration files (DB, Multer, URLs, etc.)
│── /controllers  # Business logic for routes
│── /middleware   # Middleware for authentication, logging, etc.
│── /models       # MySQL models and database queries
│── /routes       # API routes definitions
│── /uploads      # Stored uploaded files
│── /public       # Static files
│── server.js     # Main server entry point
│── .env          # Environment variables
│── package.json  # Dependencies & scripts
│── router.js     # API routes definitions
```

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Artist-dk/studycircle-backend.git
cd studycircle-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file and add:
```
PORT=8081
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
SESSION_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ Run the Server
```sh
npm start
```
The server will start on `http://localhost:8081`

## 🚀 API Endpoints
| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| GET    | /session             | Check session |
| POST   | /login               | User login |
| POST   | /account/createnew   | Create new user |
| GET    | /library             | Fetch library books |
| POST   | /tutorial/save       | Save tutorial |
| GET    | /tutorial/:id        | Fetch tutorial |
| GET    | /user/profile        | Fetch user profile |

## 🛠️ Contributing
Feel free to fork the repository and submit pull requests. Follow these steps:
1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature-name`
3. **Commit** changes: `git commit -m "Added feature"`
4. **Push** to branch: `git push origin feature-name`
5. **Open** a pull request

## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## 📩 Contact
For any questions, contact **[Digambar Kumbhar](mailto:digambarckumbhar299@gmail.com)**.

