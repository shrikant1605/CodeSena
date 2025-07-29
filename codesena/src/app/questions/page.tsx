'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Code, 
  Search, 
  Filter, 
  Plus, 
  MessageCircle, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  User, 
  Tag,
  CheckCircle,
  Star,
  Trophy,
  Eye,
  ThumbsUp
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

export default function QuestionsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const questions = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT?",
      content: "I'm building a React application and need to implement JWT-based authentication. What's the best approach for storing tokens and handling protected routes?",
      author: {
        name: "Sarah Chen",
        avatar: "👩‍💻",
        points: 245,
        year: "3rd Year"
      },
      tags: ["React", "JWT", "Authentication", "Frontend"],
      votes: 12,
      answers: 5,
      views: 127,
      timeAgo: "2 hours ago",
      isAnswered: true,
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Best practices for organizing a Node.js project structure?",
      content: "I'm starting a new Node.js backend project and wondering about the best folder structure and patterns to follow for scalability.",
      author: {
        name: "Arjun Patel",
        avatar: "👨‍🎓",
        points: 180,
        year: "2nd Year"
      },
      tags: ["Node.js", "Backend", "Project Structure", "Best Practices"],
      votes: 8,
      answers: 3,
      views: 89,
      timeAgo: "4 hours ago",
      isAnswered: false,
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Dynamic Programming approach for this problem?",
      content: "I'm stuck on this leetcode problem about finding the longest palindromic subsequence. Can someone explain the DP approach?",
      author: {
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        points: 320,
        year: "4th Year"
      },
      tags: ["DSA", "Dynamic Programming", "Algorithms", "LeetCode"],
      votes: 15,
      answers: 7,
      views: 203,
      timeAgo: "6 hours ago",
      isAnswered: true,
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "How to deploy React app on Vercel with custom domain?",
      content: "I've built my portfolio website in React and want to deploy it on Vercel with my custom domain. What are the steps?",
      author: {
        name: "Rohit Kumar",
        avatar: "👨‍💻",
        points: 156,
        year: "1st Year"
      },
      tags: ["React", "Deployment", "Vercel", "Domain"],
      votes: 6,
      answers: 2,
      views: 45,
      timeAgo: "1 day ago",
      isAnswered: false,
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Understanding closures in JavaScript with examples",
      content: "I'm having trouble understanding closures in JavaScript. Can someone explain with practical examples?",
      author: {
        name: "Anjali Gupta",
        avatar: "👩‍🎓",
        points: 95,
        year: "1st Year"
      },
      tags: ["JavaScript", "Closures", "Fundamentals"],
      votes: 9,
      answers: 4,
      views: 78,
      timeAgo: "1 day ago",
      isAnswered: true,
      difficulty: "Intermediate"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Questions', count: 25 },
    { id: 'unanswered', label: 'Unanswered', count: 8 },
    { id: 'recent', label: 'Recent', count: 12 },
    { id: 'popular', label: 'Popular', count: 15 }
  ];

  const tags = [
    'React', 'JavaScript', 'Node.js', 'Python', 'DSA', 'Java', 
    'MongoDB', 'Express', 'Next.js', 'TypeScript', 'CSS', 'Git'
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSena
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/questions/ask"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                J
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Q&A Forum</h1>
          <p className="text-slate-600">Get help from the community or share your knowledge by answering questions.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Filters */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold text-slate-900 mb-4">Filters</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded-full">{filter.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-bold text-slate-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                  <Filter className="w-5 h-5 mr-2" />
                  Sort by: Recent
                </button>
              </div>
            </motion.div>

            {/* Questions List */}
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <ArrowUp className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                      </button>
                      <span className="font-bold text-slate-700">{question.votes}</span>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <ArrowDown className="w-5 h-5 text-slate-400 hover:text-red-600" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-center space-y-2 min-w-[80px]">
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                        question.isAnswered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {question.isAnswered && <CheckCircle className="w-4 h-4" />}
                        <span className="text-sm font-medium">{question.answers}</span>
                      </div>
                      <span className="text-xs text-slate-500">answers</span>
                      
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">{question.views}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <Link 
                          href={`/questions/${question.id}`}
                          className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {question.title}
                        </Link>
                        <span className={`px-2 py-1 text-xs border rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {question.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-md hover:bg-blue-100 cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Author and Time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                            {question.author.avatar}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-slate-900">{question.author.name}</span>
                              <span className="text-xs text-slate-500">•</span>
                              <span className="text-xs text-slate-500">{question.author.year}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs text-slate-600">{question.author.points}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-500 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{question.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                Load More Questions
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}