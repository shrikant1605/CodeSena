'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Code, 
  Zap, 
  Target, 
  Star, 
  ArrowRight,
  Sparkles,
  Brain,
  Wrench,
  Lightbulb,
  Calendar,
  MessageCircle,
  Award,
  Globe,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { getLeaderboard } from '@/lib/db';
import { LeaderboardEntry } from '@/lib/types';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(3); // Get top 3 for landing page
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSena
              </span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#mission" className="text-slate-600 hover:text-blue-600 transition-colors">Mission</a>
              <a href="#mentorship" className="text-slate-600 hover:text-blue-600 transition-colors">Mentorship</a>
              <a href="#community" className="text-slate-600 hover:text-blue-600 transition-colors">Community</a>
            </motion.div>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/auth/login" className="text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
              <Link href="/auth/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                Join CodeSena
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Where Students Learn, Build & Grow Together
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
            >
              Code. <span className="text-blue-600">Connect.</span> <span className="text-purple-600">Create.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12"
            >
              Join thousands of students in our vibrant tech community. Learn from peers, share projects, and accelerate your coding journey through collaborative learning.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/auth/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center">
                <Zap className="mr-2 w-6 h-6" />
                Join the Community
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
              <Link href="#features" className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why <span className="text-blue-600">CodeSena</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Traditional learning often feels isolated. We believe the best way to learn coding is together — through collaboration, mentorship, and real-world projects.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Learn Faster</h3>
              <p className="text-slate-600 mb-4">Get instant help from peers, discover new concepts through Q&A, and learn from real-world project experiences.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Q&A Forum</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Peer Learning</span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">DevOps</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Build Real Projects</h3>
              <p className="text-slate-600 mb-4">Encourage project-based learning with mini teams. From beginner clones to real-world SaaS tools.</p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-purple-700">&quot;Build in Public&quot; is our motto</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Bridge College & Industry</h3>
              <p className="text-slate-600 mb-4">Connect with industry speakers, participate in company-style hackathons, and access internship opportunities.</p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Alumni & startup connections
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gamified Mentorship Section */}
      <section id="mentorship" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              <span className="text-purple-600">Gamified</span> Mentorship System
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              &quot;Helping others should be as rewarding as learning.&quot; Our unique point-based system makes mentorship engaging and rewarding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">+5 Points</h3>
                    <p className="text-slate-600">Helped a beginner with basic query</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">+10 Points</h3>
                    <p className="text-slate-600">Helped a mid-level learner with complex problem</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">+15 Points</h3>
                    <p className="text-slate-600">Solved/mentored an advanced topic or project</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Top Contributors</h3>
              
              {loadingLeaderboard ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                        <div className="w-24 h-4 bg-slate-200 rounded"></div>
                      </div>
                      <div className="w-16 h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : leaderboard.length > 0 ? (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.userId} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                          index === 1 ? 'bg-gray-100 text-gray-600' : 
                          'bg-orange-100 text-orange-600'
                        }`}>
                          <span className="font-bold">{entry.rank}</span>
                        </div>
                        <span className="font-semibold">{entry.user?.name || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {index === 0 ? <Trophy className="w-4 h-4 text-yellow-500" /> :
                         index === 1 ? <Star className="w-4 h-4 text-gray-500" /> :
                         <Award className="w-4 h-4 text-orange-500" />}
                        <span className={`font-bold ${
                          index === 0 ? 'text-yellow-600' : 
                          index === 1 ? 'text-gray-600' : 
                          'text-orange-600'
                        }`}>{entry.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">Be the first to start helping others and earn points!</p>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-white rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">Monthly Rewards</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">Certificates</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Goodies</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Recognition</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need to <span className="text-purple-600">Succeed</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From Q&A forums to project showcases, we&apos;ve built a comprehensive platform for student developers.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Q&A Forum</h3>
              <p className="text-slate-600">Get instant help from peers and mentors. Share knowledge and grow together.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Project Gallery</h3>
              <p className="text-slate-600">Showcase your work, get feedback, and discover amazing projects from peers.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Workshop Hub</h3>
              <p className="text-slate-600">Join hands-on workshops, bootcamps, and weekly learning sessions led by experts.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Gamified Progress</h3>
              <p className="text-slate-600">Earn badges, maintain streaks, and climb leaderboards as you learn and help others.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Career Pathways</h3>
              <p className="text-slate-600">Get tailored tech roadmaps and guides based on your branch and year of study.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Join Our <span className="text-purple-600">Community</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Whether you&apos;re just starting out or already an expert — there&apos;s always room to contribute, learn, and get better at what you do.
            </p>
            
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join students who are already learning, building, and growing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <Zap className="mr-2 w-5 h-5" />
                  Get Started Now
                </Link>
                <Link href="/dashboard" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">Learn</div>
              <div className="text-lg text-slate-600">Together</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">Build</div>
              <div className="text-lg text-slate-600">Together</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">Grow</div>
              <div className="text-lg text-slate-600">Together</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">CodeSena</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Building the future of student collaboration in tech. Join our mission to create a thriving community where every learner can grow.
              </p>
              <div className="text-sm text-slate-400">
                © 2024 CodeSena. Building tomorrow&apos;s tech leaders today.
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Workshops</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
