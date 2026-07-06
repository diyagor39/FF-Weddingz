# FF Weddingz 💍

A full-stack wedding services web platform featuring a luxury user-facing website and a role-based admin dashboard. Built with a warm, glassmorphism-inspired design to reflect a premium wedding planning experience.

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

---

## ✨ Overview

FF Weddingz is a wedding services platform that allows users to explore wedding packages, view portfolios (photography, films, pre-wedding shoots), and submit inquiries — while admins get a dedicated dashboard to manage the platform.

The UI follows a premium aesthetic: background videos, glassmorphism cards, and a warm brown color palette designed to feel elegant and inviting.

## 🎯 Features

- **User Authentication** — Secure signup/login system with role-based access (User / Admin)
- **Admin Dashboard** — Separate login and management panel for administrators
- **Wedding Packages** — Browse curated wedding service packages
- **Portfolio Showcase** — Photo and video galleries (weddings, engagements, pre-wedding shoots, maternity)
- **Inquiry System** — Users can submit inquiries directly through the site
- **Responsive Design** — Luxury glassmorphism UI with background video and brown color theme

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript

**Backend**
- Node.js with Express
- MySQL (via `mysql2`)
- dotenv for environment configuration
- CORS for cross-origin handling

## 📁 Project Structure

```
FF-Weddingz/
├── css/                  # Stylesheets
├── images/               # Site images & portfolio assets
├── js/
│   ├── auth.js           # Login/signup logic
│   └── script.js         # General site scripts
├── videos/               # Background & showcase videos
├── db.js                 # MySQL database connection
├── server.js             # Express server entry point
├── index.html            # Home page
├── about.html
├── admin.html            # Admin dashboard
├── admin-login.html      # Admin login page
├── user-auth.html        # Combined user login/signup page
├── contact.html
├── films.html
├── inquiry.html
├── packages.html
├── services.html
├── setups.html
├── package.json
└── .gitignore
```

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) installed and running

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/diyagor39/FF-Weddingz.git
   cd FF-Weddingz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root folder with the following:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ff_weddingz
   PORT=5000
   ```

4. **Set up the database**
   Create a MySQL database named `ff_weddingz` (or as set in `.env`) and import your schema/tables.

5. **Run the server**
   ```bash
   npm start
   ```
   or, for development with auto-restart:
   ```bash
   npm run dev
   ```

6. Open your browser at `http://localhost:5000`

## 🔐 Authentication

The platform supports two roles:
- **User** — Access to browsing, packages, and inquiries
- **Admin** — Access to the admin dashboard for managing site content

Login/signup is handled through a combined auth page preserving a consistent luxury UI (background video + glassmorphism card).

## 📌 Roadmap

- [ ] Payment integration for bookings
- [ ] Admin content management (add/edit packages, portfolio items)
- [ ] Email notifications for inquiries
- [ ] Deploy to production hosting

## 👩‍💻 Author

**Diya Gor**
GitHub: [@diyagor39](https://github.com/diyagor39)

---

⭐ If you like this project, consider giving it a star on GitHub!
