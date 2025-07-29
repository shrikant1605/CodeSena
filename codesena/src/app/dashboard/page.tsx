'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Code, 
  Trophy, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Calendar, 
  Star, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  Clock,
  ArrowRight,
  Plus,
  Bell,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useAuth, useUserDisplayName, useUserInitials } from '@/contexts/AuthContext';
import { apiService, Activity, LeaderboardEntry, Workshop } from '@/services/api';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Empty state component
function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  action?: { label: string, href: string } 
}) {
  return (
    <div className="text-center py-12">
      <Icon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      {action && (
        <Link 
          href={action.href}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      <span className="ml-2 text-slate-600">Loading...</span>
    </div>
  );
}

export default function DashboardPage() {
  const { user, userStats, loading: authLoading } = useAuth();
  const displayName = useUserDisplayName();
  const userInitials = useUserInitials();
  const router = useRouter();

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [activityData, leaderboardData, workshopsData] = await Promise.all([
          apiService.getUserActivity(user.id, 5),
          apiService.getLeaderboard('monthly'),
          apiService.getWorkshops({ upcoming: true })
        ]);

        setRecentActivity(activityData);
        setLeaderboard(leaderboardData);
        setUpcomingWorkshops(workshopsData.slice(0, 3)); // Show only 3 upcoming workshops

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const quickActions = [
    { title: 'Ask Question', icon: MessageCircle, href: '/questions/ask', color: 'blue' },
    { title: 'Share Project', icon: BookOpen, href: '/projects/create', color: 'green' },
    { title: 'Find Mentor', icon: Users, href: '/mentors', color: 'purple' },
    { title: 'Join Workshop', icon: Calendar, href: '/workshops', color: 'orange' },
  ];

  // Show loading spinner while authenticating
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSena
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions, projects..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="relative p-2 text-slate-600 hover:text-blue-600">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userInitials}
                </div>
                <span className="font-medium">{displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-slate-600">Ready to continue your coding journey? Here&apos;s what&apos;s happening in your community.</p>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {userStats?.points || 0}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">Total Points</h3>
                <p className="text-sm text-slate-600">
                  {userStats?.rank ? `Rank #${userStats.rank} overall` : 'Start earning points!'}
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {userStats?.streak || 0}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">Day Streak</h3>
                <p className="text-sm text-slate-600">
                  {userStats?.streak ? 'Keep it up! 🔥' : 'Start your streak!'}
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {userStats?.questionsAnswered || 0}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">Questions Answered</h3>
                <p className="text-sm text-slate-600">Helping others</p>
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">{action.title}</h3>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <Link href="/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              
              {loading ? (
                <LoadingSpinner />
              ) : recentActivity.length === 0 ? (
                <EmptyState
                  icon={Clock}
                  title="No recent activity"
                  description="Start participating in the community to see your activity here."
                  action={{ label: "Ask a Question", href: "/questions/ask" }}
                />
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{activity.title}</h3>
                        <p className="text-sm text-slate-600">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-green-600">+{activity.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Upcoming Workshops */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Workshops</h2>
                <Link href="/workshops" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              
              {loading ? (
                <LoadingSpinner />
              ) : upcomingWorkshops.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  title="No upcoming workshops"
                  description="Check back later for new workshops and learning opportunities."
                  action={{ label: "Browse Workshops", href: "/workshops" }}
                />
              ) : (
                <div className="space-y-4">
                  {upcomingWorkshops.map((workshop, index) => (
                    <div key={workshop.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                      <div>
                        <h3 className="font-semibold text-slate-900">{workshop.title}</h3>
                        <p className="text-sm text-slate-600">{workshop.date}</p>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-2">
                          {workshop.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{workshop.attendees} attending</p>
                        <ArrowRight className="w-5 h-5 text-slate-400 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Leaderboard</h2>
                <Link href="/leaderboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View full
                </Link>
              </div>
              
              {loading ? (
                <LoadingSpinner />
              ) : leaderboard.length === 0 ? (
                <EmptyState
                  icon={Trophy}
                  title="No leaderboard data"
                  description="Be the first to start earning points and climb the leaderboard!"
                />
              ) : (
                <div className="space-y-4">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center space-x-3 p-3 rounded-xl ${
                        user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        user.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.rank <= 3 ? (
                          user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {user.avatar || user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${user.isCurrentUser ? 'text-blue-900' : 'text-slate-900'}`}>
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-600">{user.points} points</p>
                      </div>
                      {user.isCurrentUser && (
                        <Star className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Progress Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Monthly Challenge</h3>
              <p className="text-blue-100 mb-4">
                {userStats?.monthlyGoal.description || 'No active challenge'}
              </p>
              {userStats?.monthlyGoal && (
                <>
                  <div className="bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white rounded-full h-2" 
                      style={{ 
                        width: `${Math.min((userStats.monthlyGoal.current / userStats.monthlyGoal.target) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-100">
                    {userStats.monthlyGoal.current}/{userStats.monthlyGoal.target} completed
                  </p>
                  {userStats.monthlyGoal.current < userStats.monthlyGoal.target && (
                    <div className="mt-4">
                      <span className="text-2xl">🎯</span>
                      <span className="ml-2 text-sm">
                        {userStats.monthlyGoal.target - userStats.monthlyGoal.current} more to go!
                      </span>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Navigation Menu */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-bold text-slate-900 mb-4">Explore</h3>
              <nav className="space-y-2">
                <Link href="/questions" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Q&A Forum</span>
                </Link>
                <Link href="/projects" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 text-slate-700 hover:text-green-700 transition-colors">
                  <BookOpen className="w-5 h-5" />
                  <span>Projects</span>
                </Link>
                <Link href="/mentors" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-700 transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Find Mentors</span>
                </Link>
                <Link href="/workshops" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 text-slate-700 hover:text-orange-700 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span>Workshops</span>
                </Link>
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}