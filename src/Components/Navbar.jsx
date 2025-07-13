import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <span className="text-xs font-medium text-gray-700 tracking-[0.2em] uppercase">
                VASTU DESIGN CONSULTANTS
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-16">
              <a
                href="/project"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/people"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                People
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Press
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://vastudesignslimited.blogspot.com/2025/07/this-is-dummy-vlog.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/aboutus"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                About US
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-sm">
              <a
                href="/project"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Projects
              </a>
              <a
                href="/people"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                People
              </a>
              <a
                href="#"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Press
              </a>
              <a
                href="https://vastudesignslimited.blogspot.com/2025/07/this-is-dummy-vlog.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Blog
              </a>
              <a
                href="/aboutus"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                About US
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
