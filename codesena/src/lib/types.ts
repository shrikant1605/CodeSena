export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  university?: string;
  branch?: string;
  year?: string;
  interests?: string[];
  points: number;
  rank?: number;
  questionsAnswered: number;
  projectsShared: number;
  workshopsAttended: number;
  streak: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: User;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  isAnswered: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  authorId: string;
  author?: User;
  votes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author?: User;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructor?: User;
  date: Date;
  duration: number; // in minutes
  attendees: string[]; // user IDs
  maxAttendees?: number;
  tags: string[];
  type: 'Workshop' | 'Study Group' | 'Event';
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'answer' | 'project' | 'workshop' | 'question';
  title: string;
  points: number;
  relatedId?: string; // ID of the related question, project, etc.
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  user?: User;
  points: number;
  rank: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}