'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Code, 
  Search, 
  Plus, 
  MessageCircle, 
  Clock, 
  User, 
  CheckCircle,
  Eye,
  ThumbsUp,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getQuestions } from '@/lib/db';
import { Question } from '@/lib/types';

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
  const { currentUser, userProfile, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/auth/login');
      return;
    }

    if (currentUser) {
      fetchQuestions();
    }
  }, [currentUser, authLoading, selectedFilter, selectedDifficulty]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
             const filters: { tags?: string[]; difficulty?: string; isAnswered?: boolean; limitCount?: number } = { limitCount: 20 };
      
      if (selectedFilter === 'answered') {
        filters.isAnswered = true;
      } else if (selectedFilter === 'unanswered') {
        filters.isAnswered = false;
      }
      
      if (selectedDifficulty) {
        filters.difficulty = selectedDifficulty;
      }

      const data = await getQuestions(filters);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (authLoading || (!currentUser && !authLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
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
              <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userProfile?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="font-medium">{userProfile?.name || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Q&A</h1>
            <p className="text-slate-600">Ask questions, share knowledge, and learn from your peers.</p>
          </div>
          <Link 
            href="/questions/ask" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ask Question
          </Link>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search questions, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Questions</option>
                <option value="answered">Answered</option>
                <option value="unanswered">Unanswered</option>
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="h-4 bg-slate-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-12"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="h-6 bg-slate-200 rounded w-16"></div>
                    <div className="h-6 bg-slate-200 rounded w-20"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <motion.div 
                key={question.id}
                variants={fadeInUp}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {question.isAnswered && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      <Link 
                        href={`/questions/${question.id}`}
                        className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {question.title}
                      </Link>
                    </div>
                    <p className="text-slate-600 mb-4 line-clamp-2">{question.content}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      {question.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="flex items-center space-x-2 text-slate-500 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500 text-sm">
                      <User className="w-4 h-4" />
                      <span>{question.author?.name || 'Anonymous'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-slate-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{question.votes}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{question.answers} answers</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">{question.views} views</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/questions/${question.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Question →
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty state
            <motion.div 
              variants={fadeInUp}
              className="text-center py-16"
            >
              <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {searchQuery ? 'No questions found' : 'No questions yet'}
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                 {searchQuery 
                   ? 'Try adjusting your search terms or filters to find what you&apos;re looking for.'
                   : 'Be the first to ask a question and help build our knowledge base!'
                 }
              </p>
              <Link 
                href="/questions/ask" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ask the First Question
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Load More */}
        {!loading && filteredQuestions.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={fetchQuestions}
              className="bg-white border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
            >
              Load More Questions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}