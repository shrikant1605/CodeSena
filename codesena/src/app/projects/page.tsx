'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Code, 
  Search, 
  Filter, 
  Plus, 
  Github, 
  ExternalLink, 
  Star, 
  Heart, 
  Eye, 
  Users, 
  TrendingUp,
  Award,
  Clock,
  Globe
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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform with MERN Stack",
      description: "A full-featured e-commerce platform with user authentication, payment integration, order management, and admin dashboard. Built using React, Node.js, Express, and MongoDB.",
      author: {
        name: "Arjun Patel",
        avatar: "👨‍💻",
        year: "3rd Year",
        points: 420
      },
      category: "Full Stack",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      stars: 24,
      likes: 67,
      views: 340,
      dateCreated: "2 weeks ago",
      githubUrl: "https://github.com/arjun/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      image: "🛒",
      difficulty: "Advanced",
      status: "Completed",
      teamSize: 1,
      lookingForCollaborators: false
    },
    {
      id: 2,
      title: "AI-Powered Study Planner",
      description: "Smart study planner that uses machine learning to optimize study schedules based on your learning patterns, deadlines, and performance history.",
      author: {
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        year: "4th Year",
        points: 580
      },
      category: "AI/ML",
      tags: ["Python", "TensorFlow", "React", "Django", "NLP"],
      stars: 31,
      likes: 89,
      views: 450,
      dateCreated: "1 week ago",
      githubUrl: "https://github.com/priya/ai-study-planner",
      liveUrl: "https://study-planner-ai.netlify.app",
      image: "🤖",
      difficulty: "Advanced",
      status: "In Progress",
      teamSize: 3,
      lookingForCollaborators: true
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description: "WebSocket-based chat application with rooms, file sharing, emoji reactions, and real-time notifications. Perfect for team communication.",
      author: {
        name: "Rohit Kumar",
        avatar: "👨‍🎓",
        year: "2nd Year",
        points: 280
      },
      category: "Web Development",
      tags: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
      stars: 18,
      likes: 45,
      views: 220,
      dateCreated: "3 days ago",
      githubUrl: "https://github.com/rohit/realtime-chat",
      liveUrl: "https://chat-app-realtime.herokuapp.com",
      image: "💬",
      difficulty: "Intermediate",
      status: "Completed",
      teamSize: 2,
      lookingForCollaborators: false
    },
    {
      id: 4,
      title: "Mobile Expense Tracker",
      description: "React Native app for tracking daily expenses with beautiful charts, budget alerts, and spending insights. Supports offline sync and cloud backup.",
      author: {
        name: "Anjali Gupta",
        avatar: "👩‍💻",
        year: "3rd Year",
        points: 350
      },
      category: "Mobile Development",
      tags: ["React Native", "Firebase", "AsyncStorage", "Charts"],
      stars: 22,
      likes: 56,
      views: 180,
      dateCreated: "5 days ago",
      githubUrl: "https://github.com/anjali/expense-tracker",
      liveUrl: null,
      image: "📱",
      difficulty: "Intermediate",
      status: "Beta",
      teamSize: 1,
      lookingForCollaborators: true
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Decentralized voting application using Ethereum smart contracts. Ensures transparency, security, and immutability of voting records.",
      author: {
        name: "Vikram Singh",
        avatar: "👨‍🎓",
        year: "4th Year",
        points: 490
      },
      category: "Blockchain",
      tags: ["Solidity", "Ethereum", "Web3.js", "React", "Truffle"],
      stars: 35,
      likes: 78,
      views: 520,
      dateCreated: "1 month ago",
      githubUrl: "https://github.com/vikram/blockchain-voting",
      liveUrl: "https://voting-dapp.netlify.app",
      image: "🗳️",
      difficulty: "Advanced",
      status: "Completed",
      teamSize: 4,
      lookingForCollaborators: false
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with forecasts, interactive maps, and weather alerts. My first React project with API integration!",
      author: {
        name: "Neha Patel",
        avatar: "👩‍🎓",
        year: "1st Year",
        points: 120
      },
      category: "Web Development",
      tags: ["React", "API", "CSS", "Weather API"],
      stars: 8,
      likes: 25,
      views: 95,
      dateCreated: "2 days ago",
      githubUrl: "https://github.com/neha/weather-dashboard",
      liveUrl: "https://weather-dash-neha.netlify.app",
      image: "🌤️",
      difficulty: "Beginner",
      status: "Completed",
      teamSize: 1,
      lookingForCollaborators: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: 24 },
    { id: 'web', label: 'Web Development', count: 12 },
    { id: 'mobile', label: 'Mobile Development', count: 5 },
    { id: 'ai', label: 'AI/ML', count: 4 },
    { id: 'blockchain', label: 'Blockchain', count: 3 }
  ];

  const techTags = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB',
    'Next.js', 'Express', 'Firebase', 'AWS', 'Docker', 'Flutter'
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'beta': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
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
                href="/projects/create"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Project
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Showcase</h1>
          <p className="text-slate-600">Discover amazing projects from the community and find collaboration opportunities.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded-full">{category.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack Filter */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-bold text-slate-900 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Collaboration Hub */}
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-2">Looking for Team?</h3>
                <p className="text-purple-100 mb-4 text-sm">
                  Find collaborators for your next big project or join existing teams.
                </p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm">
                  Find Collaborators
                </button>
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
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl">{project.image}</div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(project.difficulty)}`}>
                              {project.difficulty}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      {project.lookingForCollaborators && (
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          <Users className="w-3 h-3 inline mr-1" />
                          Hiring
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.dateCreated}</span>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                          {project.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-900">{project.author.name}</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">{project.author.year}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-slate-600">{project.author.points} points</span>
                          </div>
                        </div>
                      </div>
                      {project.teamSize > 1 && (
                        <div className="text-xs text-slate-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          Team of {project.teamSize}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Live
                          </a>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-yellow-500 transition-colors">
                          <Star className="w-4 h-4" />
                        </button>
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
                Load More Projects
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}