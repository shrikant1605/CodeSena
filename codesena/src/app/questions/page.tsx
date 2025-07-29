'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ThumbsUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useAuth, useUserInitials } from '@/contexts/AuthContext';
import { apiService, Question } from '@/services/api';

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
  icon: any, 
  title: string, 
  description: string, 
  action?: { label: string, href: string } 
}) {
  return (
    <div className="text-center py-16">
      <Icon className="w-16 h-16 text-slate-400 mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link 
          href={action.href}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {action.label}
          <Plus className="ml-2 w-5 h-5" />
        </Link>
      )}
    </div>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-3 text-slate-600 text-lg">Loading questions...</span>
    </div>
  );
}

export default function QuestionsPage() {
  const { user } = useAuth();
  const userInitials = useUserInitials();
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {
          search: searchQuery || undefined,
          status: selectedFilter === 'unanswered' ? 'unanswered' : undefined,
          page: 1,
          limit: 10
        };

        const response = await apiService.getQuestions(filters);
        setQuestions(response.questions);
        setHasMore(response.hasMore);
        setTotalQuestions(response.total);

      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setError('Failed to load questions. Please try again.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQuestions();
    }
  }, [user, selectedFilter, searchQuery]);

  const filters = [
    { id: 'all', label: 'All Questions', count: totalQuestions },
    { id: 'unanswered', label: 'Unanswered', count: 0 },
    { id: 'recent', label: 'Recent', count: 0 },
    { id: 'popular', label: 'Popular', count: 0 }
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search will be triggered by useEffect when searchQuery changes
  };

  const handleVote = async (questionId: string, direction: 'up' | 'down') => {
    try {
      await apiService.voteQuestion(questionId, direction);
      // In a real app, update the questions state here
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  };

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {userInitials}
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

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
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
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
                <button 
                  type="submit"
                  className="flex items-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Sort by: Recent
                </button>
              </form>
            </motion.div>

            {/* Questions List */}
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {loading ? (
                <LoadingSpinner />
              ) : questions.length === 0 ? (
                <motion.div variants={fadeInUp}>
                  <EmptyState
                    icon={MessageCircle}
                    title="No questions found"
                    description={searchQuery 
                      ? `No questions match your search for "${searchQuery}". Try different keywords or ask a new question.`
                      : "Be the first to ask a question and start a discussion in the community!"
                    }
                    action={{ 
                      label: searchQuery ? "Clear Search" : "Ask First Question", 
                      href: searchQuery ? "/questions" : "/questions/ask" 
                    }}
                  />
                </motion.div>
              ) : (
                questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    variants={fadeInUp}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                        <button 
                          onClick={() => handleVote(question.id, 'up')}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <ArrowUp className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                        </button>
                        <span className="font-bold text-slate-700">{question.votes}</span>
                        <button 
                          onClick={() => handleVote(question.id, 'down')}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
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
                              {question.author.avatar || question.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
                ))
              )}
            </motion.div>

            {/* Load More */}
            {!loading && questions.length > 0 && hasMore && (
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
            )}

            {/* No more questions message */}
            {!loading && questions.length > 0 && !hasMore && (
              <motion.div 
                className="mt-8 text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-slate-500">You've reached the end of the questions list.</p>
                <Link 
                  href="/questions/ask"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ask a Question
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}