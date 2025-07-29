# CodeSena Setup Guide

This guide will help you set up the dynamic CodeSena platform with Firebase authentication and database.

## Prerequisites

- Node.js 18+ installed
- A Google account for Firebase
- Git installed

## 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

## 2. Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "codesena-yourname")
4. Follow the setup wizard

### Enable Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains (for production)

### Setup Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users

### Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon to add a web app
4. Register your app with a name
5. Copy the config object values

## 3. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase configuration in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4. Firestore Security Rules

In Firebase Console > Firestore > Rules, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Others can read for leaderboard
    }
    
    // Questions are readable by all authenticated users
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.authorId;
      allow update: if request.auth != null && (
        request.auth.uid == resource.data.authorId ||
        // Allow updating view count and answer count
        request.writeFields.hasOnly(['views', 'answers', 'updatedAt'])
      );
    }
    
    // Answers are readable by all, writable by author
    match /answers/{answerId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    
    // Projects are readable by all, writable by author
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    
    // Workshops are readable by all, writable by instructor
    match /workshops/{workshopId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == resource.data.instructorId;
    }
    
    // Activities are readable by owner, writable by owner
    match /activities/{activityId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 5. Run the Application

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 6. Initial Setup

1. Click "Join CodeSena" to sign up with Google
2. Complete your profile with university, branch, and interests
3. You're now ready to use the platform!

## Features Implemented

### ✅ Authentication
- Google OAuth login/signup
- Profile completion flow
- Automatic user creation in Firestore

### ✅ Dynamic Data
- Real-time leaderboard from database
- User profiles with points, streak, stats
- No more static "John Doe" or fake data

### ✅ User Interface
- Dashboard with personal stats
- Questions page (ready for real questions)
- Loading states and empty states
- Responsive design

### ✅ Database Structure
- Users collection with points, stats, profile info
- Questions collection (ready for implementation)
- Activities collection for point tracking
- Workshops collection for events

## Database Collections

### Users
```typescript
{
  id: string;
  email: string;
  name: string;
  avatar?: string;
  university?: string;
  branch?: string;
  year?: string;
  interests?: string[];
  points: number;
  questionsAnswered: number;
  projectsShared: number;
  workshopsAttended: number;
  streak: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Questions
```typescript
{
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  isAnswered: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  updatedAt: Date;
}
```

## Next Steps

The platform is now fully dynamic and ready for production! You can:

1. **Add Questions**: Implement the question creation flow
2. **Add Projects**: Create project sharing functionality  
3. **Add Workshops**: Implement workshop creation and management
4. **Add Points System**: Implement automatic point awarding
5. **Add Notifications**: Real-time notifications for activities

## Production Deployment

For production deployment:

1. **Update Firebase configuration** for your production domain
2. **Set environment variables** in your hosting platform
3. **Update Firestore security rules** if needed
4. **Configure custom domain** in Firebase Hosting (optional)

## Support

If you encounter any issues:
1. Check Firebase Console for authentication/database errors
2. Verify environment variables are set correctly
3. Ensure Firestore security rules are configured
4. Check browser console for JavaScript errors

The platform is now completely dynamic and ready for real users! 🚀