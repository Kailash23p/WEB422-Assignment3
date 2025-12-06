# WEB422 Assignment 1 - Book Search & Favourites

A Next.js web application that allows users to search for books using the Open Library API and save their favourite books to a personalized collection.

## Features

- Search and browse books from Open Library database
- View detailed information about individual books
- User registration and authentication
- Add books to personal favourites list
- Manage favourites (add/remove books)
- Responsive design using React Bootstrap

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
## Deployment

The application is deployed on Vercel. To deploy:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable `NEXT_PUBLIC_API_URL` with your deployment URL + `/api`
4. Deploy

## Technical Notes

- Uses mock in-memory database (data resets on server restart)
- JWT authentication with localStorage
- Client-side state management using Jotai
│   ├── Layout.js       # App layout wrapper
│   ├── MainNav.js      # Navigation bar
│   ├── PageHeader.js   # Page header component
│   └── RouteGuard.js   # Authentication guard
├── lib/                # Utility libraries
│   ├── authenticate.js # Authentication functions
│   └── userData.js     # User data API calls
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── works/         # Book details pages
│   ├── index.js       # Home/search page
│   ├── favourites.js  # Favourites page
│   ├── login.js       # Login page
│   ├── register.js    # Register page
│   └── about.js       # About page
├── public/            # Static assets
├── styles/            # CSS styles
└── store.js          # Jotai state management

```

## Technologies Used

- **Next.js 13.5** - React framework
- **React 18** - UI library
- **React Bootstrap** - UI components
- **Jotai** - State management
- **SWR** - Data fetching and caching
- **Open Library API** - Book data source

## Common Issues & Solutions

### Issue: Books not loading on home page

**Solution**: Ensure you're not logged in, or check that the RouteGuard allows access to "/" (home page). This has been fixed in the latest version.

### Issue: Favourites disappear on page refresh

**Solution**: Make sure you're logged in. The RouteGuard automatically fetches favourites when you're authenticated.

### Issue: Some books fail to load

**Solution**: Some book IDs from Open Library API may return errors. The app now shows an error card instead of breaking the entire list.

## Support

For issues or questions, please contact the course instructor or TA.

## License

This project is created for educational purposes as part of WEB422 course at Seneca College.
