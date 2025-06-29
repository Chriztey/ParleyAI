"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../assets/parley-ai-logo.png";
import Image from "next/image";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const goToLogin = (): void => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-ping opacity-70"></div>
      </div>

      {/* Top Navbar - Enhanced Glass Design */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/5 border-b border-white/10 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo with glow effect */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 backdrop-blur-md bg-white/20 rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                <Image
                  src={Logo}
                  alt="ParleyAI Logo"
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                ParleyAI
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:bg-white/10 rounded-xl border border-transparent hover:border-white/20 shadow-lg hover:shadow-xl"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:bg-white/10 rounded-xl border border-transparent hover:border-white/20 shadow-lg hover:shadow-xl"
                >
                  Team
                </button>
                <button
                  onClick={goToLogin}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 text-white px-6 py-2 rounded-xl text-sm font-medium hover:scale-105 hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/90 hover:text-white focus:outline-none p-2 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-4 pt-4 pb-6 space-y-3 backdrop-blur-xl bg-white/10 border-t border-white/20 rounded-b-2xl m-2 shadow-2xl">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-white/90 hover:text-white block px-4 py-3 text-base font-medium w-full text-left rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-white/90 hover:text-white block px-4 py-3 text-base font-medium w-full text-left rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                >
                  Team
                </button>
                <button
                  onClick={goToLogin}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 text-white block px-4 py-3 rounded-xl text-base font-medium hover:from-white/30 hover:to-white/20 w-full text-left transition-all duration-300 shadow-lg"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-16 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <div className="mb-8">
                {/* <div className="inline-block p-4 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/30 shadow-lg mb-6">
                  <Image
                    src={Logo}
                    alt="ParleyAI Logo"
                    width={48}
                    height={48}
                    className="rounded-xl"
                  />
                </div> */}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                Welcome to ParleyAI
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white/90 leading-relaxed">
                We create amazing solutions that help businesses grow and
                succeed in the digital world through cutting-edge AI technology.
              </p>
              <button
                onClick={() => scrollToSection("about")}
                className="group bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-xl border border-white/40 text-white px-10 py-4 rounded-2xl font-semibold hover:scale-105 hover:from-white/35 hover:to-white/25 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Same Container Width */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-16 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-16">
              <div className="inline-block p-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/30 shadow-lg mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                About Us
              </h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                We are a passionate team dedicated to delivering innovative
                solutions that make a difference in the world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                  <span>Our Mission</span>
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  To empower businesses with cutting-edge technology solutions
                  that drive growth, efficiency, and success in today's
                  competitive marketplace.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Since our founding, we've helped hundreds of companies
                  transform their operations and achieve their goals through
                  innovative software solutions.
                </p>
                <div className="flex space-x-4 pt-4">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center flex-1">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-white/70 text-sm">Projects</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center flex-1">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-white/70 text-sm">Clients</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center flex-1">
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-white/70 text-sm">Years</div>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 h-80 rounded-3xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="text-center">
                  <div className="w-16 h-16 backdrop-blur-xl bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-white/60 text-lg font-medium">
                    Your Image Here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Same Container Width */}
      <section id="team" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-16 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-16">
              <div className="inline-block p-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/30 shadow-lg mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Our Team
              </h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Meet the passionate minds behind this project's creation and
                innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <div className="group">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
                  <div className="relative mb-6">
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 w-32 h-32 rounded-full mx-auto flex items-center justify-center shadow-xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-12 h-12 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Felix</h3>
                  <p className="text-white/70 mb-4 text-lg">AI Engineer</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Passionate about machine learning and creating intelligent
                    solutions that solve real-world problems.
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
                  <div className="relative mb-6">
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 w-32 h-32 rounded-full mx-auto flex items-center justify-center shadow-xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-12 h-12 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Christie
                  </h3>
                  <p className="text-white/70 mb-4 text-lg">
                    WebApp Designer & Developer
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Expert in creating beautiful, user-friendly interfaces and
                    seamless digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section - Same Container Width */}
      <section id="login" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-16 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block p-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/30 shadow-lg mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Access your account to unlock all features and begin your
                journey with us. Join thousands of satisfied users today.
              </p>
              <button
                onClick={goToLogin}
                className="group bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-xl border border-white/40 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:scale-105 hover:from-white/35 hover:to-white/25 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center space-x-3"
              >
                <span>Go to Login Page</span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Same Container Width */}
      <footer className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-16 shadow-2xl">
            <div className="text-center">
              <div className="inline-block p-4 backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/15 rounded-3xl border border-white/40 shadow-xl mb-8">
                <Image
                  src={Logo}
                  alt="ParleyAI Logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                ParleyAI
              </h3>
              <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Building the future, one solution at a time. Empowering
                businesses through innovative AI technology.
              </p>

              <div className="border-t border-white/20 pt-8">
                <p className="text-white/60 text-sm">
                  © 2025 ParleyAI. All rights reserved. Made with ❤️ for
                  innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
