
# 🛒 Grocery Shop - MERN Stack App

A full-stack grocery shopping application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. This app allows users to sign up, log in, view and add grocery items, manage their cart, and simulate the checkout process.




- ✅ User Signup & Login (with JWT auth)
- ✅ Add/View Grocery Items (with default items per user)
- ✅ Add to Cart / Remove / Clear Cart
- ✅ Responsive UI with Bootstrap
- ✅ Glassmorphism UI for auth pages
- ✅ Images for known grocery items
- ✅ Framer Motion animations on login/signup
- ✅ Vercel + Render Deployment

---

## 🧰 Tech Stack

**Frontend:**  
- React + Vite  
- React Router DOM  
- Bootstrap + Custom CSS  
- Axios  
- Framer Motion  
- Toastify

**Backend:**  
- Node.js + Express  
- MongoDB + Mongoose  
- bcryptjs  
- jsonwebtoken  
- dotenv  
- CORS

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/grocery-shop.git
cd grocery-shop
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file in `/backend`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create `.env` file in `/frontend`

```env
VITE_API_URL=https://your-backend.onrender.com
```

```bash
npm run dev
```

---

## 🖼️ Assets Used

Images stored locally in `src/assets/` for:

* milk.jpeg
* bread.jpeg
* eggs.jpeg
* salt.jpeg
* maggie.jpeg
* cornflakes.jpeg
* tomato.jpeg
* oreo.jpeg
* bourboan.jpeg
* mariegold.jpeg
* onion.jpeg
* garlic.jpeg
* darkfantasy.jpeg
* dabur.jpeg
* indiagate.jpeg
* closeup.jpeg

Plus background images:

* loginpic.jpeg
* signuppic.jpeg

---

## 📦 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* Build command: `npm run build`
* Output directory: `dist`

---

## 🙌 Credits

Built with 💙 by [Arpan Chakrabarty](https://github.com/arpan-lab)

---
