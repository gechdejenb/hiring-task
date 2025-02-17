# Sentiment Analysis API and Dashboard

## Overview
This project provides a **Sentiment Analysis API** and a **frontend dashboard** to analyze customer feedback for a new product on an e-commerce website. The backend is built with **Express.js** and **PostgreSQL**, while the frontend uses **React (TypeScript)**, **Tailwind CSS**, and **RTK Query** for API communication.

---

## Features

### Backend
- **Authentication**:
  - User registration (`POST /auth/signup`).
  - User login (`POST /auth/signin`).
- **Sentiment Analysis**:
  - Submit text for analysis (`POST /feedback/text`).
  - Retrieve analyzed feedback (`GET /feedback/text`).
- **API Documentation**: Swagger (OAS 2.0) available at `localhost:3000/api-docs`.

### Frontend
- **Landing Page**:
  - Displays product information.
  - Includes a feedback form for submitting text.
- **Dashboard**:
  - Visualizes sentiment analysis results (e.g., charts, graphs).
  - Displays historical feedback data.
- **Auth Pages**:
  - Signup and Signin components for user authentication.

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **API Docs**: Swagger (OAS 2.0)
- **Authentication**: JWT (JSON Web Tokens)

### Frontend
- **Framework**: React (TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit (RTK Query for API calls)
- **Charting**: Chart.js or Recharts for sentiment visualization.

---

## Database Structure

### Tables
1. **Users**:
   - `id`: Primary key.
   - `username`: Unique username.
   - `password`: Hashed password.
2. **Feedback**:
   - `id`: Primary key.
   - `user_id`: Foreign key linking to Users table.
   - `text`: Feedback text.
   - `sentiment`: Analyzed sentiment (e.g., positive, negative, neutral).

---

### Demo Video  
Watch the [demo video](https://drive.google.com/file/d/1KAac3gkdmesO5kyMhbeCLZnBaMM3JIjL/view?usp=sharing) to see the application in action.  