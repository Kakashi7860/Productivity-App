# Productivity App

A full-stack productivity application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Task Management**: Create, update, delete, and categorize tasks (Work, Personal, Study).
- **Notes**: Create and organize notes with tags.
- **Daily Goals**: Set and track daily goals with a progress bar.
- **Authentication**: Secure login and registration using JWT.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Axios, Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Auth**: JSON Web Tokens (JWT), Bcrypt.

## Setup

1.  **Prerequisites**:
    *   Node.js installed.
    *   MongoDB installed and running locally.

2.  **Install Dependencies**:
    ```bash
    # Server
    cd server
    npm install

    # Client
    cd ../client
    npm install
    ```

3.  **Environment Variables**:
    *   The server uses `server/.env` with default values.
    *   `MONGO_URI=mongodb://localhost:27017/productivity-app`
    *   `JWT_SECRET=supersecretkey123`

4.  **Run the App**:
    *   Start Backend: `cd server && npm run dev`
    *   Start Frontend: `cd client && npm run dev`

## Usage

1.  Register a new account.
2.  Login to access the dashboard.
3.  Navigate between Tasks, Notes, and Goals using the sidebar.
