import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthModal } from "../../../hooks/authClient/useAuthModal";
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaLaptop } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
const HomePage = () => {
  const { openAuthModal } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FaGraduationCap className={`text-3xl ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>CoursesEvo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Courses</Link>
            <Link to="/about" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>About Us</Link>
            <Link to="/contact" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Contact</Link>
            
            {/* Keep existing buttons but style them */}
            <div className="flex items-center space-x-2">
              <Link to="/admin/login" className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                Admin
              </Link>
              <Link to="/instructor/login" className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                Instructor
              </Link>
              <button 
                onClick={openAuthModal} 
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Login
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <HiX className={isScrolled ? 'text-gray-800' : 'text-white'} /> : 
              <HiOutlineMenuAlt3 className={isScrolled ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4">
            <Link to="/courses" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link to="/admin/login" className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-center">
                Admin Panel
              </Link>
              <Link to="/instructor/login" className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-center">
                Instructor Panel
              </Link>
              <button 
                onClick={openAuthModal} 
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlock Your Potential with Online Learning</h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">Discover a world of knowledge with our expert-led courses designed to help you succeed.</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition-colors">Explore Courses</button>
              <button onClick={openAuthModal} className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors">Get Started</button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="https://placehold.co/600x400/EEE/31343C?text=Learning+Illustration" alt="Learning Illustration" className="rounded-lg shadow-xl max-w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose CoursesEvo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4 flex justify-center">
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Expert Instructors</h3>
              <p className="text-gray-600 text-center">Learn from industry professionals with real-world experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4 flex justify-center">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Interactive Learning</h3>
              <p className="text-gray-600 text-center">Engage with interactive content designed to enhance your learning.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4 flex justify-center">
                <FaBook />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Comprehensive Curriculum</h3>
              <p className="text-gray-600 text-center">Access a wide range of subjects with in-depth course materials.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4 flex justify-center">
                <FaLaptop />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Learn Anywhere</h3>
              <p className="text-gray-600 text-center">Study at your own pace, anytime and anywhere with our flexible platform.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Original buttons preserved at the bottom for reference if needed */}
      <div className="hidden links flex items-center justify-center gap-2 mt-10">
        <Link
          to="/admin/login"
          className="px-4 py-2 bg-green-300/50 hover:bg-green-500 text-green-600 hover:text-white "
        >
          Admin Panel
        </Link>
        <Link
          className="px-4 py-2 bg-green-300/50 hover:bg-green-500 text-green-600 hover:text-white "
          to="/instructor/login"
        >
          Instructor Panel
        </Link>
        <button onClick={openAuthModal} className="px-4 py-2 bg-green-300/50 hover:bg-green-500 text-green-600 hover:text-white ">
          Login User
        </button>
      </div>
    </div>
  );
};

export default HomePage;
