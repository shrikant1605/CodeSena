'use client';

import { motion } from 'framer-motion';
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
  Filter
} from 'lucide-react';
import Link from 'next/link';

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

export default function DashboardPage() {
  const userStats = {
    points: 245,
    rank: 12,
    questionsAnswered: 18,
    projectsShared: 5,
    workshopsAttended: 3,
    streak: 7
  };

  const recentActivity = [
    {
      type: 'answer',
      title: 'Helped with React hooks implementation',
      points: 10,
      time: '2 hours ago',
      icon: MessageCircle,
      color: 'blue'
    },
    {
      type: 'project',
      title: 'Shared E-commerce Website project',
      points: 15,
      time: '1 day ago',
      icon: BookOpen,
      color: 'green'
    },
    {
      type: 'workshop',
      title: 'Attended "Advanced JavaScript" workshop',
      points: 20,
      time: '2 days ago',
      icon: Calendar,
      color: 'purple'
    },
    {
      type: 'answer',
      title: 'Solved DSA problem for junior',
      points: 5,
      time: '3 days ago',
      icon: MessageCircle,
      color: 'blue'
    }
  ];

  const leaderboard = [
    { name: 'Alex Kumar', points: 450, avatar: '👨‍💻', rank: 1 },
    { name: 'Priya Sharma', points: 380, avatar: '👩‍💻', rank: 2 },
    { name: 'Rahul Singh', points: 320, avatar: '👨‍🎓', rank: 3 },
    { name: 'You', points: 245, avatar: '🧑‍💻', rank: 12, isUser: true },
  ];

  const upcomingEvents = [
    {
      title: 'MERN Stack Workshop',
      date: 'Tomorrow, 2:00 PM',
      attendees: 45,
      type: 'Workshop'
    },
    {
      title: 'DSA Problem Solving Session',
      date: 'Friday, 4:00 PM',
      attendees: 32,
      type: 'Study Group'
    },
    {
      title: 'Project Showcase',
      date: 'Next Monday, 6:00 PM',
      attendees: 78,
      type: 'Event'
    }
  ];

  const quickActions = [
    { title: 'Ask Question', icon: MessageCircle, href: '/questions/ask', color: 'blue' },
    { title: 'Share Project', icon: BookOpen, href: '/projects/create', color: 'green' },
    { title: 'Find Mentor', icon: Users, href: '/mentors', color: 'purple' },
    { title: 'Join Workshop', icon: Calendar, href: '/workshops', color: 'orange' },
  ];

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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <span className="font-medium">John Doe</span>
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-slate-600">Ready to continue your coding journey? Here's what's happening in your community.</p>
        </motion.div>

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
                  <span className="text-2xl font-bold text-blue-600">{userStats.points}</span>
                </div>
                <h3 className="font-semibold text-slate-900">Total Points</h3>
                <p className="text-sm text-slate-600">Rank #{userStats.rank} overall</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">{userStats.streak}</span>
                </div>
                <h3 className="font-semibold text-slate-900">Day Streak</h3>
                <p className="text-sm text-slate-600">Keep it up! 🔥</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{userStats.questionsAnswered}</span>
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
                    className={`p-4 rounded-xl border-2 border-slate-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all group`}
                  >
                    <div className={`bg-${action.color}-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 text-${action.color}-600`} />
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
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className={`bg-${activity.color}-100 w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
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
            </motion.div>

            {/* Upcoming Events */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
                <Link href="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-600">{event.date}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-2">
                        {event.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{event.attendees} attending</p>
                      <ArrowRight className="w-5 h-5 text-slate-400 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      user.isUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
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
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${user.isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-600">{user.points} points</p>
                    </div>
                    {user.isUser && (
                      <Star className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Monthly Challenge</h3>
              <p className="text-blue-100 mb-4">Answer 25 questions this month</p>
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-white rounded-full h-2" 
                  style={{ width: `${(userStats.questionsAnswered / 25) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-100">{userStats.questionsAnswered}/25 completed</p>
              <div className="mt-4">
                <span className="text-2xl">🎯</span>
                <span className="ml-2 text-sm">7 more to unlock exclusive badge!</span>
              </div>
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