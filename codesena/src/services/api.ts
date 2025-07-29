// API service functions for data fetching
// Replace these with real API calls when backend is ready

export interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    points: number;
    year: string;
  };
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  timeAgo: string;
  isAnswered: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    year: string;
    points: number;
  };
  category: string;
  tags: string[];
  stars: number;
  likes: number;
  views: number;
  dateCreated: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Completed' | 'In Progress' | 'Beta';
  teamSize: number;
  lookingForCollaborators: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  duration: string;
  attendees: number;
  maxAttendees: number;
  type: string;
  tags: string[];
  isRegistered: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Activity {
  id: string;
  type: 'answer' | 'project' | 'workshop' | 'question';
  title: string;
  points: number;
  time: string;
  icon: string;
  color: string;
}

// Mock API service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('codesena_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    // For now, simulate API calls with delays
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    return { headers, ...options };
  }

  // Questions API
  async getQuestions(filters?: {
    search?: string;
    tags?: string[];
    difficulty?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ questions: Question[]; total: number; hasMore: boolean }> {
    await this.fetchWithAuth('/questions');
    
    // Return empty array for now - no dummy data
    return {
      questions: [],
      total: 0,
      hasMore: false
    };
  }

  async getQuestion(id: string): Promise<Question | null> {
    await this.fetchWithAuth(`/questions/${id}`);
    return null;
  }

  async createQuestion(questionData: {
    title: string;
    content: string;
    tags: string[];
    difficulty: string;
  }): Promise<Question> {
    await this.fetchWithAuth('/questions', {
      method: 'POST',
      body: JSON.stringify(questionData),
    });
    
    throw new Error('API not implemented yet');
  }

  // Projects API
  async getProjects(filters?: {
    search?: string;
    category?: string;
    tags?: string[];
    difficulty?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ projects: Project[]; total: number; hasMore: boolean }> {
    await this.fetchWithAuth('/projects');
    
    // Return empty array for now - no dummy data
    return {
      projects: [],
      total: 0,
      hasMore: false
    };
  }

  async getProject(id: string): Promise<Project | null> {
    await this.fetchWithAuth(`/projects/${id}`);
    return null;
  }

  async createProject(projectData: {
    title: string;
    description: string;
    tags: string[];
    category: string;
    difficulty: string;
    githubUrl?: string;
    liveUrl?: string;
  }): Promise<Project> {
    await this.fetchWithAuth('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
    
    throw new Error('API not implemented yet');
  }

  // Leaderboard API
  async getLeaderboard(period: 'weekly' | 'monthly' | 'all-time' = 'monthly'): Promise<LeaderboardEntry[]> {
    await this.fetchWithAuth(`/leaderboard?period=${period}`);
    
    // Return empty array for now - no dummy data
    return [];
  }

  // Workshops API
  async getWorkshops(filters?: {
    upcoming?: boolean;
    registered?: boolean;
    type?: string;
    level?: string;
  }): Promise<Workshop[]> {
    await this.fetchWithAuth('/workshops');
    
    // Return empty array for now - no dummy data
    return [];
  }

  async registerForWorkshop(workshopId: string): Promise<void> {
    await this.fetchWithAuth(`/workshops/${workshopId}/register`, {
      method: 'POST',
    });
  }

  // Activity API
  async getUserActivity(userId: string, limit: number = 10): Promise<Activity[]> {
    await this.fetchWithAuth(`/users/${userId}/activity?limit=${limit}`);
    
    // Return empty array for now - no dummy data
    return [];
  }

  // Community stats API
  async getCommunityStats(): Promise<{
    totalUsers: number;
    totalQuestions: number;
    totalProjects: number;
    totalWorkshops: number;
  }> {
    await this.fetchWithAuth('/stats/community');
    
    // Return zero stats for now - no dummy data
    return {
      totalUsers: 0,
      totalQuestions: 0,
      totalProjects: 0,
      totalWorkshops: 0
    };
  }

  // Search API
  async search(query: string, type?: 'questions' | 'projects' | 'users'): Promise<{
    questions: Question[];
    projects: Project[];
    users: LeaderboardEntry[];
  }> {
    await this.fetchWithAuth(`/search?q=${encodeURIComponent(query)}&type=${type || 'all'}`);
    
    return {
      questions: [],
      projects: [],
      users: []
    };
  }

  // Engagement actions
  async voteQuestion(questionId: string, direction: 'up' | 'down'): Promise<void> {
    await this.fetchWithAuth(`/questions/${questionId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ direction }),
    });
  }

  async likeProject(projectId: string): Promise<void> {
    await this.fetchWithAuth(`/projects/${projectId}/like`, {
      method: 'POST',
    });
  }

  async starProject(projectId: string): Promise<void> {
    await this.fetchWithAuth(`/projects/${projectId}/star`, {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();

// Helper functions for data transformation
export function formatTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  
  return past.toLocaleDateString();
}

export function generateAvatar(name: string): string {
  // Generate consistent avatar based on name
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return initials;
}