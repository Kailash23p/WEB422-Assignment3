# WEB422 Assignment - Book Management Application

A Next.js application for searching and managing favourite books using the Open Library API.

## Features

- 📚 Search books from Open Library
- ⭐ Add/remove books from favourites
- 🔐 User authentication (register/login)
- 📱 Responsive design with React Bootstrap
- 🔄 Real-time state management with Jotai

## Local Development

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

2. Click "Add New" → "Project"

3. Import your GitHub repository

4. Configure your project:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add the following:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: Leave this empty for now, we'll update it after the first deployment
   - Click "Add"

6. Click "Deploy"

### Step 3: Update Environment Variable

After the first deployment completes:

1. Copy your production URL (e.g., `https://your-app-name.vercel.app`)

2. Go to your project settings in Vercel:
   - Click "Settings" → "Environment Variables"
   - Find `NEXT_PUBLIC_API_URL`
   - Click "Edit"
   - Set the value to: `https://your-app-name.vercel.app/api`
   - Click "Save"

3. Redeploy your application:
   - Go to "Deployments"
   - Click the three dots on the latest deployment
   - Click "Redeploy"

### Step 4: Verify Deployment

1. Visit your production URL
2. Test the following:
   - ✅ Home page loads with book search results
   - ✅ Register a new account
   - ✅ Login with your account
   - ✅ Add books to favourites
   - ✅ View favourites page
   - ✅ Remove books from favourites
   - ✅ Logout functionality

## Important Notes

- The application uses a mock in-memory database for development
- User data is stored in memory and will reset when the server restarts
- For production, consider implementing a real database (MongoDB, PostgreSQL, etc.)

## Project Structure

```
├── components/          # React components
│   ├── BookCard.js     # Book card display
│   ├── BookDetails.js  # Book details view
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
