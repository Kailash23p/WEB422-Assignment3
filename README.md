# WEB422 Assignment 1

Book search and favourites management application using the Open Library API.

## Features

- Search and browse books from Open Library
- View detailed book information
- User authentication (register/login)
- Personal favourites collection
- Responsive design

## Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Usage

1. Register a new account
2. Login with your credentials
3. Browse books on the home page
4. Click on any book to view details
5. Add books to your favourites
6. View your favourites from the user menu

## Technologies

- Next.js 13.5
- React 18
- React Bootstrap
- Jotai (state management)
- SWR (data fetching)
- Open Library API

## Notes

- Uses in-memory database (data resets on server restart)
- JWT authentication with localStorage

## Author

Vivek Patel - Student ID: 146973235  
Seneca Polytechnic - WEB422
