# LinkedIn-like Clone

This is a LinkedIn-like social networking platform built using **Next.js** for the frontend and **Node.js** with **Express** for the backend. The application allows users to register, log in, create posts, connect with other users, and view profiles. It also supports features like comments, likes, and downloading user profiles as PDFs.

## Features

### User Features

- **Authentication**: Users can register and log in securely.
- **Profile Management**: Users can update their profile, including bio, work history, and education.
- **Connections**: Users can send and accept connection requests.
- **Posts**: Users can create, delete, and like posts.
- **Comments**: Users can comment on posts and delete their own comments.
- **Discover**: Users can explore other profiles and connect with them.
- **Download Profile**: Users can download their profile as a PDF.

### Admin Features

- **User Management**: Admins can view all users and their profiles.

---

## Tech Stack

### Frontend

- **Next.js**: React-based framework for building the user interface.
- **Redux Toolkit**: State management for handling user and post data.
- **CSS Modules**: Styling for components.

### Backend

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user, post, and connection data.
- **Mongoose**: ODM for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **Sharp**: Image processing for profile pictures.
- **PDFKit**: Generating PDF files for user profiles.

---

### Project Structure

## Frontend

```
frontend/
├── src/
│   ├── Components/       # Reusable components like Navbar
│   ├── config/           # API configuration and Redux store
│   ├── layout/           # Layout components (UserLayout, DashboardLayout)
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS modules for styling
├── public/               # Static assets like images
├── package.json          # Frontend dependencies and scripts
```

## Backend
```
backend/
├── controllers/          # Handles the logic for processing API requests and responses.
├── models/               # Mongoose schemas for MongoDB
├── routes/               # API routes for users and posts
├── uploads/              # Uploaded files (e.g., profile pictures)
├── server.js             # Entry point for the backend
├── package.json          # Backend dependencies and scripts
```

---

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rijughosh01/WebProfile
   cd linkedin-like clone
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend/` directory with the following:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     PORT=9080
     ```

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### User Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `GET /get_user_and_profile`: Get user profile based on token.
- `POST /update_profile_data`: Update user profile data.
- `GET /user/get_all_users`: Get all user profiles.
- `POST /user/send_connection_request`: Send a connection request.
- `GET /user/getConnectionRequests`: Get connection requests.
- `POST /user/accept_connection_request`: Accept or reject a connection request.
- `GET /user/get_profile_based_on_username`: Get a user profile by username.

### Post Routes

- `POST /post`: Create a new post.
- `GET /posts`: Get all posts.
- `DELETE /delete_post`: Delete a post.
- `POST /comment`: Add a comment to a post.
- `GET /get_comments`: Get comments for a post.
- `DELETE /delete_comment`: Delete a comment.
- `POST /increment_post_like`: Like a post.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: pg4009355@gmail.com
  
- **GitHub**: https://github.com/rijughosh01