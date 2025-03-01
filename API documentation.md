# 📌 **MarkStudy Authentication API Guide (Postman)**
This guide provides detailed instructions on how to test your authentication API using **Postman**.

---

## **1️⃣ Base URL**
```
http://localhost:5000/api/auth
```
- Replace `localhost:5000` with your actual server URL if deployed.

---

## **2️⃣ API Endpoints**
| **Method** | **Endpoint**        | **Description**                     | **Auth Required** |
|------------|---------------------|-------------------------------------|------------------|
| `POST`    | `/register`         | Register a new user                | ❌ No           |
| `POST`    | `/login`            | Login with username & password     | ❌ No           |
| `POST`    | `/logout`           | Logout (Blacklist Token)           | ✅ Yes          |
| `GET`     | `/protected`        | Example: Access protected route    | ✅ Yes          |

---

# **📌 1. Register a New User**
**➤ Endpoint:**  
```
POST /api/auth/register
```
**➤ Description:**  
Creates a new user account.

### **Postman Setup**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register`
- **Headers**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body (JSON, raw)**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe",
    "email": "john@example.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123",
    "userType": "student",
    "phoneNo": "1234567890",
    "profilePictureURL": "https://example.com/profile.jpg",
    "description": "I am a student"
  }
  ```
- **Expected Response**
  ```json
  {
    "message": "Account created successfully"
  }
  ```
- **Possible Errors**
  - `400 Bad Request`: Missing fields or passwords do not match.
  - `409 Conflict`: Username or email already exists.

---

# **📌 2. User Login**
**➤ Endpoint:**  
```
POST /api/auth/login
```
**➤ Description:**  
Logs in a user and returns a JWT token.

### **Postman Setup**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/login`
- **Headers**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body (JSON, raw)**
  ```json
  {
    "username": "johndoe",
    "password": "securePassword123"
  }
  ```
- **Expected Response**
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token_here"
  }
  ```
- **Possible Errors**
  - `400 Bad Request`: Missing username or password.
  - `404 Not Found`: User not found.
  - `401 Unauthorized`: Invalid password.

---

# **📌 3. Access a Protected Route**
**➤ Endpoint:**  
```
GET /api/auth/protected
```
**➤ Description:**  
Checks if the JWT token is valid.

### **Postman Setup**
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/auth/protected`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer your_jwt_token_here"
  }
  ```
- **Expected Response**
  ```json
  {
    "message": "Protected route accessed",
    "user": {
      "id": "user_id",
      "username": "johndoe"
    }
  }
  ```
- **Possible Errors**
  - `401 Unauthorized`: Missing or invalid token.
  - `403 Forbidden`: Token is blacklisted (logged out user).

---

# **📌 4. Logout User**
**➤ Endpoint:**  
```
POST /api/auth/logout
```
**➤ Description:**  
Logs out a user by blacklisting their token.

### **Postman Setup**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/logout`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer your_jwt_token_here"
  }
  ```
- **Expected Response**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Possible Errors**
  - `400 Bad Request`: No token provided.
  - `500 Internal Server Error`: Server-side issue.

---

## **🔹 Postman Testing Steps**
1. Open **Postman** and create a new request.
2. **Register a user** using `POST /register`.
3. **Login** using `POST /login` and copy the JWT token from the response.
4. **Access a protected route** by adding the token to `Authorization: Bearer TOKEN`.
5. **Logout** using `POST /logout` and try accessing the protected route again (should fail).

---

### 🎯 **Final Notes**
✅ This guide helps you **test authentication API** using **Postman**.  
✅ Use **JWT tokens** to access **protected routes**.  
✅ Logout will **invalidate the token**, preventing future use.  
🚀 **Let me know if you need further improvements!**