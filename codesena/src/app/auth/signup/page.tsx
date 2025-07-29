'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Code, 
  ArrowRight, 
  Chrome,
  GraduationCap,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [profileData, setProfileData] = useState({
    university: '',
    branch: '',
    year: '',
    interests: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Auth, 2: Profile completion
  const { signInWithGoogle, updateUserProfile } = useAuth();
  const router = useRouter();

  const techInterests = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
    'DevOps', 'Cybersecurity', 'Game Development', 'Blockchain',
    'UI/UX Design', 'Backend Development', 'Full Stack', 'Cloud Computing'
  ];

  const branches = [
    'Computer Science', 'Information Technology', 'Electronics & Communication',
    'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
    'Biotechnology', 'Chemical Engineering', 'Other'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setStep(2); // Move to profile completion
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateUserProfile(profileData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CodeSena
          </span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Join CodeSena</h2>
        <p className="text-slate-600">Start your tech journey with fellow students</p>
      </div>

      {/* Social signup buttons */}
      <div className="space-y-3 mb-6">
        <button 
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Chrome className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-slate-500 mb-6">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </div>

      <div className="text-center">
        <p className="text-slate-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CodeSena
          </span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h2>
        <p className="text-slate-600">Help us personalize your experience</p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-slate-700 mb-1">
            University/College
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GraduationCap className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="university"
              type="text"
              value={profileData.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your University Name"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-slate-700 mb-1">
            Branch/Major
          </label>
          <select
            id="branch"
            value={profileData.branch}
            onChange={(e) => handleInputChange('branch', e.target.value)}
            className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select your branch</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-1">
            Current Year
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <select
              id="year"
              value={profileData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select your year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            What are you interested in? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {techInterests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  profileData.interests.includes(interest)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-600 hover:border-blue-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Complete Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="w-full py-3 text-slate-600 hover:text-slate-800 transition-colors"
        >
          Skip for now
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
}