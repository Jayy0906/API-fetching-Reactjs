# 🔐 React Auth App with DummyJSON

This is a simple yet flexible authentication app built with **React**, allowing users to log in using either their **email** or **username**. It integrates with the [DummyJSON](https://dummyjson.com/) mock API to simulate login, user data, and session management.

---

## 🚀 Features

- ✅ Login using **email** _or_ **username**
- ✅ Real-time form validation
- ✅ Toast notifications for user feedback
- ✅ User context with React's Context API
- ✅ Basic session state management
- ✅ Protected routes

---

## 🧠 How It Works

1. The login input accepts **either email or username**.
2. If an email is provided, the app fetches the corresponding username from DummyJSON's `/users` endpoint.
3. Then, it authenticates the user via the `/auth/login` endpoint with the **username** and **password**.
4. On success, the authenticated user object is stored in a global context.
5. Users API - https://dummyjson.com/users, Products API - https://dummyjson.com/products. You can use users link to see username password to login.

---

## 📦 Tech Stack

| Tech         | Usage                        |
|--------------|------------------------------|
| React        | Frontend framework           |
| React Router | Navigation / routing         |
| Axios + Fetch| API requests                 |
| React Context| Global state (auth)          |
| React Hot Toast | Toast notifications     |
| DummyJSON API| Fake backend for auth/users  |

---

## 🔧 Installation

```bash
git clone https://github.com/Jayy0906/API-fetching-Reactjs.git
cd API-fetching-Reactjs
npm install
npm run dev
