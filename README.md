# RelaxMap

RelaxMap is a web application for discovering and saving recreational locations. Users can browse places, view detailed information, leave reviews, and manage their personal profiles.

## About the Project

RelaxMap is a team project developed as part of a collaborative learning process. The application helps users find interesting places for leisure and recreation while providing a convenient way to store and explore location information.

The project consists of a frontend application built with Next.js and a backend API built with Express.js and MongoDB.

## Features

- User registration and authentication
- User profile management
- Browse available locations
- Search and filter locations
- View detailed information about locations
- Create and view reviews
- Upload images
- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Axios
- Zustand
- Formik
- Yup
- Swiper
- CSS Modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Celebrate / Joi Validation
- Cookie Parser
- Multer
- Cloudinary
- Helmet
- CORS

## Live Demo

### Frontend

https://relaxmap-client-git-develop-yuliiayarovas-projects.vercel.app/

### Backend API

https://relaxmap-server.onrender.com/

## Installation and Setup

### Clone the Repositories

Frontend:

```bash
git clone https://github.com/yuliiayarova/relaxmap-client.git
cd relaxmap-client
```

Backend:

```bash
git clone https://github.com/yuliiayarova/relaxmap-server.git
cd relaxmap-server
```

## Frontend Setup

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

## Backend Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run in development mode:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

## Project Structure

### Frontend

```text
├── app/
├── components/
├── shared/
├── lib/
└── styles/
```

### Backend

```text
src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── models/
├── utils/
├── constants/
├── validations/
├── db/
└── server.js
```

## Implementation Details

- Client-side state management with Zustand
- Server-state management and caching with TanStack Query
- Form handling and validation with Formik and Yup
- Image uploading through Cloudinary
- MongoDB database integration using Mongoose
- REST API communication between frontend and backend
- Secure authentication using HTTP-only cookies

## Team

| Name                   | GitHub                  |
| ---------------------- | ----------------------- |
| Yuliia Yarova          | @yuliiayarova           |
| Anastasiia Zahliada    | @Anastasia-Zahliada     |
| Artem Bahno            | @ArtemBgn               |
| Yevhenii Pavlushchenko | @Yevhenii-Pavlushchenko |
| Diana Prihozhyna       | @dianapri0303           |
| Taisiia Shtyk          | @shtyktasya             |
| Ihor Vzhos             | @vjosik                 |
| Mykhail Pyivoda        | @Onix43                 |

## Contributors

The project was developed collaboratively using GitHub Flow, pull requests, code reviews, and team planning. Team members contributed to frontend development, backend development, API integration, state management, validation, UI implementation, and testing.

## License

This project was created for educational purposes.
