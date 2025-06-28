"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const goToLogin = (): void => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">YourLogo</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection('team')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Team
                </button>
                <button
                  onClick={goToLogin}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection('team')}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Team
                </button>
                <button
                  onClick={goToLogin}
                  className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 w-full text-left"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Company
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We create amazing solutions that help businesses grow and succeed in the digital world.
            </p>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a passionate team dedicated to delivering innovative solutions that make a difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                efficiency, and success in today's competitive marketplace.
              </p>
              <p className="text-gray-600">
                Since our founding, we've helped hundreds of companies transform their operations 
                and achieve their goals through innovative software solutions.
              </p>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Your Image Here</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented individuals who make our company great.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="bg-gray-300 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600">Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
              <p className="text-gray-600 mb-2">CEO & Founder</p>
              <p className="text-sm text-gray-500">
                10+ years of experience in tech leadership and business development.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="bg-gray-300 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600">Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
              <p className="text-gray-600 mb-2">CTO</p>
              <p className="text-sm text-gray-500">
                Expert in software architecture and leading development teams.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="bg-gray-300 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600">Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
              <p className="text-gray-600 mb-2">Lead Designer</p>
              <p className="text-sm text-gray-500">
                Creative designer with a passion for user experience and interface design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section - Simple Button */}
      <section id="login" className="py-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Access your account to unlock all features and begin your journey with us.
            </p>
            <button
              onClick={goToLogin}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">YourLogo</h3>
            <p className="text-gray-400 mb-6">
              Building the future, one solution at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © 2025 YourCompany. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}